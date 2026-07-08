"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Bump when replacing public/ghs assets so browsers / Cloudflare / next/image drop stale caches.
const ASSET_VERSION = "2026-07-08";

const screenshots = [
  {
    src: `/ghs/home.png?v=${ASSET_VERSION}`,
    alt: "Grace Hymns home screen with searchable hymn list",
  },
  {
    src: `/ghs/detail.png?v=${ASSET_VERSION}`,
    alt: "Grace Hymns hymn detail view with verses",
  },
  {
    src: `/ghs/more.png?v=${ASSET_VERSION}`,
    alt: "Grace Hymns settings and more screen",
  },
];

export function ScreenshotCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    screenshots.forEach((shot) => {
      const img = new window.Image();
      img.src = shot.src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % screenshots.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:gap-4 md:gap-3">
      {/* Size the phone to match left-column visual weight; dots stay below. */}
      <div className="relative mx-auto aspect-[1284/2778] w-full max-w-[250px] min-[400px]:max-w-[280px] sm:max-w-[300px] md:h-[min(78dvh,720px)] md:w-auto md:max-w-[min(42vw,380px)] lg:max-w-[400px]">
        {screenshots.map((shot, i) => (
          <motion.div
            key={shot.src}
            className="absolute inset-0 will-change-[opacity]"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={i !== index}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              priority={i === 0}
              unoptimized
            />
          </motion.div>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index
                ? "w-8 bg-gh-primary-container"
                : "w-2 bg-gh-outline-variant hover:bg-gh-primary-container/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
