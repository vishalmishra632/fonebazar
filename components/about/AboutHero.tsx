"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { Em } from "@/components/shared/ItalicEmphasis";
import { EASE_HERO } from "@/lib/animations";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_HERO },
  },
};

export function AboutHero() {
  return (
    <section className="pt-28 pb-16 lg:pt-40 lg:pb-24">
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="flex items-start justify-between gap-4">
            <motion.p
              variants={item}
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand"
            >
              About
            </motion.p>
            <motion.span
              variants={item}
              className="hidden font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block"
            >
              Est. 2022 · Sault Ste. Marie
            </motion.span>
          </div>
          <motion.h1
            variants={item}
            className="text-hero mt-10 max-w-[18ch] text-foreground lg:ml-auto lg:text-right"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.9,
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="mb-5 inline-block h-2.5 w-2.5 rounded-full bg-brand align-middle lg:hidden"
            />
            Small studio, five machines, <Em>one standard.</Em>
          </motion.h1>
        </motion.div>
      </Container>
    </section>
  );
}
