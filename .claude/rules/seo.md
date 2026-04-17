---
paths:
  - "app/**/layout.tsx"
  - "app/**/page.tsx"
  - "lib/seo/**/*.ts"
---

# SEO Rules

## Metadata
- Every page exports `metadata` or `generateMetadata`.
- Title follows `{page} | fonebazar` — use the root `template` in `app/layout.tsx`.
- Description: 150–160 characters, unique per page.
- `alternates.canonical` set on every page.
- Open Graph + Twitter card present on the root layout; overridden per page when the hero image differs.

## Structured data (JSON-LD)
- Schemas live in `lib/seo/structured-data.ts`.
- Inject via the `<JsonLd />` component (escapes `<` to `\u003c`).
- Root layout: `WebSite` schema.
- Home: `Organization` or `LocalBusiness` schema.
- Products: `Product` + `ItemList` on catalog pages.
- Services: `Service` schema per service page.

## Sitemap
- Auto-generated via `next-sitemap` on `postbuild`.
- Priority rules in `next-sitemap.config.js` — do not hand-edit per route.

## Accessibility (SEO-adjacent)
- One `<h1>` per page.
- Every image has `alt`. Decorative images use `alt=""`.
- Skip-to-content link in the root layout.
