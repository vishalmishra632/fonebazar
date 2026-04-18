"use client";

import { Clock, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { studioHours } from "@/lib/data/contact-content";

export function ContactRail() {
  const whatsappHref = buildWhatsAppOrderURL([]);

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
      <div
        className="rounded-3xl border border-border/40 p-6"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, oklch(0.62 0.22 285 / 0.12), transparent 70%)",
        }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
          Fastest route
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Message on WhatsApp</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.whatsapp.displayNumber}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Reply within the hour during studio hours.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message fonebazar on WhatsApp"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:brightness-110"
        >
          Open WhatsApp <span aria-hidden>→</span>
        </a>
      </div>

      <div className="rounded-3xl border border-border/40 bg-surface-1 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Best for larger projects and attachments.
        </p>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          aria-label="Send an email to fonebazar"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:brightness-110"
        >
          Send an email <span aria-hidden>→</span>
        </a>
      </div>

      <div className="rounded-3xl border border-border/40 bg-surface-1 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold">Studio hours</h3>
          </div>
        </div>
        <dl className="mt-4 divide-y divide-border/40">
          {studioHours.map((entry) => (
            <div
              key={entry.day}
              className="flex items-center justify-between py-2 text-sm"
            >
              <dt className="text-muted-foreground">{entry.day}</dt>
              <dd className="font-medium text-foreground">{entry.hours}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs italic text-muted-foreground">
          Pickup is by appointment — message first so your piece is ready.
        </p>
      </div>
    </div>
  );
}
