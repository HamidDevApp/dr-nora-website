import type { TreatmentPage } from "./types";
import { unsplash } from "@/lib/images";

// Contenu de la page /laser.
// Les technologies citées (longueurs d'onde) sont les standards de la médecine
// laser ; la liste exacte des appareils du cabinet est à valider avec le Dr Nora.

export const LASER: TreatmentPage = {
  slug: "laser",
  metaTitle: "Médecine laser à Agadir · Épilation, taches, cicatrices · Dr Nora Leghzaoui",
  metaDescription:
    "Épilation laser adaptée à tous les phototypes, traitement des taches pigmentaires, cicatrices d'acné et photoréjuvénation au cabinet du Dr Nora Leghzaoui, Agadir Bay.",
  eyebrow: "Médecine laser",
  title: "La précision de la lumière,",
  titleEm: "au service de votre peau.",
  intro:
    "Le laser médical agit avec une précision qu'aucun autre soin n'égale : il cible une structure de la peau, le poil, la tache ou la cicatrice, en préservant les tissus qui l'entourent. Chaque réglage est choisi par le Dr Nora selon votre phototype, la zone et l'indication.",
  heroImage: {
    src: unsplash("photo-1746806942799-b4db209e9a6b"),
    alt: "Séance de médecine laser réalisée par un médecin",
  },
  highlights: [
    { label: "Phototypes", value: "Tous, y compris les peaux mates et foncées" },
    { label: "Approche", value: "Diagnostic médical avant chaque protocole" },
    { label: "Sécurité", value: "Test préalable et réglages personnalisés" },
  ],
  techniquesTitle: "Quatre indications, un même niveau d'exigence",
  techniques: [
    {
      id: "epilation",
      navLabel: "Épilation définitive",
      kicker: "Épilation laser",
      title: "Épilation définitive, pour tous les phototypes",
      lead:
        "Une réduction durable et progressive de la pilosité, visage et corps, avec des longueurs d'onde adaptées aux peaux claires comme aux peaux mates.",
      image: {
        src: unsplash("photo-1700760933574-9f0f4ea9aa3b"),
        alt: "Épilation laser sur la jambe, en cabinet",
      },
      how: [
        "Le faisceau laser est absorbé par la mélanine du poil, puis transformé en chaleur. Cette chaleur remonte jusqu'au bulbe et le neutralise, sans abîmer la peau en surface.",
        "Le choix de la longueur d'onde est décisif. Le laser Alexandrite (755 nm) est très efficace sur les peaux claires ; le laser Nd:YAG (1064 nm) pénètre plus profondément et épargne la mélanine de l'épiderme, ce qui en fait la référence pour les peaux mates et foncées, fréquentes au Maroc.",
        "Le poil n'est sensible au laser qu'en phase de croissance. C'est pourquoi le traitement se fait en plusieurs séances espacées, pour atteindre chaque poil au bon moment de son cycle.",
      ],
      indications: [
        "Pilosité gênante du visage, des aisselles, du maillot, des jambes ou du dos",
        "Poils incarnés et irritations répétées après rasage ou cire",
        "Hirsutisme, après bilan médical de la cause hormonale",
        "Peaux claires à foncées (phototypes I à VI) avec un laser adapté",
      ],
      steps: [
        { title: "Consultation et test", text: "Le Dr Nora évalue votre phototype, vos antécédents et vos traitements en cours, puis réalise un test sur une petite zone." },
        { title: "Préparation", text: "La zone est rasée la veille. Aucune épilation à la cire ou à la pince dans les semaines qui précèdent, pour conserver le bulbe." },
        { title: "La séance", text: "Le laser balaie la zone avec un système de refroidissement de la peau. La sensation est celle d'un léger claquement chaud, bien tolérée." },
        { title: "Après la séance", text: "Une rougeur légère peut persister quelques heures. Une protection solaire stricte est indispensable entre les séances." },
      ],
      facts: [
        { label: "Durée", value: "15 à 60 min selon la zone" },
        { label: "Séances", value: "6 à 8 en moyenne, espacées de 4 à 8 semaines" },
        { label: "Éviction sociale", value: "Aucune" },
      ],
      faq: [
        { q: "L'épilation laser est-elle vraiment définitive ?", a: "On parle d'épilation « définitive » pour une réduction durable de la pilosité, de l'ordre de 80 à 90 % en fin de protocole. Quelques séances d'entretien espacées peuvent être utiles, notamment en cas de terrain hormonal." },
        { q: "Les peaux mates peuvent-elles être traitées sans risque ?", a: "Oui, à condition d'utiliser une longueur d'onde adaptée, comme le Nd:YAG 1064 nm, et des réglages prudents. C'est précisément le rôle du diagnostic médical et du test préalable." },
        { q: "Les poils blancs ou blonds répondent-ils au laser ?", a: "Le laser cible la mélanine : les poils blancs, roux très clairs ou blonds répondent peu. Le Dr Nora vous le dira honnêtement lors de la consultation." },
        { q: "Y a-t-il des contre-indications ?", a: "La grossesse, une peau bronzée ou un autobronzant récent, certains médicaments photosensibilisants et les lésions cutanées sur la zone imposent de différer ou d'adapter le traitement." },
      ],
    },
    {
      id: "taches",
      navLabel: "Taches pigmentaires",
      kicker: "Pigmentation",
      title: "Traitement des taches pigmentaires",
      lead:
        "Taches solaires, lentigos et pigmentations irrégulières s'estompent progressivement pour un teint plus net et plus uniforme.",
      image: {
        src: unsplash("photo-1785861433534-8cd4c7b994fa"),
        alt: "Traitement laser d'une zone pigmentée",
      },
      how: [
        "Le laser pigmentaire émet des impulsions très brèves, absorbées par l'excès de mélanine. Le pigment est fragmenté en fines particules, éliminées naturellement par l'organisme dans les semaines suivantes.",
        "Toutes les taches ne se traitent pas de la même façon. Un lentigo solaire répond souvent en une à deux séances ; le mélasma, d'origine hormonale, demande une approche plus douce et combinée (soins dépigmentants, peeling, laser à faible énergie) pour éviter tout effet rebond.",
      ],
      indications: [
        "Lentigos solaires du visage, du décolleté et des mains",
        "Taches brunes liées à l'âge ou au soleil",
        "Hyperpigmentations post-inflammatoires, après acné notamment",
        "Mélasma, en protocole combiné et prudent",
      ],
      steps: [
        { title: "Diagnostic des taches", text: "Examen de chaque lésion pour en confirmer la nature bénigne et choisir la technique la plus adaptée." },
        { title: "Préparation de la peau", text: "Selon les cas, une crème préparatoire est prescrite quelques semaines avant la séance." },
        { title: "La séance", text: "Les impulsions sont ciblées tache par tache ou sur toute la zone. La séance est courte et la sensation reste supportable." },
        { title: "Cicatrisation", text: "Les taches foncent puis forment de fines croûtes qui tombent en 7 à 10 jours. Protection solaire SPF 50 obligatoire." },
      ],
      facts: [
        { label: "Durée", value: "15 à 30 min" },
        { label: "Séances", value: "1 à 3 selon le type de tache" },
        { label: "Éviction sociale", value: "Légère, quelques jours" },
      ],
      faq: [
        { q: "Les taches peuvent-elles revenir ?", a: "Une tache traitée ne revient pas, mais de nouvelles taches peuvent apparaître avec le soleil. La photoprotection quotidienne est la meilleure garantie du résultat." },
        { q: "Quelle saison choisir ?", a: "L'automne et l'hiver sont idéaux : l'exposition solaire est plus faible, ce qui réduit le risque de repigmentation pendant la cicatrisation." },
        { q: "Le mélasma se traite-t-il au laser ?", a: "Le mélasma est une pigmentation chronique et sensible. Il se prend en charge par une association de soins, avec un laser à faible énergie uniquement lorsque c'est indiqué, et un suivi dans la durée." },
      ],
    },
    {
      id: "cicatrices",
      navLabel: "Cicatrices d'acné",
      kicker: "Resurfaçage",
      title: "Cicatrices d'acné",
      lead:
        "Un resurfaçage progressif qui lisse le relief de la peau et stimule la production de collagène, séance après séance.",
      image: {
        src: unsplash("photo-1785861775561-c6db7da314a0"),
        alt: "Traitement laser du bas du visage",
      },
      how: [
        "Le laser fractionné crée, sur une partie seulement de la surface, des milliers de micro-colonnes de chaleur. La peau saine laissée entre elles accélère la réparation et déclenche une production intense de nouveau collagène.",
        "Les cicatrices en creux se comblent peu à peu, le grain de peau s'affine et le relief s'atténue. Selon le type de cicatrices, le laser peut être associé au microneedling, au PRP ou à un peeling pour un résultat plus complet.",
      ],
      indications: [
        "Cicatrices d'acné en creux ou en cuvette",
        "Pores dilatés et grain de peau irrégulier",
        "Cicatrices post-traumatiques ou chirurgicales anciennes",
        "Rougeurs et marques résiduelles après une acné traitée",
      ],
      steps: [
        { title: "Bilan de la peau", text: "Analyse du type de cicatrices et vérification que l'acné est stabilisée avant de commencer." },
        { title: "Anesthésie locale", text: "Une crème anesthésiante est appliquée 30 à 45 minutes avant la séance pour un meilleur confort." },
        { title: "La séance", text: "Le laser est passé sur toute la zone avec des réglages adaptés à votre phototype." },
        { title: "Suites", text: "Rougeur et sensation de coup de soleil pendant 2 à 5 jours, puis desquamation fine. Soins cicatrisants et écran total prescrits." },
      ],
      facts: [
        { label: "Durée", value: "30 à 45 min" },
        { label: "Séances", value: "3 à 5, espacées de 4 à 6 semaines" },
        { label: "Éviction sociale", value: "2 à 5 jours" },
      ],
      faq: [
        { q: "Peut-on traiter les cicatrices pendant une acné active ?", a: "Il est préférable de stabiliser l'acné d'abord. Le Dr Nora peut mettre en place un traitement adapté, puis démarrer le resurfaçage lorsque la peau est prête." },
        { q: "Quand voit-on les résultats ?", a: "Une amélioration de la texture est visible dès la première séance. Le remodelage du collagène se poursuit pendant 3 à 6 mois après la dernière séance." },
        { q: "Et sur une peau mate ?", a: "Les réglages sont adaptés pour limiter le risque d'hyperpigmentation post-inflammatoire, avec une préparation de la peau en amont." },
      ],
    },
    {
      id: "rajeunissement",
      navLabel: "Photoréjuvénation",
      kicker: "Photoréjuvénation",
      title: "Rajeunissement cutané",
      lead:
        "Un teint unifié, des rougeurs atténuées et une peau plus ferme, sans geste invasif.",
      image: {
        src: unsplash("photo-1761718210089-ba3bb5ccb54f"),
        alt: "Soin de rajeunissement du visage en cabinet",
      },
      how: [
        "La photoréjuvénation agit en deux temps : elle corrige les irrégularités visibles (petites taches, rougeurs, vaisseaux dilatés) et chauffe en douceur le derme pour relancer la production de collagène et d'élastine.",
        "Le résultat est progressif et naturel : la peau retrouve de l'éclat, les ridules s'estompent et le grain de peau se resserre. C'est un soin idéal en entretien, seul ou associé aux skinboosters.",
      ],
      indications: [
        "Teint terne, irrégulier ou marqué par le soleil",
        "Rougeurs diffuses et petits vaisseaux du visage (couperose)",
        "Ridules et perte de fermeté débutante",
        "Visage, cou, décolleté et dos des mains",
      ],
      steps: [
        { title: "Consultation", text: "Analyse de la peau et définition des priorités : éclat, rougeurs, fermeté ou taches." },
        { title: "Protection", text: "Démaquillage, application d'un gel et protection oculaire." },
        { title: "La séance", text: "Les impulsions sont délivrées sur toute la zone. La sensation est chaude et brève." },
        { title: "Après", text: "Légère rougeur pendant quelques heures. Le maquillage est possible dès le lendemain." },
      ],
      facts: [
        { label: "Durée", value: "20 à 40 min" },
        { label: "Séances", value: "3 à 4, puis entretien annuel" },
        { label: "Éviction sociale", value: "Aucune à minime" },
      ],
      faq: [
        { q: "À partir de quel âge ?", a: "Il n'y a pas d'âge type : le soin s'adresse aux peaux qui montrent des signes de photo-vieillissement, souvent à partir de 30 ou 35 ans." },
        { q: "Peut-on l'associer à d'autres soins ?", a: "Oui. La photoréjuvénation s'associe très bien aux skinboosters, au PRP ou à un peeling léger, dans un protocole défini en consultation." },
      ],
    },
  ],
  bentoEyebrow: "Plateau technique",
  bentoTitle: "Des technologies choisies pour chaque type de peau",
  bentoIntro:
    "Le cabinet s'appuie sur des plateformes laser médicales dont les réglages sont adaptés à chaque patiente. Liste des appareils à confirmer avec le cabinet.",
  bento: [
    {
      title: "Laser Nd:YAG 1064 nm",
      text: "La longueur d'onde de référence pour les peaux mates et foncées : elle pénètre en profondeur et épargne la mélanine de surface.",
      tag: "Épilation · Vaisseaux",
      span: "big",
      image: { src: unsplash("photo-1785861775561-c6db7da314a0"), alt: "Laser médical en cours d'utilisation" },
    },
    {
      title: "Laser Alexandrite 755 nm",
      text: "Très efficace sur les poils foncés des peaux claires, avec des séances rapides.",
      tag: "Épilation",
    },
    {
      title: "Laser fractionné",
      text: "Resurfaçage par micro-colonnes pour lisser cicatrices, pores et ridules.",
      tag: "Cicatrices · Texture",
    },
    {
      title: "Laser pigmentaire",
      text: "Impulsions ultra-courtes qui fragmentent l'excès de mélanine des taches.",
      tag: "Taches",
      span: "wide",
    },
    {
      title: "Refroidissement cutané",
      text: "Un système de refroidissement protège l'épiderme et améliore le confort pendant toute la séance.",
      tag: "Confort",
    },
  ],
  faq: [
    { q: "Le laser est-il douloureux ?", a: "La sensation varie selon la zone et la technique : picotement chaud pour l'épilation, sensation de coup de soleil pour le resurfaçage. Le refroidissement et, si besoin, une crème anesthésiante rendent les séances bien tolérées." },
    { q: "Peut-on faire du laser en été ?", a: "L'épilation au Nd:YAG reste possible avec une protection solaire stricte et sans bronzage récent. Les traitements des taches et le resurfaçage sont de préférence réalisés d'octobre à avril." },
    { q: "Combien coûte un traitement ?", a: "Conformément à la réglementation marocaine, aucun tarif n'est affiché en ligne. Le prix dépend de la zone et du nombre de séances ; il vous est communiqué après la consultation médicale." },
    { q: "Qui réalise les séances ?", a: "Le protocole est défini et encadré par le Dr Nora, qui fixe les réglages adaptés à votre peau." },
  ],
};
