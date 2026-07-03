"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const screenshots = [
  {
    src: "/ghs/home.png",
    alt: "Grace Hymns home screen with searchable hymn list",
  },
  {
    src: "/ghs/detail.png",
    alt: "Grace Hymns hymn detail view with verses",
  },
  {
    src: "/ghs/more.png",
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
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
      <div className="relative aspect-[320/693] w-full max-w-[220px] min-[400px]:max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[400px]">
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
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 400px"
              className="rounded-[2rem] object-cover object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:rounded-[2.5rem] md:drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              priority={i === 0}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2">
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
