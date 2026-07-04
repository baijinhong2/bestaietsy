import Link from "next/link";
import type { Metadata } from "next";
import { Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Best AI Tools for Your Etsy Shop",
  description: "AI tools picked for your specific Etsy shop type. Vintage, POD, jewelry, digital downloads — find what works for you.",
};

const AUDIENCES = [
  { slug: "vintage-sellers", title: "Vintage Sellers", icon: "🕰️", desc: "Selling clothing, accessories, or home items from past eras" },
  { slug: "pod-sellers", title: "POD (Print-on-Demand) Sellers", icon: "👕", desc: "T-shirts, mugs, posters — designs you don't manufacture" },
  { slug: "jewelry-sellers", title: "Jewelry Sellers", icon: "💎", desc: "Handmade jewelry, beads, metalwork" },
  { slug: "digital-sellers", title: "Digital Download Sellers", icon: "📄", desc: "Printables, templates, AI art, digital products" },
  { slug: "handmade-sellers", title: "Handmade Sellers", icon: "🧶", desc: "Crochet, candles, soap, woodwork" },
  { slug: "stay-at-home-moms", title: "Stay-at-Home Mom Side Hustlers", icon: "👶", desc: "Building a shop while raising kids — need fast, simple tools" },
];

export default function BestForPage() {
  const articles = getArticlesByCategory("best-for");

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-coral-500" />
              <p className="font-mono text-xs text-coral-600 uppercase tracking-widest">
                Tools picked for your shop
              </p>
            </div>
            <h1 className="font-display text-5xl font-black text-brown-900 mb-3">
              Best AI tools for your Etsy shop
            </h1>
            <p className="text-lg text-brown-700 max-w-2xl">
              Find tools we've recommended for specific Etsy shop types and seller profiles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {AUDIENCES.map((audience) => (
              <Link
                key={audience.slug}
                href={`/best-for/${audience.slug}`}
                className="group bg-cream-50 border-2 border-cream-300 hover:border-coral-300 rounded-2xl p-5 transition shadow-warm-sm hover:shadow-warm"
              >
                <div className="text-3xl mb-3">{audience.icon}</div>
                <h3 className="font-display text-lg font-bold text-brown-900 group-hover:text-coral-600 transition mb-1">
                  {audience.title}
                </h3>
                <p className="text-sm text-brown-700">{audience.desc}</p>
              </Link>
            ))}
          </div>

          {articles.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-brown-900 mb-6">
                Articles for your shop type
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group bg-cream-100 border-2 border-cream-300 hover:border-coral-300 rounded-2xl p-5 transition"
                  >
                    <h3 className="font-display text-lg font-bold text-brown-900 mb-2 group-hover:text-coral-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-sm text-brown-700 line-clamp-3">{article.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}