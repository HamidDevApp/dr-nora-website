// Avis affichés dans le carrousel.
//
// Copier ici des avis Google RÉELS du cabinet (texte exact, prénom ou
// initiale tel qu'il apparaît sur Google), avec l'accord de leurs auteurs.
// Les entrées marquées `placeholder: true` ne s'affichent qu'en
// développement (npm run dev) et sont retirées automatiquement en production.

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date?: string; // ex. "il y a 2 mois", tel qu'affiché sur Google
  placeholder?: boolean;
};

export const REVIEWS: Review[] = [
  { author: "Prénom N.", rating: 5, text: "Coller ici le texte d'un avis Google réel.", placeholder: true },
  { author: "Prénom N.", rating: 5, text: "Coller ici le texte d'un avis Google réel.", placeholder: true },
  { author: "Prénom N.", rating: 5, text: "Coller ici le texte d'un avis Google réel.", placeholder: true },
  { author: "Prénom N.", rating: 5, text: "Coller ici le texte d'un avis Google réel.", placeholder: true },
];

export function visibleReviews() {
  return process.env.NODE_ENV === "production"
    ? REVIEWS.filter((r) => !r.placeholder)
    : REVIEWS;
}
