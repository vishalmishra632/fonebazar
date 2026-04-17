# Design System Reference — Tokens, Colors, Theming

## Table of Contents
1. [Three-Layer Token Architecture](#three-layer-token-architecture)
2. [The shadcn/ui Token Convention](#the-shadcnui-token-convention)
3. [OKLCH Color System](#oklch-color-system)
4. [Tailwind CSS v4 Integration](#tailwind-css-v4-integration)
5. [Dark Mode Setup](#dark-mode-setup)
6. [Glassmorphism CSS](#glassmorphism-css)
7. [Mesh Gradients and Aurora Effects](#mesh-gradients-and-aurora-effects)
8. [Fluid Typography Scale](#fluid-typography-scale)
9. [Spacing and Radius Systems](#spacing-and-radius-systems)
10. [Font Loading with next/font](#font-loading-with-nextfont)

---

## Three-Layer Token Architecture

Modern design systems organize tokens into three layers. ALWAYS follow this pattern:

```css
/* ═══ LAYER 1: PRIMITIVE — Raw values, never used directly in components ═══ */
:root {
  --color-blue-500: oklch(0.55 0.15 250);
  --color-blue-600: oklch(0.48 0.17 250);
  --color-gray-50: oklch(0.985 0 0);
  --color-gray-100: oklch(0.97 0 0);
  --color-gray-200: oklch(0.922 0 0);
  --color-gray-800: oklch(0.269 0 0);
  --color-gray-900: oklch(0.205 0 0);
  --color-gray-950: oklch(0.145 0 0);
  --spacing-unit: 4px;
  --radius-unit: 0.5rem;
}

/* ═══ LAYER 2: SEMANTIC — Purpose-driven, used in layouts ═══ */
:root {
  --color-bg-primary: var(--color-gray-50);
  --color-bg-secondary: var(--color-gray-100);
  --color-text-primary: var(--color-gray-900);
  --color-text-muted: var(--color-gray-600);
  --color-border-default: var(--color-gray-200);
  --color-interactive: var(--color-blue-500);
  --color-interactive-hover: var(--color-blue-600);
}

/* ═══ LAYER 3: COMPONENT — Scoped to specific components ═══ */
:root {
  --button-bg: var(--color-interactive);
  --button-bg-hover: var(--color-interactive-hover);
  --button-text: white;
  --button-radius: var(--radius-unit);
  --card-bg: var(--color-bg-primary);
  --card-border: var(--color-border-default);
  --card-radius: calc(var(--radius-unit) * 2);
}
```

In practice, shadcn/ui collapses Layers 2+3 into a single semantic layer. Follow their
convention (below) for consistency with the ecosystem.

---

## The shadcn/ui Token Convention

This is the **de facto standard** in React. Use these exact variable names.
The pattern: base token = surface color, `-foreground` = text/icon color on that surface.

```css
:root {
  /* Core surfaces */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Interactive primary */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);

  /* Subdued elements */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);

  /* Muted/disabled */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  /* Hover highlights */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);

  /* Error/danger */
  --destructive: oklch(0.577 0.245 27.325);

  /* Borders and inputs */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Global radius — single value controls entire UI roundness */
  --radius: 0.625rem;

  /* Chart colors (for Recharts integration) */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  /* Sidebar-specific (for dashboard layouts) */
  --sidebar-background: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

/* ═══ DARK MODE — Override all tokens ═══ */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.556 0 0);
  --sidebar-background: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
}
```

### Radius Scale (Derived From Single Variable)
```css
:root {
  --radius: 0.625rem;  /* Change this one value to update entire UI */
}
/* shadcn components use: */
/* rounded-sm  → calc(var(--radius) - 4px) */
/* rounded-md  → calc(var(--radius) - 2px) */
/* rounded-lg  → var(--radius)             */
/* rounded-xl  → calc(var(--radius) + 4px) */
```

---

## OKLCH Color System

### Why OKLCH Over HSL
- **Perceptually uniform lightness** — adjusting L for dark mode is predictable
- **Wider gamut** — access P3 display colors
- **Better interpolation** — gradients don't go through muddy midpoints

### Format
```
oklch(L C H)
L = Lightness (0–1, where 0 = black, 1 = white)
C = Chroma (0–0.4, where 0 = gray, higher = more saturated)
H = Hue angle (0–360 degrees)
```

### Creating Brand Color Scales
Generate a full scale by varying L while keeping C and H constant:
```css
:root {
  --brand-50:  oklch(0.97 0.02 250);   /* lightest */
  --brand-100: oklch(0.93 0.04 250);
  --brand-200: oklch(0.87 0.07 250);
  --brand-300: oklch(0.78 0.11 250);
  --brand-400: oklch(0.68 0.15 250);
  --brand-500: oklch(0.55 0.18 250);   /* base */
  --brand-600: oklch(0.48 0.17 250);
  --brand-700: oklch(0.40 0.15 250);
  --brand-800: oklch(0.33 0.12 250);
  --brand-900: oklch(0.27 0.09 250);
  --brand-950: oklch(0.20 0.06 250);   /* darkest */
}
```

### Color Palette Recipes
```css
/* Warm Earthy (2025 Pantone-influenced) */
--warm-primary: oklch(0.55 0.08 55);     /* Mocha */
--warm-accent: oklch(0.70 0.14 75);      /* Amber gold */

/* Cool Tech (Linear/Vercel energy) */
--cool-primary: oklch(0.55 0.15 260);    /* Electric blue */
--cool-accent: oklch(0.75 0.20 155);     /* Mint green */

/* Neon Dark (Cyberpunk/Gaming) */
--neon-primary: oklch(0.75 0.25 320);    /* Hot pink */
--neon-accent: oklch(0.80 0.20 170);     /* Cyan */
--neon-surface: oklch(0.15 0.02 280);    /* Deep purple-black */

/* Soft Pastel (Playful/Friendly) */
--pastel-primary: oklch(0.80 0.10 280);  /* Lavender */
--pastel-accent: oklch(0.85 0.12 170);   /* Soft teal */
```

---

## Tailwind CSS v4 Integration

### Complete globals.css for shadcn/ui + Tailwind v4
```css
@import "tailwindcss";
@import "tw-animate-css";  /* Required for shadcn animations */

/* Dark mode via class strategy */
@custom-variant dark (&:is(.dark *));

/* Map shadcn tokens to Tailwind theme */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar-background: var(--sidebar-background);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Custom breakpoints */
  --breakpoint-3xl: 1920px;

  /* Custom fonts (registered for Tailwind use) */
  --font-display: var(--font-geist), "sans-serif";
  --font-body: var(--font-geist), "sans-serif";
}

/* Token definitions go here (the :root and .dark blocks from above) */
```

### Key Tailwind v4 Differences From v3
- **No `tailwind.config.js`** — configuration is in CSS via `@theme`
- **No `content` array** — automatic source detection
- **No `postcss-import` or `autoprefixer`** — Lightning CSS handles everything
- Use `@import "tailwindcss"` instead of three `@tailwind` directives
- Use `@custom-variant dark (&:is(.dark *))` for class-based dark mode
- The `inline` keyword in `@theme inline` ensures CSS variable references are emitted
- Native Cascade Layers for specificity management
- `@property` for animatable CSS variables

---

## Dark Mode Setup

### next-themes Configuration (The Standard)

```tsx
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Toggle Component
```tsx
"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

**Rules**:
- `suppressHydrationWarning` on `<html>` is required — next-themes injects a blocking script
- `disableTransitionOnChange` prevents ugly flash when toggling
- Use `resolvedTheme` not `theme` — handles "system" correctly
- Components using `bg-background text-foreground` auto-adapt — no `dark:` prefix needed

---

## Glassmorphism CSS

### Production-Grade Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

.dark .glass-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset,
    0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(10px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.92);
  }
  .dark .glass-card {
    background: rgba(30, 30, 30, 0.95);
  }
}
```

### As Tailwind Utility Classes
```html
<div class="bg-white/12 backdrop-blur-xl border border-white/18
            shadow-lg rounded-2xl dark:bg-white/5 dark:border-white/8">
```

### Performance Rules for Glassmorphism
- Keep blur at **8–15px** (higher values are GPU-intensive exponentially)
- Limit to **2–3 glassmorphic elements per viewport** on mobile
- **NEVER animate `backdrop-filter`** — animate opacity or transform instead
- Use `transform: translateZ(0)` or `will-change: transform` for GPU layer promotion
- Add the `@supports` fallback — always

---

## Mesh Gradients and Aurora Effects

### Static Mesh Gradient (Stripe-Style)
```css
.mesh-gradient {
  background:
    radial-gradient(at 40% 20%, oklch(0.75 0.20 15) 0, transparent 50%),
    radial-gradient(at 80% 0%, oklch(0.85 0.15 80) 0, transparent 50%),
    radial-gradient(at 0% 50%, oklch(0.70 0.18 220) 0, transparent 50%),
    radial-gradient(at 80% 60%, oklch(0.80 0.15 310) 0, transparent 50%),
    radial-gradient(at 0% 100%, oklch(0.60 0.20 260) 0, transparent 50%);
}
```

### Animated Aurora Effect
```css
.aurora {
  background: linear-gradient(
    135deg,
    oklch(0.60 0.20 260) 0%,
    oklch(0.70 0.18 200) 25%,
    oklch(0.75 0.15 320) 50%,
    oklch(0.65 0.22 280) 75%,
    oklch(0.60 0.20 260) 100%
  );
  background-size: 400% 400%;
  animation: aurora-shift 15s ease infinite;
}

@keyframes aurora-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Grain/Noise Overlay (For Texture)
```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.4;
  border-radius: inherit;
}
```

---

## Fluid Typography Scale

Use `clamp()` with **rem + vw** (never pure vw — breaks zoom accessibility per WCAG 1.4.4):

```css
:root {
  /* Body text */
  --text-xs:   clamp(0.75rem,  0.7rem  + 0.15vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem  + 0.25vw, 1rem);
  --text-base: clamp(1rem,     0.95rem + 0.2vw,  1.125rem);
  --text-lg:   clamp(1.125rem, 1rem    + 0.35vw, 1.375rem);

  /* Headings */
  --text-xl:   clamp(1.25rem,  1.1rem  + 0.5vw,  1.75rem);
  --text-2xl:  clamp(1.5rem,   1.2rem  + 1vw,    2.25rem);
  --text-3xl:  clamp(1.875rem, 1.4rem  + 1.5vw,  3rem);
  --text-4xl:  clamp(2.25rem,  1.6rem  + 2.2vw,  4rem);
  --text-5xl:  clamp(3rem,     2rem    + 3.5vw,  5.5rem);

  /* Hero display (go BIG) */
  --text-hero: clamp(2.5rem,   1.5rem  + 5vw,    7rem);
}
```

Tools for generating: **Utopia.fyi**, **clampgenerator.com** (exports Tailwind config).

---

## Spacing and Radius Systems

### Spacing: 4px Base (Tailwind Default)
Tailwind v4 uses `--spacing: 4px` as its base unit:
- `p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px
- `p-6` = 24px, `p-8` = 32px, `p-12` = 48px, `p-16` = 64px

**Consistent spacing rhythm**: Use 4/8/12/16/24/32/48/64/96 — skip odd values.

### Section Spacing Pattern
```tsx
<section className="py-16 md:py-24 lg:py-32"> {/* Responsive vertical padding */}
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

---

## Font Loading with next/font

### The Correct Way (Build-Time, Self-Hosted, Zero Flash)
```tsx
// lib/fonts.ts
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// For premium/local fonts:
export const satoshi = localFont({
  src: [
    { path: "../assets/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// app/layout.tsx
import { geist, geistMono } from "@/lib/fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### In Tailwind CSS
```css
@theme inline {
  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

**Rules**:
- ALWAYS use `next/font` — never `<link>` to Google Fonts CDN
- Use `display: "swap"` with `adjustFontFallback: true` for most sites
- Use `display: "optional"` for best Core Web Vitals (zero CLS, but may flash)
- Apply via CSS variable (`variable` prop) — not `className` directly on body
- WOFF2 is the only format needed for web fonts in 2025
