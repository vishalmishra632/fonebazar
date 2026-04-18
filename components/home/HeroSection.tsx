"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { Container } from "@/components/shared/Container";
import { Magnetic } from "@/components/animations/Magnetic";
import { Em } from "@/components/shared/ItalicEmphasis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { EASE_HERO } from "@/lib/animations";

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
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const shape1X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const shape1Y = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const shape2X = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const shape2Y = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const shape3X = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const shape3Y = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

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
      ref={wrapperRef}
      onMouseMove={handleMove}
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_30%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.22 0.010 65 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.22 0.010 65 / 0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[28%] -z-10 h-[620px] w-[620px] rounded-full bg-brand-glow blur-[140px]"
      />

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
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={scrollToServices}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-brand-foreground transition hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    Browse services
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
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

            <div
              aria-hidden
              className="col-span-12 hidden h-[360px] lg:col-span-5 lg:block"
            >
              <div className="relative h-full w-full">
                <motion.div
                  style={{ x: shape1X, y: shape1Y }}
                  animate={
                    reduced
                      ? undefined
                      : { rotate: [0, 8, 0, -8, 0], y: [0, -12, 0, 8, 0] }
                  }
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[30%] top-0 h-44 w-44"
                >
                  <div
                    className="h-full w-full rounded-[2rem] bg-brand/30 backdrop-blur-sm"
                    style={{
                      filter:
                        "drop-shadow(0 0 40px oklch(0.92 0.19 103 / 0.35))",
                    }}
                  />
                </motion.div>
                <motion.div
                  style={{ x: shape2X, y: shape2Y }}
                  animate={
                    reduced
                      ? undefined
                      : { rotate: [0, -10, 0, 10, 0], x: [0, 10, 0, -10, 0] }
                  }
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[8%] top-[45%] h-52 w-52"
                >
                  <div
                    className="h-full w-full rounded-full bg-brand/20"
                    style={{
                      filter:
                        "drop-shadow(0 0 60px oklch(0.92 0.19 103 / 0.4))",
                    }}
                  />
                </motion.div>
                <motion.div
                  style={{ x: shape3X, y: shape3Y }}
                  animate={
                    reduced ? undefined : { rotate: [0, 20, 0], y: [0, -6, 0] }
                  }
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-[12%] h-36 w-36"
                >
                  <Hexagon />
                </motion.div>
              </div>
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

function Hexagon() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.92 0.19 103 / 0.5)" />
          <stop offset="100%" stopColor="oklch(0.92 0.19 103 / 0.1)" />
        </linearGradient>
      </defs>
      <polygon
        points="100,10 180,55 180,145 100,190 20,145 20,55"
        fill="url(#hex-grad)"
        style={{ filter: "drop-shadow(0 0 30px oklch(0.92 0.19 103 / 0.35))" }}
      />
    </svg>
  );
}
