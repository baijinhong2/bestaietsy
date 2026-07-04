import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How bestaietsy collects, uses, and protects your information. GDPR and CCPA compliant.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Privacy Policy
          </h1>
          <div className="prose-content">
            <p><strong>Last updated:</strong> July 4, 2026</p>

            <h2>Information we collect</h2>
            <p>
              We collect only what we need to send you the newsletter:
            </p>
            <ul>
              <li><strong>Email address</strong> — When you subscribe to our newsletter.</li>
              <li><strong>Usage data</strong> — Anonymous page views via Google Analytics.</li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>Send you the weekly Etsy AI digest via Resend.</li>
              <li>Improve our content based on what you read.</li>
            </ul>

            <h2>Third-party services</h2>
            <ul>
              <li><strong>Resend</strong> — Email delivery. Stored until you unsubscribe.</li>
              <li><strong>Vercel</strong> — Hosting. No user data stored.</li>
              <li><strong>Google Analytics</strong> — Anonymous usage stats.</li>
            </ul>

            <h2>Your rights</h2>
            <p>
              You can unsubscribe at any time using the link in any email we send.
              To request data deletion, email <code>privacy@bestaietsy.com</code>.
            </p>

            <h2>Cookies</h2>
            <p>
              We use minimal cookies for analytics. No advertising cookies, no data selling.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}