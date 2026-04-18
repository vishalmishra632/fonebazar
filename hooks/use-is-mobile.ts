"use client";

import { useEffect, useState } from "react";

interface UseIsMobileOptions {
  breakpoint?: number;
}

export function useIsMobile({ breakpoint = 640 }: UseIsMobileOptions = {}): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const viewport = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const coarse = window.matchMedia("(pointer: coarse)");

    function update() {
      setIsMobile(viewport.matches || coarse.matches);
    }

    update();
    viewport.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      viewport.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}
