import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { product } from "../../product.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(product.siteUrl),
  title: {
    default: `${product.fullName} — ${product.tagline.en}`,
    template: `%s · ${product.fullName}`,
  },
  description: product.description.en,
  applicationName: product.fullName,
  openGraph: {
    type: "website",
    url: product.siteUrl,
    siteName: product.fullName,
    title: `${product.fullName} — ${product.tagline.en}`,
    description: product.description.en,
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${product.fullName} — ${product.tagline.en}`,
    description: product.description.en,
    images: ["/images/og-cover.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
