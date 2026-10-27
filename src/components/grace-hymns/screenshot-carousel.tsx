import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Bump when replacing public/ghs assets so browsers / Cloudflare drop stale caches.
const ASSET_VERSION = "2026-07-08b";

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

export default function ScreenshotCarousel() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    screenshots.map(() => false),
  );

  useEffect(() => {
    screenshots.forEach((shot, i) => {
      const img = new window.Image();
      img.onload = () => {
        setLoaded((prev) => {
          if (prev[i]) return prev;
          const next = [...prev];
          next[i] = true;
          return next;
        });
      };
      img.onerror = () => {
        // Still mark as attempted so the UI can recover instead of spinning forever.
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      };
      img.src = shot.src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        // Prefer advancing to a slide that is already loaded.
        for (let step = 1; step <= screenshots.length; step += 1) {
          const next = (i + step) % screenshots.length;
          if (loaded[next]) return next;
        }
        return (i + 1) % screenshots.length;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [loaded]);

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:gap-4 md:gap-3">
      <div className="relative mx-auto aspect-[1284/2778] w-full max-w-[250px] min-[400px]:max-w-[280px] sm:max-w-[300px] md:h-[min(78dvh,720px)] md:w-auto md:max-w-[min(42vw,380px)] lg:max-w-[400px]">
        {!loaded[index] && (
          <div
            aria-hidden
            className="absolute inset-[6%] animate-pulse rounded-[2rem] bg-gh-surface-container-high/40"
          />
        )}
        {screenshots.map((shot, i) => (
          <motion.div
            key={shot.src}
            className="absolute inset-0 will-change-[opacity]"
            initial={false}
            animate={{ opacity: i === index && loaded[i] ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden={i !== index}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={1284}
              height={2778}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
              className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              onLoad={() => {
                setLoaded((prev) => {
                  if (prev[i]) return prev;
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }}
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
