# Component Patterns Reference — Architecture, Composition, Next.js Conventions

## Table of Contents
1. [The asChild / Slot Pattern](#the-aschild--slot-pattern)
2. [Compound Component Pattern](#compound-component-pattern)
3. [Polymorphic Components With TypeScript](#polymorphic-components-with-typescript)
4. [Server Components vs Client Components](#server-components-vs-client-components)
5. [The Client Boundary Pattern](#the-client-boundary-pattern)
6. [shadcn/ui Component Conventions](#shadcnui-component-conventions)
7. [cn() Utility and Class Merging](#cn-utility-and-class-merging)
8. [Reusable Component Templates](#reusable-component-templates)
9. [Next.js App Router File Conventions](#nextjs-app-router-file-conventions)
10. [Form Patterns (React Hook Form + Zod)](#form-patterns)
11. [Data Table Pattern (TanStack Table)](#data-table-pattern)

---

## The asChild / Slot Pattern

The **preferred composition pattern** in 2025 React (used by Radix, shadcn/ui).
Avoids TypeScript performance issues of polymorphic `as` props.

### How It Works
```tsx
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

### Usage Patterns
```tsx
// Standard button
<Button>Click Me</Button>

// Button rendered as <a> link (inherits ALL Button styling)
<Button asChild variant="outline">
  <a href="/pricing">View Pricing</a>
</Button>

// Button rendered as Next.js Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Composing across libraries — Radix Dialog trigger as shadcn Button
<DialogTrigger asChild>
  <Button variant="outline">Open Dialog</Button>
</DialogTrigger>

// Tooltip trigger as icon button
<TooltipTrigger asChild>
  <Button variant="ghost" size="icon" aria-label="Settings">
    <Settings className="h-4 w-4" />
  </Button>
</TooltipTrigger>
```

### How Slot Works Internally
When `asChild` is true, `Slot` uses `React.cloneElement` to merge the parent's
props (className, event handlers, ref) onto the child element. The parent's DOM
element is **replaced entirely** by the child's element. The child gets the
parent's styling + behavior.

---

## Compound Component Pattern

Used for complex components with shared implicit state (Tabs, Accordion, Select).

### Pattern With Context
```tsx
"use client"
import { createContext, useContext, useState, type ReactNode } from "react";

// ═══ Context ═══
interface AccordionContextType {
  openItems: Set<string>;
  toggle: (id: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>");
  return ctx;
}

// ═══ Root ═══
interface AccordionProps {
  children: ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string[];
}

function Accordion({ children, type = "single", defaultValue = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState(new Set(defaultValue));

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className="divide-y divide-border">{children}</div>
    </AccordionContext.Provider>
  );
}

// ═══ Item ═══
function AccordionItem({ value, children }: { value: string; children: ReactNode }) {
  return <div data-state={useAccordion().openItems.has(value) ? "open" : "closed"}>
    {children}
  </div>;
}

// ═══ Trigger ═══
function AccordionTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { openItems, toggle } = useAccordion();
  const isOpen = openItems.has(value);
  return (
    <button
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between py-4 font-medium"
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

// ═══ Content ═══
function AccordionContent({ value, children }: { value: string; children: ReactNode }) {
  const { openItems } = useAccordion();
  if (!openItems.has(value)) return null;
  return <div className="pb-4 text-muted-foreground">{children}</div>;
}

// ═══ Attach sub-components ═══
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };
```

### Usage — Extremely Readable API
```tsx
<Accordion type="single" defaultValue={["item-1"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger value="item-1">What is this?</Accordion.Trigger>
    <Accordion.Content value="item-1">
      A compound component with shared context.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger value="item-2">How does it work?</Accordion.Trigger>
    <Accordion.Content value="item-2">
      Via React Context for shared state.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

**When to use**: Multi-part components where parts share implicit state (Tabs,
Accordion, Select, Dropdown, Dialog). The consumer shouldn't need to wire state manually.

---

## Polymorphic Components With TypeScript

When you need a component that can render as different HTML elements.
Prefer `asChild` for most cases, but this is useful for utility components.

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "children" | "className">;

function Text<E extends React.ElementType = "p">({
  as,
  children,
  className,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || "p";
  return (
    <Component className={cn("text-base text-foreground", className)} {...props}>
      {children}
    </Component>
  );
}

// Usage:
<Text>Default paragraph</Text>
<Text as="span" className="text-sm">Inline span</Text>
<Text as="h2" className="text-3xl font-bold">Heading</Text>
<Text as="label" htmlFor="email">Email label</Text>
```

---

## Server Components vs Client Components

### The Golden Rule
**Default to Server Components. Add `"use client"` only when needed.**

### Decision Matrix

| Need                                    | Component Type      |
|-----------------------------------------|---------------------|
| Data fetching / database access         | **Server**          |
| Async operations / `await`              | **Server**          |
| Sensitive operations (API keys, tokens) | **Server**          |
| Static content / markdown rendering     | **Server**          |
| Layout wrappers                         | **Server**          |
| `useState` / `useReducer`              | **Client** (`"use client"`) |
| `useEffect` / `useRef`                 | **Client**          |
| Event handlers (`onClick`, `onChange`)  | **Client**          |
| Browser APIs (localStorage, window)     | **Client**          |
| Animations (Motion, GSAP)               | **Client**          |
| Third-party hooks                       | **Client**          |

### Placement Rule
`"use client"` creates a **boundary** — ALL imports within that file become Client
Components. Therefore:
- Place `"use client"` at the **lowest possible level** in the component tree
- Create thin client wrappers around interactive parts
- Keep data-heavy, layout-heavy code in Server Components

### Example: Interactive Island in a Server Page
```tsx
// app/(marketing)/page.tsx — SERVER COMPONENT (no "use client")
import { HeroContent } from "./_components/hero-content";   // Server
import { AnimatedHero } from "./_components/animated-hero";   // Client wrapper

export default async function HomePage() {
  const stats = await getStats(); // Runs on server

  return (
    <main>
      <AnimatedHero>          {/* Client boundary for animations */}
        <HeroContent stats={stats} /> {/* Still renders on server! */}
      </AnimatedHero>
      <FeaturesSection />     {/* Server Component */}
      <StatsSection stats={stats} /> {/* Server Component */}
    </main>
  );
}
```

```tsx
// _components/animated-hero.tsx — CLIENT COMPONENT
"use client"
import { motion } from "motion/react";

export function AnimatedHero({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children} {/* Server-rendered content passed through */}
    </motion.section>
  );
}
```

```tsx
// _components/hero-content.tsx — SERVER COMPONENT (no "use client")
export function HeroContent({ stats }: { stats: Stats }) {
  return (
    <>
      <h1 className="text-5xl font-bold">Ship Faster</h1>
      <p className="text-muted-foreground">{stats.totalUsers.toLocaleString()} developers trust us</p>
    </>
  );
}
```

---

## The Client Boundary Pattern

### Pattern: Extracting Interactive Parts
```tsx
// ❌ WRONG — Entire page is a Client Component because of one button
"use client"
export default function PricingPage() {
  const [billing, setBilling] = useState("annual");
  return (
    <section>
      <h2>Pricing</h2>
      <p>Long description...</p>
      <BillingToggle value={billing} onChange={setBilling} />
      <PricingCards billing={billing} />
    </section>
  );
}

// ✅ CORRECT — Only the toggle is a Client Component
// page.tsx (Server)
export default function PricingPage() {
  return (
    <section>
      <h2>Pricing</h2>
      <p>Long description...</p>
      <PricingWithToggle /> {/* Client boundary */}
    </section>
  );
}

// _components/pricing-with-toggle.tsx (Client)
"use client"
export function PricingWithToggle() {
  const [billing, setBilling] = useState("annual");
  return (
    <>
      <BillingToggle value={billing} onChange={setBilling} />
      <PricingCards billing={billing} />
    </>
  );
}
```

---

## shadcn/ui Component Conventions

### Standard Component Template (What shadcn/ui Components Look Like)
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### Key Conventions
- **`cn()`** for merging classes — user can override any class via `className` prop
- **`cva`** (class-variance-authority) for variant management
- **`forwardRef`** — always, so consumers can attach refs
- **`asChild` + `Slot`** — composition via Radix
- **Semantic tokens** — `bg-primary`, `text-muted-foreground`, never raw colors
- **Focus styles** — `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

---

## cn() Utility and Class Merging

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This resolves Tailwind class conflicts intelligently:
```tsx
cn("px-4 py-2", "px-6")
// → "py-2 px-6" (px-6 wins, py-2 preserved)

cn("bg-red-500", condition && "bg-blue-500")
// → "bg-blue-500" when condition is true (blue wins)
```

---

## Reusable Component Templates

### Glass Card
```tsx
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: "sm" | "md" | "lg" | "xl";
}

export function GlassCard({ children, blur = "lg", className, ...props }: GlassCardProps) {
  const blurMap = { sm: "backdrop-blur-sm", md: "backdrop-blur-md", lg: "backdrop-blur-lg", xl: "backdrop-blur-xl" };
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/15 bg-white/10 shadow-lg",
        "dark:border-white/8 dark:bg-white/5",
        blurMap[blur],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Bento Grid
```tsx
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
      className
    )}>
      {children}
    </div>
  );
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoCard({ colSpan = 1, rowSpan = 1, className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:bg-accent/50",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "lg:col-span-3",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Section Wrapper (Consistent Spacing)
```tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

### Section Header (Title + Description)
```tsx
interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ badge, title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16 space-y-4", align === "center" && "text-center max-w-3xl mx-auto")}>
      {badge && (
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
```

---

## Next.js App Router File Conventions

### Special Files (Automatic Behavior)
| File | Purpose |
|------|---------|
| `layout.tsx` | Shared wrapper (persists across navigations, doesn't re-render) |
| `page.tsx` | Route entry point (required for route to exist) |
| `loading.tsx` | Instant loading UI (wraps `page` in Suspense automatically) |
| `error.tsx` | Error boundary (must be `"use client"`) |
| `not-found.tsx` | 404 UI |
| `template.tsx` | Like layout but re-renders on navigation (for enter/exit animations) |
| `route.ts` | API endpoint (inside `api/` directory) |
| `default.tsx` | Fallback for parallel routes |

### Route Organization Patterns

**Route Groups** — organize without affecting URL:
```
app/
├── (marketing)/        # URL: /about, /pricing (no /marketing prefix)
│   ├── about/page.tsx
│   └── pricing/page.tsx
├── (dashboard)/        # URL: /dashboard
│   └── dashboard/
│       └── page.tsx
└── layout.tsx          # Shared root layout
```

**Private Folders** — underscore prefix excludes from routing:
```
app/dashboard/
├── _components/        # Not a route, just co-located components
│   ├── sidebar.tsx
│   └── stats-card.tsx
├── _actions/           # Server Actions, co-located
│   └── update-profile.ts
├── layout.tsx
└── page.tsx
```

**Dynamic Routes**:
```
app/blog/[slug]/page.tsx        # /blog/my-post
app/shop/[...slug]/page.tsx     # /shop/men/shoes/nike (catch-all)
app/docs/[[...slug]]/page.tsx   # /docs or /docs/getting-started (optional catch-all)
```

---

## Form Patterns

### React Hook Form + Zod + shadcn/ui
```tsx
"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    // Server Action or API call
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Repeat for email, message */}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
```

---

## Data Table Pattern

### TanStack Table v8 + shadcn/ui
```tsx
"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortingRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortingRowModel: getSortingRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
```
