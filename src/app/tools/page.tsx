import Link from "next/link";
import type { Metadata } from "next";
import { Star, ArrowRight, Wrench } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Tools for Etsy Sellers — Honest Reviews",
  description: "Browse AI tools tested for Etsy sellers. Roketfy, eRank, Midjourney, EtsyHunt, Alura — with pros, cons, pricing, and affiliate commissions.",
};

const CATEGORIES = [
  { value: "listing", label: "Listing Optimization", color: "primary" },
  { value: "seo", label: "SEO & Keywords", color: "accent" },
  { value: "pod", label: "POD Design", color: "mustard" },
  { value: "research", label: "Product Research", color: "coral" },
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
                      className="group bg-cream-50 border-2 border-cream-300 hover:border-primary-300 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-cream-50 font-bold text-2xl shrink-0 shadow-warm"
                          style={{ backgroundColor: tool.logoColor }}
                        >
                          {tool.logoInitial}
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
      </main>
      <SiteFooter />
    </>
  );
}