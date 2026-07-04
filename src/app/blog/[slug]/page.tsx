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
import { getArticleBySlug, getAllArticles, getRelatedArticles } from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Not found" };

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: ["bestaietsy team"],
      images: article.heroImage ? [article.heroImage] : undefined,
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

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
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
      "@id": `https://bestaietsy.com/blog/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <>
      <SiteHeader />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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
              <div className="mt-12 p-4 bg-accent-50 border border-accent-200 rounded-xl text-sm text-accent-700">
                <p>
                  <strong>Disclosure:</strong> This article contains affiliate links to {article.affiliate.join(", ")}.
                  Purchases through these links may earn the site a commission at no extra cost to you.
                </p>
              </div>
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