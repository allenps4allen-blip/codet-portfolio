import { Redis } from "@upstash/redis";
import crypto from "crypto";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

function generateId(): string {
  return crypto.randomBytes(8).toString("hex");
}

export interface BlogPost {
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

export type BlogPostInput = Omit<BlogPost, "id" | "readingTimeMinutes" | "createdAt" | "updatedAt" | "publishedAt">;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function createPost(input: BlogPostInput): Promise<BlogPost | null> {
  const redis = getRedis();
  if (!redis) return null;

  const post: BlogPost = {
    id: generateId(),
    slug: input.slug || slugify(input.title.en),
    status: input.status,
    category: input.category,
    coverImage: input.coverImage || "",
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    author: input.author || "CODET",
    readingTimeMinutes: estimateReadingTime(input.content.en || input.content.ar),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: input.status === "published" ? new Date().toISOString() : null,
  };

  const existing = await redis.get(`blog:slug:${post.slug}`);
  if (existing) {
    post.slug = `${post.slug}-${post.id.slice(0, 6)}`;
  }

  await redis.set(`blog:post:${post.id}`, post);
  await redis.set(`blog:slug:${post.slug}`, post.id);

  const ids: string[] = (await redis.get("blog:ids")) || [];
  ids.unshift(post.id);
  await redis.set("blog:ids", ids);

  return post;
}

export async function updatePost(id: string, updates: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const redis = getRedis();
  if (!redis) return null;

  const post: BlogPost | null = await redis.get(`blog:post:${id}`);
  if (!post) return null;

  const oldSlug = post.slug;

  if (updates.title) post.title = { ...post.title, ...updates.title };
  if (updates.excerpt) post.excerpt = { ...post.excerpt, ...updates.excerpt };
  if (updates.content) {
    post.content = { ...post.content, ...updates.content };
    post.readingTimeMinutes = estimateReadingTime(post.content.en || post.content.ar);
  }
  if (updates.category !== undefined) post.category = updates.category;
  if (updates.coverImage !== undefined) post.coverImage = updates.coverImage;
  if (updates.author !== undefined) post.author = updates.author;
  if (updates.slug && updates.slug !== oldSlug) {
    const existing = await redis.get(`blog:slug:${updates.slug}`);
    if (!existing || existing === id) {
      await redis.del(`blog:slug:${oldSlug}`);
      post.slug = updates.slug;
      await redis.set(`blog:slug:${post.slug}`, post.id);
    }
  }
  if (updates.status !== undefined) {
    if (updates.status === "published" && post.status !== "published") {
      post.publishedAt = new Date().toISOString();
    }
    post.status = updates.status;
  }

  post.updatedAt = new Date().toISOString();
  await redis.set(`blog:post:${id}`, post);

  return post;
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get(`blog:post:${id}`);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const redis = getRedis();
  if (!redis) return null;
  const id: string | null = await redis.get(`blog:slug:${slug}`);
  if (!id) return null;
  return redis.get(`blog:post:${id}`);
}

export async function listPosts(options?: { status?: "draft" | "published" }): Promise<BlogPost[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids: string[] = (await redis.get("blog:ids")) || [];
  if (ids.length === 0) return [];

  const pipeline = redis.pipeline();
  for (const id of ids) pipeline.get(`blog:post:${id}`);
  const results = await pipeline.exec();

  let posts = (results as (BlogPost | null)[]).filter((p): p is BlogPost => p !== null);

  if (options?.status) {
    posts = posts.filter((p) => p.status === options.status);
  }

  posts.sort((a, b) => {
    const dateA = a.publishedAt || a.createdAt;
    const dateB = b.publishedAt || b.createdAt;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return posts;
}

export async function deletePost(id: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const post: BlogPost | null = await redis.get(`blog:post:${id}`);
  if (!post) return false;

  await redis.del(`blog:post:${id}`);
  await redis.del(`blog:slug:${post.slug}`);

  const ids: string[] = (await redis.get("blog:ids")) || [];
  const filtered = ids.filter((i) => i !== id);
  await redis.set("blog:ids", filtered);

  return true;
}
