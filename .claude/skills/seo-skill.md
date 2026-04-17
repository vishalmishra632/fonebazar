# SEO Skill — Next.js 15 Static Export (App Router)

This skill defines SEO implementation standards for Next.js 15 sites using `output: 'export'` (fully static). Read this BEFORE implementing any SEO. Several built-in Next.js SEO conventions BREAK with static export — this file tells you what works, what doesn't, and the correct workarounds.

---

## Static Export Compatibility Table

| Feature | Works? | Workaround |
|---------|--------|------------|
| `export const metadata` | ✅ | Embedded in HTML at build time |
| `generateMetadata()` | ✅ | Requires `generateStaticParams` for dynamic routes |
| `metadataBase` | ✅ | Set once in root layout — all relative URLs resolve against it |
| `alternates.canonical` | ✅ | Resolves against metadataBase |
| `robots` in metadata | ✅ | Per-page meta robots tags |
| `app/sitemap.ts` | ❌ | Use `next-sitemap` postbuild or hand-written `public/sitemap.xml` |
| `app/robots.ts` | ❌ | Use static `public/robots.txt` |
| `next/image` default loader | ❌ | Use `unoptimized: true` or `next-image-export-optimizer` |
| `next/font` | ✅ | Self-hosts fonts, preloads, zero external requests |
| JSON-LD via `<script>` | ✅ | Use `dangerouslySetInnerHTML` in a component |
| `opengraph-image.tsx` | ✅ | Generated at build time |

---

## 1. Metadata Architecture

### Root Layout — Global Metadata with Title Template

Every site MUST set `metadataBase` in the root layout. Without it, relative URLs in OG images and canonical links won't resolve correctly in static export.

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.ca'),
  title: {
    template: '%s | Brand Name',
    default: 'Brand Name — Primary Keyword in Location',
  },
  description: 'Primary meta description with location + core keywords. Under 160 characters.',
  keywords: ['keyword1', 'keyword2', 'location'],
  authors: [{ name: 'Brand Name' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://yourdomain.ca',
    siteName: 'Brand Name',
    title: 'Brand Name — Full Title for Social',
    description: 'Social-specific description. Can be slightly different from meta description.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Brand Name' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Name — Title',
    description: 'Twitter-specific description.',
    images: ['/og-image.png'],
  },
};
```

### Page-Level Metadata — Static Pages

Each page exports its own `metadata` object. The `title` field uses the root layout template automatically.

```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About Us',  // Renders as: "About Us | Brand Name"
  description: 'Page-specific description with relevant keywords.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Brand Name',
    description: 'OG-specific description.',
    url: '/about',
  },
};
```

### Dynamic Route Metadata — Category/Product Pages

For dynamic routes in static export, `generateStaticParams` is MANDATORY. In Next.js 15, `params` is a Promise — must be awaited.

```tsx
// app/products/[slug]/page.tsx
export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category.name,
    description: `Browse ${category.name} at Brand Name. ${category.productCount} products.`,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${category.name} | Brand Name`,
      url: `/products/${slug}`,
      images: [{ url: category.ogImage, width: 1200, height: 630 }],
    },
  };
}
```

### Pages to noindex

Set `robots: { index: false, follow: true }` on: search results pages, privacy policy, terms & conditions, any utility/non-content pages.

---

## 2. Structured Data (JSON-LD)

### Reusable JsonLd Component

```tsx
// components/seo/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

The `.replace(/</, '\\u003c')` prevents XSS. Do NOT use `next/script` for JSON-LD. Multiple `<JsonLd>` blocks on one page are fully supported by Google.

### Schema Types and Where to Place Them

| Schema Type | Place On | Purpose |
|-------------|----------|---------|
| `Organization` | Root layout (all pages) | Brand identity, sameAs social links |
| `WebSite` + `SearchAction` | Homepage | Sitelinks search box in SERPs |
| `LocalBusiness` / `GroceryStore` | Homepage | Local pack, map results, AI Overviews |
| `BreadcrumbList` | Every page except homepage | Navigation breadcrumbs in SERPs |
| `ItemList` | Category/product listing pages | Carousel results, AI content extraction |
| `FAQPage` | Contact/FAQ page only | AI Overview citations, featured snippets |

### LocalBusiness / GroceryStore Schema

Use `GroceryStore` (subtype of `Store > LocalBusiness`). Include:
- `@id` with fragment identifier for entity linking
- `name`, `alternateName`
- `description` with keywords naturally
- `address` as `PostalAddress`
- `geo` as `GeoCoordinates` (latitude/longitude)
- `telephone` in E.164 format
- `openingHoursSpecification` for each day/group of days
- `image` (array: 1x1, 4x3, 16x9 recommended by Google)
- `logo`, `url`, `priceRange`
- `areaServed` for nearby cities
- `sameAs` linking to all social profiles
- `paymentAccepted`, `currenciesAccepted`

### BreadcrumbList Utility Function

```typescript
// lib/seo/structured-data.ts
interface BreadcrumbItem { name: string; url?: string; }

export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  baseUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: `${baseUrl}${item.url}` } : {}),
    })),
  };
}
```

Rules: minimum 2 items, last item (current page) MUST omit the `item` URL. Always use absolute URLs.

### ItemList for Product Catalog Pages

Do NOT use `Product` schema without prices — Google requires `offers` with `price`. Use `ItemList` instead:

```json
{
  "@type": "ItemList",
  "name": "Category Name",
  "numberOfItems": 12,
  "itemListOrder": "https://schema.org/ItemListUnordered",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Product Name",
      "url": "https://domain.ca/products/category#product-slug",
      "image": "https://domain.ca/images/product.jpg"
    }
  ]
}
```

### FAQPage Schema

Still valuable for AI Overviews — FAQ schema content is 3.2x more likely to be cited by AI systems. Only place on pages with genuine FAQ content visible to users.

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are your store hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are open Monday through Sunday, 10:00 AM to 9:00 PM."
      }
    }
  ]
}
```

---

## 3. Sitemap & Robots (Static Export Workarounds)

### Option A: next-sitemap (Recommended)

Install: `npm install next-sitemap`

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://yourdomain.ca',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/search', '/_next/'] },
      { userAgent: 'GPTBot', disallow: '/' },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    let priority = 0.7, changefreq = 'weekly';
    if (path === '/') { priority = 1.0; changefreq = 'daily'; }
    if (path.startsWith('/products/')) { priority = 0.8; }
    if (['/about', '/contact'].includes(path)) { priority = 0.5; changefreq = 'monthly'; }
    return { loc: path, changefreq, priority, lastmod: new Date().toISOString() };
  },
};
```

Add to package.json: `"postbuild": "next-sitemap --config next-sitemap.config.js"`

### Option B: Static public/robots.txt

```
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /search

User-agent: GPTBot
Disallow: /

Sitemap: https://yourdomain.ca/sitemap.xml
```

### Option C: Hand-written public/sitemap.xml

For small static sites with stable routes, manually list all URLs with priority values.

---

## 4. Open Graph & Social Cards

### Image Specifications
- **Dimensions:** 1200 × 630px (1.91:1 ratio) — universal standard
- **Format:** PNG for text overlays, JPG for photos
- **File size:** Under 1 MB (hard limits: 8 MB OG, 5 MB Twitter)
- **URLs must be absolute** (metadataBase handles this)

### Required OG Tags Per Page
- `og:title` — page-specific, under 60 characters
- `og:description` — compelling, under 200 characters
- `og:image` — 1200×630 image URL
- `og:url` — canonical page URL
- `og:type` — `website` for most pages
- `og:locale` — `en_CA` for Canadian English
- `og:site_name` — brand name

### Twitter Card
- `twitter:card` — always `summary_large_image`
- Other fields fall back to OG tags automatically

### Pre-made vs Generated OG Images
For static sites with stable pages, pre-create OG images in Canva/Figma and place in `public/images/og/`. Simpler and faster than `opengraph-image.tsx` route generation.

---

## 5. Performance SEO (Core Web Vitals)

### Thresholds (2025-2026)

| Metric | Good | Poor |
|--------|------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | > 0.25 |

Only 47% of websites pass all three. Static export gives a natural advantage: pre-rendered HTML, CDN delivery, near-instant TTFB.

### Image Optimization Rules
- Use `next/image` with `unoptimized: true` for static export
- OR use `next-image-export-optimizer` for build-time WebP + blur placeholders
- Set `priority` prop ONLY on above-the-fold images (hero, first visible products) — max 2-3 per page
- Always set `sizes` prop: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"`
- Always set explicit `width` and `height` to prevent CLS
- Use descriptive filenames: `mdh-garam-masala-100g.jpg` not `IMG_4532.jpg`

### Font Loading
- Always use `next/font` — self-hosts, preloads, zero external requests
- Set `display: 'swap'` for immediate text visibility
- Subset to needed weights only
- `size-adjust` CSS generated automatically to prevent CLS

### Code Splitting
- Dynamic import heavy client components: `dynamic(() => import('./HeavyComponent'), { ssr: false })`
- Keep Client Components minimal — Server Components ship zero JS
- Use `useDeferredValue` for search/filter to avoid blocking main thread

---

## 6. Semantic HTML for SEO

### Page Structure
```
<html lang="en">
  <body>
    <a href="#main" class="sr-only">Skip to content</a>
    <header>
      <nav aria-label="Primary navigation">...</nav>
    </header>
    <main id="main">
      <h1>One per page — the page title</h1>
      <section>
        <h2>Section heading</h2>
        <h3>Sub-section</h3>
      </section>
    </main>
    <footer>
      <nav aria-label="Footer navigation">...</nav>
    </footer>
  </body>
</html>
```

### Rules
- One `<h1>` per page — NEVER skip heading levels
- Use `<article>` for product cards (self-contained content)
- Use `<figure>` + `<figcaption>` for product images
- Use `<section>` with heading for thematic groups
- Use `aria-label` to distinguish multiple `<nav>` elements
- All decorative elements: `aria-hidden="true"`
- Touch targets: minimum 48×48px
- Color contrast: 4.5:1 body text, 3:1 large text

### Image Alt Text (Direct Ranking Signal)
```
❌ "tea"
❌ "product image"
✅ "Tata Tea Gold 500g packet — premium Indian black tea blend"
✅ "MDH Deggi Mirch Chili Powder 100g box"
```
Include: brand, product name, size/weight, product type. 55.5% of web pages have missing alt text — fixing this is a competitive advantage.

---

## 7. Local SEO Signals

### NAP Consistency (Name, Address, Phone)
Use ONE canonical format everywhere — website footer, Google Business Profile, all directories:
```
Business Name
123 Street Address, Unit X, City, Province PostalCode, Country
+1-XXX-XXX-XXXX
```
Display in crawlable HTML text (not images). NAP inconsistency impacts local rankings by up to 16%.

### Google Business Profile Optimization
- Primary category: most specific match (e.g., "Indian Grocery Store")
- Secondary categories: up to 9 (e.g., "Asian Grocery Store", "Spice Store")
- 100+ photos = 520% more calls
- Weekly posts: new arrivals, seasonal content, festival promotions
- Target 50+ reviews, 4.5+ stars, respond to every review

### Geo-Targeted Content
- Include city/region in homepage title, meta description, H1
- Category pages: "[Category] in [City]" pattern
- Footer: "Serving [City1], [City2], [City3] & [City4]"
- About page: mention neighborhood, community, local context

### Canadian Citation Directories (Priority Order)
Google Business Profile, Apple Business Connect, Bing Places, Facebook Business, YellowPages.ca, Yelp Canada, Foursquare, n49.com, Canada411, local Chamber of Commerce

---

## 8. 2025-2026 SEO Trends

### AI Overview Optimization
- 30% of desktop searches show AI Overviews
- 44.2% of AI citations come from the first 30% of page text — front-load key information
- Structure content as "answer blocks": concise answer first, supporting detail after
- FAQ schema content is 3.2x more likely to be cited by AI

### Entity-Based SEO
- Use identical business name across every platform
- Implement `Organization` schema with `sameAs` linking all profiles
- Build comprehensive About page ("Entity Home")
- Seek mentions on trusted third-party sites

### E-E-A-T Signals for Local Business
- **Experience:** Customer testimonials, community involvement
- **Expertise:** Detailed category descriptions, ingredient knowledge
- **Authoritativeness:** Consistent citations, local media mentions
- **Trustworthiness:** HTTPS, complete contact info, active reviews

### Featured Snippets
- Use question-based H2/H3 headings with immediate answers
- Answer in 40-60 words, then expand
- Use lists and tables for structured content
- Same content format works for both snippets and AI citation

---

## 9. Category Page SEO Pattern

### Title Pattern
`[Descriptive Category] | Brand Name — Location`
Keep under 60 characters.

### Meta Description Pattern
`Browse [category] at Brand Name in [City]. [Brand names]. [Product count] products. Serving [Region].`
Keep under 160 characters.

### Page Content Structure
1. H1: Category name (keyword-rich)
2. Intro paragraph: 100-200 words with location keywords naturally
3. Product grid with semantic HTML
4. "About This Category" section: additional context, cooking tips, ingredient uses
5. "Related Categories" section: internal links to 3-4 related categories
6. Breadcrumb with BreadcrumbList schema

### Internal Linking Strategy
- Homepage → all categories (bento grid)
- Each category → 3-4 related categories ("You May Also Like")
- Navigation mega menu → all categories (appears on every page = maximum link equity)
- Footer → top 8 categories

---

## 10. Favicon & PWA Assets

Place in `/app` directory for App Router:
- `favicon.ico` — 32×32 or 48×48
- `icon.png` — 192×192 (or `icon.svg`)
- `apple-icon.png` — 180×180

Or define in root layout metadata:
```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

### OG Image
Create a branded 1200×630 PNG: brand name + tagline + brand colors on a gradient background. Place at `/public/og-image.png`. Reference in metadata as `/og-image.png`.
