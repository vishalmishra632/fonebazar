---
name: framer-motion
description: Animation patterns for Motion (Framer Motion v12) — variants, layout animations, scroll-linked, page transitions, gesture, orchestration.
allowed-tools: Read, Edit, Glob, Grep
---

# Framer Motion (v12 / `motion` package) Patterns

## When to use this skill
Any work involving the `motion` library: new animations, refactoring motion code, debugging jank, adding page transitions.

## Import discipline
- `import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"` — the `motion` package; same API as `framer-motion`.
- Reduced motion is global via `<MotionConfig reducedMotion="user">` in the root layout.

## Core patterns

### 1. Variants + stagger
Parent defines variants; children inherit via the `variants` prop. Use `staggerChildren` and `delayChildren`.

```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
```

### 2. Layout animations
- `layout` prop + `LayoutGroup` for shared element transitions.
- `layoutId` for morphing between routes (with `AnimatePresence`).

### 3. Scroll-linked
- `useScroll({ target, offset })` + `useTransform` — never subscribe to `window.scroll` directly.
- Apply `transform` and `opacity` only for 60fps.

### 4. Page transitions
- `AnimatePresence mode="wait"` in a client layout wrapping `{children}`.
- Keyed by `usePathname()`.

### 5. Gesture
- `whileHover`, `whileTap`, `whileFocus`, `whileInView`.
- `drag` only when the interaction demands physicality — never for decoration.

## Performance rules
- Animate `transform` and `opacity` only.
- `will-change` only while actively animating — remove after.
- Batch with `LayoutGroup` to avoid thrash.
- Never animate `height: auto`. Use `scaleY` + `transform-origin` or `height` keyframes with explicit values.

## Easing palette (single source of truth)
- Micro-interactions: `[0.4, 0, 0.2, 1]` 200ms
- Section reveals: `[0.22, 1, 0.36, 1]` 400–600ms
- Hero entrances: `[0.16, 1, 0.3, 1]` 800ms

## TODO: Pull from upstream repo
Canonical reference: https://motion.dev and https://www.framer.com/motion/. Fill in fonebazar-specific examples after Phase 1.
