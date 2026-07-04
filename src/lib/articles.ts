import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface FAQItem {
  q: string;
  a: string;
}

export interface Source {
  /** Category for grouping in the rendered list. */
  category: "official" | "research" | "review" | "policy" | "community" | "data";
  /** Display label. */
  label: string;
  /** Outbound URL. */
  url: string;
}

export interface Article {
  slug: string;
  type: "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7";
  title: string;
  description: string;
  keywords: string[];
  date: string;
  heroImage?: string;
  category: "policy" | "tool" | "tutorial" | "best-for" | "faq" | "guide";
  affiliate?: string[];
  /** Optional FAQ items — enables FAQPage JSON-LD schema when present. */
  faq?: FAQItem[];
  /** Optional sources — renders "Sources" section at article end. */
  sources?: Source[];
  readingTime: number;
  content: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function readArticleFile(filename: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Skip drafts
  if (data.draft === true) return null;

  const slug = data.slug || filename.replace(/\.mdx?$/, "");
  const rt = readingTime(content);

  return {
    slug,
    type: (data.type ?? "T5") as Article["type"],
    title: data.title ?? "",
    description: data.description ?? "",
    keywords: data.keywords ?? [],
    date: data.date ?? new Date().toISOString().slice(0, 10),
    heroImage: data.heroImage,
    category: (data.category ?? "tutorial") as Article["category"],
    affiliate: data.affiliate,
    faq: data.faq,
    sources: data.sources,
    readingTime: Math.max(1, Math.round(rt.minutes)),
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.mdx?$/.test(f));
  const articles = files
    .map(readArticleFile)
    .filter((a): a is Article => a !== null);

  // Sort newest first
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  if (!fs.existsSync(ARTICLES_DIR)) return null;

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.mdx?$/.test(f));

  for (const file of files) {
    const article = readArticleFile(file);
    if (article && article.slug === slug) return article;
  }

  return null;
}

export function getArticlesByType(type: Article["type"]): Article[] {
  return getAllArticles().filter((a) => a.type === type);
}

export function getArticlesByCategory(category: Article["category"]): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRecentArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);

  // Score by shared keywords + same type + same category
  const scored = all.map((a) => {
    let score = 0;
    if (a.type === article.type) score += 3;
    if (a.category === article.category) score += 2;
    const sharedKw = a.keywords.filter((k) => article.keywords.includes(k)).length;
    score += sharedKw;
    return { article: a, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}