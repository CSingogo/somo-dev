import type { Metadata } from "next";
import { DarkVeilBackground } from "@/components/dark-veil-background";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <DarkVeilBackground />
    </main>
  );
}
