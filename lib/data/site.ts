export const siteConfig = {
  name: "fonebazar",
  tagline: "Where ideas become objects",
  description:
    "Sault Ste. Marie's creative studio for 3D printing, laser engraving, resin art, t-shirt printing, and decal printing. From file to finished piece — crafted locally.",
  url: "https://fonebazar.ca",
  whatsapp: {
    number: "17059710676",
    displayNumber: "+1 (705) 971-0676",
    messagePrefix: "Hi fonebazar, I'd like to place an order:",
  },
  contact: {
    email: "hello@fonebazar.ca",
    phone: "+1 (705) 971-0676",
    address: "Sault Ste. Marie, Ontario, Canada",
    city: "Sault Ste. Marie",
    region: "ON",
    country: "CA",
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
