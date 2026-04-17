---
name: gstack
description: GSAP + Lenis orchestration patterns. Use when page-level scroll choreography exceeds what Motion alone can coordinate.
allowed-tools: Read, Edit, Glob, Grep
---

# GStack — GSAP + Lenis Playbook

## When to use this skill
When a scene requires:
- A single scroll timeline that controls multiple independent elements in sync.
- Pinning (section stays put while contents animate).
- Horizontal scroll inside a vertical page.
- Seamless sync between Lenis virtual scroll and GSAP ScrollTrigger.

Default to Motion for everything else.

## Baseline setup

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## Lenis ↔ ScrollTrigger sync
In the client wrapper that mounts Lenis:

```tsx
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

This is the ONLY way to keep ScrollTrigger in sync with Lenis. Do not rAF-loop Lenis separately.

## Pinning pattern
```ts
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=150%",
  pin: true,
  scrub: 1,
});
```

## Horizontal-scroll-in-vertical
```ts
gsap.to(".track", {
  xPercent: -100 * (cards.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".track",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".track").offsetWidth,
  },
});
```

## Cleanup (React StrictMode safe)
Wrap in `useGSAP()` from `@gsap/react` — it handles cleanup automatically.

## Rules
- Never hand-roll scroll listeners. Use ScrollTrigger.
- Kill every ScrollTrigger on route change.
- Pinning blocks page scroll — budget it carefully.

## TODO: Pull from upstream repo
Source: greensock.com docs + Lenis README. Mirror the sync pattern exactly.
