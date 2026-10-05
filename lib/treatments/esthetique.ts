import type { TreatmentPage } from "./types";
import { unsplash } from "@/lib/images";

// Contenu de la page /esthetique. Repères (durées, séances) donnés à titre
// indicatif : le protocole exact est toujours fixé en consultation.

export const ESTHETIQUE: TreatmentPage = {
  slug: "esthetique",
  metaTitle: "Médecine esthétique à Agadir · Injections, PRP, skinboosters · Dr Nora Leghzaoui",
  metaDescription:
    "Acide hyaluronique, toxine botulique, PRP, mésothérapie, skinboosters et peeling médical : protocoles détaillés au cabinet du Dr Nora Leghzaoui, Agadir Bay.",
  eyebrow: "Médecine esthétique",
  title: "Des gestes précis,",
  titleEm: "un visage qui reste le vôtre.",
  intro:
    "La médecine esthétique ne cherche pas à transformer, mais à préserver et à restaurer : l'hydratation de la peau, les volumes, la fraîcheur du regard. Chaque protocole commence par une analyse du visage et se construit avec vous, dans le respect de vos traits.",
  heroImage: {
    src: unsplash("photo-1570172619644-dfd03ed5d881"),
    alt: "Soin du visage en cabinet de médecine esthétique",
  },
  highlights: [
    { label: "Philosophie", value: "Résultats naturels, jamais figés" },
    { label: "Produits", value: "Dispositifs médicaux de qualité, traçables" },
    { label: "Suivi", value: "Contrôle après chaque traitement injectable" },
  ],
  techniquesTitle: "Les protocoles, expliqués en détail",
  techniques: [
    {
      id: "acide-hyaluronique",
      navLabel: "Acide hyaluronique",
      kicker: "Injections",
      title: "Acide hyaluronique",
      lead:
        "Restaurer les volumes, redessiner les contours et hydrater en profondeur, avec une molécule naturellement présente dans la peau.",
      image: {
        src: unsplash("photo-1746017062285-13c77e29fc25"),
        alt: "Injection d'acide hyaluronique au niveau des lèvres",
      },
      how: [
        "L'acide hyaluronique est une molécule que notre peau fabrique naturellement et qui retient l'eau. Avec l'âge, sa production diminue : la peau se creuse et perd de son éclat.",
        "Injecté sous forme de gel, il comble un sillon, restaure un volume ou redessine un contour. Sa densité est choisie selon la zone : gel souple pour les lèvres et les cernes, gel plus ferme pour les pommettes ou l'ovale du visage.",
        "Le produit est progressivement résorbé par l'organisme. En cas de besoin, il peut être dissous par une enzyme, ce qui en fait un traitement réversible.",
      ],
      indications: [
        "Sillons nasogéniens et plis d'amertume",
        "Lèvres : hydratation, contour ou volume mesuré",
        "Pommettes, tempes et ovale du visage",
        "Cernes creux, selon l'anatomie du regard",
      ],
      steps: [
        { title: "Analyse du visage", text: "Étude des proportions, des volumes et de vos attentes. Le Dr Nora vous propose un plan de traitement réaliste." },
        { title: "Préparation", text: "Désinfection soigneuse de la peau. La plupart des gels contiennent un anesthésiant local." },
        { title: "Injection", text: "Le produit est injecté à l'aiguille fine ou à la canule, par petites quantités, en contrôlant le résultat en temps réel." },
        { title: "Contrôle", text: "Un rendez-vous de contrôle est proposé environ deux semaines après pour juger du résultat et ajuster si besoin." },
      ],
      facts: [
        { label: "Durée", value: "30 à 45 min" },
        { label: "Tenue", value: "6 à 18 mois selon la zone et le produit" },
        { label: "Suites", value: "Gonflement léger 24 à 48 h, bleus possibles" },
      ],
      faq: [
        { q: "Le résultat sera-t-il naturel ?", a: "C'est la priorité du cabinet. Les quantités sont dosées avec retenue et le traitement peut se faire en deux temps pour garder un résultat harmonieux." },
        { q: "Quelles précautions après l'injection ?", a: "Éviter le maquillage le jour même, le sport intense, le sauna et les fortes chaleurs pendant 24 à 48 heures, et ne pas masser la zone." },
        { q: "Y a-t-il des contre-indications ?", a: "Grossesse et allaitement, infection ou herpès actif sur la zone, maladies auto-immunes non stabilisées et antécédents d'allergie au produit." },
      ],
    },
    {
      id: "toxine-botulique",
      navLabel: "Toxine botulique",
      kicker: "Injections",
      title: "Toxine botulique",
      lead:
        "Adoucir les rides d'expression du haut du visage et reposer le regard, en conservant toute la mobilité.",
      image: {
        src: unsplash("photo-1785861485926-93a13556d656"),
        alt: "Injection au niveau du front réalisée en cabinet",
      },
      how: [
        "La toxine botulique, souvent appelée « Botox », est un médicament qui détend temporairement les muscles responsables des rides d'expression. La peau, moins sollicitée, se lisse.",
        "Les doses sont ajustées muscle par muscle pour atténuer les rides sans figer le visage : le front reste mobile, le regard s'ouvre, l'expression reste la vôtre.",
      ],
      indications: [
        "Rides du lion, entre les sourcils",
        "Rides horizontales du front",
        "Pattes d'oie au coin des yeux",
        "Hyperhidrose des aisselles (transpiration excessive)",
      ],
      steps: [
        { title: "Consultation", text: "Observation du visage au repos et en mouvement, et vérification des contre-indications." },
        { title: "Repérage", text: "Les points d'injection sont repérés selon la force de chaque muscle." },
        { title: "Injection", text: "Quelques micro-injections à l'aiguille très fine, en une dizaine de minutes." },
        { title: "Contrôle à 15 jours", text: "Un rendez-vous permet d'évaluer l'effet et d'affiner si nécessaire." },
      ],
      facts: [
        { label: "Durée", value: "15 à 20 min" },
        { label: "Effet", value: "Visible en 3 à 10 jours" },
        { label: "Tenue", value: "4 à 6 mois en moyenne" },
      ],
      faq: [
        { q: "Vais-je avoir l'air figée ?", a: "Non, si les doses sont adaptées. L'objectif du cabinet est un visage reposé et expressif, pas un front immobile." },
        { q: "Que faire après la séance ?", a: "Rester droite pendant 4 heures, ne pas masser la zone et éviter le sport et la chaleur le jour même." },
        { q: "Qui ne peut pas recevoir ce traitement ?", a: "Les femmes enceintes ou allaitantes et les personnes atteintes de certaines maladies neuromusculaires. Le Dr Nora vérifie vos antécédents avant toute injection." },
      ],
    },
    {
      id: "prp",
      navLabel: "PRP",
      kicker: "Médecine régénérative",
      title: "PRP, plasma riche en plaquettes",
      lead:
        "Utiliser les facteurs de croissance de votre propre sang pour régénérer la peau et fortifier les cheveux.",
      image: {
        src: unsplash("photo-1639772823849-6efbd173043c"),
        alt: "Tube de plasma préparé pour un soin PRP",
      },
      how: [
        "Une petite prise de sang est réalisée au cabinet. Le tube est centrifugé pour isoler le plasma concentré en plaquettes, riches en facteurs de croissance.",
        "Ce plasma est réinjecté dans la peau ou le cuir chevelu. Il stimule les cellules, la production de collagène et la micro-circulation. Le produit étant issu de votre propre sang, la tolérance est excellente.",
      ],
      indications: [
        "Peau terne, fatiguée ou déshydratée",
        "Cernes et qualité de peau du contour de l'œil",
        "Chute de cheveux diffuse, en complément d'un bilan",
        "Cicatrices d'acné, en association avec le laser ou le microneedling",
      ],
      steps: [
        { title: "Prélèvement", text: "Prise de sang de quelques millilitres, comme pour une analyse." },
        { title: "Centrifugation", text: "Le sang est centrifugé en circuit fermé et stérile pour isoler le plasma." },
        { title: "Application", text: "Le plasma est injecté par micro-injections ou associé à un microneedling." },
        { title: "Suites", text: "Rougeurs et petites papules disparaissent en 24 à 48 heures." },
      ],
      facts: [
        { label: "Durée", value: "45 min à 1 h" },
        { label: "Séances", value: "3, à un mois d'intervalle, puis entretien" },
        { label: "Suites", value: "Rougeurs 24 à 48 h" },
      ],
      faq: [
        { q: "Le PRP est-il sûr ?", a: "Le plasma provient de votre propre sang et est préparé avec du matériel stérile à usage unique : le risque allergique est quasi nul." },
        { q: "Quand voit-on les effets ?", a: "L'éclat s'améliore en quelques semaines ; l'effet sur la qualité de la peau et des cheveux se construit sur 2 à 3 mois." },
        { q: "Y a-t-il des contre-indications ?", a: "Certains troubles de la coagulation, une infection en cours, une grossesse ou des traitements anticoagulants. Ils sont vérifiés en consultation." },
      ],
    },
    {
      id: "mesotherapie",
      navLabel: "Mésothérapie",
      kicker: "Revitalisation",
      title: "Mésothérapie",
      lead:
        "Un cocktail de vitamines, d'acides aminés et d'acide hyaluronique non réticulé, délivré au plus près des cellules.",
      image: {
        src: unsplash("photo-1761819920857-7edc5e808fd3"),
        alt: "Soin de mésothérapie du visage",
      },
      how: [
        "La mésothérapie consiste à déposer de très petites quantités de principes actifs dans le derme superficiel, par micro-injections ou à l'aide d'un dispositif de micro-perforation.",
        "La peau reçoit directement ce dont elle manque : hydratation, antioxydants, nutriments. Elle retrouve éclat, souplesse et un grain plus fin. Le même principe s'applique au cuir chevelu pour soutenir la pousse des cheveux.",
      ],
      indications: [
        "Teint terne, peau déshydratée ou fatiguée",
        "Préparation de la peau avant un événement",
        "Ridules superficielles du visage, du cou et du décolleté",
        "Chute de cheveux et cheveux affinés",
      ],
      steps: [
        { title: "Choix du cocktail", text: "Les actifs sont sélectionnés selon l'état de votre peau ou de votre cuir chevelu." },
        { title: "Préparation", text: "Nettoyage, désinfection et application d'une crème anesthésiante si besoin." },
        { title: "Séance", text: "Micro-injections réparties sur toute la zone, en 20 à 30 minutes." },
        { title: "Après", text: "Petites papules et rougeurs disparaissent en quelques heures à 48 heures." },
      ],
      facts: [
        { label: "Durée", value: "20 à 30 min" },
        { label: "Séances", value: "3 à 5, espacées de 2 à 4 semaines" },
        { label: "Suites", value: "Minimes" },
      ],
      faq: [
        { q: "Quelle différence avec les skinboosters ?", a: "La mésothérapie apporte un cocktail de vitamines et d'actifs pour revitaliser ; les skinboosters reposent sur un acide hyaluronique plus structurant pour une hydratation durable. Les deux se complètent." },
        { q: "Est-ce douloureux ?", a: "Les aiguilles sont très fines et une crème anesthésiante peut être appliquée. La séance est généralement bien tolérée." },
      ],
    },
    {
      id: "skinboosters",
      navLabel: "Skinboosters",
      kicker: "Hydratation profonde",
      title: "Skinboosters",
      lead:
        "Une hydratation profonde et durable qui redonne à la peau souplesse, éclat et qualité, sans modifier les volumes.",
      image: {
        src: unsplash("photo-1785861378703-1c991c4548ef"),
        alt: "Injection de skinbooster près du regard",
      },
      how: [
        "Les skinboosters sont des gels d'acide hyaluronique peu réticulé, parfois enrichis en acides aminés ou en antioxydants. Injectés en nappe dans le derme, ils agissent comme un réservoir d'eau.",
        "La peau devient plus rebondie, plus lisse et plus lumineuse. Les ridules de déshydratation s'estompent et la texture s'améliore, sans aucun effet de volume.",
      ],
      indications: [
        "Peau déshydratée, terne ou relâchée",
        "Ridules du visage, du cou et du décolleté",
        "Qualité de peau du dos des mains",
        "Entretien après un laser ou un peeling",
      ],
      steps: [
        { title: "Diagnostic", text: "Évaluation de l'hydratation et de l'élasticité de la peau." },
        { title: "Anesthésie", text: "Crème anesthésiante appliquée 20 à 30 minutes avant." },
        { title: "Injection", text: "Micro-dépôts répartis sur la zone, à l'aiguille fine ou à la canule." },
        { title: "Après", text: "Petites papules résorbées en 24 à 72 heures. Pas de maquillage le jour même." },
      ],
      facts: [
        { label: "Durée", value: "30 min" },
        { label: "Séances", value: "2 à 3, à un mois d'intervalle" },
        { label: "Tenue", value: "6 à 9 mois, entretien conseillé" },
      ],
      faq: [
        { q: "Les skinboosters gonflent-ils le visage ?", a: "Non. Ils améliorent la qualité de la peau, son hydratation et son éclat, sans ajouter de volume." },
        { q: "À quel moment les faire ?", a: "Toute l'année. Ils sont particulièrement indiqués à l'entrée de l'hiver ou après l'été, quand la peau est déshydratée." },
      ],
    },
    {
      id: "peeling",
      navLabel: "Peeling médical",
      kicker: "Renouvellement",
      title: "Peeling médical",
      lead:
        "Une exfoliation contrôlée qui renouvelle la peau en surface pour un teint plus net, plus uniforme et plus lumineux.",
      image: {
        src: unsplash("photo-1713085085470-fba013d67e65"),
        alt: "Application d'un peeling médical par un médecin",
      },
      how: [
        "Le peeling médical consiste à appliquer une solution acide (glycolique, salicylique, mandélique, TCA…) qui provoque une exfoliation contrôlée des couches superficielles de la peau.",
        "La peau se renouvelle : les taches pâlissent, les pores se resserrent, les imperfections diminuent. La profondeur du peeling, superficiel ou moyen, est choisie selon l'indication et votre phototype.",
      ],
      indications: [
        "Teint terne et grain de peau irrégulier",
        "Acné et peaux à tendance grasse",
        "Taches pigmentaires et mélasma, en protocole doux",
        "Ridules et premiers signes de l'âge",
      ],
      steps: [
        { title: "Préparation", text: "Une crème préparatoire peut être prescrite 2 à 4 semaines avant la séance." },
        { title: "Nettoyage", text: "La peau est nettoyée et dégraissée pour une pénétration homogène." },
        { title: "Application", text: "La solution est appliquée pendant un temps précis, sous contrôle médical, puis neutralisée." },
        { title: "Après", text: "Rougeur, tiraillements puis desquamation fine pendant quelques jours. Écran total indispensable." },
      ],
      facts: [
        { label: "Durée", value: "20 à 30 min" },
        { label: "Séances", value: "3 à 6 selon le peeling" },
        { label: "Éviction sociale", value: "0 à 5 jours selon la profondeur" },
      ],
      faq: [
        { q: "Les peelings conviennent-ils aux peaux mates ?", a: "Oui, en choisissant des acides et des concentrations adaptés, et en préparant la peau en amont pour éviter toute hyperpigmentation." },
        { q: "Peut-on faire un peeling en été ?", a: "Les peelings superficiels restent possibles avec une photoprotection stricte. Les peelings moyens sont réservés à l'automne et à l'hiver." },
      ],
    },
  ],
  bentoEyebrow: "Nos engagements",
  bentoTitle: "Ce qui fait la différence en médecine esthétique",
  bentoIntro:
    "Au-delà du geste, la qualité d'un traitement esthétique repose sur le diagnostic, les produits et le suivi.",
  bento: [
    {
      title: "Un diagnostic avant tout geste",
      text: "Analyse du visage au repos et en mouvement, antécédents médicaux et attentes : aucun traitement n'est réalisé sans consultation préalable.",
      tag: "Consultation",
      span: "big",
      image: { src: unsplash("photo-1552693673-1bf958298935"), alt: "Consultation et soin du visage" },
    },
    {
      title: "Des produits traçables",
      text: "Dispositifs médicaux et médicaments d'origine contrôlée, avec numéro de lot consigné dans votre dossier.",
      tag: "Sécurité",
    },
    {
      title: "Le naturel comme règle",
      text: "Des doses mesurées, un traitement progressif si besoin, pour un résultat qui vous ressemble.",
      tag: "Philosophie",
    },
    {
      title: "Un suivi après chaque injection",
      text: "Un rendez-vous de contrôle est proposé après les traitements injectables, et le cabinet reste joignable pour toute question.",
      tag: "Suivi",
      span: "wide",
    },
  ],
  faq: [
    { q: "Faut-il une consultation avant un premier traitement ?", a: "Oui. La consultation permet de poser l'indication, de vérifier les contre-indications et de vous expliquer le protocole. Le traitement peut parfois être réalisé le jour même si tout est réuni." },
    { q: "Combien coûtent les injections ?", a: "Aucun tarif n'est affiché en ligne, conformément à la réglementation marocaine. Le prix dépend du produit et du nombre de zones ; il vous est communiqué après la consultation médicale." },
    { q: "Quand reprendre une vie normale ?", a: "Immédiatement pour la plupart des soins. Un léger gonflement ou de petits bleus peuvent apparaître et se camouflent facilement." },
  ],
};
