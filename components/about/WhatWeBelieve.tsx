"use client";

import { motion, useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Container } from "@/components/shared/Container";
import { values } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";
import { AboutValuesFallback } from "@/components/three/scenes/AboutValuesFallback";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
          "linear-gradient(to bottom, var(--brand-subtle), transparent 15%, transparent 85%, var(--brand-subtle))",
      }}
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              What we believe
            </p>
            <ScorchHeading>Four rules we don&apos;t break.</ScorchHeading>
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

function ScorchHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <motion.h2
      ref={ref}
      initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
      animate={
        reduced
          ? undefined
          : { clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }
      }
      transition={{ duration: 1.05, ease: EASE_HERO, delay: 0.1 }}
      className="relative mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl"
    >
      {children}
      <motion.span
        aria-hidden
        initial={reduced ? { opacity: 0 } : { left: "-8%", opacity: 0.9 }}
        animate={
          reduced
            ? { opacity: 0 }
            : { left: inView ? "104%" : "-8%", opacity: inView ? 0 : 0.9 }
        }
        transition={{ duration: 1.05, ease: EASE_HERO, delay: 0.1 }}
        className="pointer-events-none absolute top-0 bottom-0 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/55 to-transparent blur-[6px]"
      />
    </motion.h2>
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
