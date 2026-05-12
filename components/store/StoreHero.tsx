"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Container } from "@/components/shared/Container";
import { StoreMachinesFallback } from "@/components/three/scenes/StoreMachinesFallback";
import { EASE_HERO } from "@/lib/animations";

const StoreMachinesScene = dynamic(
  () => import("@/components/three/scenes/StoreMachinesScene"),
  { ssr: false, loading: () => <StoreMachinesFallback /> },
);

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
    <section className="relative overflow-hidden pt-28 pb-12 lg:pt-40 lg:pb-16">
      <div
        aria-hidden
        className="halftone-bg pointer-events-none absolute inset-0 -z-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <StoreMachinesScene />
      </div>
      <Container>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand"
          >
            Our store
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-8 font-display font-semibold leading-[0.9] tracking-[-0.04em] text-foreground"
          >
            <span className="block text-[clamp(3rem,13vw,12rem)]">A look</span>
            <span className="block text-[clamp(2rem,7vw,6rem)] font-semibold text-muted-foreground">
              inside
            </span>
            <span className="block text-[clamp(2.25rem,8vw,7rem)] italic font-medium text-brand">
              the studio.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Six machines, one room, five crafts happening side-by-side. Here&apos;s
            what you walk into.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
