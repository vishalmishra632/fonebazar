# Page Templates Reference — Layouts, Sections, Conversion Patterns

## Table of Contents
1. [Hero Section Patterns (10 Types)](#hero-section-patterns)
2. [Navigation / Header Patterns](#navigation-patterns)
3. [Feature Section Patterns](#feature-section-patterns)
4. [Bento Grid Feature Layouts](#bento-grid-feature-layouts)
5. [Pricing Page Patterns](#pricing-page-patterns)
6. [CTA Section Patterns](#cta-section-patterns)
7. [Footer Patterns](#footer-patterns)
8. [Dashboard Layout Patterns](#dashboard-layout-patterns)
9. [Stats / Social Proof Sections](#stats-and-social-proof)
10. [Full Page Assembly Example](#full-page-assembly-example)

---

## Hero Section Patterns

### Pattern 1: Centered Hero (Most Common — Notion, Most SaaS)
```tsx
export function CenteredHero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Now in Public Beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Build beautiful products
          <br />
          <span className="text-primary">faster than ever</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          The modern platform for teams who ship. From idea to production
          in minutes, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="min-w-[180px]">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="min-w-[180px]">
            Watch Demo
          </Button>
        </motion.div>

        {/* Social Proof Logos */}
        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-sm text-muted-foreground mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {logos.map((logo) => (
              <Image key={logo.name} src={logo.src} alt={logo.name} width={120} height={32} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Pattern 2: Split Hero (B2B SaaS — Text Left, Visual Right)
```tsx
export function SplitHero() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              For Engineering Teams
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Deploy with confidence.
              <br />
              Scale without limits.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Infrastructure that grows with you. From startup to enterprise,
              we handle the complexity so you can focus on building.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg">Start Building</Button>
              <Button size="lg" variant="ghost">Talk to Sales →</Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" /> No credit card
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" /> Free tier forever
              </span>
            </div>
          </motion.div>

          {/* Right: Product Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
              <Image src="/dashboard-preview.png" alt="Product dashboard" width={800} height={500} priority />
            </div>
            {/* Floating accent element */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 3: Animated Text Hero (Linear / Awwwards Style)
```tsx
const words = ["faster", "smarter", "better", "together"];

export function AnimatedTextHero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex min-h-[80vh] items-center justify-center py-20">
      <div className="container text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Build products{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={words[wordIndex]}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </h1>
      </div>
    </section>
  );
}
```

### Pattern 4: Gradient / Aurora Hero (Stripe Style)
```tsx
export function AuroraHero() {
  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="aurora absolute inset-0 opacity-40" /> {/* See design-system.md for .aurora CSS */}
        <div className="grain absolute inset-0" /> {/* Noise overlay */}
      </div>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">Your hero content</h1>
        {/* ... */}
      </div>
    </section>
  );
}
```

### Pattern 5: Minimalist Hero (Vercel / Anthropic)
```tsx
export function MinimalHero() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <div className="container mx-auto px-4">
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
          The platform for{" "}
          <span className="text-muted-foreground">building at the speed of thought.</span>
        </h1>
        <div className="mt-10">
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
```

### Hero Pattern Summary

| # | Pattern | Best For | Key Element |
|---|---------|----------|-------------|
| 1 | Centered | General SaaS, consumer apps | Badge + headline + dual CTA + logos |
| 2 | Split | B2B, enterprise SaaS | Text left, product screenshot right |
| 3 | Animated Text | Tech-forward brands | Rotating/morphing words |
| 4 | Aurora/Gradient | Premium feel, fintech | Animated mesh background |
| 5 | Minimalist | Developer tools, AI products | Large type, vast whitespace |
| 6 | Video BG | Media, lifestyle brands | Autoplay muted loop behind content |
| 7 | 3D/WebGL | Agencies, creative tools | Interactive Three.js scene |
| 8 | Product Screenshot | Feature-led products | Real UI prominently shown |
| 9 | Parallax | Storytelling, editorial | Scroll-linked reveals |
| 10 | Interactive | Web3, data products | User can interact with hero element |

**Rules**: Answer "What is this? Why should I care?" in under 2 seconds.
Single focused CTA. Hero image as LCP element with `priority` prop.

---

## Navigation Patterns

### Sticky Header With Blur on Scroll
```tsx
"use client"
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-6 w-6" />
          BrandName
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
```

---

## Feature Section Patterns

### Alternating Feature Rows
```tsx
export function FeatureRows({ features }) {
  return (
    <Section>
      <SectionHeader badge="Features" title="Everything you need" description="..." />
      <div className="space-y-24 md:space-y-32">
        {features.map((feature, i) => (
          <Reveal key={feature.title}>
            <div className={cn(
              "grid items-center gap-12 lg:grid-cols-2",
              i % 2 === 1 && "lg:[direction:rtl] [&>*]:lg:[direction:ltr]"
            )}>
              <div>
                <div className="inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-2xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-muted-foreground">{feature.description}</p>
              </div>
              <div className="rounded-xl border bg-card p-2 shadow-lg">
                <Image src={feature.image} alt={feature.title} width={600} height={400} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

### 3-Column Feature Cards
```tsx
export function FeatureCards({ features }) {
  return (
    <Section>
      <SectionHeader badge="Why Us" title="Built for modern teams" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="inline-flex rounded-lg bg-primary/10 p-2.5">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

---

## Bento Grid Feature Layouts

### Standard Bento (Apple Style)
```tsx
export function BentoFeatures() {
  return (
    <Section>
      <SectionHeader badge="Platform" title="One platform. Infinite possibilities." />
      <BentoGrid>
        {/* Large featured card */}
        <BentoCard colSpan={2} rowSpan={2} className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold">AI-Powered Analytics</h3>
              <p className="mt-2 text-muted-foreground">
                Get insights that matter with machine learning built in.
              </p>
            </div>
            <Image src="/feature-ai.png" alt="AI Analytics" width={500} height={300} className="mt-4 rounded-lg" />
          </div>
        </BentoCard>

        {/* Standard card */}
        <BentoCard>
          <Zap className="h-8 w-8 text-primary" />
          <h3 className="mt-3 text-lg font-semibold">Lightning Fast</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sub-100ms response times globally.</p>
        </BentoCard>

        {/* Standard card */}
        <BentoCard>
          <Shield className="h-8 w-8 text-primary" />
          <h3 className="mt-3 text-lg font-semibold">Enterprise Security</h3>
          <p className="mt-1 text-sm text-muted-foreground">SOC 2 Type II certified.</p>
        </BentoCard>

        {/* Wide card */}
        <BentoCard colSpan={2}>
          <div className="flex items-center gap-4">
            <Globe className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold">Global Edge Network</h3>
              <p className="text-sm text-muted-foreground">300+ PoPs in 60+ countries.</p>
            </div>
          </div>
        </BentoCard>

        {/* Standard card */}
        <BentoCard className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">99.99%</div>
            <p className="mt-1 text-sm text-muted-foreground">Uptime SLA</p>
          </div>
        </BentoCard>
      </BentoGrid>
    </Section>
  );
}
```

**Eye-tracking data**: 2-column-wide cards get **2.6x more viewing time** than single-column cards.

---

## Pricing Page Patterns

### Three-Tier With Center Highlighted (Best Converting)
```tsx
export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <Section>
      <SectionHeader badge="Pricing" title="Simple, transparent pricing" description="No hidden fees. Cancel anytime." />

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={cn("text-sm", billing === "monthly" && "font-medium")}>Monthly</span>
        <button
          onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          className="relative h-7 w-12 rounded-full bg-primary transition-colors"
          aria-label="Toggle billing period"
        >
          <span className={cn(
            "absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform shadow-sm",
            billing === "annual" ? "translate-x-5" : "translate-x-0.5"
          )} />
        </button>
        <span className={cn("text-sm", billing === "annual" && "font-medium")}>
          Annual <span className="text-green-600 text-xs ml-1">Save 20%</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative rounded-2xl border p-8 transition-all",
              plan.featured
                ? "border-primary bg-card shadow-xl scale-105 z-10"
                : "bg-card hover:shadow-md"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold">
                ${billing === "annual" ? plan.annualPrice : plan.monthlyPrice}
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button
              className="mt-6 w-full"
              variant={plan.featured ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

**Conversion data**: Three tiers with center highlighted → **1.4x** conversion vs 2 tiers.
Default to annual billing → **+19%** annual adoption. Never use X marks for excluded features.

---

## CTA Section Patterns

### Gradient CTA Banner
```tsx
export function CTASection() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-20 text-center text-primary-foreground">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
          <p className="mt-4 mx-auto max-w-lg text-primary-foreground/80">
            Join thousands of teams already building with us.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary">Start for Free</Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

---

## Footer Patterns

### Multi-Column Footer (Standard SaaS)
```tsx
const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Docs"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security"],
  Connect: ["Twitter", "GitHub", "Discord"],
};

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Logo className="h-6 w-6" /> BrandName
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Building the future of development, one commit at a time.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BrandName. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
```

---

## Dashboard Layout Patterns

### Collapsible Sidebar + Top Bar (The Standard)
```tsx
"use client"
import { useState } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-sidebar-background transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-4">
          <Logo className="h-6 w-6 flex-shrink-0" />
          {!collapsed && <span className="ml-3 font-bold">Dashboard</span>}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "text-sidebar-foreground hover:bg-sidebar-accent",
                item.active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-12 items-center justify-center border-t hover:bg-sidebar-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeftClose className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
            <Breadcrumbs />
          </div>
          <div className="flex items-center gap-3">
            <SearchCommand /> {/* ⌘K search */}
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Dashboard Page Pattern (Stats → Chart → Table)
```tsx
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's your overview.</p>
        </div>
        <div className="flex gap-3">
          <DateRangePicker />
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231" change="+20.1%" icon={DollarSign} />
        <StatCard title="Subscriptions" value="+2,350" change="+180.1%" icon={Users} />
        <StatCard title="Active Now" value="+573" change="+201" icon={Activity} />
        <StatCard title="Bounce Rate" value="24.3%" change="-4.5%" trend="down" icon={BarChart3} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Revenue Over Time</h3>
          <RevenueChart /> {/* Recharts AreaChart */}
        </div>
        <div className="col-span-3 rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold">Traffic Sources</h3>
          <TrafficPieChart /> {/* Recharts PieChart */}
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border bg-card">
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Input placeholder="Search..." className="max-w-xs" />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </div>
  );
}
```

### Stats Card Component
```tsx
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

function StatCard({ title, value, change, icon: Icon, trend = "up" }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className={cn(
        "mt-1 text-xs font-medium",
        trend === "up" ? "text-green-600" : "text-red-600"
      )}>
        {change} from last month
      </div>
    </div>
  );
}
```

---

## Stats and Social Proof

### Animated Stats Row
```tsx
export function StatsSection() {
  return (
    <Section className="bg-muted/50">
      <div className="grid gap-8 md:grid-cols-4 text-center">
        {[
          { label: "Active Users", value: 50000, suffix: "+" },
          { label: "Countries", value: 120, suffix: "+" },
          { label: "Uptime", value: 99.99, suffix: "%" },
          { label: "Response Time", value: 50, suffix: "ms" },
        ].map((stat) => (
          <Reveal key={stat.label}>
            <div>
              <div className="text-4xl font-bold text-primary">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

### Testimonial Grid
```tsx
export function TestimonialGrid({ testimonials }) {
  return (
    <Section>
      <SectionHeader badge="Testimonials" title="Loved by developers" />
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <div className="mb-4 break-inside-avoid rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} at {t.company}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
```

---

## Full Page Assembly Example

### SaaS Landing Page Structure
```tsx
export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root>
        <Header />
        <main>
          <CenteredHero />          {/* Hero with badge, headline, CTAs, logos */}
          <LogoCloud />             {/* Trusted by... */}
          <BentoFeatures />         {/* Bento grid feature showcase */}
          <FeatureRows />           {/* 2-3 alternating feature deep-dives */}
          <StatsSection />          {/* Animated counters */}
          <TestimonialGrid />       {/* Social proof */}
          <PricingSection />        {/* 3-tier pricing */}
          <FAQSection />            {/* Accordion FAQ */}
          <CTASection />            {/* Final CTA banner */}
        </main>
        <Footer />
      </ReactLenis>
    </MotionConfig>
  );
}
```

Every section should be wrapped in `<Section>` for consistent spacing and use
`<Reveal>` wrappers for scroll-triggered entrance animations.
