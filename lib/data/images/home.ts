// Curated imagery — replaced in Phase 10.5 after the initial set returned 404s.
// Each entry matches its caption semantically: a lattice lamp photo goes with
// "Lattice Lamp", etc. If the catalogue grows, add entries here only.
export interface FeaturedWorkItem {
  src: string;
  alt: string;
  title: string;
  service: string;
  cols?: number;
  rows?: number;
}

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const P = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=${w}&auto=compress&cs=tinysrgb`;

export const featuredWork: readonly FeaturedWorkItem[] = [
  {
    src: P(788855, 1800),
    alt: "Glowing Edison bulb inside a faceted polyhedral lattice cage casting geometric shadows",
    title: "Lattice Lamp",
    service: "3D Print",
    cols: 2,
    rows: 2,
  },
  {
    src: P(16446245, 1200),
    alt: "Espresso cup resting on a laser-engraved round wooden coaster",
    title: "Oak Coaster Set",
    service: "Laser Engraving",
  },
  {
    src: U("1637531645804-ca7c17feea5c", 1200),
    alt: "Blue and teal epoxy resin wall piece with swirled pigment",
    title: "Ocean Flow",
    service: "Resin Art",
  },
  {
    src: P(8346226, 1200),
    alt: "Stack of matching custom-printed team t-shirts in studio lighting",
    title: "Team Merch",
    service: "T-Shirt Print",
  },
  {
    src: P(19919394, 1200),
    alt: "Custom die-cut vinyl sticker sheet ready to be applied to laptops",
    title: "Laptop Decals",
    service: "Decal Print",
  },
  {
    src: U("1764115424769-ebdd2683d5a8", 1800),
    alt: "Moody wide-angle shot of the fonebazaar studio with machines running",
    title: "Studio at Work",
    service: "Behind the Scenes",
    cols: 4,
  },
];

export function getFeaturedImage(index: number): FeaturedWorkItem | undefined {
  return featuredWork[index];
}
