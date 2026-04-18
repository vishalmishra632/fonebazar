// TODO: replace with client-supplied imagery before launch
export interface FeaturedWorkItem {
  src: string;
  alt: string;
  title: string;
  service: string;
  cols?: number;
  rows?: number;
}

export const featuredWork: readonly FeaturedWorkItem[] = [
  {
    src: "https://images.unsplash.com/photo-1581091870622-1e7e3fbfac08?w=1600&q=80",
    alt: "3D printed geometric sculpture on a studio workbench",
    title: "Lattice Lamp",
    service: "3D Print",
    cols: 2,
    rows: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    alt: "Laser engraved oak coaster with a geometric motif",
    title: "Oak Coaster Set",
    service: "Laser Engraving",
  },
  {
    src: "https://images.unsplash.com/photo-1578320340584-aec62ea79a3a?w=900&q=80",
    alt: "Resin wall piece with swirling ocean-blue pigment",
    title: "Ocean Flow",
    service: "Resin Art",
  },
  {
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=80",
    alt: "Folded custom-printed t-shirt in soft lighting",
    title: "Team Merch",
    service: "T-Shirt Print",
  },
  {
    src: "https://images.unsplash.com/photo-1609205807490-89c0a16b5f62?w=900&q=80",
    alt: "Stack of printed vinyl decals",
    title: "Laptop Decals",
    service: "Decal Print",
  },
  {
    src: "https://images.unsplash.com/photo-1631283894932-af1ccd9a3016?w=1800&q=80",
    alt: "3D printer in action with a half-finished print",
    title: "Studio at Work",
    service: "Behind the Scenes",
    cols: 4,
  },
];

export function getFeaturedImage(index: number): FeaturedWorkItem | undefined {
  return featuredWork[index];
}
