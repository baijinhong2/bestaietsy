import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-brown-900 text-cream-200 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-display font-bold text-lg mb-3 text-cream-50">
              bestaietsy
            </p>
            <p className="text-sm text-brown-300 leading-relaxed">
              The AI toolkit for smart Etsy sellers. Honest reviews, policy
              updates, weekly guides.
            </p>
          </div>

          {/* Read */}
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Read
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-primary-300 transition">All Articles</Link></li>
              <li><Link href="/etsy-policies" className="hover:text-primary-300 transition">Etsy Policies</Link></li>
              <li><Link href="/tools" className="hover:text-primary-300 transition">Tool Reviews</Link></li>
              <li><Link href="/best-for" className="hover:text-primary-300 transition">Best For You</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-300 transition">About Us</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-primary-300 transition">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms-of-service" className="hover:text-primary-300 transition">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary-300 transition">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary-300 transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Support
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link href="/contact" className="hover:text-primary-300 transition">Contact Us</Link></li>
              <li><Link href="/feedback" className="hover:text-primary-300 transition">Send Feedback</Link></li>
            </ul>
            <p className="text-xs text-brown-400 mb-1.5">All emails:</p>
            <a
              href="mailto:support@bestaietsy.com"
              className="text-sm text-primary-300 hover:text-primary-200 transition break-all"
            >
              support@bestaietsy.com
            </a>
          </div>
        </div>

        {/* Newsletter CTA — full width */}
        <div className="border-t border-brown-800 pt-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-display text-lg font-bold text-cream-50 mb-1">
                Weekly Etsy AI digest
              </p>
              <p className="text-sm text-brown-300">
                1 curated article + 1 tip + 1 policy alert. Every Tuesday. Free.
              </p>
            </div>
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-primary-600 transition shrink-0"
            >
              Join the newsletter →
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-brown-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-brown-400">
          <span>© 2026 bestaietsy.com · All rights reserved</span>
          <span>
            Built for Etsy sellers, with{" "}
            <span className="text-coral-400">♥</span>
          </span>
        </div>
      </div>
    </footer>
  );
}