import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site, person, socials } from "@/data/content";
import Providers from "@/components/Providers";

// One family with a width axis: the hero animates it, everything else stays at normal width.
const sans = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: person.fullName, url: site.url }],
  creator: person.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: person.fullName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0b09",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.fullName,
  jobTitle: person.role,
  email: `mailto:${person.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  alumniOf: "Ahram Canadian University",
  sameAs: [socials.github.href, socials.linkedin.href],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
