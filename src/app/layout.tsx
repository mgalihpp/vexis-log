import type { Metadata } from "next";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@/styles.css";
import { AppProviders } from "@/components/AppProviders";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo";

const siteName = "Vexis Log";
const siteDescription =
  "Trading journal app untuk mencatat trade, evaluasi performa, dan meningkatkan konsistensi trading.";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vexis Log | Trading Journal",
    template: "%s | Vexis Log",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Vexis Log",
    "Trading Journal",
    "Jurnal Trading",
    "Trade Analytics",
    "Forex Journal",
    "Crypto Trading Journal",
  ],
  authors: [{ name: "mgalihpp" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Vexis Log | Trading Journal",
    description: siteDescription,
    images: [
      {
        url: getAbsoluteUrl("/features1.png"),
        width: 1200,
        height: 630,
        alt: "Vexis Log feature preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vexis Log | Trading Journal",
    description: siteDescription,
    images: [getAbsoluteUrl("/features1.png")],
  },
  verification: {
    google: "RYMUPhw0xFALCYGVMLQNRRaL4P29wKs9DmSEslffMGA",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
