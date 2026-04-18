"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface PageCurtainProps {
  children: ReactNode;
}

export function PageCurtain({ children }: PageCurtainProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!reduced ? (
        <motion.div
          key={`curtain-${pathname}`}
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9998] bg-brand"
        />
      ) : null}
    </>
  );
}
