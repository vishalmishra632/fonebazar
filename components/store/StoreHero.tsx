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

export function StoreHero() {
  return (
    <section className="pt-28 pb-12 lg:pt-40 lg:pb-16">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
          >
            Our store
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            A look inside the studio.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Six machines, one room, five crafts happening side-by-side. Here&apos;s
            what you walk into.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
