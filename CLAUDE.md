# fonebazar — Project Operating Manual

## Purpose
Premium static marketing site for a creative services studio offering 3D printing, laser engraving, resin art, t-shirt printing, and decal printing. Orders are handled over WhatsApp — no backend.

## Philosophy
- No speculative features. Build what the current phase brief asks for, nothing more.
- Justify every new dependency in the PR description.
- Remove dead code on sight. Finish the job.
- Motion serves meaning. If a user cannot tell what an animation communicates, cut it.
- Accessibility is not a phase — it is the default.

## Hard Limits
- Functions ≤ 100 lines.
- Cyclomatic complexity ≤ 8.
- Line length ≤ 100 chars.
- Components ≤ 250 lines — split when they exceed.
- No `any` in TypeScript except in explicit interop shims.

## Toolchain
- Package manager: **npm** (matches Asian Grocers reference; swap to pnpm if/when installed).
- `npm run dev` — local dev on :3000
- `npm run build` — produces `/out` static export and regenerates sitemap via `postbuild`
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier write
- Before committing: `npm run lint && npm run typecheck && npm run build`

## Git
- Feature branches, conventional commits, commit subject ≤ 72 chars.
- Never `amend` or `--no-verify` on main.
- Delete with `trash`, never `rm -rf`.

## Static Export Rules
- Every route must be statically generatable (no server components needing runtime data).
- No `fetch()` at runtime in pages — all data is compile-time from `lib/data/`.
- Images: `<Image>` with `unoptimized: true` in config, or plain `<img>` for decorative.
- No route handlers (`route.ts`) that need to execute — this is `output: "export"`.

## Brand
- Display font: **[DECIDE IN PHASE 1 — candidates: Satoshi, General Sans]**
- Body font: **[DECIDE IN PHASE 1 — candidates: Inter, Plus Jakarta Sans]**
- Primary accent: **[DECIDE IN PHASE 1 — candidates: electric lime #C6FF3E, ultraviolet #7C5CFF, molten orange #FF6B35]**
- Dark mode first, light mode supported.
- Grid: 12-col, generous whitespace, `max-w-7xl` container.

## Motion Language
- Ease out with slight overshoot: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Durations: 200ms micro, 400ms section, 800ms hero.
- `motion` (Framer Motion v12) for component animation; GSAP + Lenis for scroll orchestration.
- Respect `prefers-reduced-motion` everywhere.

## Cart & Ordering
- Cart state: Zustand with `persist` middleware to localStorage (key `fonebazar-cart`).
- "Place Order" → routes to `/order-confirmation`.
- Order page: summary + **single WhatsApp CTA** that opens `https://wa.me/{NUMBER}?text={ENCODED_MESSAGE}`.
- Message format defined in `lib/whatsapp.ts` — never inlined in components.
- WhatsApp number + display config in `lib/data/site.ts` — never hardcoded elsewhere.

## Directory Layout
```
app/                     # App Router routes
  (marketing)/           # public route group with Navbar + Footer
  layout.tsx             # root — fonts, theme, lenis
  globals.css            # Tailwind + tokens
components/
  ui/                    # shadcn primitives
  layout/                # Navbar, Footer, PageShell
  shared/                # Container, Section, SectionHeading, CTAButton, Marquee
  animations/            # FadeIn, AnimatedText, ScrollReveal, Magnetic, SmoothScrollProvider
  cart/                  # CartDrawer, CartItem, WhatsAppCheckoutButton
lib/
  data/                  # site.ts, services.ts, products.ts, images/
  utils.ts               # cn()
  animations.ts          # shared variants
  cart-store.ts          # zustand
  whatsapp.ts            # order message formatter
hooks/                   # useCart, useReducedMotion
public/                  # logos, images/{home,products,services,about,store}
```

## Reference Bar
This project must match or exceed the craftsmanship of `D:\My projects\asian-grocers`. When in doubt, open that project and mirror the pattern.
