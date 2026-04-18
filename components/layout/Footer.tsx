import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/data/site";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";

const SERVICE_LINKS = siteConfig.services.map((service) => ({
  label: service.name,
  href: `/products/${service.slug}`,
}));

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Our Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund & Return", href: "/refund" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = buildWhatsAppOrderURL([]);

  return (
    <footer className="relative mt-auto border-t border-border/40 bg-surface-1/40">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Link
            href="/"
            className="flex items-baseline gap-1 font-display text-2xl font-semibold lowercase"
          >
            fonebazar
            <span aria-hidden className="ml-0.5 h-2 w-2 rounded-full bg-brand" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {siteConfig.tagline}. {siteConfig.contact.address}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:border-brand hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:border-brand hover:text-brand"
            >
              <InstagramGlyph />
            </a>
            <a
              href={siteConfig.social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:border-brand hover:text-brand"
            >
              <FacebookGlyph />
            </a>
          </div>
        </div>

        <FooterColumn title="Services" links={SERVICE_LINKS} className="lg:col-span-3" />
        <FooterColumn title="Company" links={COMPANY_LINKS} className="lg:col-span-2" />
        <FooterColumn title="Legal" links={LEGAL_LINKS} className="lg:col-span-2" />
      </Container>

      <div className="border-t border-border/40">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. Made in {siteConfig.contact.city}.
          </p>
          <p className="text-muted-foreground/70">Powered by good ideas.</p>
        </Container>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  className?: string;
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 9H15V6.5h-1.5c-1.9 0-3 1.2-3 3V11H9v2.5h1.5V20H13v-6.5h1.8l.2-2.5H13V9.7c0-.4.2-.7.5-.7z" />
    </svg>
  );
}

function FooterColumn({ title, links, className }: FooterColumnProps) {
  return (
    <div className={className}>
      <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
