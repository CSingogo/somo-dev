import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { ScrollProgressBar } from "@/components/grace-hymns/scroll-progress-bar";
import { graceHymnsConfig, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for the ${graceHymnsConfig.name} mobile application.`,
  alternates: {
    canonical: "/grace-hymns/privacy-policy",
  },
  openGraph: {
    title: `Privacy Policy — ${graceHymnsConfig.name}`,
    description: `Privacy Policy for the ${graceHymnsConfig.name} mobile application.`,
    url: `${siteUrl}/grace-hymns/privacy-policy`,
  },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.05em] text-gh-on-surface-variant">
      <span className="h-px w-6 bg-gh-primary-container" />
      {children}
    </h2>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <ScrollProgressBar />
      <main className="relative pb-24 pt-12">
        <div className="mx-auto mb-12 max-w-[800px] px-4 md:px-0">
          <Link
            href="/grace-hymns/home"
            className="group inline-flex items-center gap-2 text-gh-primary transition-all hover:underline"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.05em]">
              Back to Grace Hymns
            </span>
          </Link>
        </div>

        <article className="mx-auto max-w-[800px] px-4 md:px-0">
          <header className="mb-16 border-b border-gh-outline-variant/20 pb-8">
            <h1 className="mb-4 font-serif text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-gh-on-background">
              Privacy{" "}
              <span className="text-gh-primary-container">Policy</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded border border-gh-outline-variant/30 bg-gh-surface-container-low px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-gh-on-surface-variant">
                VERSION 1.0.4
              </span>
              <p className="text-base italic text-gh-secondary">
                Last updated: July 2, 2026
              </p>
            </div>
          </header>

          <section className="space-y-12">
            <div>
              <SectionHeading>1. Introduction</SectionHeading>
              <div className="space-y-6 leading-relaxed text-gh-on-background">
                <p>
                  Grace Hymns (&quot;Grace Hymns,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;) respects the privacy of its
                  users (&quot;User,&quot; &quot;your,&quot; or &quot;you&quot;).
                  This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use the Grace Hymns mobile
                  application (the &quot;App&quot;). Grace Hymns is a mobile
                  hymnbook that lets users browse, search, and save hymns.
                </p>
                <p className="font-semibold uppercase tracking-tight">
                  PLEASE READ THIS PRIVACY POLICY CAREFULLY TO UNDERSTAND OUR
                  POLICIES AND PRACTICES REGARDING YOUR INFORMATION AND HOW WE
                  WILL TREAT IT.
                </p>
                <p>
                  BY ACCESSING OR USING OUR APP, YOU AGREE TO ACCEPT ALL THE
                  TERMS CONTAINED IN THIS PRIVACY POLICY. IF YOU DO NOT AGREE,
                  PLEASE DO NOT USE THE APP.
                </p>
                <p>
                  IF YOU HAVE ANY QUESTIONS, PLEASE EMAIL US AT{" "}
                  <a
                    href="mailto:singogosingogo@gmail.com"
                    className="border-b border-gh-primary-container/30 font-semibold text-gh-primary-container transition-all hover:border-gh-primary-container"
                  >
                    singogosingogo@gmail.com
                  </a>
                </p>
                <div className="border-l-2 border-gh-primary-container bg-gh-surface-container-low p-4 italic text-gh-secondary">
                  WE DO NOT SELL YOUR PERSONAL INFORMATION, NOR DO WE INTEND TO
                  DO SO.
                </div>
              </div>
            </div>

            <div>
              <SectionHeading>2. What Information Do We Collect?</SectionHeading>
              <div className="space-y-6">
                {[
                  {
                    letter: "a",
                    title: "Account Information",
                    text: "Grace Hymns does not require account registration. The App works without creating an account.",
                  },
                  {
                    letter: "b",
                    title: "Device and Usage Information",
                    text: "We may collect non-personally identifying information such as device type, operating system version, and general usage patterns to improve the App.",
                  },
                  {
                    letter: "c",
                    title: "Hymn Catalog Data",
                    text: "Hymn content (titles, lyrics, numbers, categories) is fetched from our Firebase Firestore database. This is public hymn catalog data, not personal information.",
                  },
                  {
                    letter: "d",
                    title: "Locally Stored Preferences",
                    text: "Favorites and dark mode preferences are stored locally on your device using AsyncStorage. This data never leaves your device unless you choose to share hymn text via the native share sheet.",
                  },
                ].map((item) => (
                  <div key={item.letter} className="flex items-start gap-4">
                    <span className="mt-1 text-xs font-bold text-gh-primary-container">
                      {item.letter}.
                    </span>
                    <p>
                      <strong className="text-gh-on-background">
                        {item.title}
                      </strong>{" "}
                      — {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading>3. Data Security & Third Parties</SectionHeading>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded border border-gh-outline-variant/30 p-6">
                  <h3 className="mb-3 font-serif text-2xl font-semibold text-gh-on-background">
                    Google Firebase
                  </h3>
                  <p className="text-base text-gh-secondary">
                    We utilize Firebase for backend content delivery. While we do
                    not collect personal data, Google may collect technical
                    identifiers as part of their service delivery.
                  </p>
                </div>
                <div className="rounded border border-gh-outline-variant/30 p-6">
                  <h3 className="mb-3 font-serif text-2xl font-semibold text-gh-on-background">
                    Local Encryption
                  </h3>
                  <p className="text-base text-gh-secondary">
                    User preferences and saved hymns are stored in an encrypted
                    sandboxed environment on your mobile device, inaccessible to
                    other applications.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
