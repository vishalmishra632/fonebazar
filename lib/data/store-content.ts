import type { ServiceSlug } from "@/lib/types/product";

// placeholder — replace in Phase 9
const PH = (id: string) => `https://images.unsplash.com/photo-${id}?w=1400&q=80`;

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
    src: PH("1631283894932-af1ccd9a3016"),
    alt: "The fonebazar studio floor with machines running",
    caption: "The whole room, mid-Tuesday.",
    aspect: "5/4",
  },
  {
    src: PH("1581091870622-1e7e3fbfac08"),
    alt: "A 3D printer laying down a colourful lattice object",
    caption: "Layer 247 of a custom trophy.",
    aspect: "3/4",
  },
  {
    src: PH("1565717106-17ad97d9c0eb"),
    alt: "A laser cutter engraving a wooden coaster",
    caption: "Oak coaster run for a wedding.",
    aspect: "4/5",
  },
  {
    src: PH("1578320340584-aec62ea79a3a"),
    alt: "Hand pouring blue and teal resin into a wall panel",
    caption: "Ocean-flow wall piece, day two.",
    aspect: "1/1",
  },
  {
    src: PH("1618932260643-eee4a2f652a6"),
    alt: "Heat press closing down on a custom printed t-shirt",
    caption: "Team kit, final cure.",
    aspect: "4/3",
  },
  {
    src: PH("1609205807490-89c0a16b5f62"),
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
    image: PH("1611605698323-b1e99cfd37ea"),
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
    image: PH("1578662996442-48f60103fc96"),
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
    image: PH("1565717106-17ad97d9c0eb"),
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
    image: PH("1578320340584-aec62ea79a3a"),
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
    image: PH("1503342217505-b0a15ec3261c"),
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
    image: PH("1609205807490-89c0a16b5f62"),
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

// TODO: confirm street and alley names with client before launch
export const visitCopy: Record<"parking" | "entrance" | "inside", VisitBlock> = {
  parking: {
    title: "Where to park.",
    body: "Street parking on [PLACEHOLDER — e.g., Queen Street] is free after 6pm and on weekends. Weekday daytime is a 2hr limit. There's also a small lot behind the building — enter from the alley off [PLACEHOLDER].",
    icon: "Car",
  },
  entrance: {
    title: "Finding the door.",
    body: "Look for the violet sign above the door — second unit from the corner. Press the bell once; we'll come down. Doors are locked during working hours so the machines stay dust-free.",
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
