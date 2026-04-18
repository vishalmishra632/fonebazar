"use client";

import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types/product";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyState() {
  const whatsappHref = buildWhatsAppOrderURL([]);
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-2xl">No pieces here yet.</p>
      <p className="max-w-md text-sm text-muted-foreground">
        We&apos;re adding more every week. In the meantime, message us — most things
        can be custom-made.
      </p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:brightness-110"
      >
        <MessageCircle className="h-4 w-4" />
        Ask on WhatsApp
      </a>
    </div>
  );
}
