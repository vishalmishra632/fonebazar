"use client";

import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { CartItem } from "./CartItem";
import { WhatsAppCheckoutButton } from "./WhatsAppCheckoutButton";

export function CartDrawer() {
  const items = useCart((state) => state.items);
  const totalQty = useCart((state) => state.totalQty());

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
          />
        }
      >
        <ShoppingBag className="h-4 w-4" />
        {totalQty > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
            {totalQty}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 divide-y divide-border overflow-y-auto px-4">
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-border p-4">
            <WhatsAppCheckoutButton />
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
