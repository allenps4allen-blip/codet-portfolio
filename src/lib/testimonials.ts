import { Redis } from "@upstash/redis";
import crypto from "crypto";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: string;
  role: { en: string; ar: string };
  rating: number;
  active: boolean;
  order: number;
  createdAt: string;
}

const REDIS_KEY = "testimonials";

export async function getTestimonials(): Promise<Testimonial[]> {
  const redis = getRedis();
  if (!redis) return [];
  const data: Testimonial[] | null = await redis.get(REDIS_KEY);
  if (!data) return [];
  return data.filter((t) => t.active).sort((a, b) => a.order - b.order);
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(REDIS_KEY)) || [];
}

export async function addTestimonial(input: Omit<Testimonial, "id" | "createdAt">): Promise<Testimonial | null> {
  const redis = getRedis();
  if (!redis) return null;

  const testimonial: Testimonial = {
    ...input,
    id: crypto.randomBytes(8).toString("hex"),
    createdAt: new Date().toISOString(),
  };

  const all: Testimonial[] = (await redis.get(REDIS_KEY)) || [];
  all.push(testimonial);
  await redis.set(REDIS_KEY, all);
  return testimonial;
}

export async function updateTestimonial(id: string, updates: Partial<Omit<Testimonial, "id" | "createdAt">>): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const all: Testimonial[] = (await redis.get(REDIS_KEY)) || [];
  const item = all.find((t) => t.id === id);
  if (!item) return false;

  if (updates.quote) item.quote = { ...item.quote, ...updates.quote };
  if (updates.role) item.role = { ...item.role, ...updates.role };
  if (updates.name !== undefined) item.name = updates.name;
  if (updates.rating !== undefined) item.rating = updates.rating;
  if (updates.active !== undefined) item.active = updates.active;
  if (updates.order !== undefined) item.order = updates.order;

  await redis.set(REDIS_KEY, all);
  return true;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const all: Testimonial[] = (await redis.get(REDIS_KEY)) || [];
  const filtered = all.filter((t) => t.id !== id);
  if (filtered.length === all.length) return false;

  await redis.set(REDIS_KEY, filtered);
  return true;
}
