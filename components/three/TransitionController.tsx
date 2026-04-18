"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TransitionScene = dynamic(
  () => import("@/components/three/scenes/TransitionScene"),
  { ssr: false, loading: () => null },
);

export function TransitionController() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const previousPathname = useRef<string | null>(null);
  const [primed, setPrimed] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) {
      previousPathname.current = pathname;
      return;
    }
    if (previousPathname.current && previousPathname.current !== pathname) {
      setPrimed(true);
      setActive(true);
      const end = window.setTimeout(() => setActive(false), 900);
      previousPathname.current = pathname;
      return () => window.clearTimeout(end);
    }
    previousPathname.current = pathname;
  }, [pathname, reduced]);

  if (reduced || !primed) return null;

  return (
    <Suspense fallback={null}>
      <TransitionScene active={active} />
    </Suspense>
  );
}
