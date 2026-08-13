export const aboutTimeline = [
  {
    year: "2019",
    title: "Naissance du collectif",
    text: "Des habitants du quartier se réunissent pour organiser les premières distributions solidaires et recréer du lien entre voisins.",
  },
  {
    year: "2021",
    title: "Structuration associative",
    text: "BZ Family devient une association loi 1901 afin de mieux coordonner les bénévoles, les partenaires et les actions de terrain.",
  },
  {
    year: "2024",
    title: "Développement des pôles",
    text: "L'aide alimentaire, l'accompagnement scolaire et les temps de rencontre deviennent les trois piliers de notre engagement.",
  },
  {
    year: "2026",
    title: "Une communauté engagée",
    text: "L'association continue de grandir avec des familles, des bénévoles et des partenaires qui agissent ensemble au quotidien.",
  },
];

export const aboutValues = [
  {
    title: "Solidarité",
    text: "Agir vite, concrètement, avec une attention particulière aux familles les plus fragiles.",
  },
  {
    title: "Inclusion",
    text: "Créer des espaces où chacun trouve sa place, quel que soit son âge, son parcours ou sa situation.",
  },
  {
    title: "Impact local",
    text: "Répondre aux besoins réels du quartier avec des actions proches, visibles et utiles.",
  },
  {
    title: "Transparence",
    text: "Expliquer clairement nos actions, nos besoins et l'utilisation des dons reçus.",
  },
];

import { siteImages } from "@/lib/data/images";

export const actionDetails = [
  {
    slug: "aide-alimentaire",
    label: "Solidarité",
    title: "Aide alimentaire",
    summary:
      "Des paniers, des repas et une présence humaine pour soutenir les familles dans les périodes difficiles.",
    metric: "3 200 repas distribués",
    image: siteImages.actions.alimentaire,
    quote:
      "Ici, l'aide alimentaire n'est jamais seulement un colis : c'est aussi un accueil, une écoute et un point de départ.",
    paragraphs: [
      "L'aide alimentaire est l'une des actions historiques de BZ Family. Elle répond à une urgence simple : permettre à des familles du quartier de traverser une période compliquée sans perdre leur dignité.",
      "Les bénévoles organisent les collectes, trient les produits, préparent les paniers et assurent les distributions dans un cadre bienveillant. L'objectif est d'apporter une aide concrète, mais aussi d'identifier les autres besoins : isolement, démarches, soutien scolaire ou accompagnement social.",
      "Cette action repose sur la confiance entre habitants, partenaires locaux et bénévoles. Chaque don est utilisé pour renforcer la capacité de l'association à agir vite et au plus près du terrain.",
    ],
    photos: [siteImages.actions.alimentaire, "/images/gallery/2.jpg", "/images/gallery/7.jpg"],
  },
  {
    slug: "accompagnement-scolaire",
    label: "Éducation",
    title: "Accompagnement scolaire",
    summary:
      "Un soutien régulier pour aider les enfants à reprendre confiance et progresser à leur rythme.",
    metric: "50 enfants suivis chaque semaine",
    image: siteImages.actions.scolaire,
    quote:
      "L'accompagnement scolaire aide les enfants à apprendre, mais surtout à croire qu'ils sont capables.",
    paragraphs: [
      "L'accompagnement scolaire de BZ Family est pensé comme un espace stable, rassurant et accessible. Les enfants y trouvent un cadre pour faire leurs devoirs, poser leurs questions et consolider les bases vues en classe.",
      "Les séances sont encadrées par des bénévoles formés, avec une attention portée au rythme de chaque enfant. Le but n'est pas seulement de terminer un exercice, mais de redonner confiance et de créer des habitudes de travail durables.",
      "Les familles sont également associées à la démarche. L'association reste disponible pour échanger, orienter et construire un accompagnement cohérent autour de l'enfant.",
    ],
    photos: [siteImages.actions.scolaire, "/images/gallery/5.jpg", "/images/gallery/8.jpg"],
  },
  {
    slug: "lien-social",
    label: "Quartier",
    title: "Lien social",
    summary:
      "Des fêtes, ateliers et sorties pour casser l'isolement et renforcer la vie de quartier.",
    metric: "120 rendez-vous organisés",
    image: siteImages.actions.social,
    quote:
      "Créer du lien, c'est parfois commencer par une table, un sourire et un moment partagé.",
    paragraphs: [
      "Le lien social est au cœur du projet de BZ Family. Les temps collectifs permettent aux habitants de se rencontrer autrement, de sortir de l'isolement et de retrouver une place active dans la vie du quartier.",
      "Ateliers cuisine, fêtes de quartier, sorties familiales et rencontres bénévoles sont organisés tout au long de l'année. Ces rendez-vous simples créent une dynamique collective qui rend les autres actions plus fortes.",
      "Chaque événement est pensé comme une porte d'entrée : venir une première fois, rencontrer l'équipe, proposer une idée, puis peut-être devenir bénévole à son tour.",
    ],
    photos: [siteImages.actions.social, "/images/gallery/1.jpg", "/images/gallery/4.jpg"],
  },
];

export const galleryItems = [
  { id: "1", title: "Fête de quartier", category: "Événements", src: "/images/gallery/1.jpg" },
  { id: "2", title: "Distribution alimentaire", category: "Actions", src: "/images/gallery/2.jpg" },
  { id: "3", title: "Atelier cuisine solidaire", category: "Actions", src: "/images/gallery/3.jpg" },
  { id: "4", title: "Marche solidaire", category: "Événements", src: "/images/gallery/4.jpg" },
  { id: "5", title: "Soutien scolaire", category: "Actions", src: "/images/gallery/5.jpg" },
  { id: "6", title: "Forum des bénévoles", category: "Bénévoles", src: "/images/gallery/6.jpg" },
  { id: "7", title: "Collecte de dons", category: "Actions", src: "/images/gallery/7.jpg" },
  { id: "8", title: "Activités enfants", category: "Quartier", src: "/images/gallery/8.jpg" },
  { id: "9", title: "Équipe bénévole", category: "Bénévoles", src: "/images/gallery/9.jpg" },
  { id: "10", title: "Rencontre habitants", category: "Quartier", src: "/images/gallery/1.jpg" },
  { id: "11", title: "Préparation des paniers", category: "Bénévoles", src: "/images/gallery/7.jpg" },
  { id: "12", title: "Moment famille", category: "Quartier", src: "/images/gallery/8.jpg" },
];

export const galleryFilters = ["Tout", "Événements", "Actions", "Bénévoles", "Quartier"] as const;
