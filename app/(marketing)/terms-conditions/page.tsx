import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { termsConditionsDoc } from "@/lib/data/terms-conditions-content";
import { escapeJsonLd, legalJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Terms & Conditions — fonebazar",
  },
  description:
    "The ground rules for ordering from fonebazar. Covers ordering, IP, liability, and what happens when things go wrong. Plain-language, Ontario-governed.",
  alternates: { canonical: "https://fonebazar.ca/terms-conditions" },
  openGraph: {
    title: "Terms & Conditions — fonebazar",
    description:
      "The ground rules for ordering from fonebazar. Plain-language, Ontario-governed.",
    url: "https://fonebazar.ca/terms-conditions",
    type: "website",
  },
};

export default function TermsConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: escapeJsonLd(legalJsonLd(termsConditionsDoc)),
        }}
      />
      <LegalLayout doc={termsConditionsDoc} />
    </>
  );
}
