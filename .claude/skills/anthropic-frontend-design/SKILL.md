---
name: anthropic-frontend-design
description: Anthropic's internal frontend-design heuristics — calm surfaces, content-first layout, restrained motion, accessible by default.
allowed-tools: Read, Edit, Glob, Grep
---

# Anthropic Frontend Design Patterns

## When to use this skill
Any page-level visual design work. The aesthetic target: clean, confident, quiet.

## Principles
1. **Content first** — the words and the product are the hero, not the chrome.
2. **Calm surfaces** — neutral backgrounds, restrained gradients, type as the main visual interest.
3. **Restrained motion** — motion confirms cause-effect; it does not entertain.
4. **Accessible by default** — every design decision survives a reduced-motion, high-contrast audit.

## Layout
- Container max 1280px (`max-w-7xl`).
- Grid: 12-col desktop, 6-col tablet, 4-col mobile.
- Gutters: 32px desktop, 16px mobile.

## Typography
- Display: sans — crisp geometric, heavy weights reserved for hero.
- Body: sans, 16px base, 1.6 line-height.
- Small caps for kickers and eyebrow labels.

## Colour
- Neutrals do the work. Accent punctuates — never fills.
- Borders at 8% foreground; dividers at 4%.

## Components
- Buttons: three ranks (primary, secondary, ghost) and nothing else.
- Cards: one elevation. If you need two, you have too many cards.
- Inputs: labelled above, helper below, error inline.

## Motion
- Duration 180–420ms. Anything longer is decorative.
- Ease: `[0.22, 1, 0.36, 1]` default. Never spring for UI-scale motion.
- Entry: y-translate 16–24px + opacity. That is it.

## TODO: Pull from upstream repo
Source: Anthropic's internal `frontend-design` skill. Mirror as available.
