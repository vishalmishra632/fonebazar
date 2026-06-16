import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { privacyPolicyDoc } from "@/lib/data/privacy-policy-content";
import { escapeJsonLd, legalJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy — fonebazaar",
  },
  description:
    "What we collect, what we don't, where it lives, and how to exercise your rights under PIPEDA. Plain language, no legalese.",
  alternates: { canonical: "https://fonebazaar.ca/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — fonebazaar",
    description:
      "What we collect, what we don't, and how to exercise your rights under PIPEDA.",
    url: "https://fonebazaar.ca/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: escapeJsonLd(legalJsonLd(privacyPolicyDoc)),
        }}
      />
      <LegalLayout doc={privacyPolicyDoc} />
    </>
  );
}
