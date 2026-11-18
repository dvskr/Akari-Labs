import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./akari.css";

const DESCRIPTION =
  "Akari Labs builds and runs focused products: job boards for one healthcare profession at a time, job search inside ChatGPT and Claude, and Tetsu, a workout app.";

export const viewport: Viewport = {
  themeColor: "#07130F",
  colorScheme: "dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Akari Labs",
  description: DESCRIPTION,
  metadataBase: new URL("https://akarilabs.io"),
  openGraph: {
    title: "Akari Labs: we build and run focused products",
    description: DESCRIPTION,
    url: "https://akarilabs.io",
    siteName: "Akari Labs",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Akari Labs: a ring of clay islands, one for each product" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akari Labs: we build and run focused products",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The root layout wraps every page, so these faces load everywhere; the rule is about the old pages router. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Geist:wght@400..700&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
