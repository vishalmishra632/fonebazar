"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Magnetic } from "@/components/animations/Magnetic";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_HERO } from "@/lib/animations";

interface FullBleedCTAProps {
  headline: string;
  subhead: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref: string;
  secondaryLabel: string;
}

export function FullBleedCTA({
  headline,
  subhead,
  primaryHref,
  primaryLabel = "Start on WhatsApp",
  secondaryHref,
  secondaryLabel,
}: FullBleedCTAProps) {
  const reduced = useReducedMotion();
  const resolvedPrimary = primaryHref ?? buildWhatsAppOrderURL([]);
  const words = headline.split(" ");

  return (
    <section
      className="relative overflow-hidden bg-surface-1 py-32 lg:py-48"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.62 0.22 285 / 0.25), transparent 70%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <Container className="relative flex flex-col items-center text-center">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-5xl bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text font-display font-semibold leading-[0.95] tracking-[-0.03em] text-transparent"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: EASE_HERO },
                },
              }}
              className="inline-block"
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_HERO }}
          className="mt-8 max-w-2xl text-lg text-muted-foreground"
        >
          {subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_HERO }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.5}>
            <div className="relative">
              {!reduced ? (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40 blur-2xl"
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <a
                href={resolvedPrimary}
                target={resolvedPrimary.startsWith("http") ? "_blank" : undefined}
                rel={resolvedPrimary.startsWith("http") ? "noopener noreferrer" : undefined}
                className="relative inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <MessageCircle className="h-5 w-5" />
                {primaryLabel}
              </a>
            </div>
          </Magnetic>
          <Link
            href={secondaryHref}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium text-foreground transition hover:border-brand hover:text-brand"
          >
            {secondaryLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
