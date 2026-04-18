"use client";

import { ShoppingBag } from "lucide-react";
import { AnimatePresence } from "motion/react";
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
  const items = useCart((store) => store.items);
  const totalQty = useCart((store) => store.totalQty());
  const subtotalFixed = useCart((store) => store.subtotalFixed());
  const clear = useCart((store) => store.clear);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const hasItems = hydrated && items.length > 0;
  const hasQuoteItems = items.some((item) => item.price === "quote");

  function goToServices() {
    setOpen(false);
    if (typeof window !== "undefined") {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function confirmClear() {
    if (typeof window !== "undefined" && window.confirm("Clear everything from your cart?")) {
      clear();
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            data-cart-trigger
            aria-label={`Open cart${hydrated && totalQty > 0 ? ` (${totalQty} items)` : ""}`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        }
      >
        <ShoppingBag className="h-4 w-4" />
        {hydrated && totalQty > 0 ? (
          <span
            key={totalQty}
            className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 animate-in items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground zoom-in"
          >
            {totalQty}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between px-6 pt-6">
          <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
          {hasItems ? (
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground">
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </span>
          ) : null}
        </SheetHeader>

        {!hydrated || !hasItems ? (
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
            <div className="flex-1 divide-y divide-border/50 overflow-y-auto px-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
            <div className="border-t border-border/60 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated subtotal</span>
                <span className="font-display text-base font-medium tabular-nums">
                  ${subtotalFixed.toLocaleString("en-US")}
                  <span className="ml-1 text-xs text-muted-foreground">CAD</span>
                </span>
              </div>
              {hasQuoteItems ? (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Final total will be confirmed on WhatsApp (some items are quoted).
                </p>
              ) : null}
              <div className="mt-4">
                <WhatsAppCheckoutButton />
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Payment handled after confirmation. No charges made here.
              </p>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={confirmClear}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-brand hover:underline"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
