"use client";

import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/data/site";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

// TODO: replace with real pinned address once confirmed
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sault+Ste.+Marie+Ontario+Canada";

interface ContactColumnData {
  icon: LucideIcon;
  label: string;
  primary: string;
  secondary: string;
  ctaLabel: string;
  ctaHref: string;
  ctaAriaLabel: string;
  isExternal?: boolean;
  border?: boolean;
}

export function ContactCard() {
  const columns: ContactColumnData[] = [
    {
      icon: MessageCircle,
      label: "Message",
      primary: siteConfig.whatsapp.displayNumber,
      secondary: "Fastest way to reach us",
      ctaLabel: "Open on WhatsApp",
      ctaHref: buildWhatsAppOrderURL([]),
      ctaAriaLabel: "Message us on WhatsApp",
      isExternal: true,
    },
    {
      icon: Mail,
      label: "Email",
      primary: siteConfig.contact.email,
      secondary: "For larger projects and quotes",
      ctaLabel: "Send an email",
      ctaHref: `mailto:${siteConfig.contact.email}`,
      ctaAriaLabel: "Send us an email",
      border: true,
    },
    {
      icon: MapPin,
      label: "Visit",
      primary: "Sault Ste. Marie, ON",
      secondary: "Studio hours: Mon–Sat, 10–6 (by appointment)",
      ctaLabel: "Get directions",
      ctaHref: MAPS_URL,
      ctaAriaLabel: "Get directions to the fonebazar studio",
      isExternal: true,
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Come find us, message us, or stop in.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground">
              During studio hours we usually reply within an hour. Pickup is by
              appointment — message first so we have your piece ready.
            </p>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 rounded-3xl border border-border/40 bg-surface-1 p-8 md:grid-cols-3 md:gap-0 lg:p-12"
        >
          {columns.map((column) => (
            <ContactColumn key={column.label} data={column} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function ContactColumn({ data }: { data: ContactColumnData }) {
  const Icon = data.icon;
  return (
    <div
      className={cn(
        "group flex flex-col gap-3 px-0 md:px-8",
        data.border && "md:border-x md:border-border/30",
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:shadow-[0_0_24px_oklch(0.62_0.22_285/0.3)]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {data.label}
      </p>
      <p className="font-display text-xl font-medium leading-snug text-foreground">
        {data.primary}
      </p>
      <p className="text-sm text-muted-foreground">{data.secondary}</p>
      <a
        href={data.ctaHref}
        aria-label={data.ctaAriaLabel}
        target={data.isExternal ? "_blank" : undefined}
        rel={data.isExternal ? "noopener noreferrer" : undefined}
        className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand transition hover:brightness-110"
      >
        {data.ctaLabel}
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
