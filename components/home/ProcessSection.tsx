"use client";

import { motion } from "motion/react";
import { MessageCircle, Package, Search, ShoppingBag, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { EASE_HERO } from "@/lib/animations";

interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    icon: Search,
    title: "Browse & customise",
    description:
      "Pick a service, explore our catalog, or send us your own design file. STL, OBJ, SVG, PNG, AI, and PDF all welcome.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Drop it in your cart",
    description:
      "Add the pieces you want with notes, quantities, and finishing preferences. Your cart saves automatically.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Place on WhatsApp",
    description:
      "Tap Place Order — your cart lands in our WhatsApp with one tap. We confirm availability, timeline, and total within the hour.",
  },
  {
    number: "04",
    icon: Package,
    title: "Pick up or delivery",
    description:
      "Pay on pickup or arrange local delivery. Every piece is hand-inspected before it leaves the studio.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              How it works
            </p>
            <RevealOnScroll
              as="h2"
              variant="layer"
              className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl"
            >
              Four steps. Zero friction.
            </RevealOnScroll>
            <p className="mt-4 text-lg text-muted-foreground">
              No accounts, no card forms, no guessing.
            </p>
          </div>
        </FadeIn>

        <div className="relative mt-20">
          <motion.svg
            aria-hidden
            viewBox="0 0 1200 20"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[72px] -z-10 hidden h-5 w-full lg:block"
          >
            <motion.path
              d="M 60 10 L 1140 10"
              stroke="oklch(0.80 0.16 92 / 0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: EASE_HERO }}
            />
          </motion.svg>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: EASE_HERO,
                }}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface-1 p-8 transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_40px_oklch(0.80_0.16_92/0.2)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-semibold text-brand/20">
                    {step.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-brand">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
