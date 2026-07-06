import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // bestaietsy uses next-mdx-remote (loaded at runtime in MDXRemote component),
  // no special MDX webpack config needed for App Router.

  // Allow images from any HTTPS source (for tool logos, OG images)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // Allow SVG logo optimization (logos are trusted internal assets only)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Hide X-Powered-By (info disclosure)
  poweredByHeader: false,

  // Security headers — applied to all routes
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // CSP — Allow Next.js + Tailwind inline styles, but block framing & 3rd-party scripts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline/eval for hydration
              "style-src 'self' 'unsafe-inline'", // Tailwind injects styles
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // Site metadata for SEO
  experimental: {
    // Enable typed routes for better TS support (Next.js 15 stable feature)
  },

  // Disable telemetry (we run locally + Vercel auto-disables)
  productionBrowserSourceMaps: false,
};

export default nextConfig;