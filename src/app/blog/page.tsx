import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all articles from bestaietsy — Etsy policy updates, AI tool reviews, and guides for Etsy sellers.",
};

export default function BlogIndexPage() {
  const articles = getAllArticles();

  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <p className="font-mono text-xs text-primary-700 uppercase tracking-widest">
                {articles.length} {articles.length === 1 ? "article" : "articles"}
              </p>
            </div>
            <h1 className="font-display text-5xl font-black text-brown-900 mb-3">
              All articles
            </h1>
            <p className="text-lg text-brown-700 max-w-2xl">
              Etsy policy updates, AI tool reviews, and step-by-step guides for Etsy sellers.
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 bg-cream-100 rounded-2xl border-2 border-dashed border-brown-200">
              <p className="text-brown-600 mb-2 font-display text-xl">
                No articles published yet.
              </p>
              <p className="text-sm text-brown-500">
                Add an MDX file to <code className="font-mono text-primary-600">content/articles/</code> to get started.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
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