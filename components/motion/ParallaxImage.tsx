"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

// Scroll-linked vertical shift for images. Uses `useScroll` with target=ref so
// the shift is local to the element's window crossing — images only parallax
// while they're on screen, avoiding global scroll coupling.
export function ParallaxImage({
  children,
  className,
  strength = 0.15,
}: ParallaxImageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [`${strength * 100}%`, `${-strength * 100}%`],
  );
  const y = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduced ? undefined : { y, willChange: "transform" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
