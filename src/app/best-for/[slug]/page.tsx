import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeoSections } from "@/components/seo/SeoSections";
import { getAllTools, getToolBySlug } from "@/lib/tools";
import {
  getShopTypeBySlug,
  SHOP_TYPES,
  SHOP_TYPE_CONTENT,
  type ShopTypeSlug,
} from "@/lib/shop-types";
import { tdkToMetadata, faqJsonLd, jsonLdScript } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Static generation for all 6 known shop types
export async function generateStaticParams() {
  return Object.keys(SHOP_TYPES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const shopSlug = getShopTypeBySlug(slug);
  if (!shopSlug) return {};
  const content = SHOP_TYPE_CONTENT[shopSlug];
  const tdk = tdkToMetadata(content) ?? {};
  return {
    ...tdk,
    alternates: { canonical: `https://bestaietsy.com/best-for/${slug}` },
    openGraph: {
      title: tdk.title as string,
      description: tdk.description as string,
      url: `https://bestaietsy.com/best-for/${slug}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: tdk.title as string }],
    },
  };
}

export default async function ShopTypePage({ params }: PageProps) {
  const { slug } = await params;
  const shopSlug = getShopTypeBySlug(slug);
  if (!shopSlug) {
    notFound();
  }

  const meta = SHOP_TYPES[shopSlug];
  const content = SHOP_TYPE_CONTENT[shopSlug];

  // Resolve recommended tools (skip silently if a tool is removed)
  const allTools = getAllTools();
  const recommended = meta.recommendedTools
    .map((t) => allTools.find((tool) => tool.slug === t))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // Sibling shop types (for cross-linking)
  const related = meta.relatedTypes
    .map((s) => SHOP_TYPES[s])
    .slice(0, 3);

  // TDK for JSON-LD FAQPage (for GEO)
  const faqLd = faqJsonLd(content) ?? {};

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <div className="bg-cream-100 border-b border-cream-300 -mx-6 px-6 py-3 mb-8 flex items-center gap-2 text-xs text-brown-600 font-mono">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/best-for" className="hover:text-primary-600">Best for your shop</Link>
            <span>/</span>
            <span className="text-primary-600">{meta.shortTitle}</span>
          </div>

          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-coral-500" />
              <p className="font-mono text-xs text-coral-600 uppercase tracking-widest">
                Best AI tools for {meta.shortTitle.toLowerCase()}
              </p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-brown-900 mb-3 max-w-4xl">
              {meta.title}
            </h1>
            <p className="text-xl text-brown-700 max-w-3xl leading-relaxed mb-4">
              {meta.description}
            </p>
            <p className="text-sm text-brown-600 font-mono">
              <strong className="text-brown-900">Profile:</strong> {meta.profile}
            </p>
          </div>

          {/* Recommended tools — visual cards */}
          {recommended.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-brown-900 mb-5">
                Tools we recommend for {meta.shortTitle.toLowerCase()}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {recommended.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group bg-cream-50 border-2 border-cream-300 hover:border-coral-300 rounded-2xl p-5 transition shadow-warm-sm hover:shadow-warm"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-cream-100"
                        style={{ backgroundColor: tool.logo ? `${tool.logoColor}1A` : tool.logoColor }}
                      >
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain p-1.5"
                          />
                        ) : (
                          <span className="text-cream-50 font-bold text-lg">{tool.logoInitial}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-bold text-brown-900 group-hover:text-coral-600 transition">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-brown-600 line-clamp-2">{tool.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-brown-600">{tool.startingPrice}</span>
                      <span className="text-coral-600 font-semibold">{tool.commission}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* If you also sell... cross-link */}
          {related.length > 0 && (
            <section className="mb-12 bg-coral-50 border-2 border-coral-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-coral-600" />
                <p className="font-mono text-xs text-coral-700 uppercase tracking-widest font-semibold">
                  If you also sell in a related niche
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/best-for/${r.slug}`}
                    className="group bg-white border border-coral-200 rounded-xl p-3 hover:border-coral-400 transition"
                  >
                    <p className="font-display text-sm font-bold text-brown-900 group-hover:text-coral-600 transition">
                      {r.shortTitle}
                    </p>
                    <p className="text-xs text-brown-600 line-clamp-1">{r.oneLiner}</p>
                    <span className="text-xs text-coral-600 mt-1 inline-flex items-center gap-1">
                      See picks <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SEO content sections */}
        <section className="mt-12 pt-12 border-t-4 border-cream-200">
          <div className="mx-auto max-w-6xl px-6">
            <SeoSections content={content} />
          </div>
        </section>

        {/* FAQ structured data for GEO (AI search engines) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}