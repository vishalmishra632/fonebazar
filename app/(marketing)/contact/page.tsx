import type { Metadata } from "next";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactRail } from "@/components/contact/ContactRail";
import { HowPickupWorks } from "@/components/contact/HowPickupWorks";
import { LocationCard } from "@/components/contact/LocationCard";
import {
  contactFaqJsonLd,
  contactJsonLd,
  escapeJsonLd,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Contact — fonebazaar | Sault Ste. Marie Creative Studio",
  },
  description:
    "Get in touch with fonebazaar. WhatsApp, email, or send a project brief via our form. We reply within the hour during studio hours.",
  alternates: { canonical: "https://fonebazaar.ca/contact" },
  openGraph: {
    title: "Contact fonebazaar",
    description:
      "Message, email, or stop by our studio in Sault Ste. Marie.",
    url: "https://fonebazaar.ca/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(contactFaqJsonLd) }}
      />
      <ContactHero />
      <section className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
          <aside className="lg:col-span-4">
            <ContactRail />
          </aside>
        </div>
      </section>
      <HowPickupWorks />
      <LocationCard />
      <ContactFAQ />
    </>
  );
}
