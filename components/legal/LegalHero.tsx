"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { formatLastUpdated } from "@/lib/data/legal-meta";
import type { LegalDocument } from "@/lib/types/legal";
import { EASE_HERO } from "@/lib/animations";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_HERO },
  },
};

interface LegalHeroProps {
  doc: LegalDocument;
}

export function LegalHero({ doc }: LegalHeroProps) {
  return (
    <section className="pt-24 pb-10 lg:pt-32 lg:pb-14">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
          >
            {doc.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {doc.title}.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-5 max-w-3xl text-[17px] leading-relaxed text-muted-foreground"
          >
            {doc.intro}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Clock className="h-4 w-4 text-brand" aria-hidden />
            <span>
              Last updated{" "}
              <span className="text-foreground">
                {formatLastUpdated(doc.lastUpdated)}
              </span>
            </span>
          </motion.div>
          <div className="mt-8 h-px bg-border/30" />
        </motion.div>
      </Container>
    </section>
  );
}
