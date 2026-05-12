"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  maxPull?: number;
  radius?: number;
}

// Card-scale magnetic pull — softer than the button variant because cards are
// bigger and a loud pull makes them feel "floaty". Activates when the cursor
// is within `radius` of the centre.
export function MagneticCard({
  children,
  className,
  maxPull = 8,
  radius = 140,
}: MagneticCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy);
    if (distance > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const falloff = 1 - distance / radius;
    x.set((dx / radius) * maxPull * falloff);
    y.set((dy / radius) * maxPull * falloff);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
