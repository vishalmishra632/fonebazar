"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Marquee({ children, speed = 30, className }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex gap-16">{children}</div>
        <div className="flex gap-16" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
