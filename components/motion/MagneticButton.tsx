"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

// Magnetic pull + scale-down on press. The label inside translates slightly
// further than the shell (via the nested `motion.span`) to create a sense of
// depth — "button pulls forward, label pulls forward a little more."
export function MagneticButton({
  children,
  className,
  strength = 0.28,
  radius = 80,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    if (Math.hypot(dx, dy) > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
