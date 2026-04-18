"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { LegalSection } from "@/lib/types/legal";
import { cn } from "@/lib/utils";

interface LegalTOCProps {
  sections: LegalSection[];
}

export function LegalTOC({ sections }: LegalTOCProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;
        const topmost = intersecting.reduce((prev, current) =>
          current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev,
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(id: string) {
    setActiveId(id);
  }

  return (
    <>
      <nav
        aria-label="Table of contents"
        className="hidden lg:sticky lg:top-28 lg:block"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Contents
        </p>
        <ul className="space-y-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="relative">
                {isActive ? (
                  <motion.span
                    aria-hidden
                    layoutId="legal-toc-indicator"
                    className="absolute inset-y-1 left-0 w-0.5 bg-brand"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <a
                  href={`#${section.id}`}
                  onClick={() => handleClick(section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block py-1.5 pl-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="mr-2 font-display text-xs text-brand tabular-nums">
                    {section.number}
                  </span>
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <details className="group mb-8 rounded-xl border border-border/40 bg-surface-1 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
          Jump to a section
          <ChevronDown
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <ul className="border-t border-border/40 p-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
              >
                <span className="mt-0.5 font-display text-xs text-brand tabular-nums">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
