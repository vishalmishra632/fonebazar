"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { pickupSteps } from "@/lib/data/contact-content";
import { EASE_HERO } from "@/lib/animations";

export function HowPickupWorks() {
  return (
    <section
      className="relative py-20 lg:py-28"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, oklch(0.62 0.22 285 / 0.06), transparent 60%)",
      }}
    >
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Pickup 101
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              How pickup works.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              We&apos;re a small workshop without a storefront counter — pickups are by
              appointment so your piece is ready when you arrive.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pickupSteps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: EASE_HERO,
              }}
              className="group rounded-2xl border border-border/40 bg-surface-1 p-6 transition hover:-translate-y-1 hover:border-brand/40"
            >
              <span
                aria-hidden
                className="inline-flex h-10 w-12 items-center justify-center rounded-lg bg-brand/10 font-display text-xl font-semibold text-brand"
              >
                {step.number}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
