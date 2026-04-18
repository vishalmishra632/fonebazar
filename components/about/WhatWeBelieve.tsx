"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Container } from "@/components/shared/Container";
import { values } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";
import { AboutValuesFallback } from "@/components/three/scenes/AboutValuesFallback";

const AboutValuesScene = dynamic(
  () => import("@/components/three/scenes/AboutValuesScene"),
  {
    ssr: false,
    loading: () => null,
  },
);

export function WhatWeBelieve() {
  return (
    <section
      className="py-24 lg:py-40"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, oklch(0.92 0.19 103 / 0.04), transparent 15%, transparent 85%, oklch(0.92 0.19 103 / 0.04))",
      }}
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              What we believe
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Four rules we don&apos;t break.
            </h2>
          </div>

          <ol className="flex flex-col">
            {values.map((value, index) => (
              <li key={value.number}>
                <ValueRow value={value} />
                {index < values.length - 1 ? (
                  <div
                    aria-hidden
                    className="my-12 ml-0 h-px w-24 bg-border/40 lg:my-16"
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

interface ValueRowProps {
  value: (typeof values)[number];
}

function ValueRow({ value }: ValueRowProps) {
  return (
    <article className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="relative h-40 lg:col-span-3 lg:h-44">
        <AboutValuesFallback number={value.number} />
        <div className="pointer-events-none absolute inset-0">
          <AboutValuesScene number={value.number} />
        </div>
      </div>
      <div className="lg:col-span-9">
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_HERO }}
          className="font-display text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl"
        >
          <span className="sr-only">Value {value.number}. </span>
          {value.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE_HERO }}
          className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          {value.description}
        </motion.p>
      </div>
    </article>
  );
}
