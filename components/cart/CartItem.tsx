"use client";

import { X } from "lucide-react";
import type { CartItem as CartItemType } from "@/lib/cart-store";
import { useCart } from "@/lib/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCart((state) => state.removeItem);
  const updateQty = useCart((state) => state.updateQty);

  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex-1">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.service}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={item.qty}
          onChange={(event) => updateQty(item.id, Number(event.target.value))}
          className="h-8 w-14 rounded border border-border bg-background px-2 text-sm"
        />
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.name}`}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
