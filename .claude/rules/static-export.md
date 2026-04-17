---
paths:
  - "next.config.ts"
  - "app/**/*.{ts,tsx}"
---

# Static Export Rules

This project uses `output: "export"`. Every route is prerendered at build time. Violations of these rules break `npm run build`.

## Hard constraints
- No route handlers (`route.ts`) that need to execute at runtime.
- No server components that depend on runtime-only data (cookies, headers, request).
- No `fetch()` calls inside pages or layouts that need a live server to respond at request time.
- All data is compile-time: imported from `lib/data/`.
- `next/image` with `unoptimized: true` or plain `<img>` for decorative images.
- No `revalidate` or ISR — neither applies in export mode.

## Allowed
- Client components with runtime `fetch` (they execute in the browser).
- Dynamic routes via `generateStaticParams` — the route is prerendered for every returned param.
- `Metadata` and `generateMetadata` both work.

## Before merging
Run `npm run build`. If the out/ directory is not produced, the merge is blocked.
