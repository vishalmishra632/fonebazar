"use client";

import { useEffect, useState } from "react";

interface UseRotatingTextOptions {
  messages: readonly string[];
  intervalMs?: number;
  active?: boolean;
  seed?: number;
}

export function useRotatingText({
  messages,
  intervalMs = 3500,
  active = true,
  seed = 0,
}: UseRotatingTextOptions): { index: number; value: string } {
  const start = messages.length > 0 ? seed % messages.length : 0;
  const [index, setIndex] = useState(start);

  useEffect(() => {
    if (!active || messages.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [active, intervalMs, messages.length]);

  return { index, value: messages[index] ?? messages[0] ?? "" };
}
