// Modèle de contenu commun aux pages de soins (/laser, /esthetique, /nutrition).
// Une page = un objet TreatmentPage : on modifie le texte ici, la mise en page suit.

export type Img = { src: string; alt: string };

export type Step = { title: string; text: string };
export type Fact = { label: string; value: string };
export type QA = { q: string; a: string };

export type Technique = {
  id: string; // ancre de la section (#epilation…)
  navLabel: string; // libellé court dans la navigation latérale
  kicker: string; // sur-titre doré
  title: string;
  lead: string; // chapeau, 1 à 2 phrases
  image: Img;
  how: string[]; // « Comment ça marche ? », un paragraphe par entrée
  indications: string[];
  steps: Step[]; // « Déroulement de la séance »
  facts: Fact[]; // repères indicatifs, jamais de prix
  faq: QA[]; // questions détaillées, en accordéon
  placeholder?: boolean; // technologie à confirmer par le cabinet
};

export type BentoItem = {
  title: string;
  text: string;
  tag?: string;
  image?: Img;
  span?: "wide" | "tall" | "big" | "normal";
};

export type TreatmentPage = {
  slug: "laser" | "esthetique" | "nutrition";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  titleEm: string; // fin du titre, en italique
  intro: string;
  heroImage: Img;
  highlights: Fact[]; // 3 repères sous le titre
  techniquesTitle: string;
  techniques: Technique[];
  bentoEyebrow: string;
  bentoTitle: string;
  bentoIntro: string;
  bento: BentoItem[];
  faq: QA[];
};
