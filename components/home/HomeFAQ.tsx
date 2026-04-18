"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { homeFaqs } from "@/lib/data/services-content";

export function HomeFAQ() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Common questions
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Before you ask.
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-3xl">
          <Accordion defaultValue={["faq-0"]}>
            {homeFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-b border-border/40"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-medium hover:text-brand">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
