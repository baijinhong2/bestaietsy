import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Star, ExternalLink, BarChart3, DollarSign, Gift, Users, Percent, ThumbsUp, ThumbsDown, Hourglass, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EmailForm } from "@/components/EmailForm";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { getAllTools, getToolBySlug } from "@/lib/tools";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Not found" };

  return {
    title: `${tool.name} Review — Pricing, Pros & Cons`,
    description: tool.description,
    keywords: [`${tool.name} review`, `${tool.name} pricing`, `${tool.name} for Etsy`, "Etsy AI tools"],
  };
}

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <div className="bg-cream-100 border-b border-cream-300">
          <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-2 text-xs text-brown-600 font-mono">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-primary-600">Tools</Link>
            <span>/</span>
            <span className="text-primary-600">{tool.name}</span>
          </div>
        </div>

        <article className="py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-cream-50 font-bold text-4xl shrink-0 shadow-warm"
                    style={{ backgroundColor: tool.logoColor }}
                  >
                    {tool.logoInitial}
                  </div>
                  <div>
                    <h1 className="font-display text-4xl font-black text-brown-900 mb-2">
                      {tool.name} Review
                    </h1>
                    <p className="text-lg text-brown-700">{tool.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i <= Math.round(tool.rating)
                                ? "fill-mustard-400 text-mustard-400"
                                : "text-brown-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brown-700">
                        {tool.rating}/5 · Reviewed by bestaietsy team
                      </span>
                    </div>
                  </div>
                </div>

                <div className="prose-content mt-8">
                  <h2>What is {tool.name}?</h2>
                  <p>{tool.longDescription}</p>

                  <h2>Who is it for?</h2>
                  <ul>
                    {tool.bestFor.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>

                  <h2>Pricing breakdown</h2>
                  <p>
                    <strong>{tool.name}</strong> starts at <strong>{tool.startingPrice}</strong>.
                    Free trial: <strong>{tool.freeTrial}</strong>.
                  </p>
                </div>

                {/* Pros and Cons */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-accent-50 border-2 border-accent-200 rounded-2xl p-5">
                    <p className="text-sm font-bold text-accent-700 mb-3 flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4" />
                      Pros
                    </p>
                    <ul className="space-y-2 text-sm text-brown-700">
                      {tool.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="text-accent-500 mt-0.5">+</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-coral-50 border-2 border-coral-200 rounded-2xl p-5">
                    <p className="text-sm font-bold text-coral-600 mb-3 flex items-center gap-1.5">
                      <ThumbsDown className="w-4 h-4" />
                      Cons
                    </p>
                    <ul className="space-y-2 text-sm text-brown-700">
                      {tool.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="text-coral-500 mt-0.5">-</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12">
                  <EmailForm />
                </div>
              </div>

              {/* Sticky sidebar */}
              <aside className="space-y-4">
                <div className="bg-cream-100 border-2 border-primary-300 rounded-2xl p-5 shadow-warm lg:sticky lg:top-6">
                  <p className="text-xs font-bold text-brown-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4" />
                    Quick stats
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-brown-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-brown-600">Price</p>
                        <p className="font-bold text-brown-900">{tool.pricing}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gift className="w-4 h-4 text-brown-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-brown-600">Free trial</p>
                        <p className="font-bold text-brown-900">{tool.freeTrial}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-brown-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-brown-600">Best for</p>
                        <p className="font-bold text-brown-900">{tool.bestFor[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Percent className="w-4 h-4 text-brown-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-brown-600">Commission</p>
                        <p className="font-bold text-primary-600">{tool.commission}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <AffiliateCTA
                      href={tool.affiliateUrl}
                      tool={tool.name}
                      commissionNote={tool.commission}
                      showDisclosure
                      variant="primary"
                    />
                  </div>

                  {tool.hasOffer && tool.commission.includes("30") && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-mustard-50 border border-mustard-200 rounded-lg text-xs text-mustard-500">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span><strong>30% off</strong> for bestaietsy readers (once link is live)</span>
                    </div>
                  )}
                </div>

                <div className="bg-cream-100 border border-cream-300 rounded-2xl p-5">
                  <p className="text-sm font-bold text-brown-700 mb-3 flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4" />
                    Visit official site
                  </p>
                  <a
                    href={tool.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    {tool.homepage.replace(/^https?:\/\//, "")}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-brown-500 mt-2">
                    Direct link, no affiliate tracking
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}