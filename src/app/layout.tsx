import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_TOKEN = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://bestaietsy.com"),
  title: {
    default: "bestaietsy — The AI toolkit for smart Etsy sellers",
    template: "%s | bestaietsy",
  },
  description:
    "Etsy's 2026 policy changes, AI tool reviews, and weekly guides for Etsy sellers. Honest tools tested by real sellers. No fluff.",
  keywords: [
    "Etsy AI tools",
    "Etsy seller tools 2026",
    "Etsy animal fur policy",
    "best AI for Etsy",
    "Etsy listing optimization",
    "Roketfy review",
    "eRank review",
    "Etsy policy 2026",
  ],
  authors: [{ name: "bestaietsy team" }],
  creator: "bestaietsy",
  publisher: "bestaietsy",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bestaietsy.com",
    siteName: "bestaietsy",
    title: "bestaietsy — The AI toolkit for smart Etsy sellers",
    description:
      "Etsy's 2026 policy changes, AI tool reviews, and weekly guides for Etsy sellers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "bestaietsy — AI tools for Etsy sellers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bestaietsy — The AI toolkit for smart Etsy sellers",
    description:
      "Etsy's 2026 policy changes, AI tool reviews, and weekly guides for Etsy sellers.",
    images: ["/og-image.png"],
  },
  icons: {
    // Google SERP favicon: Google specifically crawls /favicon.ico at the root.
    // Declared FIRST so browsers / Googlebot pick the canonical format.
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console verification — paste token from GSC dashboard
  ...(GSC_TOKEN ? { verification: { google: GSC_TOKEN } } : {}),
};

// Site-wide JSON-LD: Organization + WebSite (with SearchAction)
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://bestaietsy.com/#organization",
    name: "bestaietsy",
    url: "https://bestaietsy.com",
    logo: "https://bestaietsy.com/logo.svg",
    description:
      "English-language (US) publication for Etsy sellers. Honest AI tool reviews, policy updates, and weekly guides.",
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://bestaietsy.com/#website",
    name: "bestaietsy",
    url: "https://bestaietsy.com",
    publisher: { "@id": "https://bestaietsy.com/#organization" },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bestaietsy.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
];

// Google Consent Mode v2 — default denied until user grants.
// CookieConsent component fires gtag('consent','update',...) on accept.
const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('js', new Date());
${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ""}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-cream-50 text-brown-900 antialiased">
        {/* Google Consent Mode v2 — must run BEFORE gtag loads */}
        {GA_ID && (
          <Script id="gtag-consent-default" strategy="beforeInteractive">
            {consentDefaultScript}
          </Script>
        )}

        {/* Google Analytics 4 — loaded afterInteractive. Consent mode gates it. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}

        {children}

        {/* Cookie consent UI — listens for first-visit, fires consent updates */}
        <CookieConsent />
      </body>
    </html>
  );
}