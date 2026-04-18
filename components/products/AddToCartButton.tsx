"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { useCart, buildCartItemId } from "@/lib/cart-store";
import { siteConfig } from "@/lib/data/site";
import type { Product, ProductOption } from "@/lib/types/product";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  qty: number;
  onValidationError?: (errorKeys: string[]) => void;
  className?: string;
}

function validateOptions(
  options: ProductOption[] | undefined,
  values: Record<string, string>,
): string[] {
  if (!options) return [];
  return options
    .filter((option) => option.required && !values[option.key]?.trim())
    .map((option) => option.key);
}

export function AddToCartButton({
  product,
  selectedOptions,
  qty,
  onValidationError,
  className,
}: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "added">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const addItem = useCart((store) => store.addItem);
  const serviceName =
    siteConfig.services.find((service) => service.slug === product.service)?.name ?? "";

  function handleAdd() {
    const errorKeys = validateOptions(product.options, selectedOptions);
    if (errorKeys.length > 0) {
      onValidationError?.(errorKeys);
      toast.error("Pick the required options before adding.");
      return;
    }

    const filteredOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([, value]) => value?.trim()),
    );

    const id = buildCartItemId(product.id, filteredOptions);
    const { notes, ...rest } = filteredOptions;

    addItem({
      id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      service: product.service,
      serviceName,
      price: product.price,
      image: product.images[0],
      qty,
      options: Object.keys(rest).length > 0 ? rest : undefined,
      notes: typeof notes === "string" && notes.trim().length > 0 ? notes : undefined,
    });

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cart:fly", {
          detail: {
            imageSrc: product.images[0],
            originRect: {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
            },
          },
        }),
      );
    }

    toast.success(`${product.name} added to cart`, {
      action: {
        label: "Open cart",
        onClick: () => {
          document.querySelector<HTMLElement>("[data-cart-trigger]")?.click();
        },
      },
    });

    setState("added");
    window.setTimeout(() => setState("idle"), 1200);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleAdd}
      aria-label="Add to cart"
      className={cn(
        "relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" ? (
          <motion.span
            key="idle"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </motion.span>
        ) : (
          <motion.span
            key="added"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Added
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
