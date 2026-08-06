import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/a-propos",
    "/nos-actions",
    "/evenements",
    "/actualites",
    "/galerie",
    "/devenir-benevole",
    "/faire-un-don",
    "/partenaires",
    "/contact",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
