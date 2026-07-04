import Link from "next/link";
import type { Metadata } from "next";
import { ScrollText, Calendar, AlertTriangle, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Etsy 2026 Policy Updates",
  description: "Etsy's 2026 policy changes explained for sellers. 8/11 animal fur policy, 6/2 children policy, Q1 seller cleanup. Action plans included.",
  alternates: { canonical: "https://bestaietsy.com/policies" },
  openGraph: {
    title: "Etsy 2026 Policy Updates",
    description: "Etsy's 2026 policy changes explained for sellers.",
    url: "https://bestaietsy.com/policies",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Etsy policy updates" }],
  },
};

export default function PoliciesPage() {
  const policies = getArticlesByCategory("policy");

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText className="w-5 h-5 text-mustard-500" />
              <p className="font-mono text-xs text-mustard-500 uppercase tracking-widest">
                {policies.length} active {policies.length === 1 ? "policy" : "policies"}
              </p>
            </div>
            <h1 className="font-display text-5xl font-black text-brown-900 mb-3">
              Etsy 2026 policy updates
            </h1>
            <p className="text-lg text-brown-700 max-w-2xl">
              We track every Etsy policy change and break down what it means for sellers. Each article includes an action plan.
            </p>
          </div>

          {/* Featured policy alert */}
          <div className="bg-coral-50 border-2 border-coral-300 rounded-2xl p-6 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-coral-500 text-cream-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-mono text-xs text-coral-600 uppercase tracking-wider mb-1">
                Most urgent
              </p>
              <h2 className="font-display text-2xl font-bold text-brown-900 mb-2">
                8/11 Animal Fur Policy takes effect
              </h2>
              <p className="text-brown-700 mb-3">
                Etsy's full ban on animal fur — including vintage — takes effect August 11, 2026. Vintage sellers have 6 weeks to clean inventory or pivot.
              </p>
              <Link
                href="/blog/etsy-8-11-animal-fur-policy"
                className="inline-flex items-center gap-1 text-primary-700 font-semibold hover:text-primary-800"
              >
                Read the seller action plan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Policy articles */}
          {policies.length === 0 ? (
            <div className="text-center py-20 bg-cream-100 rounded-2xl border-2 border-dashed border-brown-200">
              <p className="text-brown-600 mb-2 font-display text-xl">
                No policy articles yet.
              </p>
              <p className="text-sm text-brown-500">
                Add MDX files with <code className="font-mono text-primary-600">category: policy</code> in frontmatter.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {policies.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}