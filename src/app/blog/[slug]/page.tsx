import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ChevronRight, Clock, Calendar, User, CheckCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { EmailForm } from "@/components/EmailForm";
import { ArticleCard } from "@/components/ArticleCard";
import { Sources } from "@/components/Sources";
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/articles";

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  roketfy: "Roketfy",
  erank: "eRank",
  midjourney: "Midjourney",
  etsyhunt: "EtsyHunt",
  alura: "Alura",
  simplified: "Simplified",
};

function slugDisplayName(slug: string): string {
  return TOOL_DISPLAY_NAMES[slug] ?? slug;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not found" };

  const canonicalUrl = `https://bestaietsy.com/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: canonicalUrl,
      publishedTime: article.date,
      authors: ["bestaietsy team"],
      images: article.heroImage
        ? [{ url: article.heroImage, width: 1200, height: 630, alt: article.title }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.heroImage ? [article.heroImage] : ["/og-image.png"],
    },
  };
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const canonicalUrl = `https://bestaietsy.com/blog/${article.slug}`;

  // JSON-LD: Article + BreadcrumbList (+ FAQPage if applicable)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "bestaietsy team",
      url: "https://bestaietsy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "bestaietsy",
      url: "https://bestaietsy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://bestaietsy.com/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: article.heroImage || "https://bestaietsy.com/og-image.png",
    keywords: article.keywords.join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": "https://bestaietsy.com/#website" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bestaietsy.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://bestaietsy.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  // FAQPage schema if article has FAQ section (T1 always does)
  const faqJsonLd =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <SiteHeader />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

        {/* Breadcrumb */}
        <div className="bg-cream-100 border-b border-cream-300">
          <div className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-2 text-xs text-brown-600 font-mono">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-primary-600">Articles</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-600 truncate">{article.title}</span>
          </div>
        </div>

        <article className="py-12">
          <div className="mx-auto max-w-3xl px-6">
            {/* Header */}
            <header className="mb-8">
              <p className="font-mono text-xs text-primary-700 uppercase tracking-widest mb-3">
                {article.type} · {article.category}
              </p>
              <h1 className="font-display text-4xl lg:text-5xl font-black leading-tight text-brown-900 mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-brown-700 mb-5 leading-relaxed">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-brown-600 pb-6 border-b border-cream-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  bestaietsy team
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  Fact-checked
                </span>
              </div>
            </header>

            {/* Hero image */}
            {article.heroImage && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-warm-lg border-2 border-cream-300">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose-content">
              <MDXRemote
                source={article.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {/* Affiliate disclosure */}
            {article.affiliate && article.affiliate.length > 0 && (
              <div className="mt-12 p-5 bg-accent-50 border border-accent-200 rounded-xl">
                <p className="text-sm text-accent-700 leading-relaxed">
                  <strong className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                    Affiliate disclosure
                  </strong>
                  <br />
                  This article recommends:{" "}
                  {article.affiliate.map((slug, i) => (
                    <span key={slug}>
                      <Link
                        href={`/tools/${slug}`}
                        className="font-semibold text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-500"
                      >
                        {slugDisplayName(slug)}
                      </Link>
                      {i < article.affiliate!.length - 2 ? ", " : i === article.affiliate!.length - 2 ? " and " : ""}
                    </span>
                  ))}
                  . Once affiliate links go live, purchases through them may earn the site a commission at no extra cost to you. See our{" "}
                  <Link href="/affiliate-disclosure" className="font-semibold underline">
                    full disclosure
                  </Link>.
                </p>
              </div>
            )}

            {/* Sources (E-E-A-T: trust + citation transparency) */}
            {article.sources && article.sources.length > 0 && (
              <Sources sources={article.sources} />
            )}

            {/* Inline email CTA */}
            <div className="mt-12" id="subscribe">
              <EmailForm />
            </div>

            {/* Tags */}
            {article.keywords.length > 0 && (
              <div className="mt-10 pt-8 border-t border-cream-300">
                <p className="text-xs font-mono text-brown-500 uppercase tracking-wider mb-3">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-xs bg-cream-100 border border-cream-300 rounded-full px-3 py-1.5 text-brown-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-16 bg-cream-100">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="font-display text-3xl font-bold text-brown-900 mb-8">
                Related articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} compact />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}