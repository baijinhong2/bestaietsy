import type { Metadata } from "next";
import { getTdk, getFaq, type SeoContent } from "./types";

/**
 * Convert a SeoContent TDK block into Next.js Metadata.
 * Returns null if there's no TDK block.
 */
export function tdkToMetadata(content: SeoContent): Metadata | null {
  const tdk = getTdk(content);
  if (!tdk) return null;

  return {
    // title.absolute bypasses any parent title.template (avoids "| brand | brand" duplicates)
    title: {
      absolute: tdk.title_i18n,
    },
    description: tdk.description_i18n,
    keywords: tdk.keywords_i18n
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    openGraph: {
      title: tdk.title_i18n,
      description: tdk.description_i18n,
      type: "website",
    },
  };
}

/**
 * Build a FAQPage JSON-LD structured data payload from a SeoContent FAQ block.
 * Critical for GEO (Generative Engine Optimization) — AI search engines
 * like ChatGPT, Perplexity, Gemini use this to extract clean Q&A.
 */
export function faqJsonLd(content: SeoContent): Record<string, unknown> | null {
  const faq = getFaq(content);
  if (!faq) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.content.map((item) => ({
      "@type": "Question",
      name: item.title_i18n,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.description_i18n,
      },
    })),
  };
}

/**
 * Helper to render JSON-LD as a Next.js <Script type="application/ld+json">.
 */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}