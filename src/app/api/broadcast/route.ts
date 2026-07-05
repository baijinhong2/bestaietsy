import { NextRequest, NextResponse } from "next/server";
import {
  getActiveSubscribers,
  type SubscriptionType,
} from "@/lib/supabase";
import { sendEmail, sendEmailBatch, buildListUnsubscribeHeader } from "@/lib/aliyun-dm";
import { resolveSender, buildUnsubscribeUrl } from "@/lib/email-config";
import { renderBroadcastEmail } from "@/emails/broadcast";

/**
 * POST /api/broadcast
 *
 * Body: { slug: string, title: string, description: string, type?: string }
 *
 * Auth: Bearer token via BROADCAST_API_SECRET env var
 *   (GitHub Actions sends this in Authorization header)
 *
 * Flow:
 * 1. Verify auth token
 * 2. Parse + validate body
 * 3. Fetch active BREAKING subscribers from Supabase
 *    (weekly subscribers get the digest instead, not broadcasts)
 * 4. Render per-recipient HTML (each gets a personalized unsubscribe URL)
 * 5. Send batch via Aliyun DirectMail
 *
 * Caller convention: GitHub Action `.github/workflows/notify-subscribers.yml`
 * extracts `important: true/false` from MDX frontmatter and only POSTs here
 * when an article is marked important. Default `important: false`.
 */

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.BROADCAST_API_SECRET;

    if (!expectedToken) {
      return NextResponse.json(
        { success: false, error: "BROADCAST_NOT_CONFIGURED" },
        { status: 500 },
      );
    }

    const providedToken = authHeader?.replace(/^Bearer\s+/i, "");
    if (providedToken !== expectedToken) {
      return NextResponse.json(
        { success: false, error: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    // 2. Parse body
    const body = await request.json().catch(() => ({}));
    const { slug, title, description, type } = body ?? {};

    if (
      typeof slug !== "string" ||
      typeof title !== "string" ||
      typeof description !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "BAD_REQUEST" },
        { status: 400 },
      );
    }

    if (!slug || !title || !description) {
      return NextResponse.json(
        { success: false, error: "MISSING_FIELDS" },
        { status: 400 },
      );
    }

    // 3. Fetch active BREAKING subscribers from Supabase
    const subscribers = await getActiveSubscribers("breaking");

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "No active breaking-news subscribers in Supabase.",
        slug,
      });
    }

    // 4. Build per-recipient broadcast payload
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bestaietsy.com";
    const subject = `🚨 ${title}`;
    const sender = resolveSender("breaking");

    const emails = subscribers.map((sub) => {
      const html = renderBroadcastEmail({
        siteUrl,
        email: sub.email,
        slug,
        title,
        description,
        type: type || "article",
      });
      const unsubscribeUrl = buildUnsubscribeUrl(siteUrl, sub.email, "breaking");
      const headers = buildListUnsubscribeHeader(
        unsubscribeUrl,
        `${sender.replyToEmail}?subject=unsubscribe`,
      );
      return {
        to: sub.email,
        fromEmail: sender.fromEmail,
        fromName: sender.fromName,
        replyToEmail: sender.replyToEmail,
        subject,
        html,
        tagName: "breaking-news" as const,
        headers,
      };
    });

    // 5. Send batch
    const { okCount, failCount } = await sendEmailBatch(emails, {
      concurrency: 8,
    });

    return NextResponse.json({
      success: true,
      slug,
      recipientCount: subscribers.length,
      okCount,
      failCount,
    });
  } catch (error) {
    console.error("POST /api/broadcast error:", error);
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