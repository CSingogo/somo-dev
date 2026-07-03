import type { Metadata } from "next";
import { Source_Serif_4, Work_Sans, JetBrains_Mono } from "next/font/google";

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
  title: "Grace Hymns — A Modern Sanctuary for Devotion",
  description:
    "Browse, search, and save your favorite hymns. A Firestore-powered mobile hymnbook for iOS and Android.",
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
