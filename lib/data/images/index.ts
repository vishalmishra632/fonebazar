export const brandImages = {
  logo: "/logo/fonebazar-logo.svg",
  logoMark: "/logo/fonebazar-mark.svg",
  favicon: "/favicon.ico",
  ogImage: "/images/og/default.jpg",
} as const;

export const homeImages = {
  hero: "",
  ambient: "",
} as const;

export const serviceImages: Record<string, { card: string; hero: string }> = {};
export const productImages: Record<string, string> = {};
export const aboutImages: Record<string, string> = {};
export const storeImages: Record<string, string> = {};

export function getProductImage(productId: string, fallback = ""): string {
  return productImages[productId] ?? fallback;
}

export function getServiceImage(slug: string, variant: "card" | "hero" = "card"): string {
  return serviceImages[slug]?.[variant] ?? "";
}
