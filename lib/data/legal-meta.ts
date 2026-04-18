export const legalPages = [
  { slug: "refund-return", title: "Refund & Return", short: "Refund" },
  { slug: "privacy-policy", title: "Privacy Policy", short: "Privacy" },
  { slug: "terms-conditions", title: "Terms & Conditions", short: "Terms" },
] as const;

export type LegalPageSlug = (typeof legalPages)[number]["slug"];

export function formatLastUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
