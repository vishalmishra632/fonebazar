export type ServiceSlug =
  | "3d-printing"
  | "laser-engraving"
  | "resin-art"
  | "t-shirt-printing"
  | "decal-printing";

export interface ProductOption {
  key: string;
  label: string;
  type: "select" | "text";
  values?: string[];
  placeholder?: string;
  required?: boolean;
  default?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  service: ServiceSlug;
  shortDescription: string;
  description: string[];
  price: number | "quote";
  priceNote?: string;
  images: string[];
  options?: ProductOption[];
  tags: string[];
  whatsIncluded?: string[];
  leadTime: string;
  isFeatured?: boolean;
}

export interface ServiceMeta {
  slug: ServiceSlug;
  name: string;
  blurb: string;
}
