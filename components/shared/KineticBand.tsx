"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface KineticBandProps {
  words: string[];
  direction?: "left" | "right";
  variant?: "outline" | "fill";
  className?: string;
  glyph?: string;
}

export function KineticBand({
  words,
  direction = "left",
  variant = "outline",
  className,
  glyph = "✦",
}: KineticBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xRange = direction === "left" ? ["0%", "-40%"] : ["-40%", "0%"];
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  const repeated = Array.from({ length: 3 }, () => words).flat();

  return (
    <section
      ref={ref}
      aria-hidden
      className={cn(
        "relative overflow-hidden py-16 md:py-20",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <motion.div
        style={{ x, willChange: inView ? "transform" : "auto" }}
        className="flex shrink-0 items-center gap-10 whitespace-nowrap"
      >
        {repeated.map((word, index) => (
          <span key={`${word}-${index}`} className="flex shrink-0 items-center gap-10">
            <span
              className={cn(
                "text-kinetic shrink-0",
                variant === "outline" &&
                  "text-transparent [-webkit-text-stroke:1.5px_var(--brand-muted)]",
                variant === "fill" &&
                  "[color:var(--brand-muted)]",
              )}
            >
              {word}
            </span>
            <span
              aria-hidden
              className="shrink-0 font-display text-4xl md:text-6xl [color:var(--brand-muted)] opacity-70"
            >
              {glyph}
            </span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
