import type { Metadata } from "next";
import "./globals.css";

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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className="min-h-screen bg-cream-50 text-brown-900 antialiased">
        {children}
      </body>
    </html>
  );
}