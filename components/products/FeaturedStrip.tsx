"use client";

import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types/product";
import { EASE_HERO } from "@/lib/animations";

interface FeaturedStripProps {
  products: Product[];
}

export function FeaturedStrip({ products }: FeaturedStripProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_HERO }}
      className="relative -mx-6 mt-12 overflow-hidden rounded-3xl bg-brand-subtle px-6 py-10 md:mx-0 md:px-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, oklch(0.62 0.22 285 / 0.1), transparent 70%)",
      }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          Featured right now
        </h2>
        <span className="text-xs text-muted-foreground">{products.length} pieces</span>
      </div>
      <div
        className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:px-0 md:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="w-[78%] shrink-0 snap-start md:w-auto md:shrink"
          >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
