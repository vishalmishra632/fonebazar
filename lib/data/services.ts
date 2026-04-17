import { siteConfig } from "./site";

export interface Service {
  slug: (typeof siteConfig.services)[number]["slug"];
  name: string;
  shortDescription: string;
  longDescription: string;
  heroImage?: string;
  accent?: string;
}

export const services: Service[] = [
  {
    slug: "3d-printing",
    name: "3D Printing",
    shortDescription: "[DECIDE IN PHASE 1]",
    longDescription: "[DECIDE IN PHASE 1]",
  },
  {
    slug: "laser-engraving",
    name: "Laser Engraving",
    shortDescription: "[DECIDE IN PHASE 1]",
    longDescription: "[DECIDE IN PHASE 1]",
  },
  {
    slug: "resin-art",
    name: "Resin Art",
    shortDescription: "[DECIDE IN PHASE 1]",
    longDescription: "[DECIDE IN PHASE 1]",
  },
  {
    slug: "t-shirt-printing",
    name: "T-Shirt Printing",
    shortDescription: "[DECIDE IN PHASE 1]",
    longDescription: "[DECIDE IN PHASE 1]",
  },
  {
    slug: "decal-printing",
    name: "Decal Printing",
    shortDescription: "[DECIDE IN PHASE 1]",
    longDescription: "[DECIDE IN PHASE 1]",
  },
];

export function getService(slug: Service["slug"]): Service | undefined {
  return services.find((service) => service.slug === slug);
}
