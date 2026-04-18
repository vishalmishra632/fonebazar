"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    if (reduced || !lenis) {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }
    lenis.scrollTo(0, { duration: 1.2 });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1.2, 0.36, 1] }}
          whileHover={reduced ? undefined : { scale: 1.06 }}
          whileTap={reduced ? undefined : { scale: 0.96 }}
          className="fixed bottom-6 right-6 z-[1000] inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_8px_32px_var(--brand-glow)] transition-colors hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background md:bottom-8 md:right-8"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
