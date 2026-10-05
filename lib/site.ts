// Toutes les informations du cabinet au même endroit : on modifie ici,
// toutes les sections suivent.

export const SITE = {
  name: "Dr Nora Leghzaoui",
  tagline: "Cabinet médico-laser esthétique & nutrition",

  phoneDisplay: "05 28 22 32 60",
  phoneHref: "tel:+212528223260",
  // Format international sans "+" ni espaces, exigé par wa.me
  whatsappNumber: "212528223260",

  address: {
    line1: "2ème étage, N°204, Bloc D",
    line2: "Agadir Bay",
    city: "Agadir 80000",
    country: "Maroc",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Dr Nora Leghzaoui, Agadir Bay, Bloc D, Agadir 80000"),

  rating: { value: 4.6, count: 41 },

  // À compléter avec les vraies adresses des comptes du cabinet.
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  // Diplômes et formations du Dr Nora, à compléter. La liste reste masquée
  // tant qu'elle est vide, pour ne rien afficher d'inexact.
  credentials: [] as string[],

  // Chiffres optionnels affichés sur l'accueil, à compléter avec le cabinet.
  // Laissés à null, ils restent masqués : rien d'inexact n'est affiché.
  experienceYears: null as number | null,
  patientsCount: null as number | null,
} as const;

export function whatsappUrl(
  message = "Bonjour Dr Nora, je souhaite prendre rendez-vous pour une consultation."
) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "/laser", label: "Laser" },
  { href: "/esthetique", label: "Esthétique" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/cabinet", label: "Le cabinet" },
  { href: "/#contact", label: "Contact" },
] as const;
