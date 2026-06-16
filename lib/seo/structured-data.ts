import { siteConfig } from "../data/site";
import { homeFaqs } from "../data/services-content";
import { servicesFaqs } from "../data/services-detail";
import { contactFaqs } from "../data/contact-content";
import type { LegalDocument } from "../types/legal";

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
    streetAddress: "253 Bruce St",
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
    name: "fonebazaar services",
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

export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: [
    "3D Printing",
    "Laser Engraving",
    "Resin Art",
    "T-Shirt Printing",
    "Decal Printing",
  ],
  provider: {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "253 Bruce St",
      addressLocality: "Sault Ste. Marie",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  areaServed: { "@type": "Place", name: "Canada" },
  url: `${siteConfig.url}/services`,
};

export const servicesFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: servicesFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About fonebazaar",
  url: `${siteConfig.url}/about`,
  description:
    "A small workshop in Sault Ste. Marie running five crafts: 3D printing, laser engraving, resin art, t-shirt printing, and decal printing.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    foundingDate: "2022",
    address: {
      "@type": "PostalAddress",
      streetAddress: "253 Bruce St",
      addressLocality: "Sault Ste. Marie",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    telephone: "+1-705-971-0676",
    email: siteConfig.contact.email,
  },
};

export const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact fonebazaar",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    telephone: "+1-705-971-0676",
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "253 Bruce St",
      addressLocality: "Sault Ste. Marie",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "11:00",
        closes: "17:00",
      },
    ],
  },
};

export const contactFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description:
    "A creative services studio in Sault Ste. Marie, offering 3D printing, laser engraving, resin art, t-shirt printing, and decal printing.",
  url: `${siteConfig.url}/our-store`,
  telephone: "+1-705-971-0676",
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "253 Bruce St",
    addressLocality: "Sault Ste. Marie",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "17:00",
    },
  ],
  availableService: [
    "3D Printing",
    "Laser Engraving",
    "Resin Art",
    "T-Shirt Printing",
    "Decal Printing",
  ],
};

export function legalJsonLd(doc: LegalDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: doc.title,
    url: `${siteConfig.url}/${doc.slug}`,
    description: doc.intro,
    dateModified: doc.lastUpdated,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
    },
  };
}

export function escapeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
