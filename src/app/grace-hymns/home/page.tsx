import type { Metadata } from "next";
import { HeroSection } from "@/components/grace-hymns/hero-section";
import { graceHymnsConfig, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
  description: graceHymnsConfig.description,
  alternates: {
    canonical: "/grace-hymns/home",
  },
  openGraph: {
    title: `${graceHymnsConfig.name} — A Modern Sanctuary for Devotion`,
    description: graceHymnsConfig.shortDescription,
    url: `${siteUrl}/grace-hymns/home`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: graceHymnsConfig.name,
  description: graceHymnsConfig.description,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "iOS, Android",
  url: `${siteUrl}/grace-hymns/home`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function GraceHymnsHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-0 flex-1 items-center overflow-x-hidden overflow-y-auto md:overflow-hidden">
        <HeroSection />
      </main>
    </>
  );
}
