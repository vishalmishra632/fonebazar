"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  target: number;
  inView: boolean;
  duration?: number;
  reducedMotion?: boolean;
}

export function useCountUp({
  target,
  inView,
  duration = 1400,
  reducedMotion = false,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(reducedMotion && inView ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reducedMotion]);

  return value;
}
