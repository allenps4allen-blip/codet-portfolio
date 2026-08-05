import { Redis } from "@upstash/redis";
import crypto from "crypto";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
}

export interface Subscriber {
  id: string;
  email: string;
  locale: string;
  subscribedAt: string;
  active: boolean;
}

const REDIS_KEY = "newsletter:subscribers";

export async function subscribe(email: string, locale: string = "en"): Promise<Subscriber | null> {
  const redis = getRedis();
  if (!redis) return null;

  const all: Subscriber[] = (await redis.get(REDIS_KEY)) || [];
  const existing = all.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    if (!existing.active) {
      existing.active = true;
      await redis.set(REDIS_KEY, all);
    }
    return existing;
  }

  const subscriber: Subscriber = {
    id: crypto.randomBytes(8).toString("hex"),
    email: email.toLowerCase(),
    locale,
    subscribedAt: new Date().toISOString(),
    active: true,
  };

  all.push(subscriber);
  await redis.set(REDIS_KEY, all);
  return subscriber;
}

export async function unsubscribe(email: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const all: Subscriber[] = (await redis.get(REDIS_KEY)) || [];
  const sub = all.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (!sub) return false;

  sub.active = false;
  await redis.set(REDIS_KEY, all);
  return true;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(REDIS_KEY)) || [];
}

export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const subs = await getSubscribers();
  return subs.filter((s) => s.active);
}
