export interface StudioHour {
  day: string;
  hours: string;
}

export const studioHours: StudioHour[] = [
  { day: "Mon – Fri", hours: "10:00 – 18:00" },
  { day: "Saturday", hours: "11:00 – 17:00" },
  { day: "Sunday", hours: "Closed" },
];

export interface PickupStep {
  number: string;
  title: string;
  description: string;
}

export const pickupSteps: PickupStep[] = [
  {
    number: "01",
    title: "Message us",
    description:
      "WhatsApp, email, or the form above. We'll confirm your piece is ready and lock in a pickup window.",
  },
  {
    number: "02",
    title: "We confirm",
    description:
      "You'll get a message with a time slot, our address, and parking notes. Usually same-day for finished pieces.",
  },
  {
    number: "03",
    title: "Swing by",
    description:
      "Pay on pickup (cash, Interac e-transfer, or card via WhatsApp Pay link). Five minutes in and out.",
  },
];

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const contactFaqs: ContactFaqItem[] = [
  {
    id: "ctc-faq-0",
    question: "How fast do you reply?",
    answer:
      "Within the hour during studio hours (Mon–Sat, 10–6). Outside hours, first reply is the next morning.",
  },
  {
    id: "ctc-faq-1",
    question: "Can I get a quote without sending files?",
    answer:
      "Yes. A photo, sketch, or rough description is enough for a ballpark. Firm quotes come after we see your art or a clean spec.",
  },
  {
    id: "ctc-faq-2",
    question: "Do you sign NDAs for custom client work?",
    answer:
      "Yes, for agency or brand work. Send the NDA on WhatsApp or email and we'll return it same-day.",
  },
  {
    id: "ctc-faq-3",
    question: "What if my project is super last-minute?",
    answer:
      "We keep 1–2 rush slots each week at a 25–40% surcharge. Message us first — we'll tell you honestly if your timeline is workable.",
  },
];

export interface ServiceOption {
  value: string;
  label: string;
}

export const serviceSelectOptions: ServiceOption[] = [
  { value: "3d-printing", label: "3D Printing" },
  { value: "laser-engraving", label: "Laser Engraving" },
  { value: "resin-art", label: "Resin Art" },
  { value: "t-shirt-printing", label: "T-Shirt Printing" },
  { value: "decal-printing", label: "Decal Printing" },
  { value: "not-sure", label: "Not sure yet" },
];

export const ACCEPTED_FILE_TYPES =
  ".jpg,.jpeg,.png,.webp,.pdf,.svg,.ai,.stl,.obj,.step,.stp,.3mf";
export const MAX_FILE_SIZE_MB = 25;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
