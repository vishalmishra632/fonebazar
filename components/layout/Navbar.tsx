"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { MessageCircle, Menu, X } from "lucide-react";
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
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  const whatsappHref = buildWhatsAppOrderURL([]);

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
          className="group flex items-baseline gap-1 font-display text-lg font-semibold tracking-tight lowercase"
        >
          fonebazar
          <span
            aria-hidden
            className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-brand transition-transform group-hover:scale-125"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive ? (
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
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
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
              <nav className="mt-12 flex flex-col gap-4 px-6 font-display text-3xl">
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
