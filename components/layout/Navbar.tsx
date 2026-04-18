"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/data/site";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/products", label: "Products", hasSubmenu: true },
  { href: "/about", label: "About" },
  { href: "/our-store", label: "Our Store" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  const whatsappHref = buildWhatsAppOrderURL([]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <motion.header
      initial={false}
      animate={{ paddingTop: isScrolled ? 8 : 16, paddingBottom: isScrolled ? 8 : 16 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl"
    >
      <Container className="flex items-center justify-between gap-8">
        <Link
          href="/"
          className="group flex items-baseline gap-1 font-display text-lg font-semibold lowercase tracking-tight"
        >
          fonebazar
          <span
            aria-hidden
            className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-brand transition-transform group-hover:scale-125"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            if (link.hasSubmenu) {
              return (
                <div
                  key={link.href}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  className="relative py-1"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-brand"
                      />
                    ) : null}
                  </Link>
                  <AnimatePresence>
                    {productsOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                      >
                        <div className="min-w-[260px] rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur">
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-surface-2"
                          >
                            All products
                            <span className="ml-1 text-xs text-muted-foreground">
                              — full catalog
                            </span>
                          </Link>
                          <div className="my-1 h-px bg-border/50" />
                          {siteConfig.services.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/products/${service.slug}`}
                              onClick={() => setProductsOpen(false)}
                              className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
                            >
                              {service.name}
                              <span className="ml-1 text-xs text-muted-foreground/70">
                                — {service.blurb}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-brand"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:brightness-110 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Chat
          </a>
          <ThemeToggle />
          <CartDrawer />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground lg:hidden"
                />
              }
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between px-6 pt-6">
                <span className="font-display text-lg font-semibold lowercase">
                  fonebazar
                </span>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close menu"
                  className="text-muted-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-3 px-6 font-display text-3xl">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 px-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Services
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siteConfig.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/products/${service.slug}`}
                        onClick={() => setSheetOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto px-6 pb-8 pt-12">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-brand-foreground"
                >
                  <MessageCircle className="h-5 w-5" />
                  Talk on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
}
