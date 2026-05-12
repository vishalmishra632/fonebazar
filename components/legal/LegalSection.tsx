"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import type { LegalCallout, LegalSection as LegalSectionType } from "@/lib/types/legal";
import { EASE_SECTION } from "@/lib/animations";

interface LegalSectionProps {
  section: LegalSectionType;
}

export function LegalSection({ section }: LegalSectionProps) {
  const headingId = `${section.id}-heading`;

  return (
    <motion.section
      id={section.id}
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: EASE_SECTION }}
      className="scroll-mt-28"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
        <div>
          <span
            aria-hidden
            className="block font-display text-5xl font-semibold leading-none lg:text-6xl"
            style={{
              WebkitTextStroke: "1px oklch(0.80 0.16 92 / 0.55)",
              color: "transparent",
            }}
          >
            {section.number}
          </span>
        </div>

        <div className="max-w-[68ch]">
          <h2
            id={headingId}
            className="font-display text-[28px] font-semibold leading-tight tracking-[-0.015em] md:text-[32px] lg:text-[36px]"
          >
            <span className="sr-only">Section {section.number}. </span>
            {section.title}
          </h2>

          <div className="mt-6 space-y-5 text-[17px] leading-7 text-foreground/85">
            {section.paragraphs.map((paragraph, index) => (
              <Fragment key={index}>
                <p>{paragraph}</p>
                {section.bullets
                  ?.filter((group) => group.afterParagraph === index)
                  .map((group, groupIndex) => (
                    <ul
                      key={`${index}-${groupIndex}`}
                      className="space-y-2.5 py-1 pl-1"
                    >
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="relative pl-6 leading-relaxed"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-sm bg-brand"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ))}
              </Fragment>
            ))}
          </div>

          {section.calloutAfter ? <Callout callout={section.calloutAfter} /> : null}
        </div>
      </div>
    </motion.section>
  );
}

function Callout({ callout }: { callout: LegalCallout }) {
  return (
    <aside className="mt-8 rounded-r-lg border-l-2 border-brand bg-brand/5 py-4 pl-5 pr-4">
      <p className="mb-1 text-xs uppercase tracking-wider text-brand">
        {callout.label}
      </p>
      <p className="text-[15px] italic leading-relaxed text-foreground/90">
        {callout.body}
      </p>
    </aside>
  );
}
