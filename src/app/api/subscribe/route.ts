import { NextRequest, NextResponse } from "next/server";
import {
  upsertContact,
  getResend,
  getFromAddress,
  getSiteUrl,
} from "@/lib/resend";
import { renderWelcomeEmail } from "@/emails/welcome";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-process rate limit (same pattern as drawspark)
const recentSubscribes = new Map<string, number>();
const SUBSCRIBE_COOLDOWN_MS = 30_000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body ?? {};

    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "EMAIL_INVALID" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Rate limit per email
    const lastSub = recentSubscribes.get(normalizedEmail) ?? 0;
    if (Date.now() - lastSub < SUBSCRIBE_COOLDOWN_MS) {
      return NextResponse.json(
        { success: false, error: "RATE_LIMITED" },
        { status: 429 },
      );
    }

    // 1. Upsert contact to Resend Audience
    await upsertContact(normalizedEmail);

    // 2. Send welcome email
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "EMAIL_SEND_FAILED" },
        { status: 500 },
      );
    }
    const resend = getResend();
    const siteUrl = getSiteUrl();
    const { error: emailError } = await resend.emails.send({
      from: getFromAddress(),
      to: normalizedEmail,
      subject: "Welcome to bestaietsy 👋",
      html: renderWelcomeEmail({ siteUrl }),
    });

    if (emailError) {
      console.error("Resend welcome email error:", emailError);
      return NextResponse.json(
        { success: false, error: "EMAIL_SEND_FAILED" },
        { status: 500 },
      );
    }

    recentSubscribes.set(normalizedEmail, Date.now());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}