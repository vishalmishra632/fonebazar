import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ContactCard } from "@/components/about/ContactCard";
import { InsideTheStudio } from "@/components/about/InsideTheStudio";
import { Manifesto } from "@/components/about/Manifesto";
import { OriginStory } from "@/components/about/OriginStory";
import { WhatWeBelieve } from "@/components/about/WhatWeBelieve";
import { WhoWeServe } from "@/components/about/WhoWeServe";
import { KineticBand } from "@/components/shared/KineticBand";
import { aboutJsonLd, escapeJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "About — fonebazaar | Small studio, five machines, one standard.",
  },
  description:
    "A small workshop in Sault Ste. Marie running five crafts side-by-side. Our values, our origin, and how to get in touch.",
  alternates: { canonical: "https://fonebazaar.ca/about" },
  openGraph: {
    title: "About fonebazaar",
    description:
      "A small workshop in Sault Ste. Marie. Five crafts, one standard.",
    url: "https://fonebazaar.ca/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(aboutJsonLd) }}
      />
      <AboutHero />
      <Manifesto />
      <OriginStory />
      <WhatWeBelieve />
      <KineticBand
        words={["Nothing Subcontracted", "Honest Timelines", "Local First", "By Hand"]}
        direction="right"
        variant="fill"
      />
      <InsideTheStudio />
      <WhoWeServe />
      <ContactCard />
    </>
  );
}
