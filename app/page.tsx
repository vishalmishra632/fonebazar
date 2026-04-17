import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { siteConfig } from "@/lib/data/site";

export default function Home() {
  return (
    <Section spacing="loose">
      <Container className="flex flex-col items-start gap-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Phase 0 — foundation ready
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          {siteConfig.name} scaffold online.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          The project skeleton, toolchain, and design primitives are in place. Phase 1
          (homepage) is next.
        </p>
      </Container>
    </Section>
  );
}
