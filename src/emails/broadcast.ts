/**
 * Broadcast email template — sent on every new article publish
 *
 * Triggered by: GitHub Action POST /api/broadcast
 *
 * Variants:
 * - T1 Policy Interpretation → coral alert header
 * - T2 Tool Review → mustard highlight header
 * - T3-T7 → cream default header
 */

interface BroadcastEmailProps {
  siteUrl: string;
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
  slug,
  title,
  description,
  type = "article",
}: BroadcastEmailProps): string {
  const badge = TYPE_BADGE[type] ?? TYPE_BADGE.T1;
  const articleUrl = `${siteUrl}/blog/${slug}`;

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

          <!-- Header: type-specific colored bar -->
          <tr>
            <td style="background:linear-gradient(135deg,${badge.bg} 0%,#FFFCF7 100%);padding:24px;border-bottom:3px solid ${badge.border};">
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
              <a href="${siteUrl}/api/unsubscribe?email={email}" style="color:#8B5E36;text-decoration:underline;font-size:11px;display:inline-block;margin-top:6px;">Unsubscribe</a>
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