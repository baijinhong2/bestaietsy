import { NextRequest, NextResponse } from "next/server";
import {
  unsubscribe as dbUnsubscribe,
  getSubscriberByToken,
  getSupabaseAdmin,
  type SubscriptionType,
  ALL_SUBSCRIPTION_TYPES,
} from "@/lib/supabase";

/**
 * GET /api/unsubscribe?email=...&list=weekly|breaking|all
 *  OR /api/unsubscribe?email=...&list=weekly&token=<uuid>
 *
 * Sets the user's preference in Supabase and returns a small
 * confirmation HTML page. No auth required — the magic-link pattern
 * assumes the recipient owns the email they received.
 *
 * Flow:
 * 1. Parse email + list
 * 2. If subscriber not in DB, just render success (don't leak which
 *    emails are subscribed)
 * 3. Update Supabase: set list_enabled=false for the requested lists
 * 4. Render a friendly confirmation page with re-subscribe link
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeList(input: string | null): SubscriptionType | "all" {
  if (input === "weekly" || input === "breaking" || input === "all") return input;
  return "all";
}

function successPage(email: string, list: string): string {
  const escapedEmail = email.replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Unsubscribed — bestaietsy</title>
<meta name="robots" content="noindex,nofollow" />
<style>
  body { margin: 0; padding: 40px 20px; background: #FFFCF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #3E2815; }
  .card { max-width: 520px; margin: 40px auto; background: #fff; border: 2px solid #E8DCC4; border-radius: 16px; padding: 40px 32px; box-shadow: 0 4px 12px rgba(62,40,21,0.06); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-size: 32px; margin: 0 0 12px; color: #3E2815; }
  p { line-height: 1.6; margin: 0 0 16px; color: #5C4530; }
  .email { font-family: 'SF Mono', Menlo, monospace; font-size: 13px; background: #FFF8EC; padding: 4px 8px; border-radius: 6px; color: #3E2815; }
  .btn { display: inline-block; margin-top: 8px; padding: 12px 24px; background: #F1641E; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 14px; }
  .btn:hover { background: #D8510F; }
  .btn.secondary { background: transparent; color: #F1641E; border: 2px solid #F1641E; margin-left: 8px; }
  .btn.secondary:hover { background: #FFF1E5; }
  .meta { font-size: 12px; color: #8B6B4F; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DCC4; }
</style>
</head>
<body>
  <div class="card">
    <h1>You're unsubscribed ✅</h1>
    <p>We've stopped sending <strong>${list === "all" ? "all bestaietsy emails" : list + " emails"}</strong> to <span class="email">${escapedEmail}</span>.</p>
    <p>Changed your mind? You can re-subscribe anytime:</p>
    <a href="https://bestaietsy.com#subscribe" class="btn">Re-subscribe</a>
    <a href="https://bestaietsy.com" class="btn secondary">Back to bestaietsy</a>
    <p class="meta">If this wasn't you, reply to any past email and we'll help. — bestaietsy team</p>
  </div>
</body>
</html>`;
}

function errorPage(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Unsubscribe — bestaietsy</title>
<meta name="robots" content="noindex,nofollow" />
<style>body{margin:0;padding:40px 20px;background:#FFFCF7;font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#3E2815;}.card{max-width:520px;margin:40px auto;background:#fff;border:2px solid #E8DCC4;border-radius:16px;padding:40px 32px;}h1{font-size:28px;margin:0 0 12px;}a{color:#F1641E;}</style>
</head>
<body><div class="card"><h1>Hmm, something's off</h1><p>${message}</p><p><a href="https://bestaietsy.com">← Back to bestaietsy</a></p></div></body></html>`;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const listParam = normalizeList(url.searchParams.get("list"));
  const token = url.searchParams.get("token");

  // Basic email validation
  if (!email || !EMAIL_RE.test(email.trim())) {
    return new NextResponse(errorPage("Missing or invalid email."), {
      status: 400,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // If token is present, verify it matches the subscriber before allowing
  // unsubscribe (otherwise attacker could unsubscribe anyone by URL).
  if (token) {
    try {
      const row = await getSubscriberByToken(token);
      if (!row || row.email !== normalizedEmail) {
        return new NextResponse(
          errorPage("Invalid unsubscribe token. Please use the link from your email."),
          { status: 403, headers: { "content-type": "text/html; charset=utf-8" } },
        );
      }
    } catch (err) {
      console.error("GET /api/unsubscribe token check failed:", err);
      return new NextResponse(errorPage("We couldn't verify your unsubscribe link. Try again later."), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }

  try {
    // Map "all" to disabling every list
    const types: SubscriptionType[] =
      listParam === "all" ? [...ALL_SUBSCRIPTION_TYPES] : [listParam];

    // Soft path: check existence first so we don't leak which emails are subscribed.
    const admin = getSupabaseAdmin();
    const { data: existing } = await admin
      .from("bestaietsy_subscribers")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      await dbUnsubscribe(normalizedEmail, types);
    }
    // If not existing: silently no-op (don't leak which emails are subscribed)

    return new NextResponse(successPage(normalizedEmail, listParam), {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error("GET /api/unsubscribe failed:", err);
    return new NextResponse(
      errorPage("Something went wrong on our end. Please try again or reply to any email."),
      { status: 500, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
}

/**
 * POST /api/unsubscribe — programmatic unsubscribe (e.g. from a JSON client).
 * Body: { email: string, list: "weekly"|"breaking"|"all", token?: string }
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = (body as { email?: string })?.email;
  const listParam = normalizeList((body as { list?: string })?.list ?? null);
  const token = (body as { token?: string })?.token;

  if (!email || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ success: false, error: "EMAIL_INVALID" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    if (token) {
      const { getSupabaseAdmin } = await import("@/lib/supabase");
      const admin = getSupabaseAdmin();
      const { data: row } = await admin
        .from("bestaietsy_subscribers")
        .select("email")
        .eq("unsubscribe_token", token)
        .maybeSingle();
      if (!row || row.email !== normalizedEmail) {
        return NextResponse.json({ success: false, error: "INVALID_TOKEN" }, { status: 403 });
      }
    }

    const types: SubscriptionType[] =
      listParam === "all" ? [...ALL_SUBSCRIPTION_TYPES] : [listParam];

    const admin = getSupabaseAdmin();
    const { data: existing } = await admin
      .from("bestaietsy_subscribers")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      await dbUnsubscribe(normalizedEmail, types);
    }

    return NextResponse.json({ success: true, list: listParam });
  } catch (err) {
    console.error("POST /api/unsubscribe failed:", err);
    return NextResponse.json(
      { success: false, error: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}