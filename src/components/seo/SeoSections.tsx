"use client";

import Link from "next/link";
import { CheckCircle2, Star, Quote, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import type {
  SeoContent,
  SeoContentBlock,
  SeoTdk,
  SeoHead1,
  SeoWhatis,
  SeoHowToUse,
  SeoDoWith,
  SeoWhois,
  SeoYouNeed,
  SeoRealVoices,
  SeoFaq,
} from "@/lib/seo/types";

interface SeoSectionsProps {
  content: SeoContent;
  /**
   * Layout style — "stacked" (one section per row, default) or "compact"
   * (tighter spacing, suited for aggregator pages).
   */
  layout?: "stacked" | "compact";
}

/**
 * Renders the 8-block SEO content structure as visual sections.
 * Skips `tdk` and `head1` (those are rendered separately as page <h1> + meta).
 */
/**
 * A block that has both `type` and `head` — i.e. every block we render
 * (we filter out tdk and head1 upstream because those are rendered separately).
 */
type RenderableBlock = Exclude<SeoContentBlock, { type: "tdk" } | { head: "head1" }>;

export function SeoSections({ content, layout = "stacked" }: SeoSectionsProps) {
  const blocks = content.filter(
    (b): b is RenderableBlock =>
      !("type" in b && b.type === "tdk") && !("head" in b && b.head === "head1"),
  );

  return (
    <div className={layout === "compact" ? "space-y-12" : "space-y-20"}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "Whatis":
            return <WhatisSection key={`whatis-${i}`} block={block} />;
          case "howToUse":
            return <HowToUseSection key={`howto-${i}`} block={block} />;
          case "doWith":
            return <DoWithSection key={`dowith-${i}`} block={block} />;
          case "Whois":
            return <WhoisSection key={`whois-${i}`} block={block} />;
          case "youNeed":
            return <YouNeedSection key={`youneed-${i}`} block={block} />;
          case "realVoices":
            return <RealVoicesSection key={`voices-${i}`} block={block} />;
          case "faq":
            return <FaqSection key={`faq-${i}`} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

// === Section renderers ===

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-black text-brown-900 mb-3 max-w-4xl">
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg text-brown-700 max-w-4xl mb-10 leading-relaxed">
      {children}
    </p>
  );
}

/** Render an illustration with sensible defaults: prefers photo over photoThumbnail; falls back gracefully. */
function Illustration({
  photo,
  alt,
  className = "",
  sizes,
  width,
  height,
}: {
  photo?: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo}
      alt={alt}
      width={width ?? 200}
      height={height ?? 160}
      sizes={sizes ?? "(max-width: 768px) 100vw, 400px"}
      className={className}
    />
  );
}

function WhatisSection({ block }: { block: SeoWhatis }) {
  const item = block.content[0];
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <div className="bg-gradient-to-br from-primary-50 to-cream-100 border-2 border-primary-200 rounded-2xl p-8 md:p-10 shadow-warm">
        <div className="grid md:grid-cols-[1fr_240px] gap-8 items-center">
          <p className="text-lg text-brown-800 leading-relaxed">{item.description_i18n}</p>
          {item.photo && (
            <div className="order-first md:order-last">
              <Illustration
                photo={item.photo}
                alt={block.title_i18n}
                width={240}
                height={192}
                className="w-full h-auto rounded-xl"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HowToUseSection({ block }: { block: SeoHowToUse }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <SectionSub>Three steps, no fluff — what you actually do.</SectionSub>
      <ol className="grid md:grid-cols-3 gap-5">
        {block.content.map((step, i) => (
          <li
            key={i}
            className="bg-cream-50 border-2 border-brown-200 rounded-2xl p-6 relative"
          >
            <span className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-primary-500 text-cream-50 flex items-center justify-center font-bold text-sm shadow-warm">
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-bold text-brown-900 mb-2 mt-1">
              {step.title_i18n.replace(/^Step \d+:\s*/i, "")}
            </h3>
            <p className="text-sm text-brown-700 leading-relaxed">
              {step.description_i18n}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DoWithSection({ block }: { block: SeoDoWith }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <SectionSub>{block.description_i18n}</SectionSub>
      <div className="grid sm:grid-cols-2 gap-5">
        {block.content.map((item, i) => (
          <div
            key={i}
            className="bg-cream-50 border-2 border-primary-200 rounded-2xl p-6 hover:border-primary-400 transition"
          >
            <div className="flex items-start gap-4 mb-3">
              {item.photo ? (
                <Illustration
                  photo={item.photo}
                  alt={item.title_i18n}
                  width={56}
                  height={56}
                  className="w-14 h-14 shrink-0 rounded-xl bg-cream-100"
                  sizes="56px"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-primary-500 text-cream-50 flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
              )}
              <h3 className="font-display text-xl font-bold text-brown-900 mt-1">
                {item.title_i18n}
              </h3>
            </div>
            <p className="text-brown-700 leading-relaxed">{item.description_i18n}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhoisSection({ block }: { block: SeoWhois }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <div className="grid md:grid-cols-3 gap-5">
        {block.content.map((item, i) => (
          <div
            key={i}
            className="bg-mustard-50 border-2 border-mustard-300 rounded-2xl p-6"
          >
            {item.photo && (
              <Illustration
                photo={item.photo}
                alt={item.title_i18n}
                width={64}
                height={64}
                className="w-16 h-16 mb-4 rounded-xl"
                sizes="64px"
              />
            )}
            <h3 className="font-display text-xl font-bold text-brown-900 mb-3">
              {item.title_i18n}
            </h3>
            <p className="text-brown-700 leading-relaxed text-sm">
              {item.description_i18n}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function YouNeedSection({ block }: { block: SeoYouNeed }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <div className="grid md:grid-cols-3 gap-5">
        {block.content.map((item, i) => (
          <div
            key={i}
            className="bg-accent-50 border-2 border-accent-300 rounded-2xl p-6"
          >
            <CheckCircle2 className="w-7 h-7 text-accent-600 mb-3" />
            <h3 className="font-display text-xl font-bold text-brown-900 mb-3">
              {item.title_i18n}
            </h3>
            <p className="text-brown-700 leading-relaxed text-sm">
              {item.description_i18n}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RealVoicesSection({ block }: { block: SeoRealVoices }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 fill-mustard-500 text-mustard-500" />
          ))}
        </div>
        <span className="text-2xl font-display font-black text-brown-900">
          {block.ext1}
        </span>
        <span className="text-brown-600 text-sm">{block.ext2_i18n}</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {block.content.map((review, i) => (
          <figure
            key={i}
            className="bg-cream-50 border-2 border-brown-200 rounded-2xl p-6 relative"
          >
            <Quote className="absolute top-4 right-4 w-6 h-6 text-primary-300" />
            {review.photo && (
              <Illustration
                photo={review.photo}
                alt={review.ext2_i18n}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mb-3"
                sizes="48px"
              />
            )}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${Number(review.ext1) >= star ? "fill-mustard-500 text-mustard-500" : "text-brown-200"}`}
                />
              ))}
            </div>
            <h3 className="font-display text-base font-bold text-brown-900 mb-2">
              {review.title_i18n}
            </h3>
            <p className="text-sm text-brown-700 leading-relaxed mb-4">
              {review.description_i18n}
            </p>
            <figcaption className="text-xs text-brown-600 border-t border-brown-200 pt-3">
              <strong className="text-brown-900">{review.ext2_i18n}</strong>
              <br />
              {review.ext3_i18n}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ block }: { block: SeoFaq }) {
  return (
    <section>
      <SectionHeading>{block.title_i18n}</SectionHeading>
      <div className="space-y-3 max-w-3xl">
        {block.content.map((item, i) => (
          <FaqItem key={i} q={item.title_i18n} a={item.description_i18n} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <details
      open={open}
      className="group bg-cream-50 border-2 border-brown-200 rounded-xl overflow-hidden"
    >
      <summary
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="flex items-start gap-3 p-5 cursor-pointer list-none hover:bg-cream-100 transition"
      >
        <ChevronDown
          className={`w-5 h-5 mt-0.5 text-primary-600 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
        <h3 className="font-display text-base md:text-lg font-bold text-brown-900">
          {q}
        </h3>
      </summary>
      <div className="px-5 pb-5 pl-12 text-brown-700 leading-relaxed">
        {a}
      </div>
    </details>
  );
}