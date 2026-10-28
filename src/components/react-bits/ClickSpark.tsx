import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface ClickSparkProps {
  /** Any CSS color. Defaults to the wrapper's current text color, so it follows the theme. */
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  /** Milliseconds. */
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  shape?: "line" | "circle";
  className?: string;
  children?: ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
  color: string;
}

const ease = (t: number, kind: NonNullable<ClickSparkProps["easing"]>) =>
  kind === "linear"
    ? t
    : kind === "ease-in"
      ? t * t
      : kind === "ease-in-out"
        ? t < 0.5
          ? 2 * t * t
          : -1 + (4 - 2 * t) * t
        : t * (2 - t);

export default function ClickSpark({
  sparkColor,
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  shape = "line",
  className,
  children,
}: ClickSparkProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const raf = useRef(0);

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = devicePixelRatio || 1;

      sparks.current = sparks.current.filter((s) => {
        const t = (now - s.start) / duration;
        if (t >= 1) return false;
        const e = ease(t, easing);
        const dist = e * sparkRadius * extraScale;
        const len = sparkSize * (1 - e);
        const x1 = (s.x + dist * Math.cos(s.angle)) * dpr;
        const y1 = (s.y + dist * Math.sin(s.angle)) * dpr;
        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        ctx.lineWidth = 2 * dpr;
        ctx.lineCap = "round";
        if (shape === "circle") {
          ctx.beginPath();
          ctx.arc(x1, y1, (len / 2) * dpr, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const x2 = (s.x + (dist + len) * Math.cos(s.angle)) * dpr;
          const y2 = (s.y + (dist + len) * Math.sin(s.angle)) * dpr;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        return true;
      });

      if (sparks.current.length) raf.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    [duration, easing, extraScale, shape, sparkRadius, sparkSize],
  );

  // A fixed, viewport-sized canvas so sparks aren't clipped to the wrapper.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
    };
    resize();
    addEventListener("resize", resize);
    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const onClick = (e: React.MouseEvent) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const color = sparkColor ?? (wrapRef.current ? getComputedStyle(wrapRef.current).color : "#fff");
    const start = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparks.current.push({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        start,
        color,
      });
    }
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(draw);
  };

  return (
    <div ref={wrapRef} className={className} onClick={onClick}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen"
      />
      {children}
    </div>
  );
}
