import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // bestaietsy uses next-mdx-remote (loaded at runtime in MDXRemote component),
  // no special MDX webpack config needed for App Router.

  // Allow images from any HTTPS source (for tool logos, OG images)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },

  // Site metadata for SEO
  experimental: {
    // Enable typed routes for better TS support (Next.js 15 stable feature)
  },

  // Disable telemetry (we run locally + Vercel auto-disables)
  productionBrowserSourceMaps: false,
};

export default nextConfig;