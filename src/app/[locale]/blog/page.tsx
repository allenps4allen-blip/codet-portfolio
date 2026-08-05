"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import NewsletterSignup from "@/components/NewsletterSignup";

interface BlogPost {
  id: string;
  slug: string;
  category: string;
  coverImage: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  author: string;
  readingTimeMinutes: number;
  publishedAt: string | null;
}

const categoryColors: Record<string, string> = {
  "ai": "#8b5cf6",
  "web-development": "#00a884",
  "automation": "#f59e0b",
  "case-study": "#6366f1",
  "industry-insights": "#ec4899",
  "general": "#64748b",
};

export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 200, height: 200, background: "rgba(0, 168, 132, 0.08)", top: "30px", right: "-40px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <motion.h1
              className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </motion.h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60">
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters + Posts */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        {/* Category filter */}
        {categories.length > 2 && (
          <FadeIn delay={0.2}>
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all duration-200 ${
                    filter === cat
                      ? "bg-foreground text-background"
                      : "border border-white/10 text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {cat === "all" ? t("all") : cat.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <FadeIn>
            <div className="py-20 text-center">
              <p className="text-lg text-foreground/30">{t("noPosts")}</p>
            </div>
          </FadeIn>
        )}

        {/* Post grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => {
            const title = locale === "ar" && post.title.ar ? post.title.ar : post.title.en;
            const excerpt = locale === "ar" && post.excerpt.ar ? post.excerpt.ar : post.excerpt.en;
            const catColor = categoryColors[post.category] || categoryColors.general;

            return (
              <FadeIn key={post.id} delay={0.1 + i * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] transition-all duration-300 hover:border-white/[0.12]"
                  >
                    {/* Cover image */}
                    {post.coverImage ? (
                      <div className="relative h-48 overflow-hidden bg-white/[0.02]">
                        <img
                          src={post.coverImage}
                          alt={title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    ) : (
                      <div className="relative flex h-48 items-center justify-center bg-white/[0.02]">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/10">
                          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      {/* Category + reading time */}
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize"
                          style={{ background: `${catColor}20`, color: catColor }}
                        >
                          {post.category.replace(/-/g, " ")}
                        </span>
                        <span className="text-[10px] text-foreground/30">
                          {post.readingTimeMinutes} {t("minRead")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
                        {title}
                      </h2>

                      {/* Excerpt */}
                      {excerpt && (
                        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/40">
                          {excerpt}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between border-t border-white/[0.04] pt-4">
                        <span className="text-xs text-foreground/25">{post.author}</span>
                        {post.publishedAt && (
                          <time className="text-xs text-foreground/25">
                            {new Date(post.publishedAt).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </time>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Newsletter */}
        <NewsletterSignup />
      </section>
    </>
  );
}
