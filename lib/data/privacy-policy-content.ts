import type { LegalDocument } from "@/lib/types/legal";

// TODO: confirm lastUpdated with client before launch
export const privacyPolicyDoc: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  lastUpdated: "2026-04-18",
  intro:
    "We collect as little about you as we can get away with. This page explains exactly what that means — what we see, where it lives, who touches it, and what you can ask us to do with it. We follow Canadian federal privacy law (PIPEDA), and nothing in this policy overrides rights you already have under it.",
  sections: [
    {
      id: "short-version",
      number: "01",
      title: "The short version.",
      paragraphs: [
        "We do not sell your data. We do not run analytics or third-party trackers on this website. We do not drop cookies. The only personal information we hold is what you send us directly — through our contact form or WhatsApp — and we keep it only as long as we need it to serve you well.",
      ],
      calloutAfter: {
        label: "Bottom line",
        body: "If you never contact us, we never see anything about you.",
      },
    },
    {
      id: "what-we-collect",
      number: "02",
      title: "What we actually collect.",
      paragraphs: [
        "Here's the complete list of personal information we receive when you use fonebazaar:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Contact form submissions: name, email address, phone number (optional), the service you're asking about, subject line, the message itself, and any attached file you choose to send.",
            "WhatsApp conversations: whatever you message us, whatever we message back. Meta (WhatsApp's parent company) handles the transport; we see it as the recipient on our business number.",
            "Order details: once you start an order with us, we keep a record — your name, the pieces you ordered, delivery or pickup preference, and any custom specs you shared. This lives in the WhatsApp thread itself, not in a separate database.",
          ],
        },
      ],
      calloutAfter: {
        label: "Cart data",
        body: 'Your cart is saved in your own browser\'s localStorage under the key "fonebazaar-cart". It never leaves your device. We cannot see what\'s in your cart until you tap Place Order and the content lands in our WhatsApp.',
      },
    },
    {
      id: "what-we-dont-collect",
      number: "03",
      title: "What we do not collect.",
      paragraphs: [
        "For transparency, here's what we specifically don't track or store:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "No visitor analytics. We don't use Google Analytics, Vercel Analytics, Plausible, or any similar tool.",
            "No cookies. The only persistent storage on this site is your cart in localStorage — which is technically not a cookie and never leaves your browser.",
            "No advertising pixels. No Meta Pixel, no Google Ads conversion tracking, no TikTok Pixel.",
            "No third-party fonts at runtime. Our display font (Satoshi) is self-hosted on our server; our body font (Inter) is bundled at build time. No fetches to fonts.googleapis.com happen when you load a page.",
            "No chat widget. No Intercom, Drift, Crisp, or similar. If you want to chat, it's WhatsApp.",
            "No IP address logging beyond what our hosting provider sees for standard delivery (see Section 06).",
          ],
        },
      ],
    },
    {
      id: "how-we-use-it",
      number: "04",
      title: "How we use what we collect.",
      paragraphs: [
        "What you send us is used for exactly one thing: making, delivering, and following up on your order. Specifically:",
        "And specifically not for:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Replying to your message or quote request.",
            "Making the piece you ordered.",
            "Coordinating pickup or delivery.",
            "Answering questions about an order after you receive it.",
            "Keeping a record in case of a return or remake request.",
          ],
        },
        {
          afterParagraph: 1,
          items: [
            "We do not use your information for marketing emails.",
            "We do not build a customer profile for targeted ads.",
            "We do not resell or share your data with partners.",
          ],
        },
      ],
    },
    {
      id: "third-parties",
      number: "05",
      title: "Third parties that see your data.",
      paragraphs: [
        "We use a small number of services to run this website. Each one handles a specific function, and we've picked them to minimise how many companies touch your information.",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Vercel: hosts this website. They see standard server logs — your IP address, the pages you visited, your user agent — kept briefly for abuse detection. Vercel's privacy policy: vercel.com/legal/privacy-policy.",
            "Web3Forms: processes submissions from our contact form. Your message is sent to their servers, then forwarded to our inbox. They temporarily store the submission and log basic metadata. Web3Forms' privacy policy: web3forms.com/privacy.",
            "Meta (WhatsApp): the WhatsApp platform is how we take orders. Anything you message us passes through Meta's infrastructure under their own privacy terms. Meta's privacy policy: privacy.whatsapp.com.",
          ],
        },
      ],
      calloutAfter: {
        label: "What this means",
        body: "You're not just trusting us with your data — you're trusting Vercel, Web3Forms, and Meta too. We've read each of their policies. None of them sell your data to third parties either, as of this writing.",
      },
    },
    {
      id: "where-data-lives",
      number: "06",
      title: "Where your data physically lives.",
      paragraphs: [
        "Our website is hosted on Vercel's global edge network. When you load a page from Sault Ste. Marie, you're likely served by a data center in Toronto or nearby.",
        "Contact form submissions are routed through Web3Forms' servers and land in a Canadian email inbox — hello@fonebazaar.ca — which we access from Canada.",
        "WhatsApp conversations are stored on Meta's infrastructure per their terms, which may include servers outside Canada. We access them from our WhatsApp Business account in Canada.",
      ],
      calloutAfter: {
        label: "Cross-border note",
        body: "Some of the infrastructure above may route data through servers outside Canada. Under PIPEDA, this is permitted as long as comparable protection applies — which it does for all three services we use.",
      },
    },
    {
      id: "how-long",
      number: "07",
      title: "How long we keep things.",
      paragraphs: [
        "Data retention is intentionally minimal. Here's what sits around and for how long:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Contact form submissions: kept in our email inbox for up to 24 months, then manually archived or deleted. We review quarterly.",
            "WhatsApp threads: retained for the duration of the customer relationship plus one year. Longer only if an active custom project references back to earlier messages.",
            "Order records: retained for 3 years after order completion. This is the window in which remake/refund requests can reasonably arise.",
            "Your cart (localStorage): stays in your browser until you clear it or until browser storage is cleared for our domain. We can't delete it on your behalf — but you can, anytime.",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      number: "08",
      title: "Your rights under PIPEDA.",
      paragraphs: [
        "Canadian federal law gives you specific rights over the personal information we hold. You can:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Ask what personal information we have about you. We'll tell you — usually within a week.",
            "Ask us to correct inaccurate information. We'll do it as soon as we see the message.",
            "Ask us to delete your information. We'll do it unless we're legally required to keep it (e.g., tax records for orders already paid).",
            "Withdraw consent for us to process your information. If you do this while an order is active, we may not be able to complete the order.",
            "Ask how your information is being used and who it's been shared with. Same answer as above — we'll lay it out clearly.",
          ],
        },
      ],
      calloutAfter: {
        label: "How to exercise these rights",
        body: "Message us on WhatsApp or email hello@fonebazaar.ca. Put \"Privacy request\" in the subject if you're emailing. We respond within a week.",
      },
    },
    {
      id: "security",
      number: "09",
      title: "How we keep your data secure.",
      paragraphs: [
        "We take basic precautions. Nothing fancy, nothing industry-first — just the things that should be baseline in 2026:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "HTTPS everywhere. The entire site is served over TLS. There's no way to visit fonebazaar.ca over plain HTTP.",
            "Email account with two-factor authentication. Our hello@fonebazaar.ca inbox requires a second factor to sign in.",
            "WhatsApp Business account with two-step verification enabled.",
            "No shared credentials. No team members share passwords; each has their own access.",
            "Minimal attack surface. We don't run a database on this website. There's no user login, no password storage, no admin panel. Nothing to hack that we're responsible for.",
          ],
        },
      ],
    },
    {
      id: "breach",
      number: "10",
      title: "If something goes wrong.",
      paragraphs: [
        "Under PIPEDA, if we experience a data breach that poses a real risk of significant harm to you, we are required to:",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "Notify you directly, as soon as reasonably possible.",
            "Report the breach to the Office of the Privacy Commissioner of Canada.",
            "Keep a record of the breach and what we did about it.",
          ],
        },
      ],
      calloutAfter: {
        label: "What counts as significant harm",
        body: "Identity theft, financial loss, damage to reputation, loss of employment or business opportunities — that's the PIPEDA standard. An accidental email sent to the wrong person doesn't usually meet it; a database leak typically does.",
      },
    },
    {
      id: "children",
      number: "11",
      title: "Kids.",
      paragraphs: [
        "This site is not directed at children under 13. We don't knowingly collect information from anyone under 13. If you believe a child has sent us information — through the contact form or WhatsApp — please message us and we'll delete it.",
      ],
    },
    {
      id: "changes",
      number: "12",
      title: "Changes to this policy.",
      paragraphs: [
        "We may update this policy as the business evolves, the law changes, or we start using a new tool that touches personal data. The last-updated date at the top of this page reflects the most recent change.",
        "If the change is material — say, we add analytics or a new third-party processor — we'll note it clearly on our homepage for two weeks before the change takes effect, so you have a chance to read the new terms.",
      ],
    },
    {
      id: "contact",
      number: "13",
      title: "Getting in touch about privacy.",
      paragraphs: [
        "If you have a question about this policy, want to exercise any of the rights in Section 08, or just want to understand something better — message us.",
      ],
      bullets: [
        {
          afterParagraph: 0,
          items: [
            "WhatsApp: +1 (705) 971-0676",
            "Email: hello@fonebazaar.ca (put \"Privacy\" in the subject)",
            "Mail: fonebazaar studio, 253 Bruce St, Sault Ste. Marie, ON, Canada",
          ],
        },
      ],
      calloutAfter: {
        label: "Not satisfied with our response?",
        body: "You can escalate to the Office of the Privacy Commissioner of Canada (priv.gc.ca) at any time.",
      },
    },
  ],
  statutoryNote:
    "This policy is provided for transparency and is not legal advice. For questions about your rights under PIPEDA or other Canadian privacy law, consult the Office of the Privacy Commissioner of Canada (priv.gc.ca) or a qualified lawyer.",
};
