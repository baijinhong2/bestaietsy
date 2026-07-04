export interface Tool {
  slug: string;
  name: string;
  category: "listing" | "seo" | "photo" | "pod" | "pricing" | "research";
  description: string;
  longDescription: string;
  pricing: string;
  pricingModel: "free" | "freemium" | "subscription";
  startingPrice: string;
  freeTrial: string;
  rating: number;
  bestFor: string[];
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  commission: string;
  affiliateType: "lifetime" | "recurring" | "first-year";
  homepage: string;
  logoColor: string;
  logoInitial: string;
}

/**
 * Tools data — sourced from daily-content-agent/data/affiliate-links.md
 * Used for /tools index and /tools/[slug] pages
 */
export const TOOLS: Tool[] = [
  {
    slug: "roketfy",
    name: "Roketfy",
    category: "listing",
    description: "AI-powered Etsy listing optimizer with built-in policy compliance checker.",
    longDescription:
      "Roketfy is the most comprehensive AI listing tool for Etsy sellers. Its AI Writer can rewrite 100+ vintage fur listings into faux fur, leather, or wool alternatives in 2-3 hours. Built-in Listing Checker scans your entire shop for policy-violating keywords (perfect for Etsy's 8/11 fur policy compliance). Best for shops with 50+ listings.",
    pricing: "$4.99 - $49 / month",
    pricingModel: "subscription",
    startingPrice: "$4.99/mo",
    freeTrial: "7 days",
    rating: 4.8,
    bestFor: ["50+ listings", "Bulk policy compliance", "AI rewriting"],
    pros: [
      "AI Writer handles bulk rewriting (100+ listings in hours, not days)",
      "Listing Checker flags policy-violating keywords automatically",
      "30% lifetime commission via affiliate link",
    ],
    cons: [
      "Cheaper plans limit monthly AI credits",
      "UI can feel overwhelming at first",
    ],
    affiliateUrl: "https://roketfy.com/?ref=bestaietsy",
    commission: "30% lifetime",
    affiliateType: "lifetime",
    homepage: "https://roketfy.com",
    logoColor: "#7C3AED",
    logoInitial: "R",
  },
  {
    slug: "erank",
    name: "eRank",
    category: "seo",
    description: "Etsy SEO and keyword research tool. Free tier available.",
    longDescription:
      "eRank is the OG Etsy SEO tool. Keyword Explorer finds what shoppers actually search for (e.g. 'faux fur vintage coat' search volume). Listing Audit identifies which existing listings can be quickly optimized for new keywords. Competitor Analysis shows how successful sellers position their products. Free tier is generous.",
    pricing: "Free - $19.99 / month",
    pricingModel: "freemium",
    startingPrice: "Free",
    freeTrial: "Free tier",
    rating: 4.6,
    bestFor: ["All sellers", "Keyword research", "Free tools"],
    pros: [
      "Generous free tier covers most sellers' needs",
      "Most accurate Etsy keyword data",
      "25% recurring commission",
    ],
    cons: [
      "Premium features require paid plan",
      "Less AI assistance than Roketfy",
    ],
    affiliateUrl: "https://erank.com/?ref=bestaietsy",
    commission: "25% recurring",
    affiliateType: "recurring",
    homepage: "https://erank.com",
    logoColor: "#0EA5E9",
    logoInitial: "e",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    category: "pod",
    description: "AI image generation for POD designs and product mockups.",
    longDescription:
      "Midjourney is the gold standard for AI image generation. Etsy sellers use it for POD t-shirt designs, poster art, digital downloads, and product mockups. With /imagine prompts, you can create vintage-style designs (without animal imagery) for hundreds of products in an afternoon. v7 introduced better text rendering and consistency.",
    pricing: "$10 - $120 / month",
    pricingModel: "subscription",
    startingPrice: "$10/mo",
    freeTrial: "No free tier",
    rating: 4.9,
    bestFor: ["POD designs", "Digital downloads", "Product mockups"],
    pros: [
      "Best-in-class image quality",
      "Image variations generate 100+ designs from one prompt",
      "Mockup tools apply designs to t-shirts, totes, posters",
    ],
    cons: [
      "No free tier (Discord-only access)",
      "Steeper learning curve than Canva AI",
    ],
    affiliateUrl: "https://midjourney.com/?ref=bestaietsy",
    commission: "10-20% tiered",
    affiliateType: "recurring",
    homepage: "https://midjourney.com",
    logoColor: "#1F2937",
    logoInitial: "M",
  },
  {
    slug: "etsyhunt",
    name: "EtsyHunt",
    category: "research",
    description: "Etsy product research and competitor analysis tool.",
    longDescription:
      "EtsyHunt helps you find winning products by analyzing top sellers, revenue estimates, and trends. Chrome extension shows sales data on Etsy listing pages. Database of 30M+ Etsy listings. Best for sellers doing product research before launching new listings.",
    pricing: "$9.99 - $49.99 / month",
    pricingModel: "subscription",
    startingPrice: "$9.99/mo",
    freeTrial: "7 days",
    rating: 4.5,
    bestFor: ["Product research", "Competitor analysis", "Trend spotting"],
    pros: [
      "Sales estimates reveal which products actually sell",
      "Chrome extension overlays data on Etsy pages",
      "30% recurring commission",
    ],
    cons: [
      "Sales data is estimated, not exact",
      "Free trial is limited",
    ],
    affiliateUrl: "https://etsyhunt.com/?ref=bestaietsy",
    commission: "30% recurring",
    affiliateType: "recurring",
    homepage: "https://etsyhunt.com",
    logoColor: "#F97316",
    logoInitial: "E",
  },
  {
    slug: "alura",
    name: "Alura",
    category: "seo",
    description: "All-in-one Etsy seller toolkit with AI helpers.",
    longDescription:
      "Alura combines keyword research, listing helper, profit calculator, and Chrome extension in one tool. AI description generator writes SEO-optimized listings in 30 seconds. Profit calculator factors in Etsy fees, shipping, and materials. Good Roketfy alternative at lower price point.",
    pricing: "$9.99 - $39.99 / month",
    pricingModel: "subscription",
    startingPrice: "$9.99/mo",
    freeTrial: "7 days",
    rating: 4.4,
    bestFor: ["All-in-one toolkit", "Profit tracking", "Beginners"],
    pros: [
      "Combines 5+ tools in one subscription",
      "AI description generator",
      "30% recurring commission",
    ],
    cons: [
      "Less specialized than dedicated SEO tools",
      "Smaller keyword database than eRank",
    ],
    affiliateUrl: "https://alura.com/?ref=bestaietsy",
    commission: "30% recurring",
    affiliateType: "recurring",
    homepage: "https://alura.com",
    logoColor: "#10B981",
    logoInitial: "A",
  },
];

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getToolBySlug(slug: string): Tool | null {
  return TOOLS.find((t) => t.slug === slug) ?? null;
}

export function getToolsByCategory(category: Tool["category"]): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}