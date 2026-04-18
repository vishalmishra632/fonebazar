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

export function ServicesHero() {
  return (
    <section className="pt-28 pb-20 lg:pt-40 lg:pb-32">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
          >
            Our craft
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.02em] md:text-6xl lg:text-[7rem]"
          >
            Five crafts. One studio.
          </motion.h1>
          <motion.span
            aria-hidden
            variants={item}
            className="mt-7 block h-[2px] w-16 bg-gradient-to-r from-transparent via-brand to-transparent"
          />
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            We run an actual workshop in Sault Ste. Marie — printers humming, lasers
            cutting, resin curing. Here&apos;s what happens behind the door.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
