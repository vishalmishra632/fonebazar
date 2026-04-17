import type { Transition, Variants } from "motion/react";

export const easeStandard: Transition["ease"] = [0.22, 1, 0.36, 1];
export const easeMicro: Transition["ease"] = [0.4, 0, 0.2, 1];
export const easeHero: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeStandard } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: easeMicro } },
};

export const stagger = (gap = 0.08, delay = 0.15): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});
