"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { spaceNote } from "@/lib/data/store-content";
import { EASE_HERO } from "@/lib/animations";

export function NoteFromSpace() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE_HERO }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
            The vibe
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
            It&apos;s loud, a little messy, and exactly how we like it.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {spaceNote}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
