import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How bestaietsy collects, uses, and protects your information. GDPR and CCPA compliant.",
  alternates: { canonical: "https://bestaietsy.com/privacy-policy" },
  robots: { index: true, follow: true },
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
            <p><strong>Last updated:</strong> July 6, 2026</p>

            <h2>Information we collect</h2>
            <p>
              We collect only what we need to send you the newsletter and run the site:
            </p>
            <ul>
              <li><strong>Email address</strong> — When you subscribe to our newsletter.</li>
              <li><strong>Usage data</strong> — Anonymous page views via Google Analytics (only when you consent).</li>
              <li><strong>Advertising interaction data</strong> — When you consent to &ldquo;Marketing&rdquo; cookies, Google AdSense may set cookies to serve and measure ads. See Google&rsquo;s <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Privacy Policy</a>.</li>
              <li><strong>Server logs</strong> — IP address, user agent, referrer, requested URL. Retained by Vercel for 30 days then aggregated/dropped.</li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>Send you the weekly Etsy AI digest and breaking-news alerts.</li>
              <li>Improve our content based on which articles are read.</li>
              <li>When you consent to marketing cookies: serve personalized ads via Google AdSense to fund the site.</li>
              <li>Detect abuse (bot sign-ups, scraping) and protect the site.</li>
            </ul>

            <h2>Third-party services</h2>
            <ul>
              <li><strong>Vercel</strong> — Hosting. Logs retained for 30 days for security and analytics.</li>
              <li><strong>Google Analytics 4</strong> — Anonymous usage statistics. IP anonymization is enabled. Only loaded after you accept &ldquo;Analytics&rdquo; cookies.</li>
              <li><strong>Google AdSense</strong> — Advertising. Only loaded after you accept &ldquo;Marketing&rdquo; cookies. Google acts as the data processor; see <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">Google&rsquo;s ad policies</a>.</li>
              <li><strong>Alibaba Cloud DirectMail</strong> — Email delivery (ap-southeast-1 / Singapore). Sends newsletter + transactional emails on our behalf. Email addresses are passed through DirectMail at send time and not retained after delivery per their default policy.</li>
              <li><strong>Supabase</strong> — Subscriber database. Stores email, per-list preferences (weekly / breaking), audit metadata (hashed IP, user agent), and an unsubscribe token. Stored until you unsubscribe.</li>
              <li><strong>Affiliate networks</strong> — When you click an affiliate link (e.g. to Roketfy, eRank), the vendor may set first-party cookies to attribute the referral. See <a href="/affiliate-disclosure">Affiliate Disclosure</a> for the full list.</li>
            </ul>

            <h2>Your rights</h2>
            <p>
              You can unsubscribe at any time using the link in any email we send.
              You can unsubscribe from just one list (weekly or breaking) or both.
              To request a copy of all data we hold about you, or to request full
              data deletion, email <code>support@bestaietsy.com</code>. We respond
              within 30 days.
            </p>
            <p>
              Depending on where you live, you may have additional rights:
            </p>
            <ul>
              <li><strong>GDPR (EU/UK)</strong> — Right to access, rectify, erase, restrict processing, data portability, object to processing, and lodge a complaint with your local data protection authority.</li>
              <li><strong>CCPA/CPRA (California)</strong> — Right to know what personal information we collect, right to delete, right to opt out of sale or sharing. We do not sell personal information.</li>
              <li><strong>LGPD (Brazil)</strong> — Similar rights to GDPR, exercisable through <code>support@bestaietsy.com</code>.</li>
            </ul>
            <p>
              The data controller for this site is the bestaietsy team, reachable at{" "}
              <code>support@bestaietsy.com</code>. We do not have a designated EU
              representative at this time; EU users may contact us directly.
            </p>

            <h2>Cookies</h2>
            <p>
              See our <a href="/cookie-policy">Cookie Policy</a> for which cookies
              we set, what each one does, and how to control them. You can update
              your cookie preferences at any time using the banner linked in the
              footer of every page.
            </p>

            <h2>Children</h2>
            <p>
              bestaietsy is not directed at children under 13. We do not knowingly
              collect information from children. If you believe a child has signed
              up, email <code>support@bestaietsy.com</code> and we will delete the
              record.
            </p>

            <h2>International transfers</h2>
            <p>
              Some of our service providers (Google, Alibaba Cloud) may process
              data in countries outside yours, including the United States,
              Singapore, and the European Economic Area. These providers are bound
              by their own privacy policies and applicable data-protection laws.
            </p>

            <h2>Updates to this policy</h2>
            <p>
              We may update this page. Material changes will be announced via our
              newsletter. The &ldquo;Last updated&rdquo; date at the top always
              reflects the latest version.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}