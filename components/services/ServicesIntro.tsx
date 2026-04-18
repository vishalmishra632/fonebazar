"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { EASE_HERO } from "@/lib/animations";

export function ServicesIntro() {
  return (
    <section className="pb-16 lg:pb-24">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_HERO }}
          className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-muted-foreground md:text-[22px]"
        >
          fonebazar started as a single 3D printer in a spare room. Four years later
          we run five crafts side-by-side — and that was on purpose. Most local shops
          do one thing. We do five so that when an idea crosses disciplines — a
          wedding gift that needs both engraved wood and a custom-printed centerpiece,
          a brand kit that wants tees and decals in the same week — you have one
          studio, one conversation, one pickup.
        </motion.p>
        <div className="mx-auto mt-12 h-px max-w-md bg-border/40" />
      </Container>
    </section>
  );
}
