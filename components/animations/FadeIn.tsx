"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/animations";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
