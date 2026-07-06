import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://bestaietsy.com";

  // Block AI training crawlers (so your content isn't fed to train the next
  // model). DO NOT add PerplexityBot / OAI-SearchBot / Claude-User — those are
  // search-engine bots that cite sources and send referral traffic. They inherit
  // the default `User-Agent: *` Allow rule above.
  //
  // To unblock all AI training: remove this `aiTrainingBlockers` array entirely.
  const aiTrainingBlockers = [
    "CCBot",           // Common Crawl (powers many AI training datasets)
    "GPTBot",          // OpenAI training crawler
    "ClaudeBot",       // Anthropic training crawler
    "Google-Extended", // Google Gemini training (separate from Google Search)
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...aiTrainingBlockers.map((bot) => ({
        userAgent: bot,
        disallow: "/" as const,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}