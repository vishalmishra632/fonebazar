import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MachineCard } from "./MachineCard";
import { machines } from "@/lib/data/store-content";

export function MachineLineup() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              The lineup
            </p>
            <RevealOnScroll
              as="h2"
              variant="layer"
              className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl"
            >
              Six machines, running daily.
            </RevealOnScroll>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              What we have, what each one handles, and roughly how busy it is.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {machines.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
