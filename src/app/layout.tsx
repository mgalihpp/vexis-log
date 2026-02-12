import type { Metadata } from "next";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@/styles.css";
import { AppProviders } from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "Vexis Log",
  description:
    "Vexis Log - Trading Journal that help you track your trades and improve your trading performance.",
  keywords: ["Vexis Log", "Trading Journal", "Trading", "Journal"],
  authors: [{ name: "mgalihpp" }],
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
