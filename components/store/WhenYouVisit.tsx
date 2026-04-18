"use client";

import { motion } from "motion/react";
import { Car, Coffee, DoorOpen, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { visitCopy, type VisitBlock, type VisitIcon } from "@/lib/data/store-content";
import { EASE_HERO } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ICONS: Record<VisitIcon, LucideIcon> = {
  Car,
  DoorOpen,
  Coffee,
};

const BLOCKS: Array<{ block: VisitBlock; divider: boolean }> = [
  { block: visitCopy.parking, divider: false },
  { block: visitCopy.entrance, divider: true },
  { block: visitCopy.inside, divider: false },
];

export function WhenYouVisit() {
  return (
    <section className="bg-surface-1 py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              When you arrive
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              A few things to know.
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {BLOCKS.map(({ block, divider }, index) => (
            <VisitColumn
              key={block.title}
              block={block}
              divider={divider}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface VisitColumnProps {
  block: VisitBlock;
  divider: boolean;
  delay: number;
}

function VisitColumn({ block, divider, delay }: VisitColumnProps) {
  const Icon = ICONS[block.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: EASE_HERO }}
      className={cn(
        "flex flex-col gap-3 md:px-8",
        divider && "md:border-x md:border-border/30",
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold">{block.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {block.body}
      </p>
    </motion.div>
  );
}
