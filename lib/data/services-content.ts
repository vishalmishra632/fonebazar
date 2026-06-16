export interface ServiceShowcaseItem {
  number: string;
  slug: string;
  name: string;
  description: string;
  tags: readonly string[];
}

export const servicesShowcase: readonly ServiceShowcaseItem[] = [
  {
    number: "01",
    slug: "3d-printing",
    name: "3D Printing",
    description:
      "Turn digital models into tangible objects. FDM and resin-based printing in PLA, PETG, ABS, and high-detail SLA — from one-off prototypes to small production runs.",
    tags: ["Prototypes", "Miniatures", "Functional Parts", "Replacement Pieces", "Custom Models"],
  },
  {
    number: "02",
    slug: "laser-engraving",
    name: "Laser Engraving",
    description:
      "Precision marking on wood, acrylic, leather, and metal. Perfect for personalised gifts, signage, awards, and branded merchandise with crisp, permanent detail.",
    tags: ["Wood", "Acrylic", "Leather", "Anodised Metal", "Signage"],
  },
  {
    number: "03",
    slug: "resin-art",
    name: "Resin Art",
    description:
      "One-of-one epoxy pieces: coasters, trays, wall art, jewellery, and keepsakes. Each piece is poured, pigmented, and finished by hand.",
    tags: ["Coasters", "Trays", "Wall Art", "Jewellery", "Keepsakes"],
  },
  {
    number: "04",
    slug: "t-shirt-printing",
    name: "T-Shirt Printing",
    description:
      "DTG and vinyl printing on premium blanks. From a single custom tee to full team kits — soft hand-feel, wash-resistant colour.",
    tags: ["Custom Designs", "Team Kits", "Event Merch", "Hoodies", "Bulk Orders"],
  },
  {
    number: "05",
    slug: "decal-printing",
    name: "Decal Printing",
    description:
      "Die-cut vinyl decals for cars, laptops, windows, and walls. Weatherproof, fade-resistant, and custom-cut to any shape you draw.",
    tags: ["Car Decals", "Laptop Stickers", "Window Graphics", "Wall Vinyl", "Bulk Stickers"],
  },
];

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: readonly HomeFaqItem[] = [
  {
    question: "How do I actually place an order?",
    answer:
      "Add items to your cart, tap Place Order, and your cart lands directly in our WhatsApp. We reply within the hour with availability, timeline, and total.",
  },
  {
    question: "Do you ship outside Sault Ste. Marie?",
    answer:
      "Yes — we ship across Ontario and Canada. Local pickup is always free; shipping quotes are shared on WhatsApp.",
  },
  {
    question: "Can I send my own design files?",
    answer:
      "Absolutely. STL, OBJ, SVG, AI, PDF, PNG — send them on WhatsApp with a short brief and we'll confirm feasibility.",
  },
  {
    question: "What's the typical turnaround?",
    answer:
      "Most small orders ship in 2–5 days. Larger runs or complex pieces take 1–2 weeks. You'll get a firm date before you pay.",
  },
  {
    question: "Do I need to pay upfront?",
    answer:
      "No. Full payment is due on pickup or before shipping. Large custom orders may require a 30% deposit — we'll always tell you upfront.",
  },
];

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

// TODO: replace with real client-supplied testimonials before launch
export const testimonials: readonly TestimonialItem[] = [
  {
    quote:
      "Got my wedding signage laser-engraved on maple in under a week. Came out better than the reference. Genuinely impressed.",
    author: "Priya S.",
    role: "Bride, Sault Ste. Marie",
  },
  {
    quote:
      "We run a small e-commerce brand and fonebazaar now prints all our custom tees. Quality beats what we were getting from Toronto suppliers.",
    author: "Marcus R.",
    role: "Founder, Northwood Apparel",
  },
  {
    quote:
      "Needed a one-off resin trophy for our league finals. They turned it around in 48 hours. Will be back.",
    author: "Dave K.",
    role: "Hockey League Organiser",
  },
];

export interface HomeStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const homeStats: readonly HomeStat[] = [
  { value: 1200, suffix: "+", label: "Pieces delivered" },
  { value: 5, label: "Crafts under one roof" },
  { value: 24, suffix: "hr", label: "Avg. quote turnaround" },
  { value: 100, suffix: "%", label: "Locally made" },
];
