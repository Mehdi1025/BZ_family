import { siteImages } from "./images";

export const stats = [
  { label: "Familles accompagnées", value: 850, suffix: "+" },
  { label: "Événements organisés", value: 120, suffix: "+" },
  { label: "Bénévoles actifs", value: 45, suffix: "" },
  { label: "Repas distribués", value: 3200, suffix: "+" },
];

export const testimonials = [
  {
    id: "1",
    name: "Marie L.",
    role: "Habitante du quartier",
    content:
      "BZ Family a transformé notre communauté. Grâce à eux, mes enfants participent à des activités enrichissantes chaque semaine.",
    avatar: siteImages.avatars.marie,
  },
  {
    id: "2",
    name: "Karim B.",
    role: "Bénévole depuis 3 ans",
    content:
      "Donner de mon temps ici m'a apporté autant que ce que j'ai pu offrir. Une équipe humaine et bienveillante.",
    avatar: siteImages.avatars.karim,
  },
  {
    id: "3",
    name: "Sophie M.",
    role: "Partenaire local",
    content:
      "Une association sérieuse et transparente. Nous sommes fiers de les soutenir dans leurs actions quotidiennes.",
    avatar: siteImages.avatars.sophie,
  },
];

export const partners = [
  { id: "1", name: "Mairie de Paris", logoUrl: "/images/partners/mairie.svg" },
  { id: "2", name: "Croix-Rouge", logoUrl: "/images/partners/croix-rouge.svg" },
  { id: "3", name: "Secours Populaire", logoUrl: "/images/partners/secours.svg" },
  { id: "4", name: "Banque Alimentaire", logoUrl: "/images/partners/banque.svg" },
  { id: "5", name: "France Bénévolat", logoUrl: "/images/partners/fb.svg" },
  { id: "6", name: "Fondation de France", logoUrl: "/images/partners/fdf.svg" },
];

export const latestNews = [
  {
    id: "1",
    title: "Grande collecte alimentaire de printemps",
    slug: "collecte-alimentaire-printemps",
    excerpt:
      "Plus de 2 tonnes de denrées collectées grâce à la mobilisation de nos bénévoles et partenaires locaux.",
    category: "Solidarité",
    imageUrl: siteImages.news.collecte,
    publishedAt: "2026-03-15",
  },
  {
    id: "2",
    title: "Nouveau programme d'accompagnement scolaire",
    slug: "programme-accompagnement-scolaire",
    excerpt:
      "Lancement d'un dispositif de soutien scolaire gratuit pour 50 enfants du quartier.",
    category: "Éducation",
    imageUrl: siteImages.news.scolaire,
    publishedAt: "2026-02-28",
  },
  {
    id: "3",
    title: "Fête de quartier : un succès populaire",
    slug: "fete-quartier-succes",
    excerpt:
      "Plus de 500 personnes ont participé à notre fête annuelle, un moment de partage inoubliable.",
    category: "Événement",
    imageUrl: siteImages.news.fete,
    publishedAt: "2026-02-10",
  },
];

export const upcomingEvents = [
  {
    id: "1",
    title: "Atelier cuisine solidaire",
    slug: "atelier-cuisine-solidaire",
    description:
      "Apprenez à cuisiner des repas équilibrés et économiques en famille.",
    date: "2026-04-12",
    time: "14:00",
    location: "Maison de quartier BZ",
    capacity: 30,
    registeredCount: 18,
    imageUrl: siteImages.events.cuisine,
  },
  {
    id: "2",
    title: "Marche solidaire du quartier",
    slug: "marche-solidaire",
    description:
      "Parcours de 5 km pour sensibiliser à la solidarité de proximité.",
    date: "2026-04-25",
    time: "09:00",
    location: "Parc central",
    capacity: 100,
    registeredCount: 67,
    imageUrl: siteImages.events.marche,
  },
  {
    id: "3",
    title: "Forum des bénévoles",
    slug: "forum-benevoles",
    description:
      "Rencontrez l'équipe et découvrez comment vous engager au sein de BZ Family.",
    date: "2026-05-08",
    time: "18:30",
    location: "Salle polyvalente",
    capacity: 50,
    registeredCount: 22,
    imageUrl: siteImages.events.forum,
  },
];

/** Les trois piliers d'action — utilisés sur la page d'accueil */
export const actionPillars = [
  {
    id: "1",
    slug: "aide-alimentaire",
    label: "Solidarité",
    title: "Aide alimentaire",
    description:
      "Paniers hebdomadaires et repas chauds, distribués chaque samedi à la maison de quartier. Sans conditions, sans dossier.",
    image: siteImages.actions.alimentaire,
    metric: "3 200 repas distribués en 2025",
  },
  {
    id: "2",
    slug: "accompagnement-scolaire",
    label: "Éducation",
    title: "Accompagnement scolaire",
    description:
      "Du soutien gratuit du CP à la 3e, deux soirs par semaine, encadré par des bénévoles formés et des enseignants du quartier.",
    image: siteImages.actions.scolaire,
    metric: "50 enfants suivis chaque semaine",
  },
  {
    id: "3",
    slug: "lien-social",
    label: "Lien social",
    title: "Fêtes, ateliers, sorties",
    description:
      "Ce qui fait qu'on se parle : la fête de rue, les ateliers cuisine, les sorties famille. Le reste en découle.",
    image: siteImages.actions.social,
    metric: "120 rendez-vous organisés",
  },
];

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-actions", label: "Nos actions" },
  { href: "/evenements", label: "Événements" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];
