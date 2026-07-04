import Link from "next/link";
import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brown-900 text-cream-200 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="font-display font-bold text-lg mb-3 text-cream-50">
              bestaietsy
            </p>
            <p className="text-sm text-brown-300 leading-relaxed">
              The AI toolkit for smart Etsy sellers. Honest reviews, policy
              updates, weekly guides.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Read
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-primary-300 transition">All Articles</Link></li>
              <li><Link href="/policies" className="hover:text-primary-300 transition">Etsy Policies</Link></li>
              <li><Link href="/tools" className="hover:text-primary-300 transition">Tool Reviews</Link></li>
              <li><Link href="/best-for" className="hover:text-primary-300 transition">Best For You</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-300 transition">About Us</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-primary-300 transition">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-300 transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs text-brown-400 uppercase tracking-wider mb-3">
              Subscribe
            </p>
            <p className="text-sm text-brown-300 mb-3">
              Get weekly Etsy AI digests. Free, no spam.
            </p>
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-cream-50 hover:bg-primary-600 transition"
            >
              Join the newsletter →
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-brown-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-brown-400">
          <span>© 2026 bestaietsy.com · All rights reserved</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-coral-400 fill-current" /> + AI
          </span>
        </div>
      </div>
    </footer>
  );
}