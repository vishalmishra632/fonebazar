"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { EASE_HERO } from "@/lib/animations";

// Three live specimens side-by-side, each in its own canvas with OrbitControls.
// The user can drag any of them. Captions explain what the craft is — the 3D
// is interactive proof that the studio makes physical things.
//
// Models:
// - Ultimaker 3 — CC-BY, Brian Yu via Poly Pizza
// - Glue / resin bottle — CC-BY, Poly by Google via Poly Pizza
// - Reused tshirt.glb — MIT, Starklord17
const CraftSpecimen = dynamic(
  () =>
    import("@/components/three/CraftSpecimen").then((mod) => ({
      default: mod.CraftSpecimen,
    })),
  { ssr: false, loading: () => null },
);

interface SpecimenConfig {
  model: string;
  title: string;
  blurb: string;
  service: string;
  scale: number;
  yOffset: number;
  cameraZ: number;
  cameraFov: number;
  recolorBody?: string;
  recolorSheen?: string;
}

const SPECIMENS: SpecimenConfig[] = [
  {
    model: "/models/printer.glb",
    title: "3D Printing",
    blurb: "FDM + SLA, side by side. Phone stands to figurines.",
    service: "01",
    scale: 0.06,
    yOffset: -1.6,
    cameraZ: 6,
    cameraFov: 36,
  },
  {
    model: "/models/tshirt.glb",
    title: "Custom Tees",
    blurb: "DTG + heat-press vinyl. Singles or team kits.",
    service: "04",
    scale: 1.65,
    yOffset: -0.9,
    cameraZ: 4.6,
    cameraFov: 36,
    recolorBody: "#F5EBD0",
    recolorSheen: "#FFF6D6",
  },
  {
    model: "/models/resin-bottle.glb",
    title: "Resin Art",
    blurb: "Hand-poured wall pieces, coasters, keepsakes.",
    service: "03",
    scale: 1.4,
    yOffset: -1.1,
    cameraZ: 4.2,
    cameraFov: 38,
  },
];

export function SpecimenStrip() {
  return (
    <section className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="ambient-warm pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <Container>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE_HERO }}
            className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
          >
            The studio, in 3D
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_HERO, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl"
          >
            Drag a specimen to inspect.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_HERO, delay: 0.16 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Three of the crafts, rendered live. Spin them, look behind, see how
            the studio thinks about objects.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {SPECIMENS.map((spec, index) => (
            <motion.figure
              key={spec.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + index * 0.08,
                ease: EASE_HERO,
              }}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-surface-1 shadow-[var(--elevation-2)]"
            >
              <div className="relative aspect-square">
                <CraftSpecimen
                  modelUrl={spec.model}
                  scale={spec.scale}
                  yOffset={spec.yOffset}
                  cameraZ={spec.cameraZ}
                  cameraFov={spec.cameraFov}
                  recolor={
                    spec.recolorBody
                      ? { body: spec.recolorBody, sheen: spec.recolorSheen }
                      : undefined
                  }
                />
                <span className="pointer-events-none absolute left-4 top-4 font-display text-2xl font-semibold text-brand/30">
                  {spec.service}
                </span>
                <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground/80">
                  Drag to rotate
                </span>
              </div>
              <figcaption className="space-y-1 p-5">
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em]">
                  {spec.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {spec.blurb}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
