import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { refundReturnDoc } from "@/lib/data/refund-return-content";
import { escapeJsonLd, legalJsonLd } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: "Refund & Return Policy — fonebazar",
  },
  description:
    "How refunds, remakes, shipping-damage claims, and cancellations work at fonebazar. Plain language, no legalese.",
  alternates: { canonical: "https://fonebazar.ca/refund-return" },
  openGraph: {
    title: "Refund & Return Policy — fonebazar",
    description:
      "How refunds, remakes, shipping-damage claims, and cancellations work at fonebazar.",
    url: "https://fonebazar.ca/refund-return",
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
