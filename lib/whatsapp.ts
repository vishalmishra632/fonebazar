import { siteConfig } from "./data/site";
import type { CartItem } from "./cart-store";

function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderURL(items: CartItem[]): string {
  const lines: string[] = [siteConfig.whatsapp.messagePrefix, ""];

  if (items.length === 0) {
    lines.push("(No items selected yet — I'd like to chat about a custom piece.)");
  } else {
    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name} × ${item.qty}  (${item.serviceName})`);
      if (typeof item.price === "number") {
        lines.push(`   Price: $${item.price} × ${item.qty} = $${item.price * item.qty}`);
      } else {
        lines.push("   Price: quote required");
      }
      if (item.options) {
        Object.entries(item.options)
          .filter(([, value]) => value)
          .forEach(([key, value]) => {
            lines.push(`   • ${key}: ${value}`);
          });
      }
      if (item.notes) {
        lines.push(`   ✎ ${item.notes}`);
      }
      lines.push("");
    });

    const subtotal = items
      .filter((item) => typeof item.price === "number")
      .reduce((sum, item) => sum + (item.price as number) * item.qty, 0);
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

    lines.push(`Items: ${totalQty}`);
    lines.push(`Estimated subtotal (fixed-price items): $${subtotal}`);
    lines.push("");
    lines.push("Please confirm availability, final cost, and timeline. Thank you!");
  }

  return buildWhatsAppURL(lines.join("\n"));
}

export function buildWhatsAppVisitURL(): string {
  return buildWhatsAppURL(
    "Hi fonebazar, I'd like to book a studio visit. My preferred day and time: ",
  );
}

export function buildWhatsAppCustomURL(messageBody: string): string {
  return buildWhatsAppURL(messageBody);
}
