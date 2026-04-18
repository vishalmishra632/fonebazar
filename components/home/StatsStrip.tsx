"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/shared/Container";
import { homeStats, type HomeStat } from "@/lib/data/services-content";
import { useCountUp } from "@/hooks/use-count-up";
import { EASE_HERO } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(to bottom right, oklch(0.62 0.22 285 / 0.08), transparent 40%), linear-gradient(to top left, oklch(0.62 0.22 285 / 0.05), transparent 50%)",
      }}
    >
      <Container>
        <div ref={ref} className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-6">
          {homeStats.map((stat, index) => (
            <StatCell key={stat.label} stat={stat} index={index} inView={inView} />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface StatCellProps {
  stat: HomeStat;
  index: number;
  inView: boolean;
}

function StatCell({ stat, index, inView }: StatCellProps) {
  const reduced = useReducedMotion();
  const value = useCountUp({
    target: stat.value,
    inView,
    reducedMotion: reduced,
  });
  const display =
    stat.value >= 1000 ? value.toLocaleString("en-US") : String(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_HERO }}
      className={cn(
        "relative flex flex-col gap-2",
        index > 0 && "lg:border-l lg:border-border/40 lg:pl-6",
      )}
    >
      <p className="bg-gradient-to-b from-foreground to-muted-foreground/60 bg-clip-text font-display text-5xl font-semibold leading-none tracking-[-0.03em] text-transparent md:text-6xl lg:text-7xl">
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p className="text-sm text-muted-foreground md:text-base">{stat.label}</p>
    </motion.div>
  );
}
