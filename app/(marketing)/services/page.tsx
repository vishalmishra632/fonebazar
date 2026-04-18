import type { Metadata } from "next";
import { ProcessDeepDive } from "@/components/services/ProcessDeepDive";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { StudioSection } from "@/components/services/StudioSection";
import { FullBleedCTA } from "@/components/shared/FullBleedCTA";
import { servicesDetail } from "@/lib/data/services-detail";
import { getProductsByService } from "@/lib/data/products";
import {
  escapeJsonLd,
  servicesFaqJsonLd,
  servicesJsonLd,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute:
      "Our Craft — fonebazar | 3D Printing, Laser, Resin, Tees, Decals",
  },
  description:
    "A real workshop in Sault Ste. Marie running five crafts side-by-side. See materials, capabilities, process, and lead times across all fonebazar services.",
  alternates: { canonical: "https://fonebazar.ca/services" },
  openGraph: {
    title: "Our Craft — fonebazar",
    description:
      "Five crafts under one roof. A real workshop in Sault Ste. Marie.",
    url: "https://fonebazar.ca/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(servicesFaqJsonLd) }}
      />
      <ServicesHero />
      <ServicesIntro />
      {servicesDetail.map((service, index) => (
        <ServiceBlock
          key={service.slug}
          service={service}
          productCount={getProductsByService(service.slug).length}
          flipped={index % 2 === 1}
        />
      ))}
      <StudioSection />
      <ProcessDeepDive />
      <ServicesFAQ />
      <FullBleedCTA
        headline="Let's make yours."
        subhead="A photo, a sketch, a rough description — send whatever you have. We reply within the hour during studio hours."
        secondaryHref="/products"
        secondaryLabel="Browse the catalog"
      />
    </>
  );
}
