"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE_HERO } from "@/lib/animations";
import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "unblur" | "split" | "cascade" | "curtain";

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
}

// Universal scroll-reveal wrapper. Pick the variant by feel:
// - rise:     fade + translate up (workhorse)
// - unblur:   fade + blur-out (dreamy, hero subtitles)
// - split:    two halves slide in from opposite sides (big reveals)
// - cascade:  word-by-word for headlines (uses `cascade` children — text goes into children as separate spans)
// - curtain:  brand bar swipes L→R revealing content (loud, for section dividers)
export function RevealOnScroll({
  children,
  variant = "rise",
  delay = 0,
  className,
  as = "div",
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  const Component = motion[as] as typeof motion.div;

  if (reduced) {
    return <Component ref={ref} className={className}>{children}</Component>;
  }

  const base = { duration: 0.7, delay, ease: EASE_HERO };

  switch (variant) {
    case "unblur":
      return (
        <Component
          ref={ref}
          className={className}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, filter: "blur(0px)" } : undefined}
          transition={{ ...base, duration: 0.9 }}
        >
          {children}
        </Component>
      );
    case "split":
      return (
        <Component
          ref={ref}
          className={cn("relative overflow-hidden", className)}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3, delay }}
        >
          <motion.span
            className="block"
            initial={{ x: "-8%" }}
            animate={inView ? { x: "0%" } : undefined}
            transition={{ ...base, duration: 0.9 }}
          >
            {children}
          </motion.span>
        </Component>
      );
    case "cascade":
      return (
        <Component
          ref={ref}
          className={cn("[&>span]:inline-block", className)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.04, delayChildren: delay },
            },
          }}
        >
          {children}
        </Component>
      );
    case "curtain":
      return (
        <Component
          ref={ref}
          className={cn("relative", className)}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
          transition={{ ...base, duration: 0.85 }}
        >
          {children}
        </Component>
      );
    case "rise":
    default:
      return (
        <Component
          ref={ref}
          className={className}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={base}
        >
          {children}
        </Component>
      );
  }
}

// Helper for cascade variant — wraps each word in a motion.span so the parent's
// staggerChildren animates them one at a time.
interface CascadeTextProps {
  text: string;
  className?: string;
}

export function CascadeText({ text, className }: CascadeTextProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: "0.6em" },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE_HERO },
            },
          }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
