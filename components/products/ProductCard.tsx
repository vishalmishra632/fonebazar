"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Product } from "@/lib/types/product";
import { siteConfig } from "@/lib/data/site";
import { EASE_HERO } from "@/lib/animations";
import { TiltOnHover } from "@/components/motion/TiltOnHover";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const serviceName =
    siteConfig.services.find((service) => service.slug === product.service)?.name ?? "";
  const href = `/products/${product.service}/${product.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.03, 0.3),
        ease: EASE_HERO,
      }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface-1 shadow-[var(--elevation-1)] transition-all duration-300 hover:border-brand/60 hover:shadow-[var(--elevation-hover)]"
    >
      <span className="sticker-peel" aria-hidden />
      <TiltOnHover max={5} className="block">
      <Link href={href} className="block focus-visible:outline-none">
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
            {serviceName}
          </span>
        </div>
        <div className="space-y-1 p-4">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-display text-base">
              {product.price === "quote" ? (
                <span className="text-brand">Quote</span>
              ) : (
                <>
                  <span aria-label={`${product.price} Canadian dollars`}>
                    ${product.price}
                  </span>{" "}
                  <span className="text-xs text-muted-foreground">CAD</span>
                </>
              )}
            </span>
            <span className="text-xs text-muted-foreground">{product.leadTime}</span>
          </div>
        </div>
      </Link>
      </TiltOnHover>
    </motion.article>
  );
}
