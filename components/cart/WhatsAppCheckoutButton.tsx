"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";

export function WhatsAppCheckoutButton() {
  const items = useCart((store) => store.items);

  return (
    <a
      href={buildWhatsAppOrderURL(items)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-5 w-5" />
      Place order on WhatsApp
    </a>
  );
}
