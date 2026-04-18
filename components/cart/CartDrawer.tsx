"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((state) => state.items);
  const totalQty = useCart((state) => state.totalQty());

  useEffect(() => {
    setHydrated(true);
  }, []);

  const badge = hydrated && totalQty > 0;

  function goToServices() {
    setOpen(false);
    if (typeof window !== "undefined") {
      const target = document.getElementById("services");
      target?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        }
      >
        <ShoppingBag className="h-4 w-4" />
        {badge ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground">
            {totalQty}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-sm">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-muted-foreground">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg">Your cart is empty.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start browsing to add pieces.
              </p>
            </div>
            <button
              type="button"
              onClick={goToServices}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm hover:border-brand hover:text-brand"
            >
              Explore services
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border/60 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="border-t border-border/60 p-6">
              <WhatsAppCheckoutButton />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
