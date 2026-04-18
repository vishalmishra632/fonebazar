"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Magnetic } from "@/components/animations/Magnetic";
import { buildWhatsAppVisitURL } from "@/lib/whatsapp";
import { EASE_HERO } from "@/lib/animations";

export function VisitingHours() {
  const visitHref = buildWhatsAppVisitURL();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE_HERO }}
            className="md:col-span-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Visiting hours
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              Appointment-only, always.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We&apos;re a working studio without a storefront counter. To make sure
              your piece is ready and someone can actually say hi, every visit is by
              appointment.
            </p>
            <p className="mt-6 border-l-2 border-brand pl-4 text-sm leading-relaxed text-foreground/85">
              Saturday 1–4pm is our recommended drop-in window — machines are quieter
              then.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_HERO }}
            className="rounded-2xl border border-border/40 bg-surface-1 p-6 md:col-span-7 lg:p-8"
          >
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">
              Book a visit.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Message us on WhatsApp with a day and window that works, and we&apos;ll
              lock it in.
            </p>
            <div className="mt-6">
              <Magnetic strength={0.35}>
                <a
                  href={visitHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a studio visit on WhatsApp"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <MessageCircle className="h-4 w-4" />
                  Book on WhatsApp <span aria-hidden>→</span>
                </a>
              </Magnetic>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-brand"
            >
              Full contact details on our contact page{" "}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
