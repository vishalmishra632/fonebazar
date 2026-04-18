"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
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
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
          >
            About
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 font-display font-semibold leading-[1.02] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
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
              className="mb-4 inline-block h-2 w-2 rounded-full bg-brand"
            />
            <span className="block">Small studio, five machines, one standard.</span>
          </motion.h1>
        </motion.div>
      </Container>
    </section>
  );
}
