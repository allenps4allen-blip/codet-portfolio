import type { MetadataRoute } from "next";

const baseUrl = "https://www.codet-kw.com";
const locales = ["en", "ar"];
const pages = ["", "/services", "/work", "/about", "/blog", "/contact", "/demo", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
