"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { CartItem as CartItemType } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-store";
import { QuantityStepper } from "@/components/products/QuantityStepper";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCart((store) => store.removeItem);
  const updateQty = useCart((store) => store.updateQty);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden"
    >
      <div className="flex gap-4 py-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-[15px] font-medium">
                {item.name}
              </p>
              <p className="text-xs text-muted-foreground">{item.serviceName}</p>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-muted-foreground transition hover:text-brand"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {item.options ? (
            <ul className="mt-0.5 space-y-0.5 text-xs text-muted-foreground">
              {Object.entries(item.options).map(([key, value]) => (
                <li key={key}>
                  <span className="capitalize">{key}</span>: {value}
                </li>
              ))}
            </ul>
          ) : null}
          {item.notes ? (
            <p className="mt-1 line-clamp-2 text-xs italic text-muted-foreground">
              &ldquo;{item.notes}&rdquo;
            </p>
          ) : null}
          <div className="mt-2 flex items-center justify-between">
            <QuantityStepper
              value={item.qty}
              onChange={(value) => updateQty(item.id, value)}
              size="sm"
            />
            <span className="font-display text-sm font-medium tabular-nums">
              {item.price === "quote"
                ? "Quote"
                : `$${(item.price * item.qty).toLocaleString("en-US")}`}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
