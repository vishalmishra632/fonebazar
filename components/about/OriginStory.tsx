"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { originStory } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";

export function OriginStory() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_HERO }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
            How we started
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {originStory}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
