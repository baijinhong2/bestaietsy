import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How bestaietsy uses cookies and similar technologies — analytics, third-party embeds, and your choices.",
  alternates: { canonical: "https://bestaietsy.com/cookie-policy" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Cookie Policy
          </h1>
          <div className="prose-content">
            <p>
              <strong>Last updated:</strong> July 6, 2026
            </p>
            <p>
              This page explains what cookies are, which ones bestaietsy uses,
              and how you can control them. It should be read together with our{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </p>

            <h2>1. What are cookies?</h2>
            <p>
              Cookies are small text files that a website stores on your device
              when you visit it. They help the site remember your actions and
              preferences over time, and they help us understand how the site is
              being used.
            </p>

            <h2>2. Cookies we use</h2>
            <p>
              bestaietsy aims to use the minimum cookies necessary. We use
              cookies for the categories below. Each is only set after you give
              consent via the cookie banner (except &ldquo;Necessary&rdquo;,
              which is always on).
            </p>

            <h3>2.1 Analytics — Google Analytics (only with consent)</h3>
            <p>
              We use Google Analytics to count visits and understand which
              articles are read. Google Analytics sets first-party cookies
              (typically named <code>_ga</code>, <code>_ga_*</code>,{" "}
              <code>_gid</code>) that store an anonymized identifier and the
              timestamp of your visit. IP addresses are anonymized before
              storage.
            </p>
            <p>
              Google may transfer this data to servers outside your country. See
              Google&rsquo;s{" "}
              <a
                href="https://policies.google.com/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy Policy
              </a>{" "}
              for how it handles the data.
            </p>

            <h3>2.2 Essential — newsletter and preferences</h3>
            <p>
              When you submit the newsletter sign-up form, a session cookie may
              be set to prevent duplicate submissions and remember your in-page
              state. This cookie expires when you close the browser.
            </p>

            <h3>2.3 Third-party embeds</h3>
            <p>
              Some articles embed videos, podcasts, or interactive widgets from
              third parties (for example YouTube, Spotify). Those embeds can
              set their own cookies when you load or interact with them. We
              embed them in a privacy-friendly way where possible (e.g.
              click-to-load), but once you choose to play the embed, that
              third party&rsquo;s cookies apply.
            </p>

            <h3>2.4 Advertising — Google AdSense (only with consent)</h3>
            <p>
              When you accept the &ldquo;Marketing&rdquo; category in our cookie
              banner, bestaietsy displays ads served by Google AdSense. AdSense
              uses cookies (commonly named <code>__gads</code>,{" "}
              <code>IDE</code>, <code>id</code>, <code>ANID</code>) and similar
              identifiers to:
            </p>
            <ul>
              <li>Show relevant ads and limit how often you see a given ad.</li>
              <li>
                Measure ad performance (impressions, clicks, conversions) so
                we can earn revenue to keep bestaietsy free.
              </li>
              <li>
                Build a profile of your interests across sites that use AdSense
                (<em>only if you accept personalization</em>).
              </li>
            </ul>
            <p>
              Google acts as the data processor for AdSense. See{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google&rsquo;s advertising policies
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Privacy Policy
              </a>{" "}
              for details. You can opt out of personalized ads at any time by
              visiting{" "}
              <a
                href="https://adssettings.google.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Settings
              </a>
              .
            </p>

            <h2>3. Cookies we do not use</h2>
            <ul>
              <li>Cross-site tracking pixels (Facebook, TikTok, etc.).</li>
              <li>Affiliate-network tracking beyond the standard first-party
                click ID.</li>
            </ul>

            <h2>4. Your choices</h2>
            <p>You can control cookies in several ways:</p>
            <ul>
              <li>
                <strong>Browser settings</strong> — Most browsers let you block
                or delete cookies for any site. See your browser&rsquo;s help
                page for instructions.
              </li>
              <li>
                <strong>Google Analytics Opt-out</strong> — Install the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>{" "}
                to block analytics on all sites that use GA.
              </li>
              <li>
                <strong>Do Not Track</strong> — We honor the Do Not Track (DNT)
                browser signal where technically feasible.
              </li>
              <li>
                <strong>EU/UK consent</strong> — If you are in the EU, UK, or a
                jurisdiction with similar rules, you will see a cookie banner
                the first time you visit and can opt in or out of non-essential
                cookies.
              </li>
            </ul>

            <h2>5. Updates to this policy</h2>
            <p>
              We may update this page if we add or remove cookies. The
              &ldquo;Last updated&rdquo; date at the top will always reflect
              the latest change. Material changes will be highlighted in our
              newsletter.
            </p>

            <h2>6. Contact</h2>
            <p>
              Questions about cookies or your privacy? Email{" "}
              <code>support@bestaietsy.com</code>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}