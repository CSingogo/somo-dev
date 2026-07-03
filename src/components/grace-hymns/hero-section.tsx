"use client";

import Link from "next/link";
import { ScreenshotCarousel } from "@/components/grace-hymns/screenshot-carousel";
import {
  AppStoreButton,
  GooglePlayButton,
} from "@/components/base/buttons/app-store-buttons";
import { Zap, FileText } from "lucide-react";

const storeBadgeClass =
  "inline-flex shrink-0 [&_svg]:h-10 [&_svg]:w-auto sm:[&_svg]:h-11 md:[&_svg]:h-12 lg:[&_svg]:h-[52px]";

export function HeroSection() {
  return (
    <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-6 md:grid-cols-12 md:gap-8 md:px-12 md:py-0 lg:gap-10 lg:px-20">
      <div className="md:col-span-5 lg:col-span-5">
        <h1 className="mb-4 font-serif text-3xl font-bold leading-[1.1] tracking-tight text-gh-on-background sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
          A Modern{" "}
          <i className="font-normal italic text-gh-primary-container">
            Sanctuary
          </i>{" "}
          for Devotion.
        </h1>
        <p className="mb-6 max-w-md text-sm font-light leading-relaxed text-gh-secondary sm:mb-7 sm:text-base md:mb-8 md:text-lg">
          Engineering spiritual continuity through a high-fidelity hymnbook
          experience. Built with technical precision for the believer.
        </p>
        <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mb-8">
          <GooglePlayButton size="lg" href="#" className={storeBadgeClass} />
          <AppStoreButton size="lg" href="#" className={storeBadgeClass} />
        </div>
        <div className="grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t border-gh-outline-variant pt-6 sm:gap-x-8 sm:pt-8">
          <div className="flex items-center gap-3">
            <Zap
              className="h-5 w-5 shrink-0 text-gh-primary-container"
              strokeWidth={1.5}
            />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gh-secondary">
              Offline Ready
            </span>
          </div>
          <Link
            href="/grace-hymns/privacy-policy"
            className="flex items-center gap-3 transition-colors hover:text-gh-primary-container"
          >
            <FileText
              className="h-5 w-5 shrink-0 text-gh-primary-container"
              strokeWidth={1.5}
            />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gh-secondary">
              Privacy Policy
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center md:col-span-7 lg:col-span-7">
        <ScreenshotCarousel />
      </div>
    </section>
  );
}
