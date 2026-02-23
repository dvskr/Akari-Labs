import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1A1F2E",
};

export const metadata: Metadata = {
  title: "Akari Labs — Healthcare & Fitness Technology",
  description:
    "Akari Labs builds focused SaaS products for healthcare recruiting and fitness tracking. Home of PMHNP Hiring (10,000+ psychiatric NP jobs) and Gym Tracker.",
  metadataBase: new URL("https://akarilabs.io"),
  openGraph: {
    title: "Akari Labs — Software that lights the way.",
    description:
      "Akari Labs builds focused SaaS products for healthcare recruiting and fitness tracking. Home of PMHNP Hiring (10,000+ psychiatric NP jobs) and Gym Tracker.",
    url: "https://akarilabs.io",
    siteName: "Akari Labs",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akari Labs — Software that lights the way.",
    description:
      "Akari Labs builds focused SaaS products for healthcare recruiting and fitness tracking.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/lantern-icon.jpg",
    apple: "/lantern-icon.jpg",
  },
  alternates: {
    canonical: "https://akarilabs.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;700&family=Noto+Serif+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

