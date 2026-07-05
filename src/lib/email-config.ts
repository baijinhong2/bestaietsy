/**
 * Email sender / reply-to resolution by email type.
 *
 * Sender strategy:
 * - weekly digest → newsletter@bestaietsy.com (different address lets users
 *   filter "skip inbox" without losing breaking-news alerts)
 * - breaking news broadcast → important@bestaietsy.com (signals urgency)
 * - welcome email for a given subscription → matches the list the user just joined
 *
 * Reply-To is always support@bestaietsy.com so all replies route to one inbox.
 *
 * Each sender address must be separately verified in Alibaba Cloud
 * DirectMail console → 发信地址.
 */

import type { SubscriptionType } from "./supabase";

export type EmailCategory = "weekly" | "breaking";

export interface SenderResolution {
  /** Full From header value, e.g. "bestaietsy Weekly <newsletter@bestaietsy.com>" */
  from: string;
  /** Bare email for the From header (Aliyun DirectMail API takes this separately) */
  fromEmail: string;
  /** Display name for the From header */
  fromName: string;
  /** Reply-To bare email */
  replyToEmail: string;
}

function getEnv(name: string): string | undefined {
  return process.env[name];
}

function requireEnv(name: string): string {
  const v = getEnv(name);
  if (!v) {
    throw new Error(
      `Missing required env var: ${name}. ` +
        `Set it in .env.local — see README.md for setup steps.`,
    );
  }
  return v;
}

function splitEmail(localPart: string, displayName: string) {
  return {
    fromEmail: localPart,
    fromName: displayName,
    from: `${displayName} <${localPart}>`,
  };
}

/**
 * Resolve the sender for a given email category.
 * Throws if the corresponding env var is missing.
 */
export function resolveSender(category: EmailCategory): SenderResolution {
  const replyToEmail = requireEnv("ALIYUN_DM_REPLY_TO");

  if (category === "weekly") {
    const email = requireEnv("ALIYUN_DM_FROM_NEWSLETTER");
    const name = getEnv("ALIYUN_DM_FROM_NAME") || "bestaietsy Weekly";
    return { ...splitEmail(email, name), replyToEmail };
  }
  // breaking
  const email = requireEnv("ALIYUN_DM_FROM_IMPORTANT");
  const name = getEnv("ALIYUN_DM_FROM_NAME") || "bestaietsy Breaking News";
  return { ...splitEmail(email, name), replyToEmail };
}

/**
 * Convenience for the subscribe endpoint: pick the sender that matches the
 * newly-joined list. If a user joined both weekly and breaking, prefer
 * "weekly" (welcome flow always reads the welcome-weekly template anyway).
 */
export function resolveSenderForSubscription(types: SubscriptionType[]): SenderResolution {
  // If user explicitly opted into breaking only, use breaking sender.
  // Otherwise default to weekly sender.
  const sender = types.includes("breaking") && !types.includes("weekly")
    ? "breaking"
    : "weekly";
  return resolveSender(sender);
}

/**
 * Build a per-recipient unsubscribe URL with token + list params.
 * Email templates embed this so users can 1-click opt out.
 */
export function buildUnsubscribeUrl(siteUrl: string, email: string, list: EmailCategory | "all"): string {
  const u = new URL("/api/unsubscribe", siteUrl);
  u.searchParams.set("email", email);
  u.searchParams.set("list", list);
  return u.toString();
}