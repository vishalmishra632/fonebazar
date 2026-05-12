"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import { Container } from "@/components/shared/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Em } from "@/components/shared/ItalicEmphasis";
import { HomeHeroFallback } from "@/components/three/scenes/HomeHeroFallback";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { EASE_HERO } from "@/lib/animations";

const TshirtsHeroScene = dynamic(
  () => import("@/components/three/scenes/TshirtsHeroScene"),
  { ssr: false, loading: () => <HomeHeroFallback /> },
);

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_HERO },
  },
};

export function HeroSection() {
  const lenis = useLenis();

  function scrollToServices() {
    if (lenis) {
      lenis.scrollTo("#services", { duration: 1.4 });
    } else if (typeof window !== "undefined") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const whatsappHref = buildWhatsAppOrderURL([]);

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 lg:pt-28"
    >
      <div
        aria-hidden
        className="ambient-warm pointer-events-none absolute inset-0 -z-20"
      />
      <div
        aria-hidden
        className="build-plate pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_72%_58%_at_30%_52%,black,transparent)]"
      />
      <BuildPlateRegistrationMarks />

      <Container className="relative">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <div className="flex items-start justify-between gap-6">
            <motion.p
              variants={heroItem}
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand"
            >
              Made in Sault Ste. Marie
            </motion.p>
            <motion.span
              variants={heroItem}
              className="hidden font-display text-[10px] uppercase tracking-[0.3em] text-brand sm:block"
            >
              Apr &rsquo;26 — live studio
            </motion.span>
          </div>

          <motion.h1
            id="home-hero-heading"
            variants={heroItem}
            className="text-hero mt-10 max-w-[14ch] text-balance text-foreground"
          >
            Ideas, <Em>crafted</Em>
            <br />
            into objects.
          </motion.h1>

          <div className="mt-16 grid grid-cols-12 items-end gap-8 lg:mt-20">
            <motion.div
              variants={heroItem}
              className="col-span-12 lg:col-span-7"
            >
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                3D printing, laser engraving, resin art, custom tees, and precision
                decals — made locally, ordered over WhatsApp, ready when you are.
              </p>
              <motion.div
                variants={heroItem}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6, ease: EASE_HERO }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <MagneticButton strength={0.3} radius={100}>
                  <button
                    type="button"
                    onClick={scrollToServices}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-brand-foreground shadow-[var(--elevation-2)] transition hover:bg-brand-strong hover:shadow-[var(--elevation-hover)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    Browse services
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to us
                </a>
              </motion.div>
            </motion.div>

            <div className="relative col-span-12 hidden h-[420px] lg:col-span-5 lg:block">
              <TshirtsHeroScene />
              <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Drag to rotate
              </span>
            </div>
          </div>
        </motion.div>
      </Container>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <div className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute left-0 right-0 h-4 bg-brand"
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

function BuildPlateRegistrationMarks() {
  const positions = [
    { top: "18%", left: "12%" },
    { top: "18%", right: "12%" },
    { bottom: "22%", left: "12%" },
    { bottom: "22%", right: "12%" },
  ] as const;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute text-brand/60 font-mono text-xs select-none"
          style={pos}
        >
          +
        </span>
      ))}
    </div>
  );
}

