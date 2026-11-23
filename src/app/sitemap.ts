import { MetadataRoute } from "next";
import { getAllArticles, getAllTracks } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paisakit.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/learn",
    "/updates",
    "/glossary",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const tracks = getAllTracks().map((track) => ({
    url: `${BASE_URL}/learn/${track}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articles = getAllArticles().map((art) => ({
    url: `${BASE_URL}/learn/${art.trackSlug}/${art.frontmatter.slug}`,
    lastModified: new Date(art.frontmatter.publishedAt || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...tracks, ...articles];
}
