import type { Metadata } from "next";
import { MachineLineup } from "@/components/store/MachineLineup";
import { NoteFromSpace } from "@/components/store/NoteFromSpace";
import { StoreHero } from "@/components/store/StoreHero";
import { StudioGallery } from "@/components/store/StudioGallery";
import { VisitingHours } from "@/components/store/VisitingHours";
import { WhenYouVisit } from "@/components/store/WhenYouVisit";
import { KineticBand } from "@/components/shared/KineticBand";
import { escapeJsonLd, storeJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Our Store — fonebazaar | Inside the Studio",
  },
  description:
    "A look inside the fonebazaar studio in Sault Ste. Marie. Six machines, five crafts, and what to expect when you visit.",
  alternates: { canonical: "https://fonebazaar.ca/our-store" },
  openGraph: {
    title: "Our Store — fonebazaar",
    description:
      "A look inside the fonebazaar studio. Six machines, five crafts, candid.",
    url: "https://fonebazaar.ca/our-store",
    type: "website",
  },
};

export default function OurStorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(storeJsonLd) }}
      />
      <StoreHero />
      <KineticBand
        words={[
          "3D Printing",
          "Filament Hissing",
          "Layer by Layer",
          "Resin Pouring",
          "Laser Engraving",
          "Heat Press",
          "Vinyl Cutting",
          "DTG",
        ]}
        direction="left"
        variant="outline"
        glyph="⚙"
      />
      <StudioGallery />
      <MachineLineup />
      <NoteFromSpace />
      <KineticBand
        words={["Open By Appointment", "Working Studio", "Machines Running", "Kettle On"]}
        direction="left"
        variant="outline"
      />
      <WhenYouVisit />
      <VisitingHours />
    </>
  );
}
