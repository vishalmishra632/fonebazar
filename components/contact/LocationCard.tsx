"use client";

import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { EASE_HERO } from "@/lib/animations";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=253+Bruce+St+Sault+Ste+Marie+ON+Canada";

export function LocationCard() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Find us
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Sault Ste. Marie, Ontario.
            </h2>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_HERO }}
          className="relative mx-auto aspect-[4/3] max-w-4xl overflow-hidden rounded-3xl bg-surface-2 md:aspect-[16/9]"
          aria-label="fonebazar studio location in Sault Ste. Marie"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 45% 55% at 48% 52%, oklch(0.80 0.16 92 / 0.35), transparent 65%)",
            }}
          />

          <div className="absolute left-[48%] top-[52%] -translate-x-1/2 -translate-y-full">
            <div className="relative">
              <span
                aria-hidden
                className="pin-pulse-ring absolute left-1/2 top-full h-10 w-10 -translate-x-1/2 -translate-y-10 rounded-full border-2 border-brand"
              />
              <span
                aria-hidden
                className="pin-pulse-ring-delayed absolute left-1/2 top-full h-10 w-10 -translate-x-1/2 -translate-y-10 rounded-full border-2 border-brand"
              />
              <div
                aria-hidden
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl"
                style={{ filter: "drop-shadow(0 0 24px oklch(0.80 0.16 92 / 0.55))" }}
              >
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 m-6 max-w-xs rounded-2xl border border-border/40 bg-background/85 p-5 backdrop-blur md:m-8">
            <p className="font-display text-base font-semibold text-foreground">
              fonebazar studio
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              253 Bruce St, Sault Ste. Marie, ON, Canada
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand transition hover:brightness-110"
            >
              Open in Google Maps <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
