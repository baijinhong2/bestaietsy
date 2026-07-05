/**
 * Broadcast email template — sent when an article is marked `important: true`
 *
 * Triggered by: GitHub Action POST /api/broadcast (only when frontmatter important=true)
 *
 * Sender: important@bestaietsy.com (Reply-To support@bestaietsy.com)
 * Audience: only subscribers with breaking_enabled = true (NOT weekly digest)
 *
 * Variants:
 * - T1 Policy Interpretation → coral alert header
 * - T2 Tool Review → mustard highlight header
 * - T3-T7 → cream default header
 */

interface BroadcastEmailProps {
  siteUrl: string;
  /** Per-recipient email — used for the personalized unsubscribe URL. */
  email: string;
  slug: string;
  title: string;
  description: string;
  type?: string;
}

const TYPE_BADGE: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  T1: { label: "POLICY ALERT",  color: "#B23E0C", bg: "#FFE5D4", border: "#F26A57", icon: "⚠️" },
  T2: { label: "TOOL REVIEW",   color: "#B88A1F", bg: "#FCF6E5", border: "#E8C04D", icon: "🛠️" },
  T3: { label: "COMPARISON",    color: "#2F5A41", bg: "#EDF4EE", border: "#7DAB89", icon: "⚖️" },
  T4: { label: "BEST FOR YOU",  color: "#234431", bg: "#EDF4EE", border: "#5A8D68", icon: "✨" },
  T5: { label: "TUTORIAL",      color: "#8B5E36", bg: "#FFF1D9", border: "#BC8F5E", icon: "📖" },
  T6: { label: "PILLAR GUIDE",  color: "#B23E0C", bg: "#FFE5D4", border: "#FFA171", icon: "🏛️" },
  T7: { label: "FAQ",           color: "#8B5E36", bg: "#FAF5F0", border: "#D2AE89", icon: "💬" },
};

export function renderBroadcastEmail({
  siteUrl,
  email,
  slug,
  title,
  description,
  type = "article",
}: BroadcastEmailProps): string {
  const badge = TYPE_BADGE[type] ?? TYPE_BADGE.T1;
  const articleUrl = `${siteUrl}/blog/${slug}`;
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&list=breaking`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#FFFCF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#3E2815;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FFFCF7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#FFFCF7;border:1px solid #E4CDB4;border-radius:14px;overflow:hidden;">

          <!-- Header: type-specific colored bar + unified flame logo -->
          <tr>
            <td style="background:linear-gradient(135deg,${badge.bg} 0%,#FFFCF7 100%);padding:24px;border-bottom:3px solid ${badge.border};">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 10px;">
                <tr>
                  <td style="vertical-align:middle;padding-right:8px;">
                    <!-- Unified flame logo (identical to welcome.ts + weekly-digest.ts) -->
                    <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="bcFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                          <stop offset="0%" stop-color="#FFE5D4"/><stop offset="100%" stop-color="#FFFCF7"/>
                        </linearGradient>
                      </defs>
                      <path d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z" fill="url(#bcFlame)"/>
                      <path d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z" fill="#FFE5A0" opacity="0.9"/>
                      <path d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z" fill="#F1641E"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:900;color:#3E2815;">bestaietsy</span>
                  </td>
                </tr>
              </table>
              <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:11px;color:${badge.color};letter-spacing:1.5px;margin:0 0 6px;font-weight:600;">
                ${badge.icon} ${badge.label}
              </p>
              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#3E2815;margin:0;font-weight:700;">
                New on bestaietsy
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px;">

              <!-- Date -->
              <p style="color:#8B5E36;margin:0 0 16px;font-size:13px;">
                ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>

              <!-- Article card -->
              <div style="border:2px solid ${badge.border};border-radius:12px;padding:20px;margin:0 0 20px;background:#FFFCF7;">
                <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${badge.color};letter-spacing:1px;margin:0 0 8px;font-weight:600;">
                  ${badge.icon} ${badge.label}
                </p>
                <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#3E2815;margin:0 0 10px;font-weight:700;line-height:1.3;">
                  ${escapeHtml(title)}
                </h2>
                <p style="color:#55371E;line-height:1.6;margin:0 0 16px;font-size:14px;">
                  ${escapeHtml(description)}
                </p>
                <a href="${articleUrl}" style="display:inline-block;background:#F1641E;color:#FFFCF7;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  Read the full article →
                </a>
              </div>

              <!-- Tip of the week -->
              <div style="background:#EDF4EE;border-left:4px solid #3D7052;border-radius:8px;padding:14px;margin:0 0 20px;">
                <p style="margin:0 0 4px;font-weight:600;color:#234431;font-size:13px;">💡 This week's tip:</p>
                <p style="margin:0;color:#2F5A41;font-size:13px;line-height:1.5;">
                  Save this email — our weekly articles build on each other. Skim, then deep-dive the one that matches your shop.
                </p>
              </div>

              <p style="color:#55371E;margin:20px 0 4px;font-size:14px;">Thanks for reading,</p>
              <p style="color:#3E2815;font-weight:600;margin:0;font-size:14px;">The bestaietsy team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF5F0;padding:16px 24px;text-align:center;font-size:12px;color:#8B5E36;border-top:1px solid #E4CDB4;">
              <a href="${siteUrl}/blog" style="color:#F1641E;text-decoration:none;">All articles</a> ·
              <a href="${siteUrl}/privacy" style="color:#F1641E;text-decoration:none;">Privacy</a> ·
              <a href="${siteUrl}/affiliate-disclosure" style="color:#F1641E;text-decoration:none;">Affiliate Disclosure</a><br />
              <a href="${unsubscribeUrl}" style="color:#8B5E36;text-decoration:underline;font-size:11px;display:inline-block;margin-top:6px;">Unsubscribe from breaking news</a>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// Minimal HTML escape for template values
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}