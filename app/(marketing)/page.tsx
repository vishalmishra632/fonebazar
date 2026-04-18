import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { KineticBand } from "@/components/shared/KineticBand";
import {
  escapeJsonLd,
  homeFaqJsonLd,
  homeJsonLd,
} from "@/lib/seo/structured-data";

const TRUST_WORDS = [
  "3D Printing",
  "Laser Engraving",
  "Resin Art",
  "Custom Tees",
  "Precision Decals",
  "Prototypes",
  "Signage",
  "Gifting",
];

const STUDIO_WORDS = [
  "Hand-Made",
  "Sault Ste. Marie",
  "Pickup Ready",
  "Small Batch",
  "WhatsApp-First",
];

export const metadata: Metadata = {
  title: {
    absolute:
      "fonebazar — 3D Printing, Laser Engraving & Custom Crafts in Sault Ste. Marie",
  },
  description:
    "Sault Ste. Marie's creative studio for 3D printing, laser engraving, resin art, t-shirt printing, and decal printing. Order custom pieces over WhatsApp.",
  openGraph: {
    title: "fonebazar — Where ideas become objects",
    description:
      "Custom 3D printing, laser engraving, resin art, t-shirt printing, and decals — made locally in Sault Ste. Marie, ordered over WhatsApp.",
    url: "https://fonebazar.ca",
    siteName: "fonebazar",
    type: "website",
  },
  alternates: { canonical: "https://fonebazar.ca" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(homeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(homeFaqJsonLd) }}
      />
      <HeroSection />
      <KineticBand words={TRUST_WORDS} direction="left" variant="outline" />
      <ServicesShowcase />
      <KineticBand words={STUDIO_WORDS} direction="right" variant="fill" />
      <ProcessSection />
      <FeaturedWork />
      <StatsStrip />
      <Testimonials />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
