"use client";

import { useState, useEffect, useCallback } from "react";

interface BlogPost {
  id: string;
  slug: string;
  status: "draft" | "published";
  category: string;
  coverImage: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  author: string;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

type EditorMode = "list" | "create" | "edit";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CATEGORIES = ["general", "ai", "web-development", "automation", "case-study", "industry-insights"];

// ── Post Editor ──

function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post?: BlogPost;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [slug, setSlug] = useState(post?.slug || "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status || "draft");
  const [category, setCategory] = useState(post?.category || "general");
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [author, setAuthor] = useState(post?.author || "CODET");
  const [titleEn, setTitleEn] = useState(post?.title.en || "");
  const [titleAr, setTitleAr] = useState(post?.title.ar || "");
  const [excerptEn, setExcerptEn] = useState(post?.excerpt.en || "");
  const [excerptAr, setExcerptAr] = useState(post?.excerpt.ar || "");
  const [contentEn, setContentEn] = useState(post?.content.en || "");
  const [contentAr, setContentAr] = useState(post?.content.ar || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      action: post ? "update" : "create",
      id: post?.id,
      slug,
      status,
      category,
      coverImage,
      author,
      title: { en: titleEn, ar: titleAr },
      excerpt: { en: excerptEn, ar: excerptAr },
      content: { en: contentEn, ar: contentAr },
    });
    setSaving(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#e9edef", margin: 0 }}>
          {post ? "Edit Post" : "New Post"}
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCancel} style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving || (!titleEn && !titleAr)} style={{ ...btnStyle, background: "#00a884", color: "white", opacity: saving || (!titleEn && !titleAr) ? 0.5 : 1 }}>
            {saving ? "Saving..." : post ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* Meta fields */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug (auto-generated if empty)" style={inputStyle} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, " ")}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" style={inputStyle} />
      </div>

      <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Cover image URL (optional)" style={inputStyle} />

      {/* Language toggle */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 1 }}>
        {(["en", "ar"] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding: "8px 20px", border: "none",
            borderBottom: lang === l ? "2px solid #00a884" : "2px solid transparent",
            background: "transparent", color: lang === l ? "#00a884" : "rgba(255,255,255,0.35)",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>
            {l === "en" ? "English" : "Arabic"}
          </button>
        ))}
      </div>

      {/* Content fields */}
      {lang === "en" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Title (English)" style={{ ...inputStyle, fontSize: 16, fontWeight: 600 }} />
          <textarea value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} placeholder="Excerpt / summary (English)" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          <textarea value={contentEn} onChange={(e) => setContentEn(e.target.value)} placeholder="Full content (English) — supports markdown" rows={16} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 12, lineHeight: 1.6 }} />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }} dir="rtl">
          <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="العنوان (عربي)" style={{ ...inputStyle, fontSize: 16, fontWeight: 600, textAlign: "right" }} />
          <textarea value={excerptAr} onChange={(e) => setExcerptAr(e.target.value)} placeholder="الملخص (عربي)" rows={2} style={{ ...inputStyle, resize: "vertical", textAlign: "right" }} />
          <textarea value={contentAr} onChange={(e) => setContentAr(e.target.value)} placeholder="المحتوى الكامل (عربي) — يدعم ماركداون" rows={16} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: 12, lineHeight: 1.6, textAlign: "right" }} />
        </div>
      )}
    </div>
  );
}

// ── Main Page ──

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<EditorMode>("list");
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSave = async (data: Record<string, unknown>) => {
    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMode("list");
      setEditingPost(undefined);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    fetchPosts();
  };

  const toggleStatus = async (post: BlogPost) => {
    await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        id: post.id,
        status: post.status === "published" ? "draft" : "published",
      }),
    });
    fetchPosts();
  };

  const statusColors: Record<string, string> = { published: "#00a884", draft: "#f59e0b" };

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {mode === "list" ? (
          <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 600, color: "#e9edef", margin: 0 }}>Blog Manager</h1>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>
                  {loading ? "Loading..." : `${posts.length} post${posts.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="/admin/analytics" style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                  &larr; Analytics
                </a>
                <a href="/admin/clients" style={{ ...btnStyle, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                  Clients
                </a>
                <button onClick={() => { setEditingPost(undefined); setMode("create"); }} style={{ ...btnStyle, background: "#00a884", color: "white" }}>
                  + New Post
                </button>
              </div>
            </div>

            {/* Post list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.map((post) => (
                <div key={post.id} style={{
                  padding: 20, background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e9edef", margin: 0 }}>
                          {post.title.en || post.title.ar}
                        </h3>
                        <span style={{
                          fontSize: 10, padding: "2px 8px", borderRadius: 8,
                          background: `${statusColors[post.status]}20`, color: statusColors[post.status],
                          textTransform: "capitalize",
                        }}>
                          {post.status}
                        </span>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "rgba(99,102,241,0.15)", color: "#6366f1" }}>
                          {post.category.replace(/-/g, " ")}
                        </span>
                      </div>
                      {post.excerpt.en && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "4px 0 0 0", lineHeight: 1.5 }}>{post.excerpt.en.slice(0, 120)}{post.excerpt.en.length > 120 ? "..." : ""}</p>}
                      <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
                        <span>/{post.slug}</span>
                        <span>{post.readingTimeMinutes} min read</span>
                        <span>{post.author}</span>
                        <span>{formatDate(post.updatedAt)}</span>
                        {post.title.ar && <span style={{ color: "#00a884" }}>AR</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginLeft: 16 }}>
                      <button onClick={() => toggleStatus(post)} style={{
                        ...btnSmall,
                        border: `1px solid ${statusColors[post.status === "published" ? "draft" : "published"]}40`,
                        color: statusColors[post.status === "published" ? "draft" : "published"],
                      }}>
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => { setEditingPost(post); setMode("edit"); }} style={{ ...btnSmall, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)} style={{ ...btnSmall, border: "1px solid rgba(255,100,100,0.2)", color: "#ff6b6b" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && posts.length === 0 && (
                <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
                  No blog posts yet. Click &quot;+ New Post&quot; to write your first one.
                </div>
              )}
            </div>
          </>
        ) : (
          <PostEditor
            post={editingPost}
            onSave={handleSave}
            onCancel={() => { setMode("list"); setEditingPost(undefined); }}
          />
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
  color: "#e9edef", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", outline: "none",
};

const btnStyle: React.CSSProperties = {
  padding: "8px 16px", borderRadius: 8, border: "none",
  fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
};

const btnSmall: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 6, background: "transparent",
  fontSize: 10, cursor: "pointer", fontFamily: "inherit",
};
