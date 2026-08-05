import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";

const baseUrl = "https://www.codet-kw.com";
const locales = ["en", "ar"];
const pages = ["", "/services", "/work", "/about", "/blog", "/contact", "/demo", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const posts = await listPosts({ status: "published" });
    for (const post of posts) {
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // Redis not available — skip blog entries
  }

  return entries;
}
