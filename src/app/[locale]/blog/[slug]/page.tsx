"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";
import FadeIn from "@/components/FadeIn";

interface BlogPost {
  id: string;
  slug: string;
  category: string;
  coverImage: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
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

export default function BlogPostPage() {
  const params = useParams();
  const t = useTranslations("blog");
  const locale = useLocale();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => { if (d?.post) setPost(d.post); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground/60" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-2xl font-bold text-foreground/80">{t("notFound")}</h1>
        <Link href="/blog" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
          &larr; {t("backToBlog")}
        </Link>
      </div>
    );
  }

  const title = locale === "ar" && post.title.ar ? post.title.ar : post.title.en;
  const content = locale === "ar" && post.content.ar ? post.content.ar : post.content.en;
  const catColor = categoryColors[post.category] || categoryColors.general;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: locale === "ar" && post.excerpt.ar ? post.excerpt.ar : post.excerpt.en,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "CODET", url: "https://www.codet-kw.com" },
    datePublished: post.publishedAt,
    image: post.coverImage || undefined,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.codet-kw.com/${locale}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12">
        <div className="dot-matrix absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground/70">
              &larr; {t("backToBlog")}
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-semibold capitalize" style={{ background: `${catColor}20`, color: catColor }}>
                {post.category.replace(/-/g, " ")}
              </span>
              <span className="text-xs text-foreground/30">{post.readingTimeMinutes} {t("minRead")}</span>
              {post.publishedAt && (
                <time className="text-xs text-foreground/30">
                  {new Date(post.publishedAt).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                </time>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-4 text-sm text-foreground/30">
              {t("by")} {post.author}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <FadeIn delay={0.2}>
          <div className="mx-auto max-w-4xl px-6">
            <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
              <img src={post.coverImage} alt={title} className="w-full object-cover" style={{ maxHeight: 480 }} />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Content */}
      <FadeIn delay={0.25}>
        <article className="mx-auto max-w-3xl px-6 py-12" dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="blog-content prose prose-invert prose-sm sm:prose-base max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="mt-12 mb-4 text-2xl font-bold text-foreground sm:text-3xl">{children}</h1>,
                h2: ({ children }) => <h2 className="mt-10 mb-3 text-xl font-bold text-foreground sm:text-2xl">{children}</h2>,
                h3: ({ children }) => <h3 className="mt-8 mb-2 text-lg font-semibold text-foreground">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/65">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-foreground/65">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-foreground/65">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="my-6 border-l-2 border-foreground/20 pl-4 italic text-foreground/50">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <pre className="my-4 overflow-x-auto rounded-lg bg-white/[0.03] p-4">
                        <code className="text-xs text-foreground/70">{children}</code>
                      </pre>
                    );
                  }
                  return <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-foreground/70">{children}</code>;
                },
                pre: ({ children }) => <>{children}</>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/80 underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/40">
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-8 border-white/[0.06]" />,
                strong: ({ children }) => <strong className="font-semibold text-foreground/80">{children}</strong>,
                img: ({ src, alt }) => (
                  <figure className="my-8">
                    <img src={src} alt={alt || ""} className="w-full rounded-xl border border-white/[0.06]" />
                    {alt && <figcaption className="mt-2 text-center text-xs text-foreground/25">{alt}</figcaption>}
                  </figure>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Bottom nav */}
          <div className="mt-16 border-t border-white/[0.06] pt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground/70">
              &larr; {t("backToBlog")}
            </Link>
          </div>
        </article>
      </FadeIn>
    </>
  );
}
