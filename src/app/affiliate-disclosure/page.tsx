import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "bestaietsy uses affiliate links to fund independent testing of AI tools for Etsy sellers. Full FTC-compliant disclosure: how commissions work, which vendors we partner with, and what we never recommend regardless of payout.",
  alternates: { canonical: "https://bestaietsy.com/affiliate-disclosure" },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Affiliate Disclosure
          </h1>
          <div className="prose-content">
            <p>
              <strong>Last updated:</strong> July 4, 2026
            </p>

            <p>
              bestaietsy.com is a participant in affiliate programs for Roketfy, eRank, Midjourney, EtsyHunt, Alura, Simplified, and Originality.ai.
              This means when you click on certain links on our site and make a purchase, we may receive a commission at no additional cost to you.
            </p>

            <h2>Our editorial promise</h2>
            <p>
              Affiliate partnerships never influence our reviews or recommendations. We only recommend tools we genuinely believe help Etsy sellers.
              Every review includes honest pros AND cons, regardless of commission rate.
            </p>

            <h2>Current affiliate programs</h2>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Commission</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Roketfy</td><td>35%</td><td>12 months</td></tr>
                <tr><td>eRank</td><td>30%</td><td>12 months (50% after 100 referrals)</td></tr>
                <tr><td>Midjourney</td><td>—</td><td>No public affiliate program</td></tr>
                <tr><td>EtsyHunt</td><td>30%</td><td>6 months</td></tr>
                <tr><td>Alura</td><td>30%</td><td>6 months</td></tr>
                <tr><td>Simplified</td><td>40%</td><td>Recurring</td></tr>
                <tr><td>Originality.ai</td><td>25%</td><td>12 months</td></tr>
              </tbody>
            </table>

            <h2>FTC compliance</h2>
            <p>
              This disclosure is provided in accordance with the Federal Trade Commission's 16 CFR Part 255 ("Guides Concerning the Use of Endorsements and Testimonials in Advertising").
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}