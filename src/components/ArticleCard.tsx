import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

const TYPE_BADGE: Record<string, { label: string; color: string; bg: string; border: string }> = {
  T1: { label: "POLICY ALERT", color: "text-coral-600", bg: "bg-coral-100", border: "border-coral-300" },
  T2: { label: "TOOL REVIEW", color: "text-mustard-500", bg: "bg-mustard-100", border: "border-mustard-300" },
  T3: { label: "COMPARISON", color: "text-accent-700", bg: "bg-accent-100", border: "border-accent-300" },
  T4: { label: "BEST FOR YOU", color: "text-accent-700", bg: "bg-accent-100", border: "border-accent-300" },
  T5: { label: "TUTORIAL", color: "text-brown-700", bg: "bg-brown-100", border: "border-brown-300" },
  T6: { label: "PILLAR GUIDE", color: "text-primary-700", bg: "bg-primary-100", border: "border-primary-300" },
  T7: { label: "FAQ", color: "text-brown-700", bg: "bg-cream-200", border: "border-brown-300" },
};

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  const badge = TYPE_BADGE[article.type] ?? TYPE_BADGE.T5;

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block bg-cream-50 border-2 border-cream-300 hover:border-primary-300 rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm transition"
    >
      {article.heroImage && !compact && (
        <div className="aspect-[1200/630] bg-gradient-to-br from-primary-100 via-cream-200 to-primary-200 overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.bg} ${badge.color} ${badge.border}`}
          >
            <FileText className="w-3 h-3" />
            {badge.label}
          </span>
          <span className="text-xs text-brown-500 font-mono">
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-brown-900 leading-tight mb-2 group-hover:text-primary-700 transition">
          {article.title}
        </h3>

        {!compact && (
          <p className="text-sm text-brown-700 leading-relaxed line-clamp-3 mb-3">
            {article.description}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
          Read article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </Link>
  );
}