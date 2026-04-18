"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { values } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function WhatWeBelieve() {
  return (
    <section
      className="py-24 lg:py-40"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, oklch(0.62 0.22 285 / 0.03), transparent 15%, transparent 85%, oklch(0.62 0.22 285 / 0.03))",
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
  const reduced = useReducedMotion();

  return (
    <article className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <StrokeNumeral number={value.number} reduced={reduced} />
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

interface StrokeNumeralProps {
  number: string;
  reduced: boolean;
}

function StrokeNumeral({ number, reduced }: StrokeNumeralProps) {
  return (
    <svg
      viewBox="0 0 180 140"
      className="h-auto w-32 md:w-40"
      aria-hidden
    >
      <motion.text
        x="0"
        y="115"
        fontFamily='"Satoshi", "Inter", sans-serif'
        fontSize="140"
        fontWeight="600"
        letterSpacing="-6"
        fill="transparent"
        stroke="oklch(0.62 0.22 285)"
        strokeWidth="1.25"
        pathLength={1}
        strokeDasharray={1}
        initial={{ strokeDashoffset: reduced ? 0 : 1 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE_HERO }}
      >
        {number}
      </motion.text>
    </svg>
  );
}
