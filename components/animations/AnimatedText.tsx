"use client";

import { motion } from "motion/react";
import { easeHero } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}

export function AnimatedText({ text, className, as = "h1" }: AnimatedTextProps) {
  const words = text.split(" ");
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeHero } },
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}
