import Link from "next/link";
import { Flame, FileText, Wrench, ScrollText, Users } from "lucide-react";

const navItems = [
  { href: "/blog", label: "Articles", icon: FileText },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/etsy-policies", label: "Policies", icon: ScrollText },
  { href: "/best-for", label: "Best For", icon: Users },
];

export function SiteHeader() {
  return (
    <header className="border-b-4 border-primary-500 bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            viewBox="0 0 64 64"
            width="40"
            height="40"
            className="drop-shadow-sm transition group-hover:scale-105"
          >
            <defs>
              <linearGradient id="hdrOuter" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#D8500F" />
                <stop offset="60%" stopColor="#F1641E" />
                <stop offset="100%" stopColor="#FFA171" />
              </linearGradient>
              <linearGradient id="hdrInner" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#FFA171" />
                <stop offset="100%" stopColor="#FFE5A0" />
              </linearGradient>
            </defs>
            <path
              d="M 32 4 C 28 12 22 18 20 26 C 18 32 12 34 12 42 C 12 52 20 60 32 60 C 44 60 52 52 52 42 C 52 34 46 32 44 26 C 42 18 36 12 32 4 Z"
              fill="url(#hdrOuter)"
            />
            <path
              d="M 32 22 C 30 28 26 32 26 38 C 26 46 30 52 32 52 C 34 52 38 46 38 38 C 38 32 34 28 32 22 Z"
              fill="url(#hdrInner)"
              opacity="0.9"
            />
            <path
              d="M 44 14 L 45.5 17.5 L 49 19 L 45.5 20.5 L 44 24 L 42.5 20.5 L 39 19 L 42.5 17.5 Z"
              fill="#FFFCF7"
            />
            <circle cx="20" cy="22" r="1.5" fill="#FFFCF7" />
          </svg>
          <div className="leading-none">
            <p className="font-display font-bold text-xl text-brown-900">
              bestaietsy
            </p>
            <p className="font-mono text-[10px] text-brown-600 mt-1 tracking-widest">
              AI TOOLKIT FOR ETSY
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brown-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 hover:text-primary-600 transition"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#subscribe"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border-2 border-primary-500 px-4 py-1.5 text-sm font-semibold text-primary-600 hover:bg-primary-500 hover:text-cream-50 transition"
        >
          <Flame className="w-4 h-4" />
          Subscribe
        </Link>
      </div>
    </header>
  );
}