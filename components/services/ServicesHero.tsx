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

export function ServicesHero() {
  return (
    <section className="pt-28 pb-20 lg:pt-40 lg:pb-32">
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand"
          >
            Our craft
          </motion.p>
          <motion.h1
            variants={item}
            className="text-hero mt-8 text-foreground"
          >
            Five crafts. <Em>One studio.</Em>
          </motion.h1>
          <motion.span
            aria-hidden
            variants={item}
            className="mt-10 block h-[2px] w-24 bg-gradient-to-r from-transparent via-brand to-transparent"
          />
          <motion.p
            variants={item}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:ml-[25%]"
          >
            We run an actual workshop in Sault Ste. Marie — printers humming, lasers
            cutting, resin curing. Here&apos;s what happens behind the door.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
