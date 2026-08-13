/** Images locales — téléchargées depuis Unsplash (placeholders temporaires) */
export const siteImages = {
  hero: "/images/hero.jpg",
  about: "/images/about.jpg",

  news: {
    collecte: "/images/news/collecte.jpg",
    scolaire: "/images/news/scolaire.jpg",
    fete: "/images/news/fete.jpg",
  },

  events: {
    cuisine: "/images/events/cuisine.jpg",
    marche: "/images/events/marche.jpg",
    forum: "/images/events/forum.jpg",
  },

  actions: {
    alimentaire: "/images/actions/alimentaire.jpg",
    scolaire: "/images/actions/scolaire.jpg",
    social: "/images/actions/social.jpg",
  },

  gallery: [
    { id: "1", title: "Fête de quartier 2025", category: "Événements", src: "/images/gallery/1.jpg" },
    { id: "2", title: "Distribution alimentaire", category: "Solidarité", src: "/images/gallery/2.jpg" },
    { id: "3", title: "Atelier cuisine", category: "Ateliers", src: "/images/gallery/3.jpg" },
    { id: "4", title: "Marche solidaire", category: "Événements", src: "/images/gallery/4.jpg" },
    { id: "5", title: "Soutien scolaire", category: "Éducation", src: "/images/gallery/5.jpg" },
    { id: "6", title: "Forum bénévoles", category: "Bénévolat", src: "/images/gallery/6.jpg" },
    { id: "7", title: "Collecte de dons", category: "Solidarité", src: "/images/gallery/7.jpg" },
    { id: "8", title: "Activités enfants", category: "Jeunesse", src: "/images/gallery/8.jpg" },
    { id: "9", title: "Équipe bénévoles", category: "Bénévolat", src: "/images/gallery/9.jpg" },
  ],

  avatars: {
    marie: "/images/avatars/marie.jpg",
    karim: "/images/avatars/karim.jpg",
    sophie: "/images/avatars/sophie.jpg",
  },
} as const;

export function getNewsImage(slug: string): string {
  const map: Record<string, string> = {
    "collecte-alimentaire-printemps": siteImages.news.collecte,
    "programme-accompagnement-scolaire": siteImages.news.scolaire,
    "fete-quartier-succes": siteImages.news.fete,
  };
  return map[slug] ?? siteImages.news.collecte;
}

export function getEventImage(slug: string): string {
  const map: Record<string, string> = {
    "atelier-cuisine-solidaire": siteImages.events.cuisine,
    "marche-solidaire": siteImages.events.marche,
    "forum-benevoles": siteImages.events.forum,
  };
  return map[slug] ?? siteImages.events.forum;
}

export function getActionImage(slug: string): string {
  const map: Record<string, string> = {
    "aide-alimentaire": siteImages.actions.alimentaire,
    "accompagnement-scolaire": siteImages.actions.scolaire,
    "lien-social": siteImages.actions.social,
  };
  return map[slug] ?? siteImages.actions.social;
}
