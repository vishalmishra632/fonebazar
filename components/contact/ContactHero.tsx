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

export function ContactHero() {
  return (
    <section className="pt-28 pb-16 lg:pt-40 lg:pb-20">
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
            Contact
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            Let&apos;s make something together.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Send us a message below, or jump straight to WhatsApp — whichever&apos;s
            easier. We reply within the hour during studio hours.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
