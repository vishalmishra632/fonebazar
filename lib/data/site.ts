export const siteConfig = {
  name: "fonebazaar",
  tagline: "Where ideas become objects",
  description:
    "Sault Ste. Marie's creative studio for 3D printing, laser engraving, resin art, t-shirt printing, and decal printing. From file to finished piece — crafted locally.",
  url: "https://fonebazaar.ca",
  whatsapp: {
    number: "17059710676",
    displayNumber: "+1 (705) 971-0676",
    messagePrefix: "Hi fonebazaar, I'd like to place an order:",
  },
  contact: {
    email: "hello@fonebazaar.ca",
    phone: "+1 (705) 971-0676",
    address: "253 Bruce St, Sault Ste. Marie, ON, Canada",
    street: "253 Bruce St",
    city: "Sault Ste. Marie",
    region: "ON",
    country: "CA",
    postalCode: "",
  },
  social: {
    instagram: "",
    facebook: "",
  },
  services: [
    {
      slug: "3d-printing",
      name: "3D Printing",
      blurb: "FDM + resin, from one-offs to runs.",
    },
    {
      slug: "laser-engraving",
      name: "Laser Engraving",
      blurb: "Wood, acrylic, leather, metal.",
    },
    {
      slug: "resin-art",
      name: "Resin Art",
      blurb: "Hand-poured, one-of-one pieces.",
    },
    {
      slug: "t-shirt-printing",
      name: "T-Shirt Printing",
      blurb: "DTG + vinyl, singles to bulk.",
    },
    {
      slug: "decal-printing",
      name: "Decal Printing",
      blurb: "Die-cut vinyl for any surface.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type SiteServiceSlug = (typeof siteConfig.services)[number]["slug"];
