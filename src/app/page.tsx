import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText, Wrench, ScrollText, Users, CheckCircle, Hourglass } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EmailForm } from "@/components/EmailForm";
import { ArticleCard } from "@/components/ArticleCard";
import { getRecentArticles } from "@/lib/articles";
import { getAllTools } from "@/lib/tools";

export default function HomePage() {
  const articles = getRecentArticles(6);
  const tools = getAllTools().slice(0, 5);

  return (
    <>
      <SiteHeader />

      {/* Policy alert bar */}
      <div className="bg-coral-500 border-b-2 border-coral-600 text-cream-50">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Etsy's 8/11 Animal Fur Policy</strong> — 6 weeks left.{" "}
            <Link href="/blog/etsy-8-11-animal-fur-policy" className="underline font-semibold ml-1">
              Read the seller action plan →
            </Link>
          </span>
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 via-cream-50 to-cream-100 py-16">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="font-mono text-xs text-primary-700 uppercase tracking-widest mb-3">
                Free weekly newsletter · No spam
              </p>
              <h1 className="font-display text-5xl lg:text-6xl font-black leading-tight mb-6 text-brown-900">
                The AI toolkit for{" "}
                <span className="italic bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  smart Etsy sellers
                </span>
              </h1>
              <p className="text-lg text-brown-700 leading-relaxed mb-8">
                Etsy's 2026 policy changes, honest AI tool reviews, and weekly guides — delivered to your inbox. No fluff, no fake reviews.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#subscribe"
                  className="inline-flex items-center gap-2 bg-primary-500 text-cream-50 font-bold px-6 py-3 rounded-full hover:bg-primary-600 transition shadow-warm"
                >
                  Subscribe — Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 bg-cream-50 text-primary-700 font-bold px-6 py-3 rounded-full border-2 border-primary-300 hover:border-primary-500 transition"
                >
                  Browse Tools
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brown-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  Free
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  Weekly, not daily
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  1-click unsubscribe
                </span>
              </div>
            </div>

            <div className="md:col-span-2" id="subscribe">
              <EmailForm />
            </div>
          </div>
        </section>

        {/* 4 section cards */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-2">
              What you'll find here
            </h2>
            <p className="text-brown-700 mb-8">
              Four ways to use this site, depending on what you need.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/blog"
                className="group bg-cream-50 border-2 border-primary-200 hover:border-primary-400 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown-900 mb-2">
                  Articles
                </h3>
                <p className="text-sm text-brown-700">
                  Read our latest guides, policy breakdowns, and tool reviews.
                </p>
              </Link>

              <Link
                href="/tools"
                className="group bg-cream-50 border-2 border-accent-200 hover:border-accent-400 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition">
                  <Wrench className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown-900 mb-2">
                  Tools
                </h3>
                <p className="text-sm text-brown-700">
                  AI tools we've tested, with honest pros and cons.
                </p>
              </Link>

              <Link
                href="/policies"
                className="group bg-cream-50 border-2 border-mustard-300 hover:border-mustard-400 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm"
              >
                <div className="w-12 h-12 rounded-xl bg-mustard-100 flex items-center justify-center mb-4 group-hover:bg-mustard-200 transition">
                  <ScrollText className="w-6 h-6 text-mustard-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown-900 mb-2">
                  Policies
                </h3>
                <p className="text-sm text-brown-700">
                  Etsy's 2026 policy changes and what to do about them.
                </p>
              </Link>

              <Link
                href="/best-for"
                className="group bg-cream-50 border-2 border-coral-300 hover:border-coral-400 rounded-2xl p-6 transition shadow-warm-sm hover:shadow-warm"
              >
                <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center mb-4 group-hover:bg-coral-200 transition">
                  <Users className="w-6 h-6 text-coral-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-brown-900 mb-2">
                  Best For
                </h3>
                <p className="text-sm text-brown-700">
                  Tools picked for your specific Etsy shop type.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest articles */}
        {articles.length > 0 && (
          <section className="py-16 bg-cream-100">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-display text-3xl font-bold text-brown-900 mb-2">
                    Latest articles
                  </h2>
                  <p className="text-brown-700">Fresh this week.</p>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  See all articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular tools */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-brown-900 mb-2">
                  Top AI tools for Etsy sellers
                </h2>
                <p className="text-brown-700">Reviewed and rated.</p>
              </div>
              <Link
                href="/tools"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                See all tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-cream-50 border-2 border-cream-300 hover:border-primary-300 rounded-2xl p-5 transition shadow-warm-sm hover:shadow-warm relative"
                >
                  {!tool.affiliateActive && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mustard-50 border border-mustard-300 text-mustard-500 text-[10px] font-bold uppercase tracking-wider">
                      <Hourglass className="w-2.5 h-2.5" />
                      Link pending
                    </span>
                  )}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-cream-50 font-bold text-lg shrink-0"
                      style={{ backgroundColor: tool.logoColor }}
                    >
                      {tool.logoInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-brown-900 group-hover:text-primary-700 transition">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-brown-600 line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-brown-600">{tool.startingPrice}</span>
                    {tool.hasOffer ? (
                      <span className="text-primary-600 font-semibold">{tool.commission}</span>
                    ) : (
                      <span className="text-brown-400">—</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 text-cream-50">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-4xl font-black mb-4">
              Don't miss next week's article
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              1 curated article + 1 actionable tip + 1 policy alert every Tuesday. Free.
            </p>
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-2 bg-cream-50 text-primary-700 font-bold px-8 py-4 rounded-full hover:bg-cream-100 transition shadow-warm-lg"
            >
              Join the newsletter →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}