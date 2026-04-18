import type { LegalDocument } from "@/lib/types/legal";

// TODO: confirm lastUpdated with client before launch
export const refundReturnDoc: LegalDocument = {
  slug: "refund-return",
  title: "Refund & Return Policy",
  eyebrow: "Legal",
  lastUpdated: "2026-04-18",
  intro:
    "Most of what we make is custom. That means our policy is built around remaking pieces to our standard — not refunding them — because refunding work already done isn't fair to a small studio. But we take ownership of our errors, cover shipping damage properly, and cancel freely before production starts. Here's exactly how that works.",
  sections: [
    {
      id: "our-commitment",
      number: "01",
      title: "Our commitment to quality.",
      paragraphs: [
        "Every piece leaves our studio hand-inspected. If what you receive doesn't meet the bar we set — a manufacturing defect, a finishing flaw we should have caught, a material failure within normal use — we remake it at no charge.",
        "This remake warranty covers the first 30 days after pickup or delivery. After that, the piece has had meaningful use and falls under general wear, which isn't something we can reasonably warranty.",
      ],
      bullets: [
        {
          afterParagraph: 1,
          items: [
            "Covered: defects we should have caught, engraving errors vs the approved proof, material failures in normal use.",
            "Not covered: wear from use over time, damage from drops or misuse, colour fade on pieces stored in direct sun.",
          ],
        },
      ],
      calloutAfter: {
        label: "In short",
        body: "If we made it wrong, we'll make it right.",
      },
    },
    {
      id: "if-we-made-an-error",
      number: "02",
      title: "If we made an error.",
      paragraphs: [
        "If your piece doesn't match what you approved — wrong text, wrong size, wrong colour, wrong material — that's our mistake and it's fully on us.",
        "In those cases you choose: a remake at no charge, or a full refund. We'll also cover return shipping if the piece needs to come back for any reason. We don't ask you to prove we made the mistake beyond a photo — if you approved a proof and what arrived doesn't match, that's enough.",
      ],
    },
    {
      id: "shipping-damage",
      number: "03",
      title: "Shipping damage.",
      paragraphs: [
        "If your piece arrives broken or the packaging looks like it's been through a washing machine, we need to know within 48 hours of receipt. Message us on WhatsApp with:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "A photo of the piece showing the damage.",
            "A photo of the outer packaging (even if it looks fine — carrier claims often need this).",
            "A brief description of what you found.",
          ],
        },
      ],
      calloutAfter: {
        label: "What we do",
        body: "We file the carrier claim on our end. You choose remake or full refund — no waiting for the carrier to resolve first. Our insurance handles the backend.",
      },
    },
    {
      id: "custom-work",
      number: "04",
      title: "Custom work is non-refundable after production starts.",
      paragraphs: [
        "Custom pieces — anything made to your specification — are non-refundable once we start making them. Filament gets extruded, lasers cut, resin pours, vinyl gets weeded. We can't un-make the work and resell it to someone else.",
        "To prevent surprises, we send a preview render or rough sample before starting production on anything bespoke. Your approval — usually a yes on WhatsApp — is what kicks off production. Nothing starts until you say yes.",
      ],
      calloutAfter: {
        label: "The guardrail",
        body: "Approval is by WhatsApp message. Keep the thread — it's your reference, and ours, for what was agreed.",
      },
    },
    {
      id: "stock-pieces",
      number: "05",
      title: "Stock pieces you can return.",
      paragraphs: [
        "A small portion of our catalog is stock — items we pre-make in common configurations. Those pieces have a 14-day return window from pickup or delivery.",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Return within 14 days of receipt.",
            "Item must be unused and in original packaging.",
            "We issue store credit — not cash — because stock-making ties up studio time.",
            "Return shipping is covered by the customer unless the item is defective.",
          ],
        },
      ],
      calloutAfter: {
        label: "Excluded",
        body: "Sale items, clearance pieces, and anything personalised or engraved (those count as custom).",
      },
    },
    {
      id: "cancellation",
      number: "06",
      title: "Cancellation.",
      paragraphs: [
        "You can cancel your order at any time before we start making it. Message us on WhatsApp — we'll confirm the cancellation and refund any deposit the same day.",
        "Once production starts, cancellation depends on the piece:",
      ],
      bullets: [
        {
          afterParagraph: 1,
          items: [
            "Custom pieces: not cancellable — production is already underway.",
            "Stock pieces: cancellable if still in our processing queue, refunded in full.",
            "Bulk orders (t-shirts, decals): cancellable up to the point blanks are cut or printed.",
          ],
        },
      ],
    },
    {
      id: "how-to-request",
      number: "07",
      title: "How to request a remake or refund.",
      paragraphs: [
        "One path: WhatsApp. Message us at +1 (705) 971-0676 with your order details and a photo of the issue.",
        "Your order reference is the WhatsApp thread where we confirmed and delivered the piece. Keep those messages — they're our shared record. If you can't find the thread, your name, the approximate date, and a photo of the piece are enough for us to pull up the order.",
      ],
      calloutAfter: {
        label: "Response time",
        body: "Within the hour during studio hours (Mon–Sat, 10am–6pm). Outside hours, first thing the next morning.",
      },
    },
    {
      id: "your-rights",
      number: "08",
      title: "Your rights under Canadian law.",
      paragraphs: [
        "Nothing in this policy overrides your rights under the Ontario Consumer Protection Act, 2002, or any other applicable Canadian federal or provincial consumer protection law. If a provision of this policy conflicts with your statutory rights, your statutory rights apply.",
        "In particular, you retain your rights in cases of misrepresentation, defective goods, or failure to deliver what was agreed — regardless of what this policy says.",
      ],
    },
    {
      id: "changes",
      number: "09",
      title: "Changes to this policy.",
      paragraphs: [
        "We may update this policy as the business evolves. The last-updated date at the top reflects the most recent change.",
        "Orders placed before a policy change are governed by the version that was live when you ordered. If we change something materially, we'll note it clearly on the checkout flow (our WhatsApp confirmation) so you know what you're agreeing to.",
      ],
    },
    {
      id: "questions",
      number: "10",
      title: "Questions about any of this.",
      paragraphs: [
        "If any part of this policy is unclear, or you're in a situation it doesn't quite cover, message us on WhatsApp. We'd rather talk it through than leave you guessing.",
      ],
    },
  ],
  statutoryNote:
    "This policy is provided for transparency and does not constitute legal advice. For legal questions about your consumer rights in Ontario, consult the Ontario Ministry of Public and Business Service Delivery (ontario.ca/page/consumer-protection) or a qualified lawyer.",
};
