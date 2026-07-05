import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import {
  upsertSubscriber,
  type SubscriptionType,
  ALL_SUBSCRIPTION_TYPES,
} from "@/lib/supabase";
import { sendEmail, buildListUnsubscribeHeader } from "@/lib/aliyun-dm";
import {
  resolveSenderForSubscription,
  buildUnsubscribeUrl,
  type EmailCategory,
} from "@/lib/email-config";
import { renderWelcomeEmail } from "@/emails/welcome";
import { renderWelcomeBreakingEmail } from "@/emails/welcome-breaking";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-process rate limit per email (same pattern as drawspark)
const recentSubscribes = new Map<string, number>();
const SUBSCRIBE_COOLDOWN_MS = 30_000;

function normalizeTypes(input: unknown): SubscriptionType[] {
  if (!Array.isArray(input) || input.length === 0) return ["weekly"];
  const filtered = input.filter(
    (t): t is SubscriptionType =>
      typeof t === "string" &&
      (ALL_SUBSCRIPTION_TYPES as string[]).includes(t),
  );
  return filtered.length > 0 ? filtered : ["weekly"];
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, types, firstName, source } = body ?? {};

    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "EMAIL_INVALID" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscriptionTypes = normalizeTypes(types);

    // Rate limit per email
    const lastSub = recentSubscribes.get(normalizedEmail) ?? 0;
    if (Date.now() - lastSub < SUBSCRIBE_COOLDOWN_MS) {
      return NextResponse.json(
        { success: false, error: "RATE_LIMITED" },
        { status: 429 },
      );
    }

    // 1. Capture audit metadata
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? request.headers.get("x-real-ip")
      ?? "unknown";
    const userAgent = request.headers.get("user-agent") || undefined;

    // 2. Upsert subscriber into Supabase (idempotent + preserves preferences)
    const { row, activeTypes } = await upsertSubscriber(
      normalizedEmail,
      subscriptionTypes,
      {
        firstName: typeof firstName === "string" ? firstName : undefined,
        source: typeof source === "string" ? source : undefined,
        ipHash: hashIp(ip),
        userAgent,
      },
    );

    // 3. Send welcome email(s) — one per subscription type they joined.
    //    If a user is already subscribed to weekly and opts into breaking,
    //    only send the new welcome (breaking-welcome).
    const newlyJoined: SubscriptionType[] = subscriptionTypes.filter(
      (t) => activeTypes.includes(t),
    );

    const sent: SubscriptionType[] = [];
    const failed: SubscriptionType[] = [];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bestaietsy.com";

    for (const type of newlyJoined) {
      const isWeekly = type === "weekly";
      const category: EmailCategory = isWeekly ? "weekly" : "breaking";
      const sender = resolveSenderForSubscription([type]);

      const subject = isWeekly
        ? "Welcome to bestaietsy 👋"
        : "You're on the breaking news list 🚨";

      const html = isWeekly
        ? renderWelcomeEmail({ siteUrl, email: normalizedEmail })
        : renderWelcomeBreakingEmail({ siteUrl, email: normalizedEmail });

      const unsubscribeUrl = buildUnsubscribeUrl(siteUrl, normalizedEmail, category);
      const listUnsubHeader = buildListUnsubscribeHeader(
        unsubscribeUrl,
        `${sender.replyToEmail}?subject=unsubscribe`,
      );

      const result = await sendEmail({
        to: normalizedEmail,
        fromEmail: sender.fromEmail,
        fromName: sender.fromName,
        replyToEmail: sender.replyToEmail,
        subject,
        html,
        tagName: `welcome-${category}`,
        headers: listUnsubHeader,
      });

      if (result.ok) {
        sent.push(type);
      } else {
        console.error(`Aliyun DM welcome email error (${type}):`, result.error);
        failed.push(type);
      }
    }

    if (sent.length === 0 && newlyJoined.length > 0) {
      return NextResponse.json(
        { success: false, error: "EMAIL_SEND_FAILED" },
        { status: 500 },
      );
    }

    recentSubscribes.set(normalizedEmail, Date.now());

    return NextResponse.json({
      success: true,
      types: subscriptionTypes,
      activeTypes,
      welcomeSent: sent,
      welcomeFailed: failed,
      // Token returned so the client can build an "manage preferences" UI later
      unsubscribeToken: row.unsubscribe_token,
    });
  } catch (error) {
    console.error("POST /api/subscribe error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}