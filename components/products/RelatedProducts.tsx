"use client";

import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types/product";

interface RelatedProductsProps {
  title: string;
  products: Product[];
}

export function RelatedProducts({ title, products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="pt-16 lg:pt-24">
      <h2 className="mb-6 font-display text-2xl font-semibold md:text-3xl">{title}</h2>
      <div
        className="relative -mx-6 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage:
            "linear-gradient(to right, black 0, black calc(100% - 60px), transparent)",
        }}
      >
        <div className="flex snap-x snap-mandatory gap-4 pr-4 lg:grid lg:grid-cols-4 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-[78%] shrink-0 snap-start md:w-[48%] lg:w-auto lg:shrink"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
