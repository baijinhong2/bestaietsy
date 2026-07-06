import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://bestaietsy.com";

  // Block specific AI scrapers. We split into one rule per User-Agent because
  // Next.js's MetadataRoute.Robots serialization joins `userAgent: string[]` into
  // adjacent "User-Agent:" lines without repeating the disallow, producing
  // malformed output that real bots can't match.
  //
  // To unblock AI training later: remove this `aiBlockers` array entirely.
  const aiBlockers = [
    "CCBot",         // Common Crawl (used to train many AI models)
    "GPTBot",        // OpenAI
    "PerplexityBot", // Perplexity AI
    "ClaudeBot",     // Anthropic
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...aiBlockers.map((bot) => ({
        userAgent: bot,
        disallow: "/" as const,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}