// Catalogue des soins. Aucun prix : la réglementation marocaine sur la
// publicité médicale l'interdit, le tarif est fixé en consultation.
// Liste à valider avec le cabinet selon les appareils et soins réellement proposés.

export type Service = {
  title: string;
  description: string;
};

export type ServiceCategory = {
  id: "laser" | "esthetique" | "nutrition";
  label: string;
  shortLabel: string; // libellé court pour les onglets sur mobile
  intro: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "laser",
    label: "Médecine laser",
    shortLabel: "Laser",
    intro:
      "Des technologies laser médicales, réglées pour chaque type de peau, y compris les peaux mates.",
    services: [
      {
        title: "Épilation laser",
        description: "Réduction durable de la pilosité, visage et corps, en séances espacées.",
      },
      {
        title: "Taches et pigmentation",
        description: "Atténuation des taches brunes, du mélasma et des marques solaires.",
      },
      {
        title: "Rajeunissement cutané",
        description: "Teint plus uniforme, grain de peau affiné, éclat retrouvé.",
      },
      {
        title: "Cicatrices et acné",
        description: "Lissage progressif des cicatrices et traitement de l'acné active.",
      },
    ],
  },
  {
    id: "esthetique",
    label: "Médecine esthétique",
    shortLabel: "Esthétique",
    intro:
      "Des gestes précis et mesurés, pour un visage reposé qui reste le vôtre.",
    services: [
      {
        title: "Injections anti-rides",
        description: "Rides d'expression du front et du contour des yeux adoucies.",
      },
      {
        title: "Acide hyaluronique",
        description: "Volumes et contours restaurés : lèvres, pommettes, ovale du visage.",
      },
      {
        title: "Skinboosters et mésothérapie",
        description: "Hydratation en profondeur et qualité de peau améliorée.",
      },
      {
        title: "Peelings médicaux",
        description: "Renouvellement cellulaire pour une peau plus nette et lumineuse.",
      },
    ],
  },
  {
    id: "nutrition",
    label: "Nutrition",
    shortLabel: "Nutrition",
    intro:
      "Un accompagnement médical qui relie alimentation, silhouette et santé de la peau.",
    services: [
      {
        title: "Bilan nutritionnel",
        description: "Analyse de vos habitudes, de vos objectifs et de vos antécédents.",
      },
      {
        title: "Perte de poids accompagnée",
        description: "Un programme personnalisé, suivi dans la durée, sans régime extrême.",
      },
      {
        title: "Micronutrition",
        description: "Corriger les carences qui pèsent sur l'énergie, la peau et les cheveux.",
      },
      {
        title: "Nutrition et peau",
        description: "Compléter les soins esthétiques par une alimentation ciblée.",
      },
    ],
  },
];
