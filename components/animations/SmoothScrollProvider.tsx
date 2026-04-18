"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);

    function onScroll() {
      ScrollTrigger.update();
    }
    function raf(time: number) {
      lenis?.raf(time * 1000);
    }

    lenis.on("scroll", onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
