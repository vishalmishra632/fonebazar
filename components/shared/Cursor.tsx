"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="target"], input[type="checkbox"], input[type="radio"], label[for]';

// Filament trail tuning. Keep the trail short so the screen never feels
// "drawn on" — we want a 200–500ms ghost of recent movement, not a sketchpad.
const TRAIL_MAX_POINTS = 36;
const TRAIL_DURATION_MS = 480;
const TRAIL_CORE_WIDTH = 2.4;
const TRAIL_HOVER_WIDTH = 4;
const TRAIL_GLOW_MULTIPLIER = 2.6;

// Brand colours used by the canvas stroke. We can't read OKLCH custom
// properties on every browser's 2D context reliably, so use literal hex
// matching the theme tokens in app/globals.css.
const TRAIL_COLOR_DARK = "#EDD25A";
const TRAIL_COLOR_LIGHT = "#B6721E";

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

export function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.2 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const pointerFine = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateEnabled() {
      const next = pointerFine.matches && !reducedMotion.matches;
      setEnabled(next);
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("cursor-custom", next);
      }
    }

    updateEnabled();
    pointerFine.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      pointerFine.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("cursor-custom");
      }
    };
  }, []);

  useEffect(() => {
    hoveringRef.current = hovering;
  }, [hovering]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getTrailColor(): string {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? TRAIL_COLOR_DARK : TRAIL_COLOR_LIGHT;
    }

    function move(event: PointerEvent) {
      const px = event.clientX;
      const py = event.clientY;
      x.set(px);
      y.set(py);
      trailRef.current.push({ x: px, y: py, t: performance.now() });
      if (trailRef.current.length > TRAIL_MAX_POINTS) {
        trailRef.current.shift();
      }
    }
    function over(event: PointerEvent) {
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    }
    function down() {
      setPressed(true);
    }
    function up() {
      setPressed(false);
    }

    resize();
    let cachedColor = getTrailColor();
    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme toggle is rare; only re-read the brand colour every ~30 frames
      // (~half a second at 60fps) to avoid getComputedStyle churn.
      frame++;
      if (frame % 30 === 0) cachedColor = getTrailColor();

      const now = performance.now();
      const trail = trailRef.current;
      const hovered = hoveringRef.current;
      const baseWidth = hovered ? TRAIL_HOVER_WIDTH : TRAIL_CORE_WIDTH;

      ctx.lineCap = "round";
      ctx.strokeStyle = cachedColor;

      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const age = now - b.t;
        if (age > TRAIL_DURATION_MS) continue;
        const alpha = 1 - age / TRAIL_DURATION_MS;
        const width = baseWidth * alpha;

        // Glow pass — wider, low-alpha halo simulates molten filament glow
        ctx.globalAlpha = alpha * 0.22;
        ctx.lineWidth = width * TRAIL_GLOW_MULTIPLIER;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // Core pass — narrow, opaque centre
        ctx.globalAlpha = alpha;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      trailRef.current = [];
    };
  }, [enabled, x, y]);

  if (!mounted || !enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998]"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: pressed ? 0.9 : hovering ? 2 : 1,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-4 -mt-4 h-8 w-8 rounded-full border border-brand"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: hovering ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-brand"
      />
    </>
  );
}
