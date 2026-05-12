"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltOnHoverProps {
  children: ReactNode;
  className?: string;
  max?: number;
  perspective?: number;
}

// Rotates a card in response to cursor position over its surface. Uses
// `transform-style: preserve-3d` so nested children with `translateZ` lift
// off the card for parallax depth.
export function TiltOnHover({
  children,
  className,
  max = 6,
  perspective = 900,
}: TiltOnHoverProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 240, damping: 26 });
  const springY = useSpring(ry, { stiffness: 240, damping: 26 });

  const rotateX = useTransform(springX, (v) => `${v}deg`);
  const rotateY = useTransform(springY, (v) => `${v}deg`);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ perspective, rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
