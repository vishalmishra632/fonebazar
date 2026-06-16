import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { refundReturnDoc } from "@/lib/data/refund-return-content";
import { escapeJsonLd, legalJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Refund & Return Policy — fonebazaar",
  },
  description:
    "How refunds, remakes, shipping-damage claims, and cancellations work at fonebazaar. Plain language, no legalese.",
  alternates: { canonical: "https://fonebazaar.ca/refund-return" },
  openGraph: {
    title: "Refund & Return Policy — fonebazaar",
    description:
      "How refunds, remakes, shipping-damage claims, and cancellations work at fonebazaar.",
    url: "https://fonebazaar.ca/refund-return",
    type: "website",
  },
};

export default function RefundReturnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: escapeJsonLd(legalJsonLd(refundReturnDoc)),
        }}
      />
      <LegalLayout doc={refundReturnDoc} />
    </>
  );
}
