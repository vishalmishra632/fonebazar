import { MessageCircle } from "lucide-react";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";

export function EndOfCatalogCTA() {
  const whatsappHref = buildWhatsAppOrderURL([]);

  return (
    <section
      className="relative mt-16 overflow-hidden rounded-3xl border border-border/50 bg-surface-1 px-6 py-14 text-center sm:px-12"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 70% at 50% 100%, oklch(0.80 0.16 92 / 0.18), transparent 70%)",
      }}
    >
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
        Not seeing it?
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
        Don&apos;t see what you need?
        <br />
        <span className="text-muted-foreground">We take custom requests.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
        Send a photo, sketch, or a rough description. Most custom work quotes come back
        within the hour.
      </p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white transition hover:brightness-110"
      >
        <MessageCircle className="h-5 w-5" />
        Start a custom request
      </a>
    </section>
  );
}
