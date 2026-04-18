"use client";

import { motion } from "motion/react";
import { siteConfig } from "@/lib/data/site";
import { EASE_HERO } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SuccessPanelProps {
  onReset: () => void;
}

export function SuccessPanel({ onReset }: SuccessPanelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      role="status"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE_HERO }}
      className="flex flex-col items-center gap-6 py-10 text-center"
    >
      <DrawCheck reduced={reduced} />
      <motion.div
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 1, duration: 0.4, ease: EASE_HERO }}
        className="flex max-w-md flex-col items-center gap-2"
      >
        <h3 className="font-display text-2xl font-semibold">
          Thanks — message received.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We&apos;ll reply within the hour during studio hours. If it&apos;s urgent,
          ping us on WhatsApp at{" "}
          <span className="text-foreground">{siteConfig.whatsapp.displayNumber}</span>.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    </motion.div>
  );
}

function DrawCheck({ reduced }: { reduced: boolean }) {
  const circleTransition = {
    duration: reduced ? 0 : 0.5,
    ease: EASE_HERO,
  };
  const pathTransition = {
    duration: reduced ? 0 : 0.4,
    delay: reduced ? 0 : 0.5,
    ease: EASE_HERO,
  };

  return (
    <svg
      viewBox="0 0 80 80"
      className="h-20 w-20"
      aria-hidden
      role="presentation"
    >
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="oklch(0.62 0.22 285)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        initial={{ strokeDashoffset: reduced ? 0 : 1 }}
        animate={{ strokeDashoffset: 0 }}
        transition={circleTransition}
      />
      <motion.path
        d="M 24 42 L 36 54 L 58 30"
        fill="none"
        stroke="oklch(0.62 0.22 285)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        initial={{ strokeDashoffset: reduced ? 0 : 1 }}
        animate={{ strokeDashoffset: 0 }}
        transition={pathTransition}
      />
    </svg>
  );
}
