import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of bestaietsy.com — editorial content, newsletter, and affiliate disclosures.",
  alternates: { canonical: "https://bestaietsy.com/terms-of-service" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Terms of Service
          </h1>
          <div className="prose-content">
            <p>
              <strong>Last updated:</strong> July 4, 2026
            </p>
            <p>
              By accessing bestaietsy.com (the &ldquo;Site&rdquo;) you agree to be bound
              by these Terms of Service. If you do not agree, please do not use
              the Site.
            </p>

            <h2>1. What bestaietsy provides</h2>
            <p>
              bestaietsy is an independent editorial publication. We publish:
            </p>
            <ul>
              <li>Weekly articles about AI tools for Etsy sellers.</li>
              <li>Reviews of AI products and services.</li>
              <li>Etsy policy explainers and seller guides.</li>
              <li>A free email newsletter delivered via Resend.</li>
            </ul>
            <p>
              Our content is informational. We are <strong>not</strong> Etsy, we
              are <strong>not</strong> affiliated with Etsy, Inc., and nothing on
              this Site constitutes legal, financial, or professional advice.
            </p>

            <h2>2. Using the Site</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Scrape, crawl, or systematically copy our content.</li>
              <li>Republish our articles in full on other sites (short quotes
                with attribution and a link back are fine).</li>
              <li>Attempt to disrupt the Site, its APIs, or its newsletter
                infrastructure.</li>
              <li>Use the Site to send unsolicited communications or spam.</li>
            </ul>
            <p>
              We reserve the right to block abusive users, including by IP, from
              accessing the Site or newsletter sign-up.
            </p>

            <h2>3. Intellectual property</h2>
            <p>
              All articles, illustrations, design, code, and branding on this
              Site are owned by bestaietsy unless otherwise credited. You may
              read and link to our content freely; you may not reproduce it
              commercially without written permission.
            </p>
            <p>
              <strong>AI-generated content.</strong> Some articles and
              illustrations on this Site are produced with AI assistance. We
              review and edit all AI-assisted content before publication and
              stand behind its accuracy.
            </p>

            <h2>4. Affiliate disclosure</h2>
            <p>
              Some links on this Site are affiliate links. If you click one and
              later make a purchase, we may earn a small commission at no extra
              cost to you. See our{" "}
              <a href="/affiliate-disclosure">Affiliate Disclosure</a> for full
              details.
            </p>

            <h2>5. Newsletter and communications</h2>
            <p>
              Subscribing to our newsletter is free. We send roughly one
              email per week. You can unsubscribe at any time using the link
              in the footer of any email we send, or by emailing{" "}
              <code>support@bestaietsy.com</code> with the subject
              &ldquo;Unsubscribe&rdquo;. We do not sell or share
              your email address.
            </p>

            <h2>6. Third-party services and links</h2>
            <p>
              The Site relies on third-party services to operate, including
              Vercel (hosting), Resend (email delivery), and Google Analytics
              (anonymous usage stats). We link out to third-party sites, tools,
              and resources. We do not control those sites and are not
              responsible for their content, pricing, or practices.
            </p>

            <h2>7. No warranty</h2>
            <p>
              The Site and its content are provided on an &ldquo;as is&rdquo;
              and &ldquo;as available&rdquo; basis. We make no warranties about
              accuracy, completeness, fitness for a particular purpose, or
              non-infringement. We may update, change, or remove content at any
              time without notice.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, bestaietsy and its owners
              will not be liable for any indirect, incidental, consequential, or
              punitive damages arising from your use of the Site, including but
              not limited to lost profits, lost data, or business interruption.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold bestaietsy harmless from any
              claims arising out of your misuse of the Site or violation of
              these Terms.
            </p>

            <h2>10. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. The &ldquo;Last
              updated&rdquo; date at the top will always reflect the most
              recent change. Continuing to use the Site after a change means
              you accept the new Terms.
            </p>

            <h2>11. Governing law</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which
              bestaietsy operates, without regard to conflict-of-law rules.
              Disputes will be resolved in the competent courts of that
              jurisdiction.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <code>support@bestaietsy.com</code>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}