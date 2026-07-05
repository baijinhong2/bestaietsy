/**
 * Welcome email — BREAKING NEWS list
 * Sent when user subscribes to the breaking-news audience
 *
 * Sender: important@bestaietsy.com (Reply-To support@bestaietsy.com)
 * Triggered by: POST /api/subscribe with types: ["breaking"]
 *
 * Tone: rare but urgent. Different from weekly digest.
 * Brand: bestaietsy.com
 * Colors: orange #F1641E, brown #3E2815 (text), cream #FFFCF7 (bg), red #C9280C (urgency)
 */

interface WelcomeBreakingEmailProps {
  siteUrl: string;
  email: string;
}

export function renderWelcomeBreakingEmail({
  siteUrl,
  email,
}: WelcomeBreakingEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the bestaietsy breaking news list</title>
</head>
<body style="margin:0;padding:0;background:#FFFCF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#3E2815;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FFFCF7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#FFFCF7;border:1px solid #E4CDB4;border-radius:14px;overflow:hidden;">

          <!-- Header: urgent red→orange gradient + flame logo (same flame as welcome.ts) -->
          <tr>
            <td style="background:linear-gradient(135deg,#C9280C 0%,#F1641E 60%,#FFA171 100%);padding:32px 24px;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <!-- Inline flame logo (identical to welcome.ts) -->
                    <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="bnFlame" x1="50%" y1="100%" x2="50%" y2="0%">
                          <stop offset="0%" stop-color="#FFE5D4"/><stop offset="100%" stop-color="#FFFCF7"/>
                        </linearGradient>
                      </defs>
                      <path d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z" fill="url(#bnFlame)"/>
                      <path d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z" fill="#FFE5A0" opacity="0.9"/>
                      <path d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z" fill="#F1641E"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:900;color:#FFFCF7;">bestaietsy</span>
                  </td>
                </tr>
              </table>
              <div style="margin-top:14px;display:inline-block;background:rgba(255,252,247,0.18);border:1px solid rgba(255,252,247,0.35);border-radius:999px;padding:5px 14px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;color:#FFFCF7;text-transform:uppercase;">
                🚨 Breaking News List
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px;">
              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;color:#3E2815;margin:0 0 16px;font-weight:700;">You're on the alert list 🚨</h1>
              <p style="color:#55371E;line-height:1.6;margin:0 0 20px;font-size:15px;">
                Thanks for signing up. Here's the deal:
              </p>

              <!-- Frequency promise -->
              <div style="background:#FFF1D9;border-left:4px solid #F1641E;padding:16px 18px;margin:0 0 22px;border-radius:8px;">
                <p style="margin:0 0 6px;font-weight:700;color:#3E2815;font-size:14px;">We email only when it matters.</p>
                <p style="margin:0;color:#55371E;font-size:13.5px;line-height:1.55;">
                  Roughly <strong>1&ndash;3 emails per month</strong>, only when Etsy ships a policy change, a major platform update, or something that affects your shop revenue. No roundups, no filler.
                </p>
              </div>

              <!-- What triggers an email -->
              <p style="font-weight:600;color:#3E2815;font-size:14px;margin:0 0 10px;">What you'll hear about:</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0 0 22px;">
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align:top;padding-right:10px;color:#C9280C;font-weight:700;font-size:16px;line-height:1.4;">&#x2022;</td>
                        <td style="color:#55371E;font-size:14px;line-height:1.5;">
                          <strong>Etsy policy changes</strong> &mdash; new rules, banned items, fee updates.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align:top;padding-right:10px;color:#C9280C;font-weight:700;font-size:16px;line-height:1.4;">&#x2022;</td>
                        <td style="color:#55371E;font-size:14px;line-height:1.5;">
                          <strong>Platform outages &amp; bugs</strong> &mdash; when the Etsy site itself is broken.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="vertical-align:top;padding-right:10px;color:#C9280C;font-weight:700;font-size:16px;line-height:1.4;">&#x2022;</td>
                        <td style="color:#55371E;font-size:14px;line-height:1.5;">
                          <strong>Major AI tool shifts</strong> &mdash; when an AI tool we cover pivots or shuts down.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 22px;">
                <tr>
                  <td align="center" bgcolor="#F1641E" style="border-radius:10px;">
                    <a href="${siteUrl}/etsy-policies" target="_blank"
                       style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;font-weight:700;color:#FFFCF7;text-decoration:none;">
                      Browse the policy hub &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#8B5E36;margin:22px 0 4px;font-size:13.5px;">
                Want the full weekly roundup too? <a href="${siteUrl}/#subscribe" style="color:#F1641E;font-weight:600;text-decoration:none;">Subscribe to the weekly digest &rarr;</a>
              </p>

              <p style="color:#55371E;margin:22px 0 4px;font-size:14px;">Stay sharp,</p>
              <p style="color:#3E2815;font-weight:600;margin:0;font-size:14px;">The bestaietsy team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF5F0;padding:18px 24px;text-align:center;font-size:12px;color:#8B5E36;border-top:1px solid #E4CDB4;">
              <a href="${siteUrl}/privacy-policy" style="color:#F1641E;text-decoration:none;">Privacy</a> · <a href="${siteUrl}/cookie-policy" style="color:#F1641E;text-decoration:none;">Cookies</a><br />
              <span style="color:#A37545;margin-top:6px;display:inline-block;">You're getting this because you subscribed to the breaking news list at bestaietsy.com.</span><br />
              <a href="${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&list=breaking" style="color:#8B5E36;text-decoration:underline;font-size:11px;">Unsubscribe from breaking news</a>
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