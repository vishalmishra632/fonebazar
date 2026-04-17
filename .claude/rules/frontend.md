---
paths:
  - "app/**/*.tsx"
  - "components/**/*.{ts,tsx}"
---

# Frontend Rules

## Components
- Functional only, default export.
- Props typed with an interface named `{Component}Props`.
- No logic in JSX — extract to the top of the function.
- `"use client"` only when needed (state, effects, browser APIs).

## Styling
- Tailwind classes via `cn()` helper (`@/lib/utils`).
- No inline `style` except for dynamic CSS variables.
- Extract repeated class strings to `cva` variants.

## Motion
- `motion` (Framer Motion v12) for component-level animation.
- GSAP only for complex timeline orchestration.
- Always respect `prefers-reduced-motion`.

## Files
- One component per file. Filename matches the exported component in PascalCase.
- Hooks named `useThing.ts` in `hooks/`.
- Shared variants live in `lib/animations.ts`.
