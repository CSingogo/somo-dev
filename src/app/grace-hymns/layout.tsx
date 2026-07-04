import type { Metadata } from "next";
import { Source_Serif_4, Work_Sans, JetBrains_Mono } from "next/font/google";
import { graceHymnsConfig, siteUrl } from "@/lib/site";

const ogImage = {
  url: "/og-grace-hymns.png",
  width: 1024,
  height: 1024,
  alt: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
};

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
  description: graceHymnsConfig.description,
  keywords: [
    "Grace Hymns",
    "hymnbook app",
    "hymns",
    "Christian hymns",
    "offline hymnbook",
    "iOS",
    "Android",
  ],
  openGraph: {
    title: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
    description: graceHymnsConfig.shortDescription,
    url: `${siteUrl}/grace-hymns/home`,
    type: "website",
    images: [ogImage],
  },
  twitter: {
    title: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
    description: graceHymnsConfig.shortDescription,
    images: [ogImage.url],
  },
  alternates: {
    canonical: "/grace-hymns/home",
  },
};

export default function GraceHymnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grace-hymns-theme ${sourceSerif.variable} ${workSans.variable} ${jetbrainsMono.variable} min-h-full bg-gh-background font-[family-name:var(--font-work-sans)] text-gh-on-background antialiased selection:bg-gh-primary/20 [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif`}
    >
      {children}
    </div>
  );
}
