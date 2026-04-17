import { siteConfig } from "./data/site";
import type { CartItem } from "./cart-store";

export function buildWhatsAppOrderURL(items: CartItem[]): string {
  const lines = [
    siteConfig.whatsapp.messagePrefix,
    "",
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.service}) × ${item.qty}` +
        (item.notes ? `\n   Notes: ${item.notes}` : ""),
    ),
    "",
    `Total items: ${items.reduce((sum, item) => sum + item.qty, 0)}`,
    "",
    "Please confirm availability and share total cost. Thank you!",
  ];
  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${message}`;
}
