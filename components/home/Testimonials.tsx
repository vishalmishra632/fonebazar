"use client";

import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { testimonials, type TestimonialItem } from "@/lib/data/services-content";
import { EASE_HERO } from "@/lib/animations";

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              What people say
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Quiet work, loud results.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_HERO }}
      className="group relative rounded-2xl bg-gradient-to-br from-brand/40 via-border to-transparent p-px transition hover:-translate-y-1 hover:from-brand/60"
    >
      <div className="flex h-full flex-col gap-6 rounded-[calc(1rem-1px)] bg-surface-1 p-8">
        <span aria-hidden className="font-display text-6xl leading-none text-brand/30">
          ❝
        </span>
        <p className="font-display text-lg font-medium leading-relaxed text-foreground lg:text-xl">
          {testimonial.quote}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-border/40 pt-5">
          <span
            aria-hidden
            className="h-9 w-9 rounded-full"
            style={{
              background:
                "conic-gradient(from 200deg, oklch(0.84 0.15 95), oklch(0.70 0.14 78), oklch(0.84 0.15 95))",
            }}
          />
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
