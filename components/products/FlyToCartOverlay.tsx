"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FlyEvent {
  imageSrc: string;
  originRect: Rect;
}

interface FlightState {
  id: number;
  imageSrc: string;
  origin: Rect;
  destination: Rect;
}

function bounceCartIcon() {
  const target = document.querySelector<HTMLElement>("[data-cart-trigger]");
  if (!target) return;
  target.classList.add("cart-icon-bounce");
  window.setTimeout(() => target.classList.remove("cart-icon-bounce"), 480);
}

export function FlyToCartOverlay() {
  const reduced = useReducedMotion();
  const [flight, setFlight] = useState<FlightState | null>(null);

  useEffect(() => {
    function handler(event: Event) {
      const detail = (event as CustomEvent<FlyEvent>).detail;
      if (!detail) return;
      const target = document.querySelector<HTMLElement>("[data-cart-trigger]");
      if (!target) {
        bounceCartIcon();
        return;
      }
      if (reduced) {
        bounceCartIcon();
        return;
      }
      const rect = target.getBoundingClientRect();
      setFlight({
        id: Date.now(),
        imageSrc: detail.imageSrc,
        origin: detail.originRect,
        destination: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
      });
    }
    window.addEventListener("cart:fly", handler);
    return () => window.removeEventListener("cart:fly", handler);
  }, [reduced]);

  return (
    <AnimatePresence>
      {flight ? (
        <motion.div
          key={flight.id}
          initial={{
            x: flight.origin.x,
            y: flight.origin.y,
            width: flight.origin.width,
            height: flight.origin.height,
            opacity: 0.9,
            scale: 1,
          }}
          animate={{
            x: flight.destination.x + flight.destination.width / 2 - 24,
            y: flight.destination.y + flight.destination.height / 2 - 24,
            width: 48,
            height: 48,
            opacity: 0.2,
            scale: 0.6,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            bounceCartIcon();
            setFlight(null);
          }}
          className="pointer-events-none fixed left-0 top-0 z-[60] overflow-hidden rounded-full border border-brand/40 shadow-lg"
        >
          <Image
            src={flight.imageSrc}
            alt=""
            fill
            sizes="120px"
            className="object-cover"
            unoptimized
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
