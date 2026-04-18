import type { ServiceSlug } from "@/lib/types/product";

// placeholder — replace in Phase 9
const PH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80`;

export interface ServiceCapability {
  label: string;
  value: string;
}

export interface ServiceDetail {
  number: string;
  slug: ServiceSlug;
  name: string;
  tagline: string;
  paragraph: string;
  capabilities: ServiceCapability[];
  useCases: string[];
  leadTime: string;
  heroImage: string;
}

export const servicesDetail: ServiceDetail[] = [
  {
    number: "01",
    slug: "3d-printing",
    name: "3D Printing",
    tagline: "From digital file to physical object.",
    paragraph:
      "We run both filament (FDM) and resin (SLA) printers side-by-side, so the right tool gets the right job. Functional parts in PLA, PETG, or ABS; high-detail figures and jewellery masters in resin. One-offs are welcome — so are small runs.",
    capabilities: [
      { label: "Materials", value: "PLA, PETG, ABS, TPU, SLA Resin" },
      { label: "Build Size", value: "Up to 256 × 256 × 256 mm (FDM)" },
      { label: "Resin Detail", value: "50-micron layer height" },
      { label: "Finishes", value: "Raw, sanded, primed, painted" },
      { label: "Tolerance", value: "±0.2mm typical" },
    ],
    useCases: ["Prototypes", "Replacement Parts", "Miniatures", "Home Decor", "Custom Gifts"],
    leadTime: "2–6 days (simple) · 10–14 days (complex resin)",
    heroImage: PH("1631283894932-af1ccd9a3016"),
  },
  {
    number: "02",
    slug: "laser-engraving",
    name: "Laser Engraving",
    tagline: "Permanent marks with crisp precision.",
    paragraph:
      "Our CO₂ laser handles wood, acrylic, leather, paper, and coated metals. Engraving depth is tuned per material — deep and tactile on hardwoods, razor-sharp on acrylic. Send vector art (SVG, AI) for best results; we can redraw from raster if needed.",
    capabilities: [
      { label: "Materials", value: "Wood, acrylic, leather, paper, anodised metal" },
      { label: "Bed Size", value: "600 × 400 mm" },
      { label: "File Formats", value: "SVG, AI, PDF, high-res PNG" },
      { label: "Min Detail", value: "0.3mm line width" },
      { label: "Finishes", value: "Natural, stained, food-safe sealed" },
    ],
    useCases: ["Signage", "Wedding Gifts", "Awards", "Branded Merch", "Personalised Homeware"],
    leadTime: "3–6 days",
    heroImage: PH("1565717106-17ad97d9c0eb"),
  },
  {
    number: "03",
    slug: "resin-art",
    name: "Resin Art",
    tagline: "Hand-poured pieces, one of one.",
    paragraph:
      "Every resin piece is poured, pigmented, and finished by hand over multiple days. No two are identical — that's the point. We work in epoxy for durability and clarity, with food-safe topcoats available for serving pieces.",
    capabilities: [
      { label: "Resin Type", value: "Epoxy (art-grade, low-VOC)" },
      { label: "Max Size", value: '36" × 24" panels' },
      { label: "Palette", value: "Custom colour matching available" },
      { label: "Inclusions", value: "Dried florals, gold leaf, crushed stone" },
      { label: "Finishes", value: "Gloss, satin, hand-buffed matte" },
    ],
    useCases: ["Wall Art", "Coasters", "Trays", "Jewellery", "Memorial Keepsakes"],
    leadTime: "5–14 days (cure time driven)",
    heroImage: PH("1578320340584-aec62ea79a3a"),
  },
  {
    number: "04",
    slug: "t-shirt-printing",
    name: "T-Shirt Printing",
    tagline: "Premium blanks meet your design.",
    paragraph:
      "DTG for full-colour photographic prints with a soft hand-feel. Heat-pressed vinyl for bold solid colour and maximum wash life. We stock premium ring-spun cotton blanks in unisex and fitted cuts — team kits and event merch are our sweet spot.",
    capabilities: [
      { label: "Methods", value: "DTG, heat-pressed vinyl" },
      { label: "Blanks", value: "Ring-spun cotton tees, heavyweight hoodies" },
      { label: "Sizes", value: "XS – XXL (3XL on request)" },
      { label: "Colours", value: "Full CMYK (DTG) · 40+ vinyl colours" },
      { label: "MOQ", value: "1 for custom, 10 for bulk pricing" },
    ],
    useCases: ["Team Kits", "Event Merch", "Brand Apparel", "Personal Gifts", "Small Drops"],
    leadTime: "3–10 days (volume dependent)",
    heroImage: PH("1503342217505-b0a15ec3261c"),
  },
  {
    number: "05",
    slug: "decal-printing",
    name: "Decal Printing",
    tagline: "Die-cut vinyl for any surface.",
    paragraph:
      "Indoor, outdoor, vehicle-grade — we choose the right vinyl for where it's going. UV-stable inks and laminate topcoats mean our decals outlast cheaper alternatives by years. From a single laptop sticker to a full storefront window, same studio.",
    capabilities: [
      { label: "Vinyl Types", value: "Matte, gloss, chrome, frosted, reflective" },
      { label: "Outdoor Life", value: "5+ years with laminate" },
      { label: "Max Size", value: '48" × 100ft roll-cut' },
      { label: "Application", value: "Pre-masked, with application instructions" },
      { label: "Finishes", value: "Standard, laminate, anti-graffiti" },
    ],
    useCases: ["Vehicle Graphics", "Storefronts", "Laptop Art", "Event Signage", "Wall Vinyl"],
    leadTime: "2–5 days",
    heroImage: PH("1609205807490-89c0a16b5f62"),
  },
];

export interface ServicesFaqItem {
  question: string;
  answer: string;
}

export const servicesFaqs: readonly ServicesFaqItem[] = [
  {
    question: "Can you work from just a sketch or reference photo?",
    answer:
      "Yes — most of our custom work starts that way. Send whatever you have on WhatsApp. For 3D or laser jobs, we'll either redraw in vector or ask follow-up questions about dimensions and finishes.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "3D printing: STL, OBJ, STEP, 3MF. Laser engraving: SVG, AI, PDF, high-res PNG. T-shirt and decal printing: SVG, AI, PDF, 300dpi PNG. If in doubt, send it — we'll tell you if something needs conversion.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, on t-shirts (from 10 units), decals (from 50 units), and 3D prints (from 20 units). Rates are quoted case-by-case on WhatsApp because material and complexity matter more than unit count alone.",
  },
  {
    question: "Can you match a specific Pantone colour?",
    answer:
      "For vinyl decals and t-shirt vinyl — yes, across our in-stock range. For 3D prints and resin — we can come close, but exact Pantone matching is not guaranteed since filament and pigment batches vary slightly.",
  },
  {
    question: "What happens if I don't like the result?",
    answer:
      "For fixed-price items: if it genuinely doesn't match the agreed spec, we remake it on us. For custom jobs: we send preview renders or samples before full production to prevent this — so the chance of a surprise is low.",
  },
  {
    question: "Can you rush a job?",
    answer:
      "Sometimes. We keep 1–2 slots open each week for rush work at a 25–40% surcharge. Ask on WhatsApp and we'll tell you honestly whether your timeline is workable.",
  },
];

// TODO: replace with real studio imagery before launch
export const studioImages = {
  main: PH("1631283894932-af1ccd9a3016"),
  accentTop: PH("1581092160607-ee22621dd758"),
  accentBottom: PH("1565717106-17ad97d9c0eb"),
} as const;
