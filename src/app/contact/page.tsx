import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the bestaietsy team. We respond to support@bestaietsy.com within 1-2 business days.",
  keywords: [
    "contact bestaietsy",
    "bestaietsy support email",
    "Etsy seller support",
    "AI tool review contact",
    "bestaietsy press inquiries",
  ],
  alternates: { canonical: "https://bestaietsy.com/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Contact us
          </h1>
          <p className="text-lg text-brown-700 mb-10">
            Questions, corrections, partnership ideas, or just want to say hi —
            we read every email. Pick the topic that fits and write us.
          </p>

          {/* Primary contact card */}
          <div className="bg-gradient-to-br from-primary-50 to-cream-100 border-2 border-primary-200 rounded-2xl p-8 mb-8 shadow-warm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-cream-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-primary-700 uppercase tracking-wider mb-1">
                  One inbox for everything
                </p>
                <a
                  href="mailto:support@bestaietsy.com"
                  className="font-display text-3xl font-bold text-brown-900 hover:text-primary-700 transition break-all"
                >
                  support@bestaietsy.com
                </a>
                <p className="text-sm text-brown-700 mt-2">
                  Use a clear subject line — it helps us route your message
                  faster.
                </p>
              </div>
            </div>
          </div>

          {/* Response time */}
          <div className="flex items-start gap-3 mb-10 bg-cream-100 border border-brown-200 rounded-xl p-5">
            <Clock className="w-5 h-5 text-brown-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-brown-900 mb-1">
                Response time
              </p>
              <p className="text-sm text-brown-700">
                We aim to reply within <strong>1&ndash;2 business days</strong>
                {" "}(Mon&ndash;Fri, US Eastern). Press / partnership inquiries
                get prioritized.
              </p>
            </div>
          </div>

          {/* What we can help with */}
          <h2 className="font-display text-2xl font-bold text-brown-900 mb-4">
            What we can help with
          </h2>
          <div className="space-y-3 mb-10">
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded mt-1 shrink-0">
                Subject
              </span>
              <div className="text-sm text-brown-700">
                <strong className="text-brown-900">Content correction</strong>
                {" — "}spotted a typo, broken link, or outdated info? Tell us
                the URL and we&apos;ll fix it.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded mt-1 shrink-0">
                Subject
              </span>
              <div className="text-sm text-brown-700">
                <strong className="text-brown-900">Tool review request</strong>
                {" — "}want us to review an AI tool not yet covered? Send the
                name + a one-line description.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded mt-1 shrink-0">
                Subject
              </span>
              <div className="text-sm text-brown-700">
                <strong className="text-brown-900">Press / partnership</strong>
                {" — "}podcast guest, sponsored review, data collaboration. We
                answer within 48 hours.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded mt-1 shrink-0">
                Subject
              </span>
              <div className="text-sm text-brown-700">
                <strong className="text-brown-900">
                  Privacy / data request
                </strong>
                {" — "}want to access, update, or delete your data? GDPR / CCPA
                rights honored.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded mt-1 shrink-0">
                Subject
              </span>
              <div className="text-sm text-brown-700">
                <strong className="text-brown-900">General feedback</strong>
                {" — "}love something? Hate something? Use the{" "}
                <a href="/feedback" className="text-primary-700 underline">
                  feedback page
                </a>{" "}
                instead, it&apos;s structured for that.
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="border-t border-brown-200 pt-8">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-brown-900 mb-1">
                  Don&apos;t want to email?
                </p>
                <p className="text-sm text-brown-700">
                  Subscribe to the{" "}
                  <a href="/#subscribe" className="text-primary-700 underline">
                    weekly newsletter
                  </a>{" "}
                  for policy alerts and tool reviews in your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}