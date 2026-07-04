import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/articles";

const CATEGORY_LABELS: Record<Source["category"], string> = {
  official: "Official sources",
  research: "Research & data",
  review: "Tool documentation",
  policy: "Policy references",
  community: "Community discussion",
  data: "Data sources",
};

const CATEGORY_ORDER: Source["category"][] = [
  "official",
  "policy",
  "research",
  "data",
  "review",
  "community",
];

interface SourcesProps {
  sources: Source[];
}

/**
 * Renders a categorized list of sources for an article.
 * Used at the bottom of T1/T2/T6 articles to show E-E-A-T signals.
 */
export function Sources({ sources }: SourcesProps) {
  if (!sources || sources.length === 0) return null;

  // Group by category
  const grouped = sources.reduce<Record<string, Source[]>>((acc, src) => {
    if (!acc[src.category]) acc[src.category] = [];
    acc[src.category].push(src);
    return acc;
  }, {});

  // Sort by preferred order
  const orderedCategories = CATEGORY_ORDER.filter((c) => grouped[c]);

  return (
    <section className="mt-12 p-6 bg-cream-100 border border-cream-300 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs text-brown-600 uppercase tracking-widest">
          Sources
        </span>
        <span className="text-xs text-brown-500">
          ({sources.length} {sources.length === 1 ? "reference" : "references"})
        </span>
      </div>

      <p className="text-sm text-brown-700 mb-5 leading-relaxed">
        Every claim in this article is traceable to a public source. We don't publish anything we can't verify.
      </p>

      <div className="space-y-5">
        {orderedCategories.map((cat) => (
          <div key={cat}>
            <p className="font-mono text-[10px] text-brown-500 uppercase tracking-wider mb-2">
              {CATEGORY_LABELS[cat]}
            </p>
            <ul className="space-y-2">
              {grouped[cat].map((src) => (
                <li key={src.url} className="text-sm">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-primary-700 hover:text-primary-800 underline decoration-primary-300 underline-offset-2 hover:decoration-primary-500"
                  >
                    <span>{src.label}</span>
                    <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}