import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  escapeJsonLd,
  homeFaqJsonLd,
  homeJsonLd,
} from "@/lib/seo/structured-data";

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
      <TrustMarquee />
      <ServicesShowcase />
      <ProcessSection />
      <FeaturedWork />
      <StatsStrip />
      <Testimonials />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
