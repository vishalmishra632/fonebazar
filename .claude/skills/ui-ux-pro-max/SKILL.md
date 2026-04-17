---
name: ui-ux-pro-max
description: Senior-level UI/UX heuristics for premium marketing sites — typography, rhythm, colour, hierarchy, whitespace, signature interactions.
allowed-tools: Read, Edit, Glob, Grep
---

# UI/UX Pro Max

## When to use this skill
Elevating a page from "functional" to "premium". Use after layout is in place; do not invoke for pure logic work.

## Hierarchy
- One hero element per fold — never compete.
- Typographic scale: at most three sizes visible at once.
- First viewport should convey the brand promise in one sentence.

## Rhythm
- Vertical rhythm on an 8px baseline.
- Section spacing: 96–160px on desktop, 64–96px on mobile.
- Never break rhythm to "fit more in" — push content below.

## Typography
- Display font for headings, body font for running copy.
- Line-height 1.1–1.2 for display, 1.5–1.7 for body.
- Measure width 60–75 characters. Use `max-w-prose` or explicit `max-w-2xl`.

## Colour
- One accent. One.
- Dark-first palette: neutral foreground on deep base, accent as a single hit colour.
- Never put body text on the accent.

## Whitespace
- If a layout feels tight, add 50%. Then add 20% more.
- Left-rail indentation for long-form content. Breathing room around CTAs.

## Signature interactions (choose ONE per page)
- Magnetic cursor on hero CTA.
- Card tilt (3D) on product cards.
- Number-counter reveal on stats.
- Horizontal scroll reveal for service showcase.
- Image mask reveal on section entrance.

## States — always drawn
- Default, hover, focus, active, disabled.
- Empty, loading (skeleton — never spinner alone), error.

## Accessibility
- Visible focus ring on every interactive element.
- Colour contrast 4.5:1 for body, 3:1 for UI.
- All motion behind `prefers-reduced-motion`.

## TODO: Pull from upstream repo
Inspirations: linear.app, vercel.com, arc.net, stripe.com. Keep a local style board under `_scratch/inspiration/`.
