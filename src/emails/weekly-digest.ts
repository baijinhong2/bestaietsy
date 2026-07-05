/**
 * Weekly digest email — sent every Tuesday at fixed cron time
 * Contains all articles published in the past 7 days, regardless of importance.
 *
 * Triggered by: GitHub Action `.github/workflows/weekly-digest.yml`
 * Calls: POST /api/weekly-digest (server reads articles, builds digest, sends via Aliyun DirectMail)
 *
 * Sender: newsletter@bestaietsy.com (Reply-To support@bestaietsy.com)
 *
 * Tone: curated roundup. Friendly, breezy. Same brand voice as welcome.ts.
 * Brand: bestaietsy.com
 */

interface DigestArticle {
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
}

interface WeeklyDigestEmailProps {
  siteUrl: string;
  /** Per-recipient email — used for the personalized unsubscribe URL. */
  email: string;
  articles: DigestArticle[];
  weekStart: string; // e.g. "Jul 1"
  weekEnd: string;   // e.g. "Jul 7"
}

const TYPE_BADGE: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  T1: { label: "POLICY",  color: "#B23E0C", bg: "#FFE5D4", border: "#F26A57", icon: "⚠️" },
  T2: { label: "REVIEW",  color: "#B88A1F", bg: "#FCF6E5", border: "#E8C04D", icon: "🛠️" },
  T3: { label: "COMPARE", color: "#2F5A41", bg: "#EDF4EE", border: "#7DAB89", icon: "⚖️" },
  T4: { label: "BEST",    color: "#234431", bg: "#EDF4EE", border: "#5A8D68", icon: "✨" },
  T5: { label: "GUIDE",   color: "#8B5E36", bg: "#FFF1D9", border: "#BC8F5E", icon: "📖" },
  T6: { label: "PILLAR",  color: "#B23E0C", bg: "#FFE5D4", border: "#FFA171", icon: "🏛️" },
  T7: { label: "FAQ",     color: "#8B5E36", bg: "#FAF5F0", border: "#D2AE89", icon: "💬" },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderWeeklyDigestEmail({
  siteUrl,
  email,
  articles,
  weekStart,
  weekEnd,
}: WeeklyDigestEmailProps): string {
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&list=weekly`;
  const articleCards = articles
    .map((article) => {
      const badge = TYPE_BADGE[article.type] ?? TYPE_BADGE.T5;
      const articleUrl = `${siteUrl}/blog/${article.slug}`;
      return `
        <tr>
          <td style="padding:0 0 16px;">
            <div style="border:2px solid ${badge.border};border-radius:12px;padding:18px;background:#FFFCF7;">
              <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:${badge.color};letter-spacing:1px;margin:0 0 8px;font-weight:600;">
                ${badge.icon} ${badge.label}
              </p>
              <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:18px;color:#3E2815;margin:0 0 8px;font-weight:700;line-height:1.3;">
                <a href="${articleUrl}" style="color:#3E2815;text-decoration:none;">${escapeHtml(article.title)}</a>
              </h3>
              <p style="color:#55371E;line-height:1.55;margin:0 0 14px;font-size:13.5px;">
                ${escapeHtml(article.description)}
              </p>
              <a href="${articleUrl}" style="display:inline-block;background:#F1641E;color:#FFFCF7;padding:9px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;">
                Read →
              </a>
            </div>
          </td>
        </tr>`;
    })
    .join("");

  const count = articles.length;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weekly Etsy AI Digest — ${weekStart} to ${weekEnd}</title>
</head>
<body style="margin:0;padding:0;background:#FFFCF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#3E2815;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FFFCF7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#FFFCF7;border:1px solid #E4CDB4;border-radius:14px;overflow:hidden;">

          <!-- Header: orange gradient + flame logo (identical to welcome.ts) -->
          <tr>
            <td style="background:linear-gradient(135deg,#F1641E 0%,#FFA171 100%);padding:32px 24px;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <!-- Inline flame logo (identical to welcome.ts) -->
                    <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="wdFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                          <stop offset="0%" stop-color="#FFE5D4"/><stop offset="100%" stop-color="#FFFCF7"/>
                        </linearGradient>
                      </defs>
                      <path d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z" fill="url(#wdFlame)"/>
                      <path d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z" fill="#FFE5A0" opacity="0.9"/>
                      <path d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z" fill="#F1641E"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:900;color:#FFFCF7;">bestaietsy</span>
                  </td>
                </tr>
              </table>
              <div style="margin-top:14px;display:inline-block;background:rgba(255,252,247,0.2);border:1px solid rgba(255,252,247,0.35);border-radius:999px;padding:5px 14px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;color:#FFFCF7;text-transform:uppercase;">
                📅 Weekly Digest
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px;">
              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:26px;color:#3E2815;margin:0 0 6px;font-weight:700;">
                This week on bestaietsy
              </h1>
              <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#8B5E36;letter-spacing:1.5px;margin:0 0 20px;">
                ${escapeHtml(weekStart)} – ${escapeHtml(weekEnd)} · ${count} ${count === 1 ? "article" : "articles"}
              </p>

              <p style="color:#55371E;line-height:1.6;margin:0 0 24px;font-size:15px;">
                Your curated Etsy AI roundup for the week. Click into whichever one matches what your shop needs right now.
              </p>

              ${
                count === 0
                  ? `<div style="background:#FFF1D9;border:2px dashed #BC8F5E;border-radius:12px;padding:24px;text-align:center;">
                       <p style="margin:0;color:#8B5E36;font-size:14px;line-height:1.6;">
                         🌴 Quiet week — no new articles published. We&apos;re prepping big stuff for next Tuesday.
                       </p>
                       <p style="margin:14px 0 0;color:#A37545;font-size:13px;">
                         <a href="${siteUrl}/blog" style="color:#F1641E;text-decoration:none;font-weight:600;">Browse past articles →</a>
                       </p>
                     </div>`
                  : `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                       ${articleCards}
                     </table>`
              }

              <!-- Closing tip -->
              ${
                count > 0
                  ? `<div style="background:#EDF4EE;border-left:4px solid #3D7052;border-radius:8px;padding:14px;margin:24px 0 0;">
                       <p style="margin:0 0 4px;font-weight:600;color:#234431;font-size:13px;">💡 This week&apos;s tip:</p>
                       <p style="margin:0;color:#2F5A41;font-size:13px;line-height:1.55;">
                         Read the most relevant one to your shop today — these build on each other, but pick one, apply it, then come back for the next.
                       </p>
                     </div>`
                  : ""
              }

              <p style="color:#55371E;margin:24px 0 4px;font-size:14px;">See you next Tuesday,</p>
              <p style="color:#3E2815;font-weight:600;margin:0;font-size:14px;">The bestaietsy team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF5F0;padding:18px 24px;text-align:center;font-size:12px;color:#8B5E36;border-top:1px solid #E4CDB4;">
              <a href="${siteUrl}/blog" style="color:#F1641E;text-decoration:none;">All articles</a> ·
              <a href="${siteUrl}/privacy-policy" style="color:#F1641E;text-decoration:none;">Privacy</a> ·
              <a href="${siteUrl}/affiliate-disclosure" style="color:#F1641E;text-decoration:none;">Affiliate Disclosure</a><br />
              <span style="color:#A37545;margin-top:6px;display:inline-block;">You&apos;re getting this because you subscribed to the weekly digest at bestaietsy.com.</span><br />
              <a href="${unsubscribeUrl}" style="color:#8B5E36;text-decoration:underline;font-size:11px;">Unsubscribe from weekly</a>
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