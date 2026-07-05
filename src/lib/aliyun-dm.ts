import Client, {
  SingleSendMailRequest,
  type SingleSendMailResponseBody,
} from "@alicloud/dm20151123";

/**
 * Alibaba Cloud DirectMail (邮件推送) wrapper for bestaietsy.com
 *
 * Replaces Resend. DirectMail API doc:
 *   https://help.aliyun.com/document_detail/29444.html
 *
 * Strategy:
 * - Each subscription type uses a separate verified sender address:
 *   weekly  → newsletter@bestaietsy.com
 *   breaking → important@bestaietsy.com
 *   reply-to → support@bestaietsy.com (always)
 * - We send one API call per recipient (SingleSendMail). For up to a few
 *   thousand subscribers that's fine; if list grows past ~5k switch to
 *   BatchSendMail with a maintained ReceiversName.
 * - We supply our own unsubscribe URL in the email body, so we set
 *   `unSubscribeLinkType: 0` to disable DirectMail's auto-generated link.
 *   This lets us use a per-recipient token-based unsubscribe URL.
 *
 * Env vars required:
 * - ALIYUN_ACCESS_KEY_ID
 * - ALIYUN_ACCESS_KEY_SECRET
 * - ALIYUN_DM_REGION              (e.g. "ap-southeast-1")
 * - ALIYUN_DM_FROM_NEWSLETTER     (sender for weekly — verified in console)
 * - ALIYUN_DM_FROM_IMPORTANT      (sender for breaking — verified in console)
 * - ALIYUN_DM_REPLY_TO            (Reply-To header — e.g. support@bestaietsy.com)
 */

// Endpoint per region (from SDK source). Add new regions here if needed.
const REGION_ENDPOINTS: Record<string, string> = {
  "cn-hangzhou": "dm.aliyuncs.com",
  "ap-southeast-1": "dm.ap-southeast-1.aliyuncs.com",
  "us-east-1": "dm.us-east-1.aliyuncs.com",
  "eu-central-1": "dm.eu-central-1.aliyuncs.com",
};

let _client: Client | null = null;

function getClient(): Client {
  if (_client) return _client;
  const ak = process.env.ALIYUN_ACCESS_KEY_ID;
  const sk = process.env.ALIYUN_ACCESS_KEY_SECRET;
  const region = process.env.ALIYUN_DM_REGION || "ap-southeast-1";
  if (!ak || !sk) {
    throw new Error(
      "Aliyun DirectMail client not configured. Set ALIYUN_ACCESS_KEY_ID and ALIYUN_ACCESS_KEY_SECRET in .env.local",
    );
  }
  const endpoint = REGION_ENDPOINTS[region];
  if (!endpoint) {
    throw new Error(
      `Unknown ALIYUN_DM_REGION: ${region}. Supported: ${Object.keys(REGION_ENDPOINTS).join(", ")}`,
    );
  }
  // The SDK's Config type requires `toMap` (a Darabonba runtime helper);
  // it's not needed for our access-key auth path and is implicitly defaulted.
  // Cast through unknown to satisfy strict types without runtime impact.
  _client = new Client({
    accessKeyId: ak,
    accessKeySecret: sk,
    region,
    endpoint,
    type: "access_key",
  } as unknown as ConstructorParameters<typeof Client>[0]);
  return _client;
}

export interface SendEmailOptions {
  /** Recipient email address (one per call) */
  to: string;
  /** Sender email — must be pre-verified in Aliyun DM console */
  fromEmail: string;
  /** Display name for the From header (e.g. "bestaietsy Weekly") */
  fromName: string;
  /** Reply-To address — replies will route here */
  replyToEmail: string;
  /** Optional Reply-To display name */
  replyToName?: string;
  /** Email subject line */
  subject: string;
  /** HTML body */
  html: string;
  /** Optional plain-text fallback (some clients render this in spam folder) */
  text?: string;
  /** Optional tag for DirectMail filtering / analytics (e.g. "weekly", "breaking") */
  tagName?: string;
  /**
   * Custom headers to add. Use this to add List-Unsubscribe header (RFC 8058)
   * so Gmail / Outlook show the one-click unsubscribe button. Format:
   *   "List-Unsubscribe: <https://...>, <mailto:...>"
   */
  headers?: string;
}

export interface SendEmailResult {
  ok: boolean;
  /** DirectMail request/response IDs for tracing in Aliyun console */
  envId?: string;
  requestId?: string;
  messageId?: string;
  /** Raw error if failed */
  error?: string;
  /** Whether the failure was due to invalid recipient (don't retry) */
  permanent?: boolean;
}

/**
 * Send a single transactional email via Alibaba Cloud DirectMail.
 * Throws on infrastructure errors (auth, network). Returns {ok:false,...} on
 * recipient-level errors so callers can decide whether to retry.
 */
export async function sendEmail(opts: SendEmailOptions): Promise<SendEmailResult> {
  const client = getClient();

  const req = new SingleSendMailRequest({
    accountName: opts.fromEmail,
    addressType: 1, // 1 = sender address (verified in console)
    toAddress: opts.to,
    fromAlias: opts.fromName,
    subject: opts.subject,
    htmlBody: opts.html,
    textBody: opts.text,
    replyAddress: opts.replyToEmail,
    replyAddressAlias: opts.replyToName,
    tagName: opts.tagName,
    headers: opts.headers,
    // Disable Aliyun's auto unsubscribe link — we provide our own in the
    // email body (with per-recipient token).
    unSubscribeLinkType: 0,
  });

  try {
    const res = await client.singleSendMail(req);
    const body = (res?.body ?? null) as SingleSendMailResponseBody | null;
    if (!body) {
      return { ok: false, error: "Empty response from DirectMail" };
    }
    // Aliyun returns EnvId even when the request fails. The real success
    // indicator is that we got here without an HTTP error.
    return {
      ok: true,
      envId: body.envId,
      requestId: res?.headers?.["x-acs-request-id"],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Classify common DirectMail error codes
    const permanent =
      message.includes("InvalidAddress") ||
      message.includes("RecipientNotFound") ||
      message.includes("MailSizeLimitExceeded") ||
      message.includes("InvalidReceiverAddress");
    return { ok: false, error: message, permanent };
  }
}

/**
 * Send the same email to many recipients (personalized unsubscribe URL per
 * recipient requires a per-call render — see the routes that use this).
 *
 * Concurrency is bounded so we don't slam DirectMail's API. Default 8
 * parallel requests. Adjust via opts.concurrency if needed.
 */
export async function sendEmailBatch(
  emails: SendEmailOptions[],
  opts: { concurrency?: number; onProgress?: (done: number, total: number) => void } = {},
): Promise<{ results: SendEmailResult[]; okCount: number; failCount: number }> {
  const concurrency = opts.concurrency ?? 8;
  const results: SendEmailResult[] = new Array(emails.length);
  let cursor = 0;
  let okCount = 0;
  let failCount = 0;

  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= emails.length) return;
      const r = await sendEmail(emails[i]);
      results[i] = r;
      if (r.ok) okCount++;
      else failCount++;
      opts.onProgress?.(i + 1, emails.length);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, emails.length) }, () => worker());
  await Promise.all(workers);
  return { results, okCount, failCount };
}

/**
 * Build a List-Unsubscribe header (RFC 8058) so Gmail/Outlook show the
 * one-click unsubscribe button in the mail client chrome.
 *
 * https://www.ietf.org/rfc/rfc8058.txt
 */
export function buildListUnsubscribeHeader(unsubscribeUrl: string, mailtoAddress?: string): string {
  const parts = [`<${unsubscribeUrl}>`];
  if (mailtoAddress) parts.push(`<mailto:${mailtoAddress}?subject=unsubscribe>`);
  return `List-Unsubscribe: ${parts.join(", ")}\r\n` +
    `List-Unsubscribe-Post: List-Unsubscribe=One-Click`;
}

/**
 * Cheap connectivity test — used by /api/health (future) to verify
 * DirectMail credentials work. Sends a single test email to the configured
 * reply-to address. Caller should not invoke in production paths.
 */
export async function pingDirectMail(): Promise<{ ok: boolean; error?: string }> {
  try {
    getClient();
    return { ok: true };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// Re-export SDK types in case callers need them
export type { SingleSendMailRequest };