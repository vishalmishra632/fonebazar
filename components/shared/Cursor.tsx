"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="target"], input[type="checkbox"], input[type="radio"], label[for]';

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.2 });

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateEnabled() {
      const next = pointerFine.matches && !reducedMotion.matches;
      setEnabled(next);
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("cursor-custom", next);
      }
    }

    updateEnabled();
    pointerFine.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      pointerFine.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("cursor-custom");
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function move(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    function over(event: PointerEvent) {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    }
    function down() {
      setPressed(true);
    }
    function up() {
      setPressed(false);
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!mounted || !enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: pressed ? 0.9 : hovering ? 2 : 1,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-4 -mt-4 h-8 w-8 rounded-full border border-brand"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: hovering ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-brand"
      />
    </>
  );
}
