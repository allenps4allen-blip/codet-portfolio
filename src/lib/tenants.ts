import { Redis } from "@upstash/redis";
import crypto from "crypto";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  apiKey: string;
  createdAt: string;
  active: boolean;
}

export type TenantPublic = Omit<Tenant, "passwordHash">;

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateApiKey(): string {
  return `codet_${crypto.randomBytes(24).toString("hex")}`;
}

function generateId(): string {
  return crypto.randomBytes(8).toString("hex");
}

export async function createTenant(name: string, email: string, password: string): Promise<TenantPublic | null> {
  const redis = getRedis();
  if (!redis) return null;

  const id = generateId();
  const apiKey = generateApiKey();
  const tenant: Tenant = {
    id,
    name,
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    apiKey,
    createdAt: new Date().toISOString(),
    active: true,
  };

  await redis.set(`tenant:${id}`, tenant);
  await redis.set(`tenant-key:${apiKey}`, id);
  await redis.set(`tenant-email:${email.toLowerCase()}`, id);

  const ids: string[] = (await redis.get("tenant:ids")) || [];
  ids.push(id);
  await redis.set("tenant:ids", ids);

  const { passwordHash: _hash, ...pub } = tenant;
  void _hash;
  return pub;
}

export async function getTenant(id: string): Promise<Tenant | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<Tenant>(`tenant:${id}`);
}

export async function getTenantPublic(id: string): Promise<TenantPublic | null> {
  const tenant = await getTenant(id);
  if (!tenant) return null;
  const { passwordHash: _hash, ...pub } = tenant;
  void _hash;
  return pub;
}

export async function getTenantByApiKey(apiKey: string): Promise<Tenant | null> {
  const redis = getRedis();
  if (!redis) return null;
  const id = await redis.get<string>(`tenant-key:${apiKey}`);
  if (!id) return null;
  return getTenant(id);
}

export async function getTenantByEmail(email: string): Promise<Tenant | null> {
  const redis = getRedis();
  if (!redis) return null;
  const id = await redis.get<string>(`tenant-email:${email.toLowerCase()}`);
  if (!id) return null;
  return getTenant(id);
}

export async function verifyTenantPassword(email: string, password: string): Promise<Tenant | null> {
  const tenant = await getTenantByEmail(email);
  if (!tenant) return null;
  if (tenant.passwordHash !== hashPassword(password)) return null;
  if (!tenant.active) return null;
  return tenant;
}

export async function listTenants(): Promise<TenantPublic[]> {
  const redis = getRedis();
  if (!redis) return [];
  const ids: string[] = (await redis.get("tenant:ids")) || [];
  const tenants: TenantPublic[] = [];
  for (const id of ids) {
    const pub = await getTenantPublic(id);
    if (pub) tenants.push(pub);
  }
  return tenants;
}

export async function regenerateApiKey(id: string): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;
  const tenant = await getTenant(id);
  if (!tenant) return null;

  await redis.del(`tenant-key:${tenant.apiKey}`);
  const newKey = generateApiKey();
  tenant.apiKey = newKey;
  await redis.set(`tenant:${id}`, tenant);
  await redis.set(`tenant-key:${newKey}`, id);
  return newKey;
}

export async function toggleTenant(id: string, active: boolean): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  const tenant = await getTenant(id);
  if (!tenant) return false;
  tenant.active = active;
  await redis.set(`tenant:${id}`, tenant);
  return true;
}
