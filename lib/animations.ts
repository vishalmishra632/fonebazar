import type { Variants } from "motion/react";

type CubicBezier = [number, number, number, number];

export const EASE_HERO: CubicBezier = [0.16, 1, 0.3, 1];
export const EASE_SECTION: CubicBezier = [0.22, 1, 0.36, 1];
export const EASE_MICRO: CubicBezier = [0.4, 0, 0.2, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SECTION },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE_MICRO } },
};

export const stagger = (gap = 0.08, delay = 0.15): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});
