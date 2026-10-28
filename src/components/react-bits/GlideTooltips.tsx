import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface Tip {
  text: string;
  x: number;
  y: number;
}

const OFFSET = 12;
const CLOSE_DELAY = 200;

// One shared popup for every `[data-tip]` element on the page. It glides from trigger to
// trigger instead of closing and reopening (the Animate UI tooltip behaviour).
export default function GlideTooltips() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [visible, setVisible] = useState(false);
  const jump = useRef(true); // first show of a sequence snaps into place, then glides
  const closeTimer = useRef<number>(0);

  useEffect(() => {
    const show = (el: Element) => {
      const text = el.getAttribute("data-tip");
      if (!text) return;
      clearTimeout(closeTimer.current);
      const r = el.getBoundingClientRect();
      setTip({ text, x: r.left + r.width / 2, y: r.top - OFFSET });
      setVisible(true);
    };
    const hide = () => {
      clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(() => {
        setVisible(false);
        jump.current = true;
      }, CLOSE_DELAY);
    };
    const target = (e: Event) => (e.target instanceof Element ? e.target.closest("[data-tip]") : null);

    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = target(e);
      if (el) show(el);
    };
    const out = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && target(e)) hide();
    };
    const focusIn = (e: FocusEvent) => {
      const el = target(e);
      if (el) show(el);
    };
    const focusOut = (e: FocusEvent) => {
      if (target(e)) hide();
    };

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("focusin", focusIn);
    document.addEventListener("focusout", focusOut);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("focusin", focusIn);
      document.removeEventListener("focusout", focusOut);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const snap = jump.current;
  if (visible) jump.current = false;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      initial={false}
      animate={{ x: tip?.x ?? 0, y: tip?.y ?? 0 }}
      transition={snap ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 36 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-gh-on-background px-3 py-1.5 text-xs text-gh-background"
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92, y: visible ? 0 : 4 }}
        transition={{ duration: 0.15 }}
      >
        {tip?.text}
        <span className="absolute left-1/2 top-full size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-gh-on-background" />
      </motion.div>
    </motion.div>
  );
}
