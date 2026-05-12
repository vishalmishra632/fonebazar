import type { ServiceSlug } from "@/lib/types/product";

const PH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

export type GalleryAspect = "4/5" | "3/4" | "1/1" | "5/4" | "4/3";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  aspect: GalleryAspect;
}

// TODO: replace with real studio imagery in Phase 9
export const gallery: GalleryItem[] = [
  {
    src: PH("1547609434-b732edfee020"),
    alt: "The fonebazar studio floor with machines running",
    caption: "The whole room, mid-Tuesday.",
    aspect: "5/4",
  },
  {
    src: PH("1742971500442-8fb8610dfbf5"),
    alt: "A 3D printer laying down a colourful lattice object",
    caption: "Layer 247 of a custom trophy.",
    aspect: "3/4",
  },
  {
    src: PH("1758387933125-5ac945b4e2cd"),
    alt: "A laser cutter engraving a wooden coaster",
    caption: "Oak coaster run for a wedding.",
    aspect: "4/5",
  },
  {
    src: PH("1713882717490-b1d3ba1b5384"),
    alt: "Hand pouring blue and teal resin into a wall panel",
    caption: "Ocean-flow wall piece, day two.",
    aspect: "1/1",
  },
  {
    src: PH("1663433567177-9f94be0bff4c"),
    alt: "Heat press closing down on a custom printed t-shirt",
    caption: "Team kit, final cure.",
    aspect: "4/3",
  },
  {
    src: PH("1615378809998-afc205e73bad"),
    alt: "Tweezers weeding the negative from a cut vinyl decal",
    caption: "A fiddly decal.",
    aspect: "3/4",
  },
];

export type MachineStatus = "running" | "queued" | "idle";

export interface Machine {
  id: string;
  name: string;
  brandModel: string;
  serviceSlug: ServiceSlug;
  serviceName: string;
  handles: string[];
  description: string;
  image: string;
  status: MachineStatus;
  statusMessages: string[];
}

// TODO: replace brandModel values with real client-supplied brand/model in Phase 9
export const machines: Machine[] = [
  {
    id: "fdm-printer",
    name: "FDM 3D Printer",
    brandModel: "[PLACEHOLDER — e.g., Bambu Lab X1-Carbon]",
    serviceSlug: "3d-printing",
    serviceName: "3D Printing",
    handles: ["PLA, PETG, ABS, TPU", "256 × 256 × 256 mm", "Multi-colour via AMS"],
    description:
      "Our workhorse for functional parts, prototypes, and larger print runs.",
    image: PH("1739607448062-7d4accb12fe1"),
    status: "running",
    statusMessages: [
      "Printing a phone stand",
      "Layer 142 of 380",
      "Switching to orange filament",
    ],
  },
  {
    id: "sla-printer",
    name: "SLA Resin Printer",
    brandModel: "[PLACEHOLDER — e.g., Elegoo Saturn 3]",
    serviceSlug: "3d-printing",
    serviceName: "3D Printing",
    handles: [
      "50-micron layer detail",
      "Miniatures + jewellery masters",
      "Fast turnaround on small parts",
    ],
    description:
      "For anything that needs sharp detail — figurines, ring masters, intricate geometry.",
    image: PH("1737010513550-9a2040761980"),
    status: "idle",
    statusMessages: ["Curing complete", "Bed cleaned", "Ready for next job"],
  },
  {
    id: "laser-cutter",
    name: "CO₂ Laser Cutter",
    brandModel: "[PLACEHOLDER — e.g., 60W desktop CO₂]",
    serviceSlug: "laser-engraving",
    serviceName: "Laser Engraving",
    handles: [
      "600 × 400 mm bed",
      "Wood, acrylic, leather, anodised metal",
      "0.3mm min line width",
    ],
    description:
      "Clean kerfs, crisp engraving, and the constant smell of toasted basswood.",
    image: PH("1687382130081-ebd36ecd38a9"),
    status: "running",
    statusMessages: [
      "Engraving oak coasters",
      "Run 3 of 4",
      "Stepping over with fresh vents",
    ],
  },
  {
    id: "resin-station",
    name: "Resin Pour Station",
    brandModel: "[PLACEHOLDER — our own bench setup]",
    serviceSlug: "resin-art",
    serviceName: "Resin Art",
    handles: [
      'Up to 36" × 24" panels',
      "Heated cure chamber",
      "Dust-controlled space",
    ],
    description:
      "A dedicated pour bench with heated curing so pieces set properly in winter.",
    image: PH("1772752021241-2d922cadbab1"),
    status: "queued",
    statusMessages: [
      "Waiting on pigment delivery",
      "Next pour: tomorrow 9am",
      "Prepping three ocean pieces",
    ],
  },
  {
    id: "dtg-heatpress",
    name: "DTG + Heat Press",
    brandModel: "[PLACEHOLDER — e.g., Epson F2100 + 16×20 press]",
    serviceSlug: "t-shirt-printing",
    serviceName: "T-Shirt Printing",
    handles: [
      "Photographic DTG",
      "Heavyweight heat-press vinyl",
      "Singles and bulk runs",
    ],
    description:
      "Between the two, we cover everything from one-off custom tees to full team kits.",
    image: PH("1663433567177-9f94be0bff4c"),
    status: "idle",
    statusMessages: ["Platen clean", "Waiting on next kit", "Ink topped up"],
  },
  {
    id: "vinyl-cutter",
    name: "Vinyl Cutter",
    brandModel: "[PLACEHOLDER — e.g., Roland GS-24]",
    serviceSlug: "decal-printing",
    serviceName: "Decal Printing",
    handles: [
      'Up to 48" width cuts',
      "UV-stable exterior vinyl",
      "Matte, gloss, chrome, frosted",
    ],
    description:
      "Handles everything from a laptop sticker to a full storefront window graphic.",
    image: PH("1615378809998-afc205e73bad"),
    status: "running",
    statusMessages: [
      "Cutting a 2x3ft storefront decal",
      "Weeding next",
      "Pre-masked, ready to ship",
    ],
  },
];

export type VisitIcon = "Car" | "DoorOpen" | "Coffee";

export interface VisitBlock {
  title: string;
  body: string;
  icon: VisitIcon;
}

export const visitCopy: Record<"parking" | "entrance" | "inside", VisitBlock> = {
  parking: {
    title: "Where to park.",
    body: "Street parking along Bruce St is free after 6pm and on weekends. Weekday daytime is a 2hr limit. There's also a small lot behind the building — enter from the alley off Bruce St.",
    icon: "Car",
  },
  entrance: {
    title: "Finding the door.",
    body: "Look for 253 Bruce St — second unit from the corner with the yellow sign above the door. Press the bell once; we'll come down. Doors are locked during working hours so the machines stay dust-free.",
    icon: "DoorOpen",
  },
  inside: {
    title: "Inside.",
    body: "A working studio — machines may be mid-run. We'll have your piece ready on the counter and the kettle is always on. Expect a 5–10 minute chat about the piece before you head back out.",
    icon: "Coffee",
  },
};

export const spaceNote =
  "There's always something running. Filament hissing out of a nozzle, the laser humming, resin curing under UV lights, music playing from a dented bluetooth speaker that's been through three moves. You'll probably smell melted PLA and fresh-cut plywood at the same time. We think that's the whole point.";
