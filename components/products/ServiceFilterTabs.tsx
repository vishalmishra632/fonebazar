"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function ServiceFilterTabs() {
  const pathname = usePathname();
  const normalised = pathname.replace(/\/$/, "");
  const tabs = [
    { slug: "", label: "All", href: "/products" },
    ...siteConfig.services.map((service) => ({
      slug: service.slug,
      label: service.name,
      href: `/products/${service.slug}`,
    })),
  ];

  function isActive(href: string) {
    if (href === "/products") return normalised === "/products";
    return normalised === href;
  }

  return (
    <nav
      aria-label="Filter by service"
      className="sticky top-16 z-30 -mx-6 border-y border-border/40 bg-background/80 px-6 backdrop-blur md:top-20"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "text-brand-foreground"
                  : "bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              <span className="relative">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
