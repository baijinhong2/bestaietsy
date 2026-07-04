import { NextRequest, NextResponse } from "next/server";
import { createBroadcast, sendBroadcast, getSiteUrl } from "@/lib/resend";
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
 * 2. Create Resend Broadcast targeting audience
 * 3. Send broadcast to all subscribers
 *
 * Called by:
 * - GitHub Action on git push of new MDX
 * - Manual curl from author for testing / re-send
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

    // 3. Build email HTML
    const siteUrl = getSiteUrl();
    const html = renderBroadcastEmail({
      siteUrl,
      slug,
      title,
      description,
      type: type || "article",
    });

    const subject = `📰 New on bestaietsy: ${title}`;

    // 4. Create broadcast
    const broadcast = await createBroadcast({
      subject,
      html,
      name: `auto-${slug}`,
    });

    if (!broadcast?.id) {
      throw new Error("Broadcast created but no ID returned");
    }

    // 5. Send broadcast immediately
    await sendBroadcast(broadcast.id);

    return NextResponse.json({
      success: true,
      broadcastId: broadcast.id,
      slug,
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