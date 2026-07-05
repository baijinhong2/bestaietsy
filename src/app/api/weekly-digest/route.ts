import { NextRequest, NextResponse } from "next/server";
import {
  getActiveSubscribers,
  type SubscriptionType,
} from "@/lib/supabase";
import { sendEmail, sendEmailBatch, buildListUnsubscribeHeader } from "@/lib/aliyun-dm";
import { resolveSender, buildUnsubscribeUrl } from "@/lib/email-config";
import { renderWeeklyDigestEmail } from "@/emails/weekly-digest";
import { getAllArticles } from "@/lib/articles";

/**
 * POST /api/weekly-digest
 *
 * Triggered by: GitHub Action `.github/workflows/weekly-digest.yml`
 *               (cron: every Tuesday 13:00 UTC = 9am EDT / 6am PDT)
 *
 * Auth: Bearer token via BROADCAST_API_SECRET env var
 *
 * Flow:
 * 1. Verify auth token
 * 2. Query all articles published in the past 7 days
 * 3. If 0 articles, return early (no email — quiet week)
 * 4. Fetch active weekly subscribers from Supabase
 * 5. Render per-recipient HTML (each gets a personalized unsubscribe URL)
 * 6. Send batch via Aliyun DirectMail (concurrency-limited)
 * 7. Return summary: total / ok / fail / skipped-recipients
 */

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * ONE_DAY_MS;

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

    // 2. Compute the 7-day window
    const now = new Date();
    const cutoff = new Date(now.getTime() - WEEK_MS);

    // 3. Query articles from past 7 days
    const allArticles = getAllArticles();
    const recentArticles = allArticles.filter((a) => {
      const published = new Date(a.date);
      return published >= cutoff && published <= now;
    });

    // 4. If no articles, skip
    if (recentArticles.length === 0) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "No articles published in the past 7 days.",
        weekStart: cutoff.toISOString().slice(0, 10),
        weekEnd: now.toISOString().slice(0, 10),
      });
    }

    // 5. Fetch active subscribers from Supabase
    const subscribers = await getActiveSubscribers("weekly");

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: "No active weekly subscribers in Supabase.",
        articleCount: recentArticles.length,
        weekStart: cutoff.toISOString().slice(0, 10),
        weekEnd: now.toISOString().slice(0, 10),
      });
    }

    // 6. Build per-recipient digest payload
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bestaietsy.com";
    const weekStart = cutoff.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const weekEnd = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const articlePayload = recentArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
      type: a.type,
      category: a.category,
      date: a.date,
    }));

    const subject = `📅 This week on bestaietsy · ${weekStart}–${weekEnd}`;
    const sender = resolveSender("weekly");

    // 7. Build per-recipient emails
    const emails = subscribers.map((sub) => {
      const html = renderWeeklyDigestEmail({
        siteUrl,
        email: sub.email,
        articles: articlePayload,
        weekStart,
        weekEnd,
      });
      const unsubscribeUrl = buildUnsubscribeUrl(siteUrl, sub.email, "weekly");
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
        tagName: "weekly-digest" as const,
        headers,
      };
    });

    // 8. Send batch via DirectMail (8 parallel)
    const { results, okCount, failCount } = await sendEmailBatch(emails, {
      concurrency: 8,
    });

    // Log any permanent failures (bad addresses) for cleanup
    const permanentFailures = results.filter((r) => !r.ok && r.permanent);
    if (permanentFailures.length > 0) {
      console.warn(
        `weekly-digest: ${permanentFailures.length} permanent failures — consider auto-cleanup:`,
        permanentFailures.map((r) => r.error),
      );
    }

    return NextResponse.json({
      success: true,
      articleCount: recentArticles.length,
      recipientCount: subscribers.length,
      okCount,
      failCount,
      weekStart: cutoff.toISOString().slice(0, 10),
      weekEnd: now.toISOString().slice(0, 10),
    });
  } catch (error) {
    console.error("POST /api/weekly-digest error:", error);
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