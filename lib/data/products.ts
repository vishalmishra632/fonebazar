import type { ServiceSlug } from "./site";

export interface Product {
  id: string;
  name: string;
  service: ServiceSlug;
  price?: number;
  image?: string;
  description?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export const products: Product[] = [];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByService(service: ServiceSlug): Product[] {
  return products.filter((product) => product.service === service);
}
