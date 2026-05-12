export const manifesto: readonly string[] = [
  "Good things are made, not assembled.",
  "Local is a feature, not a compromise.",
  "If a piece doesn't meet our bar, we remake it — no charge, no excuses.",
];

// TODO: confirm founding year with client before launch
export const originStory =
  "fonebazar started in 2022 with a single 3D printer in a spare room and an itch to make gifts the local shops couldn't. One printer became two. Then came a laser cutter because our wooden name plaques deserved proper engraving. Then resin, then a heat press, then a vinyl cutter. Four years later, we run five crafts side-by-side — on purpose.";

export interface Value {
  number: string;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    number: "01",
    title: "Nothing is subcontracted.",
    description:
      "Every piece is made in our workshop. If your name is on the order, someone whose name you know made it. No dropshipping. No middlemen. No surprises about where it came from.",
  },
  {
    number: "02",
    title: "Honest timelines.",
    description:
      "We'll tell you exactly how long your piece will take — even if that answer is two weeks. We'd rather lose a job than rush it and disappoint.",
  },
  {
    number: "03",
    title: "Local first.",
    description:
      "We source materials from within Canada where possible. Pickup in Sault Ste. Marie is always free. Shipping is quoted transparently, never marked up.",
  },
  {
    number: "04",
    title: "Breadth by design.",
    description:
      "Running five crafts side-by-side means you don't coordinate between three suppliers for one idea. One studio, one conversation, one pickup.",
  },
];

export const studioLetter: readonly string[] = [
  "Most of the shops we grew up around are gone now. Replaced by bigger boxes, online catalogs, and whatever shipped from three time zones away. That's fine for most things — but not for the piece you want engraved for your mother's birthday, or the trophy your league commissioned, or the sign that goes above your own front door.",
  "Those things should come from someone local. Someone who picks up the phone. Someone who cares enough to remake it if the first one isn't right.",
  "That's the bet we're making. Thanks for being part of it.",
];

// TODO: replace with owner name + role once confirmed with client
export const studioSignature = "— fonebazar studio";

export const studioImage =
  "https://images.unsplash.com/photo-1536311820367-a38e1846ad14?w=1600&q=80&auto=format&fit=crop";

export type AudienceIcon = "Home" | "Briefcase" | "Heart" | "Trophy" | "Wrench";

export interface Audience {
  icon: AudienceIcon;
  title: string;
  blurb: string;
}

export const audiences: Audience[] = [
  {
    icon: "Home",
    title: "Homes",
    blurb:
      "Lamps, wall art, coasters, custom decor across Sault Ste. Marie and beyond.",
  },
  {
    icon: "Briefcase",
    title: "Small businesses",
    blurb: "Signage, branded merch, custom gifting, storefront vinyl.",
  },
  {
    icon: "Heart",
    title: "Weddings & events",
    blurb: "Favours, signage, guest books, engraved keepsakes.",
  },
  {
    icon: "Trophy",
    title: "Teams & leagues",
    blurb: "Jerseys, trophies, banners, bulk event merch.",
  },
  {
    icon: "Wrench",
    title: "Makers & tinkerers",
    blurb: "Prototypes, replacement parts, one-off custom rigs.",
  },
];
