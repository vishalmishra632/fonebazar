"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { EASE_HERO } from "@/lib/animations";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Tell us the idea",
    description:
      "WhatsApp us with a rough description, photo, sketch, or finished file. No need to be technical — \"a trophy for our hockey league finals\" is enough to start.",
  },
  {
    number: "02",
    title: "We scope it",
    description:
      "You'll get a short message back: feasibility, material recommendation, quote, and timeline. Usually within the hour during studio hours.",
  },
  {
    number: "03",
    title: "You approve",
    description:
      "Nothing is made until you say yes. For custom pieces we send a preview render or rough sample before full production.",
  },
  {
    number: "04",
    title: "We make it",
    description:
      "Your piece enters the queue. For multi-step work (e.g., resin with 48hr cure, t-shirts with wash-in) we'll send progress updates.",
  },
  {
    number: "05",
    title: "Quality check",
    description:
      "Every piece is inspected by hand before it leaves the studio. Flaws don't ship. If a piece doesn't meet our bar, we remake it — no charge.",
  },
  {
    number: "06",
    title: "Pickup or delivery",
    description:
      "Pay on pickup in Sault Ste. Marie, or we pack and ship anywhere in Canada. Shipping is quoted transparently on WhatsApp.",
  },
];

export function ProcessDeepDive() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              How it works
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              From idea to object in six steps.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: EASE_HERO,
              }}
              className="group rounded-2xl border border-border/40 bg-surface-1 p-6 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_40px_oklch(0.80_0.16_92/0.15)]"
            >
              <span
                aria-hidden
                className="block font-display text-[56px] font-semibold leading-none text-brand/25"
                style={{
                  WebkitTextStroke: "1px oklch(0.80 0.16 92 / 0.5)",
                  color: "transparent",
                }}
              >
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
