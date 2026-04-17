# Animation Patterns Reference — Motion, GSAP, Scroll, 3D

## Table of Contents
1. [Motion v12 Core Patterns](#motion-v12-core-patterns)
2. [Page Load Orchestration](#page-load-orchestration)
3. [Scroll-Triggered Animations](#scroll-triggered-animations)
4. [Layout Animations](#layout-animations)
5. [GSAP With React](#gsap-with-react)
6. [GSAP ScrollTrigger Patterns](#gsap-scrolltrigger-patterns)
7. [CSS Scroll-Driven Animations](#css-scroll-driven-animations)
8. [Lenis Smooth Scroll](#lenis-smooth-scroll)
9. [3D With React Three Fiber](#3d-with-react-three-fiber)
10. [Reduced Motion Accessibility](#reduced-motion-accessibility)
11. [Performance Tier List](#performance-tier-list)
12. [When to Use What](#when-to-use-what)

---

## Motion v12 Core Patterns

### Import Convention (CRITICAL)
```tsx
// ✅ CORRECT — always use the new package path
import { motion, AnimatePresence, useScroll, useTransform, MotionConfig } from "motion/react";

// ❌ WRONG — deprecated, do NOT use
// import { motion } from "framer-motion";
```

### The Design Easing
Use this easing for all UI animations — it's the "Apple" feel:
```tsx
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];  // Smooth deceleration
const EASE_IN_OUT = [0.65, 0, 0.35, 1];     // For symmetrical motions
const SPRING_SNAPPY = { type: "spring", stiffness: 300, damping: 30 };
const SPRING_BOUNCY = { type: "spring", stiffness: 200, damping: 15 };
```

### Basic Reveal Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  Content appears smoothly
</motion.div>
```

### Hover & Tap Interactions
```tsx
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="..."
>
  Click me
</motion.button>
```

---

## Page Load Orchestration

### Staggered Container Pattern (Use On Every Page)
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="..."
    >
      <motion.span variants={itemVariants} className="badge">New Release</motion.span>
      <motion.h1 variants={itemVariants} className="text-5xl font-bold">
        Build faster. Ship sooner.
      </motion.h1>
      <motion.p variants={itemVariants} className="text-muted-foreground">
        The platform for modern developers.
      </motion.p>
      <motion.div variants={itemVariants} className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </motion.div>
    </motion.section>
  );
}
```

### Page Transition With AnimatePresence
```tsx
// In layout or page wrapper
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Scroll-Triggered Animations

### Reveal On Scroll (The Awwwards Standard)
```tsx
// Reusable wrapper component
"use client"
import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Usage
<Reveal>
  <FeatureCard />
</Reveal>
<Reveal delay={0.1}>
  <FeatureCard />
</Reveal>
<Reveal delay={0.2} direction="left">
  <FeatureCard />
</Reveal>
```

### Scroll Progress Bar
```tsx
"use client"
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
    />
  );
}
```

### Parallax Effect
```tsx
"use client"
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxSection({ children, offset = 200 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

### Counter/Number Animation
```tsx
"use client"
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

export function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const display = useTransform(springValue, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target, motionValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// Usage: <AnimatedCounter target={50000} /> → animates from 0 to "50,000"
```

---

## Layout Animations

### Shared Layout Animation (Tab Indicator)
```tsx
"use client"
import { useState } from "react";
import { motion } from "motion/react";

const tabs = ["Overview", "Analytics", "Reports", "Settings"];

export function AnimatedTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className="relative px-4 py-2 text-sm font-medium"
        >
          {active === i && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-background rounded-md shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## GSAP With React

### Setup
```bash
npm install gsap @gsap/react
```

### Basic Pattern With useGSAP
```tsx
"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function AnimatedSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <h2 className="animate-item">Title</h2>
      <p className="animate-item">Description</p>
      <button className="animate-item">CTA</button>
    </div>
  );
}
```

### Text Splitting (SplitText — Now Free!)
```tsx
"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function KineticHeadline({ text }: { text: string }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const split = new SplitText(headlineRef.current, { type: "chars,words" });
    gsap.from(split.chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  }, { scope: headlineRef });

  return (
    <h1
      ref={headlineRef}
      className="text-5xl md:text-7xl font-bold leading-tight"
      style={{ perspective: "400px" }}
    >
      {text}
    </h1>
  );
}
```

---

## GSAP ScrollTrigger Patterns

### Section Pin + Horizontal Scroll
```tsx
"use client"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScroll({ items }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - track.clientWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={trackRef} className="flex gap-8">
        {items.map((item) => (
          <div key={item.id} className="min-w-[400px] flex-shrink-0">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Scroll-Triggered Reveal With Stagger
```tsx
useGSAP(() => {
  gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
    const items = section.querySelectorAll(".reveal-item");
    gsap.from(items, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}, { scope: containerRef });
```

---

## CSS Scroll-Driven Animations

Native CSS — runs on compositor thread for guaranteed 60fps, no JavaScript.
Browser support: Chrome/Edge ✅, Safari ✅, Firefox partial.

```css
/* Fade in as element enters viewport */
.scroll-reveal {
  animation: fadeSlideIn linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Progress bar driven by scroll position */
.scroll-progress {
  animation: grow linear;
  animation-timeline: scroll();
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

Use CSS scroll animations for **simple reveals and progress indicators**. Use Motion/GSAP
for **complex orchestrated sequences, interactive elements, and layout animations**.

---

## Lenis Smooth Scroll

### Setup
```bash
npm install lenis
```

### Integration With Next.js
```tsx
// components/smooth-scroll.tsx
"use client"
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,          // Smoothing factor (0.05 = very smooth, 0.15 = more responsive)
        duration: 1.2,       // Duration of scroll animation
        smoothWheel: true,   // Smooth wheel scrolling
        orientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}

// app/layout.tsx
<SmoothScroll>{children}</SmoothScroll>
```

**Why Lenis over alternatives**: Uses native `scrollTo` (not transforms), so
IntersectionObserver, CSS `position: sticky`, and ScrollTrigger all work normally.
Used on 60%+ of Awwwards-winning sites.

---

## 3D With React Three Fiber

### Setup
```bash
npm install three @react-three/fiber @react-three/drei
```

### Floating 3D Object (Hero Section)
```tsx
"use client"
import dynamic from "next/dynamic";

// ALWAYS dynamic import for 3D — no SSR
const Scene = dynamic(() => import("@/components/3d/hero-scene"), { ssr: false });

export function Hero3D() {
  return (
    <div className="relative h-[600px]">
      <Scene />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-6xl font-bold">Your Product</h1>
      </div>
    </div>
  );
}

// components/3d/hero-scene.tsx
"use client"
import { Canvas } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
```

### Performance Rules for 3D
- ALWAYS use `dynamic(() => import(...), { ssr: false })` — Three.js needs the DOM
- Keep poly count under **100K** for background scenes
- Use `<Environment preset="...">` instead of multiple lights
- Add `frameloop="demand"` to `<Canvas>` for static scenes (renders only on change)
- Provide a 2D fallback for low-powered devices:
  ```tsx
  const [supports3D, setSupports3D] = useState(true);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) setSupports3D(false);
  }, []);
  ```

---

## Reduced Motion Accessibility

### Motion (Automatic Handling)
```tsx
// Wrap your app — respects OS-level setting automatically
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
// "user" mode: disables transform/layout animations, preserves opacity transitions
```

### GSAP
```tsx
gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
  // No animations created = GSAP auto-reverts all ScrollTriggers etc.
  // Optionally set simple fades only:
  gsap.set(".animate-item", { opacity: 1, y: 0 });
});
```

### CSS Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Principle
"Reduced motion" ≠ "no motion." Replace parallax, scale, and x/y animations
with simple opacity fades. Disable autoplay videos. Provide an on-page toggle.

---

## Performance Tier List

| Tier | Properties | Method | Notes |
|------|-----------|--------|-------|
| **S** (GPU-accelerated) | `transform`, `opacity` | WAAPI / CSS | Motion v12 uses these automatically |
| **A** (usually smooth) | `transform`, `opacity` | `requestAnimationFrame` (GSAP) | Main-thread dependent |
| **B** (use sparingly) | `filter`, `clip-path` | Any | Triggers paint, not layout |
| **D** (avoid animating) | `width`, `height`, `margin`, `padding`, `top/left` | Any | Triggers layout recalc |

**Rules**:
- Use `transform: scale()` instead of animating `width`/`height`
- Use `transform: translate()` instead of animating `top`/`left`/`margin`
- Use CSS `scroll-timeline` or Motion's `scroll()` instead of reading `scrollTop` in JS
- `will-change: transform` on elements that will animate (remove after animation completes)

---

## When to Use What

| Scenario | Use This |
|----------|----------|
| Page load reveal, stagger | **Motion** (`variants`, `staggerChildren`) |
| Hover/tap micro-interactions | **Motion** (`whileHover`, `whileTap`) |
| Shared layout animations (tabs, cards) | **Motion** (`layoutId`) |
| Scroll-triggered fade/slide | **Motion** (`whileInView`) or **CSS** (`animation-timeline: view()`) |
| Complex timelines (sequenced, labeled) | **GSAP** (`gsap.timeline()`) |
| Text splitting / letter-by-letter | **GSAP** (`SplitText` — now free) |
| SVG morphing / drawing | **GSAP** (`MorphSVG`, `DrawSVG` — now free) |
| Scroll-pinned sections | **GSAP** (`ScrollTrigger.pin()`) |
| Horizontal scroll sections | **GSAP** (`ScrollTrigger` + x transform) |
| Simple scroll progress bar | **CSS** (`animation-timeline: scroll()`) |
| Smooth page scrolling | **Lenis** (always) |
| 3D hero scene / product viewer | **React Three Fiber + Drei** |
| Drag-and-drop / gestures | **Motion** (`drag`, `dragConstraints`) |
