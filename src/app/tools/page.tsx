import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Star, ArrowRight, Wrench, Hourglass, DollarSign } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeoSections } from "@/components/seo/SeoSections";
import { getAllTools } from "@/lib/tools";
import { toolsSeoContent } from "@/lib/seo/content/tools";
import { tdkToMetadata, faqJsonLd, jsonLdScript } from "@/lib/seo/metadata";

const tdkMeta = tdkToMetadata(toolsSeoContent) ?? {};
export const metadata: Metadata = {
  ...tdkMeta,
  alternates: { canonical: "https://bestaietsy.com/tools" },
  openGraph: {
    title: tdkMeta.title as string,
    description: tdkMeta.description as string,
    url: "https://bestaietsy.com/tools",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "bestaietsy tools" }],
  },
};

const CATEGORIES = [
  { value: "listing", label: "Listing Optimization", color: "primary" },
  { value: "seo", label: "SEO & Keywords", color: "accent" },
  { value: "pod", label: "POD Design", color: "mustard" },
  { value: "research", label: "Product Research", color: "coral" },
  { value: "pricing", label: "AI Detection", color: "primary" },
];

export default function ToolsIndexPage() {
  const tools = getAllTools();

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-accent-600" />
              <p className="font-mono text-xs text-accent-700 uppercase tracking-widest">
                {tools.length} tools reviewed
              </p>
            </div>
            <h1 className="font-display text-5xl font-black text-brown-900 mb-3">
              AI tools for Etsy sellers
            </h1>
            <p className="text-lg text-brown-700 max-w-2xl">
              Honest reviews of the tools we use ourselves. We only list tools we've tested personally with real Etsy listings.
            </p>
          </div>

          {CATEGORIES.map((cat) => {
            const categoryTools = tools.filter((t) => t.category === cat.value);
            if (categoryTools.length === 0) return null;

            return (
              <section key={cat.value} className="mb-12">
                <h2 className="font-display text-2xl font-bold text-brown-900 mb-5">
                  {cat.label}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group bg-cream-50 border-2 border-cream-300 hover:border-primary-300 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm relative"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-warm overflow-hidden bg-cream-100"
                          style={{ backgroundColor: tool.logo ? `${tool.logoColor}1A` : tool.logoColor }}
                        >
                          {tool.logo ? (
                            <Image
                              src={tool.logo}
                              alt={`${tool.name} logo`}
                              width={56}
                              height={56}
                              className="w-14 h-14 object-contain p-2"
                            />
                          ) : (
                            <span className="text-cream-50 font-bold text-2xl">{tool.logoInitial}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-bold text-brown-900 group-hover:text-primary-700 transition">
                            {tool.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i <= Math.round(tool.rating)
                                    ? "fill-mustard-400 text-mustard-400"
                                    : "text-brown-200"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-brown-600 ml-1">
                              {tool.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-brown-700 leading-relaxed mb-4 line-clamp-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-cream-300">
                        <span className="text-sm font-mono font-semibold text-brown-900">
                          {tool.startingPrice}
                        </span>
                        <span className="text-xs font-semibold text-primary-600">
                          {tool.commission} via us
                        </span>
                      </div>
                      <p className="mt-2 text-[10px] text-brown-500 leading-tight">
                        Same price for you — vendor pays bestaietsy the commission.
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary-600">
                        Read review <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* How bestaietsy is funded — transparent disclosure */}
        <section className="mt-16 bg-cream-50 border-2 border-cream-300 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-accent-600" />
            <p className="font-mono text-xs text-accent-700 uppercase tracking-widest font-semibold">
              How bestaietsy is funded
            </p>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-brown-900 mb-4 max-w-3xl">
            Free for readers. Vendor-paid. No ads.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-brown-800 leading-relaxed">
            <div>
              <p className="mb-3">
                <strong>bestaietsy doesn't run ads and doesn't sell your data.</strong> Our
                only revenue is affiliate commissions from the tools we review — the
                vendor pays us a small percentage when you sign up through our link.
                You pay the same price either way (we get the kickback, you don't pay
                more).
              </p>
              <p className="text-sm text-brown-700">
                Commission rates we earn are listed on each tool card. They range from
                10% (Midjourney) to 40% (Simplified) depending on the vendor's program.
                Rates shown are based on each vendor's publicly published affiliate
                program and are subject to change when you sign up for an account.
              </p>
            </div>
            <div className="bg-white border border-cream-300 rounded-xl p-5">
              <p className="font-bold text-brown-900 mb-2">What your clicks would fund:</p>
              <ul className="space-y-1.5 text-sm text-brown-700">
                <li className="flex items-baseline gap-2">
                  <span className="text-accent-600 font-mono">$5–15/mo</span>
                  <span>Domain + hosting + Vercel</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-accent-600 font-mono">$30/mo</span>
                  <span>Content research subscriptions</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-accent-600 font-mono">$20/mo</span>
                  <span>Coffee for whoever's writing</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-brown-600 italic">
                Current status: affiliate links are pending — we don't earn anything
                yet. We'll update this when the first commission lands.
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm text-brown-700">
            <Link href="/affiliate-disclosure" className="font-semibold text-primary-600 hover:text-primary-700 underline">
              Read the full FTC-compliant affiliate disclosure →
            </Link>
          </p>
        </section>

        {/* SEO content sections */}
        <section className="mt-20 pt-16 border-t-4 border-cream-200">
          <div className="mx-auto max-w-6xl px-6">
            <SeoSections content={toolsSeoContent} />
          </div>
        </section>

        {/* FAQ structured data for GEO (AI search engines) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(toolsSeoContent) ?? {}) }}
        />
      </main>
      <SiteFooter />
    </>
  );
}