import { siteConfig } from "../data/site";
import { homeFaqs } from "../data/services-content";

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(Boolean),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description:
    "3D printing, laser engraving, resin art, t-shirt printing, and decal printing studio in Sault Ste. Marie, Ontario.",
  url: siteConfig.url,
  telephone: "+1-705-971-0676",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sault Ste. Marie",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Place",
    name: "Sault Ste. Marie, Ontario, Canada",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "fonebazar services",
    itemListElement: siteConfig.services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: { "@type": "Service", name: service.name },
    })),
  },
};

export const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function escapeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
