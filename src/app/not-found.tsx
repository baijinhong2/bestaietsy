import Link from "next/link";
import { Flame, ArrowLeft, Mail } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <header className="border-b-4 border-primary-500 bg-cream-50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" width="36" height="36">
              <defs>
                <linearGradient id="nf1" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#D8500F" />
                  <stop offset="60%" stopColor="#F1641E" />
                  <stop offset="100%" stopColor="#FFA171" />
                </linearGradient>
              </defs>
              <path d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z" fill="url(#nf1)" />
              <path d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z" fill="#FFE5A0" opacity="0.9" />
              <path d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z" fill="#FFFCF7" />
            </svg>
            <span className="font-display font-bold text-lg text-brown-900">bestaietsy</span>
          </Link>
        </div>
      </header>

      <main className="min-h-[60vh] flex items-center justify-center bg-cream-50 py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <p className="font-mono text-sm text-primary-700 uppercase tracking-widest mb-3">404</p>
          <h1 className="font-display text-5xl font-black text-brown-900 mb-4">
            This page got away
          </h1>
          <p className="text-lg text-brown-700 mb-8">
            We couldn't find what you were looking for. The link may be outdated, or the article may have been moved.
          </p>

          <div className="bg-cream-100 border border-cream-300 rounded-2xl p-6 mb-8 text-left">
            <p className="font-mono text-xs text-brown-600 uppercase tracking-wider mb-3">Try one of these:</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-semibold">
                  <ArrowLeft className="w-4 h-4" />
                  Back to homepage
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-700 hover:text-primary-800">
                  Browse all articles
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-primary-700 hover:text-primary-800">
                  Browse tool reviews
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-primary-700 hover:text-primary-800">
                  See Etsy policy updates
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="#subscribe"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-cream-50 font-bold px-6 py-3 rounded-full transition shadow-warm"
          >
            <Mail className="w-4 h-4" />
            Get the weekly Etsy AI digest
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}