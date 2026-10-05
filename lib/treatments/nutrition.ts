import type { TreatmentPage } from "./types";
import { unsplash } from "@/lib/images";

// Contenu de la page /nutrition.
// Radiofréquence et cryolipolyse sont marquées `placeholder` : à confirmer
// avec le cabinet (appareils réellement disponibles) avant la mise en ligne.

export const NUTRITION: TreatmentPage = {
  slug: "nutrition",
  metaTitle: "Nutrition et amincissement à Agadir · Bilan, perte de poids · Dr Nora Leghzaoui",
  metaDescription:
    "Bilan nutritionnel personnalisé, prise en charge médicale du surpoids et remodelage de la silhouette au cabinet du Dr Nora Leghzaoui, Agadir Bay.",
  eyebrow: "Nutrition & amincissement",
  title: "Une silhouette qui change",
  titleEm: "pour de bon.",
  intro:
    "Perdre du poids durablement ne se résume pas à un régime. Le Dr Nora aborde la nutrition comme un acte médical : comprendre votre métabolisme, vos habitudes et votre histoire, puis construire un accompagnement réaliste, complété si besoin par des technologies de remodelage.",
  heroImage: {
    src: unsplash("photo-1490818387583-1baba5e638af"),
    alt: "Fruits frais variés, symbole d'une alimentation équilibrée",
  },
  highlights: [
    { label: "Approche", value: "Médicale, sans régime extrême" },
    { label: "Suivi", value: "Consultations régulières et ajustées" },
    { label: "Objectif", value: "Résultats durables, santé et peau" },
  ],
  techniquesTitle: "Un parcours en plusieurs étapes",
  techniques: [
    {
      id: "bilan",
      navLabel: "Bilan nutritionnel",
      kicker: "Première étape",
      title: "Bilan nutritionnel personnalisé",
      lead:
        "Une consultation approfondie pour comprendre ce qui freine vos objectifs et poser les bases d'un plan sur mesure.",
      image: {
        src: unsplash("photo-1675270882554-ab6817fb44f3"),
        alt: "Consultation de nutrition autour d'une alimentation équilibrée",
      },
      how: [
        "Le bilan explore l'ensemble des facteurs qui influencent le poids : habitudes alimentaires, rythme de vie, sommeil, stress, activité physique, antécédents médicaux et traitements en cours.",
        "Des mesures précises (poids, tour de taille, composition corporelle) et, si nécessaire, un bilan biologique complètent l'analyse. Il en ressort un plan alimentaire personnalisé, compatible avec vos goûts, votre culture et votre quotidien.",
      ],
      indications: [
        "Envie de perdre du poids de façon encadrée",
        "Fatigue, troubles digestifs ou fringales",
        "Rééquilibrage alimentaire après une grossesse",
        "Accompagnement nutritionnel de la peau (acné, teint)",
      ],
      steps: [
        { title: "Entretien médical", text: "Échange détaillé sur vos habitudes, votre histoire pondérale et vos objectifs." },
        { title: "Mesures", text: "Poids, tour de taille et analyse de la composition corporelle." },
        { title: "Bilan biologique", text: "Prescrit si nécessaire : thyroïde, glycémie, carences, bilan lipidique." },
        { title: "Plan personnalisé", text: "Remise d'un programme alimentaire concret et d'objectifs réalistes." },
      ],
      facts: [
        { label: "Durée", value: "45 min à 1 h" },
        { label: "Format", value: "Consultation au cabinet" },
        { label: "Suite", value: "Premier suivi à 2 à 4 semaines" },
      ],
      faq: [
        { q: "Faut-il venir à jeun ?", a: "Non pour la consultation. Si un bilan sanguin est prescrit, il sera réalisé à jeun en laboratoire." },
        { q: "Vais-je devoir supprimer des aliments ?", a: "Le plan privilégie l'équilibre et les quantités plutôt que les interdits. Les aliments que vous aimez trouvent leur place dans un cadre adapté." },
      ],
    },
    {
      id: "surpoids",
      navLabel: "Prise en charge du surpoids",
      kicker: "Accompagnement médical",
      title: "Prise en charge du surpoids",
      lead:
        "Un suivi médical dans la durée pour perdre du poids progressivement et, surtout, le stabiliser.",
      image: {
        src: unsplash("photo-1768479619859-8ee2556a04b1"),
        alt: "Mesure du tour de taille lors d'un suivi",
      },
      how: [
        "La perte de poids est d'abord un rééquilibrage : apports adaptés à votre métabolisme, répartition des repas, qualité des aliments et hydratation. Les objectifs sont fixés par étapes, à un rythme compatible avec votre santé.",
        "Le suivi régulier permet d'ajuster le programme, de lever les blocages et de préparer la phase de stabilisation, souvent négligée et pourtant essentielle pour éviter la reprise de poids.",
      ],
      indications: [
        "Surpoids et obésité, avec ou sans complications",
        "Reprise de poids après plusieurs régimes",
        "Graisse abdominale et risque métabolique",
        "Préparation à une activité physique régulière",
      ],
      steps: [
        { title: "Objectifs par étapes", text: "Définition d'objectifs mesurables et atteignables à court et moyen terme." },
        { title: "Programme alimentaire", text: "Plan personnalisé, menus types et conseils pratiques pour le quotidien." },
        { title: "Suivi régulier", text: "Consultations de suivi pour mesurer les progrès et ajuster le programme." },
        { title: "Stabilisation", text: "Phase dédiée à l'ancrage des nouvelles habitudes pour maintenir le résultat." },
      ],
      facts: [
        { label: "Rythme", value: "Suivi toutes les 2 à 4 semaines" },
        { label: "Durée", value: "Plusieurs mois, selon l'objectif" },
        { label: "Approche", value: "Sans substituts ni régime extrême" },
      ],
      faq: [
        { q: "Combien de kilos peut-on perdre par mois ?", a: "Une perte progressive est la plus durable. Le rythme dépend de chaque personne et est fixé avec le Dr Nora selon votre état de santé." },
        { q: "Le suivi se combine-t-il avec les soins esthétiques ?", a: "Oui. Les technologies de remodelage et les soins de la peau accompagnent la perte de poids pour améliorer la silhouette et la fermeté cutanée." },
      ],
    },
    {
      id: "radiofrequence",
      navLabel: "Radiofréquence",
      kicker: "Remodelage corporel",
      title: "Radiofréquence corporelle",
      lead:
        "Raffermir la peau et lisser la silhouette grâce à une chaleur profonde et contrôlée.",
      image: {
        src: unsplash("photo-1761819922058-d15028ed9817"),
        alt: "Soin de remodelage de l'abdomen avec un appareil",
      },
      how: [
        "La radiofréquence chauffe en profondeur le derme et l'hypoderme. Cette chaleur contracte les fibres de collagène existantes et stimule la production de nouvelles fibres : la peau se raffermit.",
        "Elle améliore aussi la micro-circulation et l'aspect de la cellulite. C'est un complément idéal pendant ou après une perte de poids, lorsque la peau a besoin d'être retendue.",
      ],
      indications: [
        "Relâchement cutané du ventre, des bras ou des cuisses",
        "Cellulite et peau d'orange",
        "Fermeté de la peau après une perte de poids",
        "Raffermissement après une grossesse",
      ],
      steps: [
        { title: "Bilan de la zone", text: "Évaluation du relâchement et de la qualité de la peau." },
        { title: "Préparation", text: "Application d'un gel conducteur sur la zone à traiter." },
        { title: "Séance", text: "La pièce à main est déplacée sur la peau ; la sensation est celle d'une chaleur agréable." },
        { title: "Après", text: "Légère rougeur passagère, reprise immédiate des activités." },
      ],
      facts: [
        { label: "Durée", value: "30 à 45 min" },
        { label: "Séances", value: "6 à 8, une par semaine" },
        { label: "Éviction sociale", value: "Aucune" },
      ],
      faq: [
        { q: "La radiofréquence fait-elle maigrir ?", a: "Elle ne remplace pas une perte de poids : elle améliore la fermeté de la peau et l'aspect de la silhouette. Elle s'intègre au parcours nutritionnel." },
      ],
      placeholder: true,
    },
    {
      id: "cryolipolyse",
      navLabel: "Cryolipolyse",
      kicker: "Remodelage corporel",
      title: "Cryolipolyse",
      lead:
        "Réduire les amas graisseux localisés qui résistent à l'alimentation et au sport, sans chirurgie.",
      image: {
        src: unsplash("photo-1717500251979-8a53b300d88b"),
        alt: "Patiente installée pour un soin de remodelage corporel",
      },
      how: [
        "Les cellules graisseuses sont plus sensibles au froid que les autres tissus. La cryolipolyse refroidit de façon contrôlée un bourrelet localisé : une partie des cellules graisseuses est détruite, puis éliminée naturellement par l'organisme.",
        "La réduction du volume apparaît progressivement, sur 1 à 3 mois. Le traitement s'adresse aux amas localisés chez des personnes proches de leur poids d'équilibre.",
      ],
      indications: [
        "Bourrelets du ventre et des poignées d'amour",
        "Culotte de cheval et intérieur des cuisses",
        "Amas localisés du dos ou des bras",
        "Graisse résistante après une perte de poids",
      ],
      steps: [
        { title: "Consultation", text: "Vérification de l'indication : l'amas doit être localisé et pinçable." },
        { title: "Installation", text: "Un applicateur adapté est posé sur la zone avec une membrane protectrice." },
        { title: "Séance", text: "Sensation de froid intense les premières minutes, puis d'engourdissement." },
        { title: "Résultat", text: "Massage de la zone, reprise immédiate. Résultat visible en 1 à 3 mois." },
      ],
      facts: [
        { label: "Durée", value: "35 à 70 min par zone" },
        { label: "Séances", value: "1 à 2 par zone" },
        { label: "Éviction sociale", value: "Aucune" },
      ],
      faq: [
        { q: "Pour qui la cryolipolyse est-elle indiquée ?", a: "Pour des amas graisseux localisés, chez des personnes proches de leur poids de forme. Ce n'est pas un traitement de l'obésité." },
      ],
      placeholder: true,
    },
  ],
  bentoEyebrow: "Notre approche",
  bentoTitle: "Nutrition, peau et silhouette, un seul accompagnement",
  bentoIntro:
    "La force du cabinet est de relier la nutrition à la médecine esthétique : ce que vous mangez se voit aussi sur votre peau.",
  bento: [
    {
      title: "La nutrition comme acte médical",
      text: "Un médecin qui connaît vos antécédents, vos traitements et vos bilans, pour un programme sûr et adapté.",
      tag: "Médical",
      span: "big",
      image: { src: unsplash("photo-1512621776951-a57141f2eefd"), alt: "Bol de légumes frais" },
    },
    {
      title: "Pas de régime extrême",
      text: "Des changements progressifs, compatibles avec votre vie familiale et sociale.",
      tag: "Durable",
    },
    {
      title: "La peau suit la silhouette",
      text: "Radiofréquence, skinboosters ou laser accompagnent la perte de poids pour une peau ferme.",
      tag: "Esthétique",
    },
    {
      title: "Un suivi qui dure",
      text: "Des consultations régulières jusqu'à la stabilisation, la phase qui protège le résultat.",
      tag: "Suivi",
      span: "wide",
    },
  ],
  faq: [
    { q: "Combien coûte l'accompagnement ?", a: "Aucun tarif n'est affiché en ligne, conformément à la réglementation marocaine. Le prix du suivi et des séances vous est communiqué après la consultation médicale." },
    { q: "Peut-on combiner nutrition et remodelage ?", a: "C'est même recommandé : la nutrition agit sur le poids global, les technologies de remodelage sur les zones localisées et la fermeté de la peau." },
    { q: "Le suivi est-il adapté au Ramadan ?", a: "Oui. Le programme est ajusté pendant le mois de Ramadan pour préserver votre énergie et vos objectifs." },
  ],
};
