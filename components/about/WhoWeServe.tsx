"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  Heart,
  Home,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { audiences, type AudienceIcon } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";
import { FadeIn } from "@/components/animations/FadeIn";

const ICONS: Record<AudienceIcon, LucideIcon> = {
  Home,
  Briefcase,
  Heart,
  Trophy,
  Wrench,
};

export function WhoWeServe() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Where our pieces end up
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              A quick look at who we make for.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {audiences.map((audience, index) => {
            const Icon = ICONS[audience.icon];
            return (
              <motion.article
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: EASE_HERO,
                }}
                className="group rounded-2xl border border-border/40 bg-surface-1 p-6 transition hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {audience.blurb}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
