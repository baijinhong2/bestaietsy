/**
 * Welcome email template — sent when user subscribes to the WEEKLY digest
 *
 * Sender: newsletter@bestaietsy.com (Reply-To support@bestaietsy.com)
 * Triggered by: POST /api/subscribe with types: ["weekly"]
 *
 * Plain HTML string (Aliyun DirectMail accepts HTML directly)
 *
 * Brand: bestaietsy.com
 * Colors: orange #F1641E, brown #3E2815 (text), cream #FFF8EC (bg), green #3D7052 (trust)
 */

interface WelcomeEmailProps {
  siteUrl: string;
  email: string;
}

export function renderWelcomeEmail({ siteUrl, email }: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to bestaietsy</title>
</head>
<body style="margin:0;padding:0;background:#FFFCF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#3E2815;">

  <!-- Outer wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FFFCF7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#FFFCF7;border:1px solid #E4CDB4;border-radius:14px;overflow:hidden;">

          <!-- Header: orange gradient + flame logo -->
          <tr>
            <td style="background:linear-gradient(135deg,#F1641E 0%,#FFA171 100%);padding:32px 24px;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <!-- Inline flame logo -->
                    <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="weO" x1="50%" y1="100%" x2="50%" y2="0%">
                          <stop offset="0%" stop-color="#FFE5D4"/><stop offset="100%" stop-color="#FFFCF7"/>
                        </linearGradient>
                      </defs>
                      <path d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z" fill="url(#weO)"/>
                      <path d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z" fill="#FFE5A0" opacity="0.9"/>
                      <path d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z" fill="#F1641E"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:900;color:#FFFCF7;">bestaietsy</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px;">
              <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;color:#3E2815;margin:0 0 16px;font-weight:700;">Welcome 👋</h1>
              <p style="color:#55371E;line-height:1.6;margin:0 0 20px;font-size:15px;">
                You're in. Every Tuesday morning, you'll get:
              </p>

              <!-- Three value bullets in colored cards -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0 0 24px;">
                <tr>
                  <td width="33%" style="padding:6px;">
                    <div style="background:#FFF1D9;border:1px solid #FFA171;border-radius:10px;padding:14px 10px;text-align:center;">
                      <div style="font-size:22px;margin-bottom:6px;">📋</div>
                      <div style="color:#8B5E36;font-weight:600;font-size:13px;">1 article</div>
                      <div style="color:#A37545;font-size:11px;margin-top:2px;">curated AI tools</div>
                    </div>
                  </td>
                  <td width="33%" style="padding:6px;">
                    <div style="background:#EDF4EE;border:1px solid #7DAB89;border-radius:10px;padding:14px 10px;text-align:center;">
                      <div style="font-size:22px;margin-bottom:6px;">💡</div>
                      <div style="color:#234431;font-weight:600;font-size:13px;">1 tip</div>
                      <div style="color:#2F5A41;font-size:11px;margin-top:2px;">actionable this week</div>
                    </div>
                  </td>
                  <td width="33%" style="padding:6px;">
                    <div style="background:#FFE5D4;border:1px solid #F26A57;border-radius:10px;padding:14px 10px;text-align:center;">
                      <div style="font-size:22px;margin-bottom:6px;">⚠️</div>
                      <div style="color:#B23E0C;font-weight:600;font-size:13px;">1 alert</div>
                      <div style="color:#8C310A;font-size:11px;margin-top:2px;">policy changes</div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- This week's pick -->
              <div style="background:#FFF8EC;border-left:4px solid #F1641E;padding:16px;margin:0 0 24px;border-radius:8px;">
                <p style="margin:0 0 8px;font-weight:600;color:#3E2815;font-size:13px;">📌 This week's pick:</p>
                <p style="margin:0;color:#55371E;font-size:14px;line-height:1.5;">
                  Etsy's 8/11 Animal Fur Policy — 6 weeks left for vintage sellers.
                  <a href="${siteUrl}/policies/etsy-8-11-fur-policy" style="color:#F1641E;font-weight:600;text-decoration:none;">Read the action plan →</a>
                </p>
              </div>

              <p style="color:#55371E;margin:24px 0 4px;font-size:14px;">Talk soon,</p>
              <p style="color:#3E2815;font-weight:600;margin:0;font-size:14px;">The bestaietsy team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF5F0;padding:18px 24px;text-align:center;font-size:12px;color:#8B5E36;border-top:1px solid #E4CDB4;">
              <a href="${siteUrl}/privacy-policy" style="color:#F1641E;text-decoration:none;">Privacy</a> · <a href="${siteUrl}/affiliate-disclosure" style="color:#F1641E;text-decoration:none;">Affiliate Disclosure</a><br />
              <span style="color:#A37545;margin-top:6px;display:inline-block;">You're getting this because you subscribed at bestaietsy.com.</span><br />
              <a href="${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&list=weekly" style="color:#8B5E36;text-decoration:underline;font-size:11px;">Unsubscribe from weekly</a>
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