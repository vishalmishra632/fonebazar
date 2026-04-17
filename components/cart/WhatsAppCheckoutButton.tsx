"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";

export function WhatsAppCheckoutButton() {
  const items = useCart((state) => state.items);
  if (items.length === 0) return null;

  return (
    <a
      href={buildWhatsAppOrderURL(items)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:brightness-110"
    >
      <MessageCircle className="h-5 w-5" />
      Place order on WhatsApp
    </a>
  );
}
