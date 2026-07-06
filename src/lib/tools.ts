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
  /**
   * Affiliate link to the tool's site.
   *
   * - string: live affiliate URL with `?ref=bestaietsy` (or vendor's param)
   * - null: affiliate not yet configured. CTA will show "Read our review" or
   *         "Coming soon" instead of linking out.
   *
   * To add an affiliate link later: replace `null` with the live URL.
   */
  affiliateUrl: string | null;
  /**
   * Whether the affiliate URL is a `rel="sponsored"` outbound (for FTC compliance).
   * Always true for live affiliate links; ignored when affiliateUrl is null.
   */
  affiliateActive: boolean;
  commission: string;
  affiliateType: "lifetime" | "recurring" | "first-year";
  homepage: string;
  /**
   * Path under /public for the official tool logo (SVG preferred, PNG fallback).
   * When set, renderers display this image instead of the colored-letter fallback.
   * Keep in sync with files under public/images/tools/.
   */
  logo: string;
  /**
   * Square brand color used as fallback when `logo` is missing or still loading.
   * Also serves as the visual anchor for the logo background in dark contexts.
   */
  logoColor: string;
  /**
   * Single-letter fallback rendered inside the colored square when `logo` is missing.
   */
  logoInitial: string;
  /**
   * Marketing tag shown next to commission, e.g. "30% OFF via us"
   * Set when commission is configured (even if affiliateUrl is null,
   * to signal that an offer exists).
   */
  hasOffer?: boolean;
}

/**
 * Tools data — affiliate links to be configured by site owner.
 * When user adds a real affiliate URL, change `affiliateUrl: null`
 * to the live URL and set `affiliateActive: true`.
 *
 * Source for commission rates: daily-content-agent/data/affiliate-links.md
 */
export const TOOLS: Tool[] = [
  {
    slug: "roketfy",
    name: "Roketfy",
    category: "listing",
    description: "AI-powered Etsy listing optimizer with built-in policy compliance checker. Honest 2026 review covers pricing, AI Writer quality, and how it compares to eRank and EtsyHunt for high-volume sellers.",
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
    affiliateUrl: null,
    affiliateActive: false,
    commission: "30% lifetime",
    affiliateType: "lifetime",
    hasOffer: true,
    homepage: "https://roketfy.com",
    logo: "/images/tools/roketfy-logo.svg",
    logoColor: "#7C3AED",
    logoInitial: "R",
  },
  {
    slug: "erank",
    name: "eRank",
    category: "seo",
    description: "eRank is the gold-standard free Etsy SEO and keyword research tool. 2026 review covers Listing Audit, Keyword Explorer, competitor analysis, free-tier limits, and how it stacks up vs Roketfy and Alura.",
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
    affiliateUrl: null,
    affiliateActive: false,
    commission: "25% recurring",
    affiliateType: "recurring",
    hasOffer: true,
    homepage: "https://erank.com",
    logo: "/images/tools/erank-logo.svg",
    logoColor: "#0EA5E9",
    logoInitial: "e",
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    category: "pod",
    description: "Midjourney is the leading AI image generator used by Etsy POD and digital-download sellers for product designs. 2026 review covers v7 pricing, commercial-license terms, prompt tips, and mockup workflow for Etsy listings.",
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
    affiliateUrl: null,
    affiliateActive: false,
    commission: "N/A — no public affiliate program (verified 2026-07-05)",
    affiliateType: "recurring",
    hasOffer: true,
    homepage: "https://midjourney.com",
    logo: "/images/tools/midjourney-logo.svg",
    logoColor: "#1F2937",
    logoInitial: "M",
  },
  {
    slug: "etsyhunt",
    name: "EtsyHunt",
    category: "research",
    description: "EtsyHunt is an Etsy product research and competitor analysis tool with sales estimates, trend tracking, and a Chrome extension. 2026 review covers pricing tiers, data accuracy, niche-discovery workflow, and how it compares to eRank and Roketfy.",
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
    affiliateUrl: null,
    affiliateActive: false,
    commission: "30% recurring",
    affiliateType: "recurring",
    hasOffer: true,
    homepage: "https://etsyhunt.com",
    logo: "/images/tools/etsyhunt-favicon-256.png",
    logoColor: "#F97316",
    logoInitial: "E",
  },
  {
    slug: "alura",
    name: "Alura",
    category: "seo",
    description: "Alura is an all-in-one Etsy seller toolkit combining AI helpers, keyword research, profit calculator, and a Chrome extension. 2026 review covers pricing tiers, AI description quality, profit-tracking features, and how it compares to eRank and Roketfy.",
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
    affiliateUrl: null,
    affiliateActive: false,
    commission: "30% recurring",
    affiliateType: "recurring",
    hasOffer: true,
    homepage: "https://alura.com",
    logo: "/images/tools/alura-logo.svg",
    logoColor: "#10B981",
    logoInitial: "A",
  },
  {
    slug: "simplified",
    name: "Simplified",
    category: "pod",
    description: "AI design + content platform with Etsy-friendly templates and shop policy generator.",
    longDescription:
      "Simplified combines an AI writer, image generator, video editor, and social media scheduler in one app. Etsy sellers use it for branded product photos, shop policy templates, and bulk listing descriptions. Policy generator is the best we've tested for non-legal shop policy drafts.",
    pricing: "Free - $30 / month",
    pricingModel: "freemium",
    startingPrice: "Free",
    freeTrial: "Free tier",
    rating: 4.3,
    bestFor: ["Shop policies", "Bulk descriptions", "Branded images"],
    pros: [
      "Best policy-template generator we tested",
      "Combines 4+ tools in one subscription",
      "40% recurring commission",
    ],
    cons: [
      "Image generator is weaker than Midjourney",
      "Free tier has usage caps",
    ],
    affiliateUrl: null,
    affiliateActive: false,
    commission: "40% recurring",
    affiliateType: "recurring",
    hasOffer: true,
    homepage: "https://simplified.com",
    logo: "/images/tools/simplified-logo.svg",
    logoColor: "#7C3AED",
    logoInitial: "S",
  },
  {
    slug: "originality-ai",
    name: "Originality.ai",
    category: "pricing",
    description: "Originality.ai is the highest-accuracy AI-content detector (~99% per 3rd-party tests). Etsy sellers use it before publishing to make sure AI-drafted listings pass Etsy's 2026 quality filters. 2026 review covers pricing, accuracy, and whether sellers actually need it.",
    longDescription:
      "Originality.ai is the most accurate AI-content detector on the market. Etsy sellers who use ChatGPT or Simplified to draft descriptions run them through Originality before publishing to make sure Etsy's 2026 quality filters won't flag them. Also useful for verifying that POD designs aren't AI-generated stock.",
    pricing: "$30 - $100 / month",
    pricingModel: "subscription",
    startingPrice: "$30/mo",
    freeTrial: "10 free credits",
    rating: 4.2,
    bestFor: ["AI content check", "Quality assurance", "Bulk verification"],
    pros: [
      "Highest accuracy AI detector (~99% in 3rd-party tests)",
      "10 free credits to start",
      "25% first-year commission",
    ],
    cons: [
      "Credits-based pricing gets expensive at scale",
      "False positives on heavily-edited human content",
    ],
    affiliateUrl: null,
    affiliateActive: false,
    commission: "25% first-year",
    affiliateType: "first-year",
    hasOffer: true,
    homepage: "https://originality.ai",
    logo: "/images/tools/originality-ai-logo-256.png",
    logoColor: "#1E40AF",
    logoInitial: "O",
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

/**
 * Get live (configured) affiliate URLs.
 * Used by analytics / affiliate disclosure / where-we-link-out audit.
 */
export function getLiveAffiliateTools(): Tool[] {
  return TOOLS.filter((t) => t.affiliateActive && t.affiliateUrl);
}