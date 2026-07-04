import { Resend } from "resend";

/**
 * Resend client + audience helpers for bestaietsy.com
 *
 * Flow:
 * 1. User submits email via /api/subscribe
 *    → upsert to Resend Audience "bestaietsy-subscribers"
 *    → send welcome email via resend.emails.send
 *
 * 2. Author publishes new article (git push)
 *    → GitHub Action POSTs to /api/broadcast
 *    → create Resend Broadcast targeting the audience
 *    → resend.broadcasts.send() broadcasts to all subscribers
 *
 * Env vars required:
 * - RESEND_API_KEY       (from resend.com dashboard)
 * - RESEND_AUDIENCE_ID   (create one in Resend dashboard, e.g. "bestaietsy-subscribers")
 * - NEXT_PUBLIC_SITE_URL (e.g. https://bestaietsy.com)
 */

// Lazy-init to avoid build-time evaluation (same pattern as drawspark)
export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export function getAudienceId(): string {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) {
    throw new Error("RESEND_AUDIENCE_ID is not set");
  }
  return id;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://bestaietsy.com";
}

export function getFromAddress(): string {
  // Recommended: use a subdomain like hello@mg.bestaietsy.com (set up in Resend dashboard)
  // Fallback: shared onboarding domain (works for first 100 emails)
  return process.env.RESEND_FROM_EMAIL || "bestaietsy <hello@bestaietsy.com>";
}

// === Subscribe ===

export async function upsertContact(email: string, firstName?: string) {
  const resend = getResend();
  const audienceId = getAudienceId();

  // Resend Contacts API: create (will dedupe by email)
  const { data, error } = await resend.contacts.create({
    email: email.toLowerCase().trim(),
    firstName: firstName || undefined,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    // If contact already exists, that's fine — treat as success
    if (error.message?.includes("already exists")) {
      return { ok: true, deduped: true };
    }
    throw new Error(`Resend contact error: ${error.message}`);
  }

  return { ok: true, deduped: false, contactId: data?.id };
}

// === Broadcast (auto-send on new article) ===

export async function createBroadcast(opts: {
  subject: string;
  html: string;
  name?: string;
}) {
  const resend = getResend();

  const { data, error } = await resend.broadcasts.create({
    audienceId: getAudienceId(),
    from: getFromAddress(),
    subject: opts.subject,
    html: opts.html,
    name: opts.name, // internal name for tracking
  });

  if (error) {
    throw new Error(`Resend broadcast create error: ${error.message}`);
  }

  return data;
}

export async function sendBroadcast(broadcastId: string) {
  const resend = getResend();
  const { data, error } = await resend.broadcasts.send(broadcastId);
  if (error) {
    throw new Error(`Resend broadcast send error: ${error.message}`);
  }
  return data;
}