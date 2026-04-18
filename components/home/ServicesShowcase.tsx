"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { servicesShowcase } from "@/lib/data/services-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ServicesShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(query.matches);
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  useGSAP(
    () => {
      if (!isDesktop || reduced) return;
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      const progressBar = progressRef.current;
      if (!track || !wrapper || !progressBar) return;

      const panels = gsap.utils.toArray<HTMLElement>(".service-panel", track);
      const panelCount = panels.length;
      const totalScroll = (panelCount - 1) * window.innerWidth;

      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressBar.style.width = `${self.progress * 100}%`;
            const current = Math.min(
              panelCount - 1,
              Math.round(self.progress * (panelCount - 1)),
            );
            setActivePanel(current);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: wrapperRef, dependencies: [isDesktop, reduced] },
  );

  return (
    <section id="services" className="relative">
      <Container>
        <FadeIn>
          <div className="py-24 lg:py-32">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Our services
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
              Five crafts. One studio.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              From digital file to finished object, every craft runs out of the same
              studio — so the details stay consistent across what you order.
            </p>
          </div>
        </FadeIn>
      </Container>

      {isDesktop && !reduced ? (
        <div ref={wrapperRef} className="relative hidden h-screen overflow-hidden lg:block">
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-10 py-4">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-border/60">
              <div ref={progressRef} className="h-full bg-brand" style={{ width: "0%" }} />
            </div>
            <span className="ml-6 font-display text-sm tabular-nums text-muted-foreground">
              <span className="text-foreground">
                {String(activePanel + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-border">/</span>
              {String(servicesShowcase.length).padStart(2, "0")}
            </span>
          </div>

          <div ref={trackRef} className="flex h-full">
            {servicesShowcase.map((service) => (
              <ServicePanel key={service.slug} service={service} active />
            ))}
          </div>
        </div>
      ) : (
        <Container className="space-y-20 pb-24">
          {servicesShowcase.map((service) => (
            <FadeIn key={service.slug}>
              <ServicePanel service={service} stacked />
            </FadeIn>
          ))}
        </Container>
      )}
    </section>
  );
}

interface ServicePanelProps {
  service: (typeof servicesShowcase)[number];
  active?: boolean;
  stacked?: boolean;
}

function ServicePanel({ service, stacked }: ServicePanelProps) {
  return (
    <article
      className={cn(
        "service-panel relative flex shrink-0 items-center",
        stacked ? "w-full" : "h-screen w-screen px-16 py-24",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl items-center gap-10",
          stacked ? "grid-cols-1 md:grid-cols-2" : "grid-cols-12",
        )}
      >
        <div className={cn(stacked ? "order-2 md:order-1" : "col-span-7")}>
          <p
            aria-hidden
            className="font-display text-[7rem] font-semibold leading-none text-brand/15 lg:text-[10rem]"
          >
            {service.number}
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
            {service.name}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {service.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border/80 bg-surface-1 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
          <Link
            href={`/services/${service.slug}`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand"
          >
            See examples
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            stacked ? "order-1 aspect-square md:order-2" : "col-span-5 aspect-square",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand/30 via-transparent to-brand/5" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, oklch(0.62 0.22 285 / 0.3), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-display text-[8rem] font-semibold text-foreground/10 lg:text-[12rem]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {service.number}
            </motion.span>
          </div>
        </div>
      </div>
    </article>
  );
}
