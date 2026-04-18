"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { EASE_HERO } from "@/lib/animations";
import { studioImages } from "@/lib/data/services-detail";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type CollageSlot = "main" | "top" | "bottom";

export function StudioSection() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<CollageSlot | null>(null);

  function driftClass(slot: CollageSlot) {
    if (reduced || !hovered || hovered === slot) return "";
    if (hovered === "main" && slot === "top") return "lg:translate-x-12";
    if (hovered === "main" && slot === "bottom") return "lg:-translate-x-12";
    if (hovered === "top" && slot === "main") return "lg:-translate-x-4";
    if (hovered === "top" && slot === "bottom") return "lg:-translate-x-12";
    if (hovered === "bottom" && slot === "main") return "lg:translate-x-4";
    if (hovered === "bottom" && slot === "top") return "lg:translate-x-12";
    return "";
  }

  return (
    <section
      className="relative py-24 lg:py-40"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, oklch(0.62 0.22 285 / 0.1), transparent 60%), linear-gradient(to top left, oklch(0.62 0.22 285 / 0.05), transparent 50%)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_HERO }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              The studio
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              A real workshop. A real corner of Sault Ste. Marie.
            </h2>
            {/* TODO: replace [STREET PLACEHOLDER] with real street/area before launch */}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              We&apos;re not a dropshipper. We&apos;re a small workshop on{" "}
              <span className="text-foreground">[STREET PLACEHOLDER]</span> in Sault
              Ste. Marie, run by a team that answers WhatsApp messages themselves.
              When you order a piece, someone whose name you know picks the material,
              runs the machine, and inspects the final result before it ships or
              gets handed over. That&apos;s why our lead times are honest and our
              quality is consistent — nothing is subcontracted.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <span className="font-display text-foreground">Est. 2022</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span className="font-display text-foreground">5 crafts, 1 roof</span>
            </div>
          </motion.div>

          <div className="relative lg:col-span-7">
            <div className="relative mx-auto hidden aspect-[4/3] max-w-[640px] lg:block">
              <motion.button
                type="button"
                onMouseEnter={() => setHovered("top")}
                onMouseLeave={() => setHovered(null)}
                aria-label="Studio detail image"
                initial={{ opacity: 0, y: 20, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE_HERO }}
                className={cn(
                  "absolute right-4 top-0 h-[190px] w-[250px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-brand/20 transition-all duration-500 ease-out",
                  hovered === "top" && "z-20 !rotate-0 !scale-[1.04]",
                  driftClass("top"),
                )}
              >
                <Image
                  src={studioImages.accentTop}
                  alt=""
                  aria-hidden
                  fill
                  sizes="250px"
                  className="object-cover"
                  unoptimized
                />
              </motion.button>
              <motion.button
                type="button"
                onMouseEnter={() => setHovered("main")}
                onMouseLeave={() => setHovered(null)}
                aria-label="fonebazar studio workshop"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE_HERO, delay: 0.1 }}
                className={cn(
                  "absolute left-1/2 top-[38%] h-[320px] w-[460px] -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-brand/20 transition-all duration-500 ease-out",
                  hovered === "main" && "z-30 !scale-[1.02]",
                )}
              >
                <Image
                  src={studioImages.main}
                  alt="The fonebazar workshop"
                  fill
                  sizes="460px"
                  className="object-cover"
                  unoptimized
                />
              </motion.button>
              <motion.button
                type="button"
                onMouseEnter={() => setHovered("bottom")}
                onMouseLeave={() => setHovered(null)}
                aria-label="Studio detail image"
                initial={{ opacity: 0, y: 20, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: EASE_HERO, delay: 0.2 }}
                className={cn(
                  "absolute bottom-0 left-4 h-[190px] w-[250px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-brand/20 transition-all duration-500 ease-out",
                  hovered === "bottom" && "z-20 !rotate-0 !scale-[1.04]",
                  driftClass("bottom"),
                )}
              >
                <Image
                  src={studioImages.accentBottom}
                  alt=""
                  aria-hidden
                  fill
                  sizes="250px"
                  className="object-cover"
                  unoptimized
                />
              </motion.button>
            </div>

            <div className="space-y-4 lg:hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-brand/20">
                <Image
                  src={studioImages.main}
                  alt="The fonebazar workshop"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex gap-3">
                <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl ring-1 ring-brand/20">
                  <Image
                    src={studioImages.accentTop}
                    alt=""
                    aria-hidden
                    fill
                    sizes="50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl ring-1 ring-brand/20">
                  <Image
                    src={studioImages.accentBottom}
                    alt=""
                    aria-hidden
                    fill
                    sizes="50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
