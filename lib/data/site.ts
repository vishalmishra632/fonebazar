export const siteConfig = {
  name: "fonebazar",
  tagline: "[DECIDE IN PHASE 1 — e.g., \"Where ideas become objects\"]",
  description:
    "[DECIDE IN PHASE 1 — SEO description, 150–160 chars]",
  url: "https://fonebazar.example.com",
  whatsapp: {
    number: "{REPLACE_WITH_WHATSAPP_NUMBER_INTL_FORMAT_NO_PLUS}",
    displayNumber: "+91 [REPLACE]",
    messagePrefix: "Hi fonebazar, I'd like to place an order:",
  },
  contact: {
    email: "[REPLACE]",
    phone: "[REPLACE]",
    address: "[REPLACE]",
  },
  social: {
    instagram: "",
    facebook: "",
  },
  services: [
    { slug: "3d-printing", name: "3D Printing" },
    { slug: "laser-engraving", name: "Laser Engraving" },
    { slug: "resin-art", name: "Resin Art" },
    { slug: "t-shirt-printing", name: "T-Shirt Printing" },
    { slug: "decal-printing", name: "Decal Printing" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type ServiceSlug = (typeof siteConfig.services)[number]["slug"];
