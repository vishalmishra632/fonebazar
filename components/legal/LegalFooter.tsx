import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { formatLastUpdated, legalPages } from "@/lib/data/legal-meta";
import { buildWhatsAppCustomURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface LegalFooterProps {
  currentSlug: string;
  lastUpdated: string;
}

export function LegalFooter({ currentSlug, lastUpdated }: LegalFooterProps) {
  const whatsappHref = buildWhatsAppCustomURL(
    "Hi fonebazar, I have a question about one of your policies.",
  );

  return (
    <footer className="mt-20 border-t border-border/40">
      <Container className="py-12">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Other legal documents
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-base">
          {legalPages.map((page) => {
            const isCurrent = page.slug === currentSlug;
            if (isCurrent) {
              return (
                <li
                  key={page.slug}
                  aria-current="page"
                  className="text-muted-foreground/70"
                >
                  <span className="mr-1 text-xs uppercase tracking-wider">
                    You are here —
                  </span>
                  {page.title}
                </li>
              );
            }
            return (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className={cn(
                    "text-brand transition hover:brightness-110",
                  )}
                >
                  {page.title} <span aria-hidden>→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>

      <div className="border-t border-border/40">
        <Container className="flex flex-col gap-3 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            Questions about this policy?{" "}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand transition hover:brightness-110"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Message us
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground/80">
            Last updated {formatLastUpdated(lastUpdated)}
          </p>
        </Container>
      </div>
    </footer>
  );
}
