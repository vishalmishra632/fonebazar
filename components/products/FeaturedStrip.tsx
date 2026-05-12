"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type KeyboardEvent } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types/product";
import { EASE_HERO } from "@/lib/animations";

interface FeaturedStripProps {
  products: Product[];
}

const CARD_STEP = 360;

export function FeaturedStrip({ products }: FeaturedStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollBy(CARD_STEP);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollBy(-CARD_STEP);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_HERO }}
      aria-label="Featured products"
      className="relative -mx-6 mt-12 overflow-hidden rounded-3xl bg-brand-subtle px-6 py-10 md:mx-0 md:px-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, oklch(0.80 0.16 92 / 0.1), transparent 70%)",
      }}
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          Featured right now
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {products.length} pieces
          </span>
          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              aria-label="Scroll featured left"
              onClick={() => scrollBy(-CARD_STEP)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground backdrop-blur transition hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll featured right"
              onClick={() => scrollBy(CARD_STEP)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground backdrop-blur transition hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          role="list"
          tabIndex={0}
          onKeyDown={handleKey}
          aria-label="Featured products — use arrow keys to scroll"
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-smooth gap-6 overflow-x-auto px-6 pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-background md:mx-0 md:px-0"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              role="listitem"
              className="w-[280px] shrink-0 snap-start md:w-[320px] xl:w-[360px]"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-1 to-transparent md:from-background/60"
        />
      </div>
    </motion.section>
  );
}
