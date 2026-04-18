import { Container } from "@/components/shared/Container";
import { LegalFooter } from "./LegalFooter";
import { LegalHero } from "./LegalHero";
import { LegalSection } from "./LegalSection";
import { LegalTOC } from "./LegalTOC";
import type { LegalDocument } from "@/lib/types/legal";

interface LegalLayoutProps {
  doc: LegalDocument;
}

export function LegalLayout({ doc }: LegalLayoutProps) {
  return (
    <>
      <LegalHero doc={doc} />

      <Container className="py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <LegalTOC sections={doc.sections} />
          </aside>

          <div className="space-y-16 lg:col-span-9 lg:space-y-24">
            {doc.sections.map((section) => (
              <LegalSection key={section.id} section={section} />
            ))}

            {doc.statutoryNote ? (
              <aside className="max-w-[68ch] rounded-xl border border-border/30 bg-surface-1 p-5 text-sm leading-relaxed text-muted-foreground">
                {doc.statutoryNote}
              </aside>
            ) : null}
          </div>
        </div>
      </Container>

      <LegalFooter currentSlug={doc.slug} lastUpdated={doc.lastUpdated} />
    </>
  );
}
