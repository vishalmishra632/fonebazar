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

export function ContactHero() {
  return (
    <section className="pt-28 pb-12 lg:pt-40 lg:pb-16">
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand"
          >
            Contact
          </motion.p>
          <motion.h1
            variants={item}
            className="text-hero mt-8 max-w-[14ch] text-foreground"
          >
            Let&apos;s make <Em>something</Em> together.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Send us a message below, or jump straight to WhatsApp — whichever&apos;s
            easier. We reply within the hour during studio hours.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
