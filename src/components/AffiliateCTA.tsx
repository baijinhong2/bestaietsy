import Link from "next/link";
import { ExternalLink, Hourglass, Lock } from "lucide-react";

interface AffiliateCTAProps {
  /** Live affiliate URL (e.g. "https://roketfy.com/?ref=bestaietsy"). Null = not yet configured. */
  href: string | null;
  /** Tool name (used in CTA label + aria). */
  tool: string;
  /** CTA variant. */
  variant?: "primary" | "secondary" | "compact";
  /** Optional label override (e.g. "Try free for 7 days"). */
  label?: string;
  /** Optional commission display, e.g. "30% off via us". */
  commissionNote?: string;
  /** Show "Affiliate" disclosure line below CTA. */
  showDisclosure?: boolean;
}

/**
 * Unified affiliate CTA component.
 *
 * - When `href` is set: external link with `rel="sponsored noopener"`
 * - When `href` is null: "Coming soon" placeholder with subtle disabled state
 *
 * Used in: tool pages, article inline mentions, homepage cards, sidebar.
 */
export function AffiliateCTA({
  href,
  tool,
  variant = "primary",
  label,
  commissionNote,
  showDisclosure = false,
}: AffiliateCTAProps) {
  const isLive = Boolean(href);
  const defaultLabel = isLive
    ? label ?? `Try ${tool} →`
    : `Read our ${tool} review →`;

  const baseClasses = {
    primary:
      "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition shadow-warm",
    secondary:
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition border-2",
    compact:
      "inline-flex items-center gap-1.5 text-sm font-semibold rounded-lg transition",
  }[variant];

  const sizeClasses = {
    primary: "px-6 py-3 text-base w-full",
    secondary: "px-5 py-2.5 text-sm",
    compact: "px-3 py-1.5",
  }[variant];

  // Live affiliate link
  if (isLive && href) {
    return (
      <div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`${baseClasses} ${sizeClasses} ${
            variant === "primary"
              ? "bg-primary-500 hover:bg-primary-600 text-cream-50"
              : variant === "secondary"
              ? "border-primary-500 text-primary-700 hover:bg-primary-50"
              : "text-primary-600 hover:text-primary-700"
          }`}
          aria-label={`Visit ${tool} (affiliate link, opens in new tab)`}
        >
          {defaultLabel}
          <ExternalLink className="w-4 h-4" />
        </a>
        {(commissionNote || showDisclosure) && (
          <AffiliateNote commissionNote={commissionNote} showDisclosure={showDisclosure} />
        )}
      </div>
    );
  }

  // Not yet configured → fallback to internal review page
  return (
    <div>
      <Link
        href={`/tools/${slugify(tool)}`}
        className={`${baseClasses} ${sizeClasses} ${
          variant === "primary"
            ? "bg-primary-500 hover:bg-primary-600 text-cream-50"
            : variant === "secondary"
            ? "border-primary-500 text-primary-700 hover:bg-primary-50"
            : "text-primary-600 hover:text-primary-700"
        }`}
      >
        {defaultLabel}
      </Link>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-brown-500">
        <Hourglass className="w-3 h-3" />
        <span>Affiliate link coming soon</span>
      </div>
      {(commissionNote || showDisclosure) && (
        <AffiliateNote commissionNote={commissionNote} showDisclosure={showDisclosure} />
      )}
    </div>
  );
}

function AffiliateNote({
  commissionNote,
  showDisclosure,
}: {
  commissionNote?: string;
  showDisclosure: boolean;
}) {
  return (
    <div className="mt-2 text-xs text-brown-500 space-y-1">
      {commissionNote && (
        <p className="flex items-center gap-1">
          <span className="font-mono text-primary-600">{commissionNote}</span>
        </p>
      )}
      {showDisclosure && (
        <p className="flex items-start gap-1">
          <Lock className="w-3 h-3 mt-0.5 shrink-0" />
          <span>Affiliate link · We may earn a commission at no extra cost to you.</span>
        </p>
      )}
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Inline affiliate mention — used inside article MDX text.
 * Renders as a text link to /tools/[slug] with subtle affiliate marker.
 */
export function AffiliateMention({
  href,
  tool,
  slug,
  children,
}: {
  href: string | null;
  tool: string;
  slug: string;
  children?: React.ReactNode;
}) {
  const isLive = Boolean(href);
  const target = isLive && href ? href : `/tools/${slug}`;

  return (
    <a
      href={target}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer sponsored" : undefined}
      className="inline-flex items-center gap-1 text-primary-700 font-semibold underline decoration-primary-300 underline-offset-2 hover:decoration-primary-600"
    >
      {children ?? tool}
      {!isLive && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-mustard-400" aria-label="affiliate link pending" />
      )}
      {isLive && <ExternalLink className="w-3 h-3 inline" />}
    </a>
  );
}