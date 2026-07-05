import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, Heart, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About bestaietsy",
  description: "bestaietsy is an independent publication for Etsy sellers who want to grow with AI tools. Honest reviews, policy updates, weekly guides.",
  keywords: [
    "about bestaietsy",
    "bestaietsy editorial standards",
    "Etsy seller publication",
    "honest AI tool reviews",
    "Etsy policy coverage",
  ],
  alternates: { canonical: "https://bestaietsy.com/about" },
  openGraph: {
    title: "About bestaietsy",
    description: "bestaietsy is a publication for Etsy sellers who want to grow with AI tools.",
    url: "https://bestaietsy.com/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "about bestaietsy" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            About bestaietsy
          </h1>
          <div className="prose-content">
            <p>
              bestaietsy.com is an English-language (US) publication for Etsy sellers who want to grow their shop with AI tools.
              We focus on three things:
            </p>
            <ul>
              <li><strong>Policy updates</strong> — When Etsy changes the rules, we break down what it means and what to do.</li>
              <li><strong>Tool reviews</strong> — We test AI tools with real Etsy listings and report honest pros and cons.</li>
              <li><strong>Step-by-step guides</strong> — Tutorials that take you from setup to first result.</li>
            </ul>

            <h2>Who we are</h2>
            <p>
              bestaietsy is built by a small team of Etsy sellers and AI builders. We've been selling on Etsy since 2018 and started using AI tools in 2022. This site is our way of sharing what works.
            </p>

            <h2>How we make money</h2>
            <p>
              When we link to a tool, we may earn a small commission if you purchase through our link. This costs you nothing extra. We only recommend tools we genuinely believe help Etsy sellers.
              <br /><br />
              See our <a href="/affiliate-disclosure">full affiliate disclosure</a>.
            </p>

            <h2>Editorial principles</h2>
            <ul>
              <li><strong>Honest first</strong> — We write cons as clearly as pros. No pay-for-review.</li>
              <li><strong>Etsy-specific</strong> — We only cover AI tools that work for Etsy sellers.</li>
              <li><strong>Tested by us</strong> — Every review is based on real usage, not spec sheets.</li>
              <li><strong>Fact-checked</strong> — Every policy claim links back to Etsy's official source.</li>
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}