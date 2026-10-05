// Photos du site. Celles qui passent par unsplash() sont PROVISOIRES (licence
// gratuite) en attendant les photos du cabinet. Pour passer aux vraies photos : déposer les fichiers dans
// public/images/ et remplacer chaque `src` par "/images/<fichier>.jpg".
// Les textes `alt` restent neutres tant que la photo ne montre pas le Dr Nora.

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const IMAGES = {
  // Vraie photo du Dr Nora (recadrée en 4:5 depuis la photo envoyée par le cabinet)
  hero: {
    src: "/images/dr-nora-hero.jpg",
    alt: "Le Dr Nora Leghzaoui dans son cabinet de la Baie d'Agadir",
  },
  // Grande photo de la section À propos : visuel d'ambiance provisoire,
  // à remplacer par une photo du cabinet.
  aboutMain: {
    src: unsplash("photo-1786937680099-779e1da6f7f7"),
    alt: "Couloir lumineux d'un cabinet avec des soins de la peau",
  },
  // Médaillon : visage du Dr Nora (recadré depuis la même photo)
  aboutMedallion: {
    src: "/images/dr-nora-visage.jpg",
    alt: "Portrait du Dr Nora Leghzaoui",
  },
  services: {
    laser: {
      src: unsplash("photo-1746806942799-b4db209e9a6b"),
      alt: "Séance de médecine laser en cabinet",
    },
    esthetique: {
      src: unsplash("photo-1570172619644-dfd03ed5d881"),
      alt: "Soin du visage en cabinet esthétique",
    },
    nutrition: {
      src: unsplash("photo-1512621776951-a57141f2eefd"),
      alt: "Bol de légumes frais et équilibré",
    },
  },
} as const;
