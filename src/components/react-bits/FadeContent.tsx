import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Effect = "fade" | "mist" | "rise" | "blur";

interface FadeContentProps {
  children?: ReactNode;
  effect?: Effect;
  /** Seconds. */
  duration?: number;
  /** GSAP-style name, e.g. "power2.out". */
  ease?: string;
  /** Seconds between each child. 0 animates the container as one. */
  stagger?: number;
  /** Fraction of the element that must be visible to start. */
  threshold?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

const EASES: Record<string, string> = {
  "power1.out": "cubic-bezier(0.5, 1, 0.89, 1)",
  "power2.out": "cubic-bezier(0.33, 1, 0.68, 1)",
  "power3.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power4.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "power2.inOut": "cubic-bezier(0.65, 0, 0.35, 1)",
  none: "linear",
};

const FRAMES: Record<Effect, [Keyframe, Keyframe]> = {
  fade: [{ opacity: 0 }, { opacity: 1 }],
  mist: [
    { opacity: 0, filter: "blur(12px)", transform: "translateY(10px)" },
    { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
  ],
  rise: [
    { opacity: 0, transform: "translateY(16px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  blur: [
    { opacity: 0, filter: "blur(10px)" },
    { opacity: 1, filter: "blur(0px)" },
  ],
};

// Astro passes island children as a single <astro-slot>; stagger its children.
function targetsOf(root: HTMLElement): HTMLElement[] {
  const first = root.firstElementChild;
  const kids =
    root.children.length === 1 && first?.tagName === "ASTRO-SLOT" ? first.children : root.children;
  return Array.from(kids) as HTMLElement[];
}

export default function FadeContent({
  children,
  effect = "fade",
  duration = 1,
  ease = "power2.out",
  stagger = 0,
  threshold = 0.1,
  delay = 0,
  className,
  style,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.opacity = "1";
      return;
    }

    const items = stagger > 0 ? targetsOf(root) : [root];
    const [from, to] = FRAMES[effect];
    const easing = EASES[ease] ?? "ease-out";

    // Children start hidden; the container itself is revealed immediately.
    if (stagger > 0) {
      items.forEach((el) => (el.style.opacity = "0"));
      root.style.opacity = "1";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        items.forEach((el, i) => {
          const anim = el.animate([from, to], {
            duration: duration * 1000,
            delay: (delay + i * stagger) * 1000,
            easing,
            fill: "both",
          });
          // Drop the animation once done: a lingering transform/filter would become the
          // containing block for fixed descendants (ClickSpark's canvas).
          anim.finished
            .then(() => {
              anim.cancel();
              el.style.opacity = "";
            })
            .catch(() => {});
        });
        root.style.opacity = "1";
      },
      { threshold },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [effect, duration, ease, stagger, threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      // Hidden until JS takes over; the <noscript> rule in BaseLayout reveals it without JS.
      style={{ opacity: 0, ...style }}
      data-fade-content
    >
      {children}
    </div>
  );
}
