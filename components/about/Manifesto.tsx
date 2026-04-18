"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import { manifesto } from "@/lib/data/about-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CHAR_DELAY = 0.03;
const CURSOR_HOLD_MS = 1200;

export function Manifesto() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [cursorState, setCursorState] = useState<"hidden" | "typing" | "done">(
    "hidden",
  );
  const fullText = manifesto.join(" ");
  const totalChars = manifesto.reduce((sum, line) => sum + line.length, 0);
  const typingDurationMs = totalChars * CHAR_DELAY * 1000;

  useEffect(() => {
    if (!inView || reduced) return;
    setCursorState("typing");
    const doneTimer = window.setTimeout(() => {
      setCursorState("done");
    }, typingDurationMs + CURSOR_HOLD_MS);
    return () => window.clearTimeout(doneTimer);
  }, [inView, reduced, typingDurationMs]);

  return (
    <section ref={ref} className="py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="sr-only">{fullText}</p>

          {reduced ? (
            <StaticManifesto />
          ) : (
            <TypedManifesto inView={inView} cursorState={cursorState} />
          )}

          <div
            aria-hidden
            className="mx-auto mt-14 h-px w-32 bg-gradient-to-r from-transparent via-brand/40 to-transparent"
          />
        </div>
      </Container>
    </section>
  );
}

function StaticManifesto() {
  return (
    <div aria-hidden className="space-y-4">
      {manifesto.map((line, index) => {
        const body = line.slice(0, -1);
        const period = line.slice(-1);
        return (
          <p
            key={index}
            className="font-display text-[26px] leading-snug md:text-3xl lg:text-[36px]"
          >
            <strong className="font-semibold">{body.charAt(0)}</strong>
            {body.slice(1)}
            <span className="text-brand">{period}</span>
          </p>
        );
      })}
    </div>
  );
}

interface TypedManifestoProps {
  inView: boolean;
  cursorState: "hidden" | "typing" | "done";
}

function TypedManifesto({ inView, cursorState }: TypedManifestoProps) {
  let runningIndex = 0;

  return (
    <div aria-hidden className="space-y-4">
      {manifesto.map((line, lineIndex) => {
        const chars = Array.from(line);
        const bodyChars = chars.slice(0, -1);
        const period = chars[chars.length - 1];
        const isLastLine = lineIndex === manifesto.length - 1;

        return (
          <p
            key={lineIndex}
            className="font-display text-[26px] leading-snug md:text-3xl lg:text-[36px]"
          >
            {bodyChars.map((char, charIndex) => {
              const delay = runningIndex * CHAR_DELAY;
              runningIndex += 1;
              return (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay, duration: 0.04 }}
                  className={charIndex === 0 ? "font-semibold" : undefined}
                >
                  {char}
                </motion.span>
              );
            })}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: runningIndex * CHAR_DELAY, duration: 0.04 }}
              className="text-brand"
            >
              {period}
            </motion.span>
            {(() => {
              runningIndex += 1;
              return null;
            })()}

            {isLastLine && cursorState === "typing" ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: runningIndex * CHAR_DELAY }}
                className="caret-blink ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-brand align-baseline"
              />
            ) : null}
          </p>
        );
      })}
    </div>
  );
}
