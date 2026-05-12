"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface TextMorphProps {
  children: string;
  className?: string;
  scrambleFor?: number;
}

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Letters briefly jumble (typewriter-style) then settle on the real word.
// Runs once per hover. Screen readers always see the underlying text.
export function TextMorph({
  children,
  className,
  scrambleFor = 320,
}: TextMorphProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(children);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplay(children);
  }, [children]);

  function cancel() {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }

  function scramble() {
    if (reduced) return;
    cancel();
    const target = children;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / scrambleFor);
      // Each letter stabilises at its own threshold — progressive settle.
      const next = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const threshold = i / target.length;
          if (t >= threshold) return char;
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");
      setDisplay(next);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target);
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(step);
  }

  useEffect(() => cancel, []);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      aria-label={children}
    >
      <span aria-hidden>{display}</span>
    </span>
  );
}

// Variant that accepts ReactNode for composition with icons alongside the label.
export function TextMorphWithDecor({
  label,
  children,
  className,
}: {
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span className={className}>
      <TextMorph>{label}</TextMorph>
      {children}
    </span>
  );
}
