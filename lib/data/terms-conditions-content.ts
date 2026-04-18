import type { LegalDocument } from "@/lib/types/legal";

// TODO: confirm lastUpdated with client before launch
export const termsConditionsDoc: LegalDocument = {
  slug: "terms-conditions",
  title: "Terms & Conditions",
  eyebrow: "Legal",
  lastUpdated: "2026-04-18",
  intro:
    "These are the ground rules for ordering from fonebazar — a small creative studio in Sault Ste. Marie, Ontario. They cover how orders work, who owns what, what we're responsible for, and what happens if we disagree. They're written plainly because contracts work best when both sides actually understand them.",
  sections: [
    {
      id: "agreeing",
      number: "01",
      title: "What you're agreeing to.",
      paragraphs: [
        "By placing an order with us — whether through our cart + WhatsApp handoff, a direct WhatsApp message, or any other channel — you agree to these Terms, our Refund & Return Policy, and our Privacy Policy.",
        "If you don't agree, the simple answer is: don't place an order. We'd rather you walk away than order under terms you're uncomfortable with.",
      ],
      calloutAfter: {
        label: "No clickwrap here",
        body: "This site doesn't have a login or a checkbox at checkout. That doesn't change anything legally — placing an order is the act of agreeing.",
      },
    },
    {
      id: "who-we-are",
      number: "02",
      title: "Who we are.",
      paragraphs: [
        'fonebazar is a sole-proprietor creative services studio based in Sault Ste. Marie, Ontario, Canada. Where these Terms say "we," "us," or "fonebazar," that\'s who we mean. Where they say "you" or "the customer," that\'s whoever\'s placing the order.',
        "Our contact details for anything in these Terms:",
      ],
      bullets: [
        {
          afterParagraph: 1,
          items: [
            "WhatsApp: +1 (705) 971-0676",
            "Email: hello@fonebazar.ca",
            "Mail: fonebazar studio, Sault Ste. Marie, Ontario, Canada (specific address on request)",
          ],
        },
      ],
    },
    {
      id: "eligibility",
      number: "03",
      title: "Who can order.",
      paragraphs: [
        "You can order from fonebazar if you're at least 18 years old, or if you have permission from a parent or guardian who's 18+. If you're ordering on behalf of a business, you confirm you have the authority to do so on that business's behalf.",
      ],
    },
    {
      id: "ordering-process",
      number: "04",
      title: "How ordering works.",
      paragraphs: [
        "Every order follows roughly the same flow. It's worth spelling out the legally-meaningful moments:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "You browse the catalog and build a cart on this website. The cart is just your own shortlist — it lives in your browser, not ours.",
            "You tap Place Order. Your cart contents open as a pre-filled WhatsApp message to our number. At this point, no order exists yet.",
            "You send the message. We receive it.",
            'We reply confirming availability, timeline, and — for items priced as "quote" — the final price. This reply is our written acceptance of the order.',
            "Your reply confirming you want to proceed is what forms the contract between us. Production starts from there.",
            'For custom pieces, we\'ll send a preview render or sample before we start. Your "yes" on that preview is the production go-ahead.',
          ],
        },
      ],
      calloutAfter: {
        label: "Key point",
        body: "A filled cart is not an order. An unanswered WhatsApp message is not an order. The contract forms when you confirm our proposed terms (price + timeline) on WhatsApp.",
      },
    },
    {
      id: "pricing-and-payment",
      number: "05",
      title: "Prices, payment, and taxes.",
      paragraphs: [
        "Prices shown on this website are in Canadian dollars (CAD) unless explicitly labelled otherwise. We reserve the right to change catalog prices at any time — but the price you're quoted on WhatsApp for your specific order is locked for that order.",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Quoted prices exclude applicable sales tax (HST at 13% in Ontario) unless stated.",
            "Shipping is quoted separately on WhatsApp, based on weight, destination, and preferred carrier.",
            "Payment is due on pickup or before shipping, by Interac e-transfer, cash, or card via a WhatsApp Pay link we send you.",
            "Large or bulk orders may require a 30% non-refundable deposit before production. We'll tell you upfront if your order falls in that category.",
            "If an invoice goes unpaid beyond 7 days after we've delivered the piece, we may charge reasonable collection costs.",
          ],
        },
      ],
    },
    {
      id: "custom-work-approvals",
      number: "06",
      title: "Custom work and approvals.",
      paragraphs: [
        "Most of what we do is custom. Custom work carries a specific risk: once we start making it, we can't un-make it and resell it. That's why the approval flow matters:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "For any custom piece over a modest complexity threshold, we send a preview render, rough sample, or mockup before production.",
            'You approve the preview in writing — usually a "yes" or "approved" on WhatsApp.',
            "Your approval locks in what we make. Changes after approval may require a new quote and timeline.",
            "If the finished piece matches what you approved, it's not considered defective even if you later change your mind about the design choice.",
          ],
        },
      ],
      calloutAfter: {
        label: "Keep the thread",
        body: "The WhatsApp thread is the record — for both of us. Don't delete it until your order is complete and you're happy with it.",
      },
    },
    {
      id: "delivery-and-risk",
      number: "07",
      title: "Delivery, pickup, and when risk transfers.",
      paragraphs: [
        "For pickup orders: risk passes to you when you take the piece home. Once it leaves our counter, it's yours.",
        "For shipped orders: risk passes to you when the carrier delivers the piece to the address you provided. If the piece is damaged in transit, our Refund & Return Policy Section 03 (Shipping damage) applies — we handle the carrier claim and you choose remake or refund.",
        "If a shipped piece is returned to us as undeliverable (wrong address, repeated failed delivery, unclaimed), we'll reach out. If we can't resolve the address within 14 days, we may cancel the order and refund the piece price minus shipping costs already incurred.",
      ],
    },
    {
      id: "intellectual-property",
      number: "08",
      title: "Who owns what (intellectual property).",
      paragraphs: [
        "Custom work involves IP from both sides. Here's the split, stated plainly:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Your IP stays yours. Any design, logo, artwork, photograph, sketch, 3D file, or text you send us remains your property. We use it only to make your order — not for other customers, not for our catalog, not resold anywhere.",
            "Our catalog IP stays ours. fonebazar-designed pieces (e.g., the Lattice Table Lamp, the Articulated Desk Dragon, the Ocean Flow Wall Piece) are our designs. When you buy one, you're buying a physical piece — not the design file, rights to reproduce it, or the right to resell copies of it.",
            "Modifications to our designs: if you'd like us to modify one of our catalog designs for your specific use, we'll quote it as a custom job. The modifications remain under the same catalog-IP rule.",
            "Third-party IP you don't own: we can't reproduce copyrighted designs, trademarked logos, or other protected content that you don't have rights to. If you ask us to print someone else's character, photograph, or logo without permission, we'll decline.",
          ],
        },
      ],
      calloutAfter: {
        label: "Portfolio right",
        body: "We reserve the right to photograph any piece we make and use those photos in our portfolio, social media, and this website — unless you ask us in writing not to (WhatsApp or email counts). If your piece is for a surprise gift, definitely tell us.",
      },
    },
    {
      id: "acceptable-use",
      number: "09",
      title: "Acceptable use.",
      paragraphs: [
        "When you interact with fonebazar — through orders, messages, or otherwise — a few things are off the table:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Ordering pieces that infringe third-party copyrights, trademarks, or trade dress without permission.",
            "Asking us to produce content that is unlawful, defamatory, harassing, hateful, or sexually explicit.",
            "Using our work to impersonate, defraud, or mislead others.",
            "Trying to reverse-engineer, scrape, or abuse this website or our ordering infrastructure.",
            "Sending us malware, exploit payloads, or otherwise unsafe files through the contact form.",
          ],
        },
      ],
      calloutAfter: {
        label: "Our right to decline",
        body: 'We reserve the right to decline any order for any reason. If we decline, we\'ll return any deposit taken in full. We don\'t owe an explanation beyond "this isn\'t a piece we can make for you."',
      },
    },
    {
      id: "warranty",
      number: "10",
      title: "What we warrant (and don't).",
      paragraphs: [
        "Every piece we deliver comes with a simple promise: it will be free from manufacturing defects and finishing flaws that we should have caught. Our Refund & Return Policy Section 01 spells out what that means in practice, including the 30-day remake window after pickup or delivery.",
        'Beyond that specific warranty, our pieces are provided "as is." We don\'t promise that a piece is fit for any particular purpose you haven\'t told us about. If you need a piece for a specific use (outdoor weather, food contact, heavy structural load, medical application), tell us before ordering so we can advise on material choice.',
      ],
      calloutAfter: {
        label: "Unwaivable rights",
        body: "Nothing in this section waives warranties implied by Canadian federal or Ontario law that can't be waived by contract — for example, the implied condition of merchantable quality under the Sale of Goods Act.",
      },
    },
    {
      id: "liability",
      number: "11",
      title: "Limits on our liability.",
      paragraphs: [
        "If something goes wrong and we owe you damages, our total liability for any one order is capped at the amount you paid us for that order. For example: if you paid $85 for a lamp and a defect causes $200 of downstream harm, we're responsible for up to $85.",
        "This cap doesn't apply where liability can't be limited by contract — specifically:",
      ],
      bullets: [
        {
          afterParagraph: 1,
          items: [
            "Gross negligence or wilful misconduct on our part.",
            "Death or personal injury caused by our negligence (which is unwaivable under Ontario law anyway).",
            "Any other liability that Canadian or Ontario law specifically prohibits us from limiting.",
          ],
        },
      ],
      calloutAfter: {
        label: "Why this exists",
        body: "Small studios can't carry enterprise-scale liability for every downstream possibility. The cap keeps us in business; the carve-outs keep it fair.",
      },
    },
    {
      id: "force-majeure",
      number: "12",
      title: "When things outside our control happen.",
      paragraphs: [
        'Some disruptions are genuinely beyond our control — severe weather closing down shipping, a fire at a supplier, a power outage that bricks a mid-run print, a pandemic, a government-ordered shutdown. Call these "force majeure" events.',
        "If a force majeure event prevents or significantly delays us from making or delivering your order, we'll let you know as soon as we can, explain the impact, and give you the option to (a) wait it out if it's a reasonable delay, or (b) cancel and get a full refund of what you've paid so far.",
        'We don\'t hide behind this clause casually. It\'s for actual disasters, not "we got busy" or "we had a bad week."',
      ],
    },
    {
      id: "trademark",
      number: "13",
      title: "Our name and marks.",
      paragraphs: [
        'The fonebazar name, wordmark, and any associated logos are ours. You can refer to us by name (for example, "made by fonebazar") but you can\'t use our name or marks in a way that implies endorsement, partnership, or affiliation without our written permission.',
      ],
    },
    {
      id: "dispute-resolution",
      number: "14",
      title: "If we disagree.",
      paragraphs: [
        "Our strong preference, if something goes sideways, is to work it out directly. Here's the informal escalation path we'd follow:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Message us on WhatsApp and tell us what's wrong. Most disputes end here.",
            'If WhatsApp doesn\'t resolve it, email hello@fonebazar.ca with "Dispute" in the subject. We\'ll respond within 5 business days with a proposal.',
            "If that still doesn't work, we both agree to try mediation through a Sault Ste. Marie or Ontario-based mediator before filing a lawsuit. Neither side is required to mediate, but both should make a genuine effort.",
          ],
        },
      ],
      calloutAfter: {
        label: "What we don't require",
        body: "We don't require you to go through arbitration. We don't require you to waive your right to a small claims or civil court. We don't require you to sign an NDA before discussing a complaint.",
      },
    },
    {
      id: "governing-law",
      number: "15",
      title: "Which law applies and where lawsuits happen.",
      paragraphs: [
        "These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply in Ontario. If a dispute can't be resolved informally or by mediation, it can be brought in the courts of Ontario, specifically in the judicial district covering Sault Ste. Marie.",
        "Both you and fonebazar agree that Sault Ste. Marie courts are an appropriate venue. This isn't us picking a distant jurisdiction to inconvenience you — it's the place both we and most of our customers actually are.",
      ],
    },
    {
      id: "whole-agreement",
      number: "16",
      title: "The whole agreement.",
      paragraphs: [
        "These Terms, together with our Refund & Return Policy and Privacy Policy, make up the complete agreement between you and fonebazar for any order you place with us. Casual chat on WhatsApp about a specific order is part of that order's terms, but doesn't change these overall Terms unless we put the change in writing and both agree.",
        "If any part of these Terms is found invalid or unenforceable by a court, the rest of the Terms stay in effect. We'd fix the invalid part — not throw the whole thing out.",
      ],
    },
    {
      id: "changes",
      number: "17",
      title: "Changes to these Terms.",
      paragraphs: [
        "We may update these Terms as the business evolves or the law changes. The last-updated date at the top of this page reflects the most recent change.",
        "Orders placed before a change are governed by the Terms that were live when you ordered. If we change something materially, we'll note it clearly on our homepage for two weeks before the change takes effect — so you have a chance to read the new Terms.",
      ],
    },
    {
      id: "questions",
      number: "18",
      title: "Questions about any of this.",
      paragraphs: [
        "If any part of these Terms is unclear, or your situation isn't quite covered, message us on WhatsApp or email hello@fonebazar.ca. We're happy to walk through specific clauses or explain why a clause exists. Legal documents shouldn't be a guessing game.",
      ],
    },
  ],
  statutoryNote:
    "These Terms are provided for transparency and do not constitute legal advice. For questions about your contractual or consumer rights under Ontario or Canadian law, consult the Ontario Ministry of Public and Business Service Delivery (ontario.ca/page/consumer-protection) or a qualified lawyer.",
};
