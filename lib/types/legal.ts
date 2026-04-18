export interface LegalBulletGroup {
  afterParagraph: number;
  items: string[];
}

export interface LegalCallout {
  label: string;
  body: string;
}

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: LegalBulletGroup[];
  calloutAfter?: LegalCallout;
}

export interface LegalDocument {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  statutoryNote?: string;
}
