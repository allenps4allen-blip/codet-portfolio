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

function generateId(): string {
  return crypto.randomBytes(8).toString("hex");
}

// ── Project & Milestones ──

export interface Milestone {
  id: string;
  label: string;
  completed: boolean;
  completedAt: string | null;
}

export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "paused";
  createdAt: string;
  milestones: Milestone[];
}

const DEFAULT_MILESTONES: Omit<Milestone, "id">[] = [
  { label: "Discovery & Planning", completed: false, completedAt: null },
  { label: "Design", completed: false, completedAt: null },
  { label: "Development", completed: false, completedAt: null },
  { label: "Testing & Review", completed: false, completedAt: null },
  { label: "Launch", completed: false, completedAt: null },
];

export async function createProject(tenantId: string, name: string, customMilestones?: string[]): Promise<Project | null> {
  const redis = getRedis();
  if (!redis) return null;

  const milestones: Milestone[] = (customMilestones || DEFAULT_MILESTONES.map((m) => m.label)).map((label) => ({
    id: generateId(),
    label: typeof label === "string" ? label : (label as Omit<Milestone, "id">).label,
    completed: false,
    completedAt: null,
  }));

  const project: Project = {
    id: generateId(),
    name,
    status: "active",
    createdAt: new Date().toISOString(),
    milestones,
  };

  const key = `client:${tenantId}:projects`;
  const projects: Project[] = (await redis.get(key)) || [];
  projects.push(project);
  await redis.set(key, projects);

  return project;
}

export async function getProjects(tenantId: string): Promise<Project[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(`client:${tenantId}:projects`)) || [];
}

export async function updateMilestone(tenantId: string, projectId: string, milestoneId: string, completed: boolean): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = `client:${tenantId}:projects`;
  const projects: Project[] = (await redis.get(key)) || [];
  const project = projects.find((p) => p.id === projectId);
  if (!project) return false;

  const milestone = project.milestones.find((m) => m.id === milestoneId);
  if (!milestone) return false;

  milestone.completed = completed;
  milestone.completedAt = completed ? new Date().toISOString() : null;

  const allDone = project.milestones.every((m) => m.completed);
  if (allDone) project.status = "completed";

  await redis.set(key, projects);
  return true;
}

export async function updateProjectStatus(tenantId: string, projectId: string, status: Project["status"]): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = `client:${tenantId}:projects`;
  const projects: Project[] = (await redis.get(key)) || [];
  const project = projects.find((p) => p.id === projectId);
  if (!project) return false;

  project.status = status;
  await redis.set(key, projects);
  return true;
}

// ── Activity Feed ──

export interface Update {
  id: string;
  message: string;
  createdAt: string;
}

export async function postUpdate(tenantId: string, message: string): Promise<Update | null> {
  const redis = getRedis();
  if (!redis) return null;

  const update: Update = {
    id: generateId(),
    message,
    createdAt: new Date().toISOString(),
  };

  const key = `client:${tenantId}:updates`;
  const updates: Update[] = (await redis.get(key)) || [];
  updates.unshift(update);
  if (updates.length > 50) updates.length = 50;
  await redis.set(key, updates);

  return update;
}

export async function getUpdates(tenantId: string): Promise<Update[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(`client:${tenantId}:updates`)) || [];
}

export async function deleteUpdate(tenantId: string, updateId: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = `client:${tenantId}:updates`;
  const updates: Update[] = (await redis.get(key)) || [];
  const filtered = updates.filter((u) => u.id !== updateId);
  if (filtered.length === updates.length) return false;

  await redis.set(key, filtered);
  return true;
}

// ── Invoices ──

export interface Invoice {
  id: string;
  description: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "overdue";
  issuedAt: string;
  paidAt: string | null;
}

export async function addInvoice(tenantId: string, description: string, amount: number, currency: string = "KWD"): Promise<Invoice | null> {
  const redis = getRedis();
  if (!redis) return null;

  const invoice: Invoice = {
    id: generateId(),
    description,
    amount,
    currency,
    status: "pending",
    issuedAt: new Date().toISOString(),
    paidAt: null,
  };

  const key = `client:${tenantId}:invoices`;
  const invoices: Invoice[] = (await redis.get(key)) || [];
  invoices.unshift(invoice);
  await redis.set(key, invoices);

  return invoice;
}

export async function getInvoices(tenantId: string): Promise<Invoice[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(`client:${tenantId}:invoices`)) || [];
}

export async function updateInvoiceStatus(tenantId: string, invoiceId: string, status: Invoice["status"]): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = `client:${tenantId}:invoices`;
  const invoices: Invoice[] = (await redis.get(key)) || [];
  const invoice = invoices.find((i) => i.id === invoiceId);
  if (!invoice) return false;

  invoice.status = status;
  invoice.paidAt = status === "paid" ? new Date().toISOString() : null;
  await redis.set(key, invoices);
  return true;
}

// ── Shared Links ──

export interface SharedLink {
  id: string;
  title: string;
  url: string;
  category: "design" | "document" | "asset" | "other";
  createdAt: string;
}

export async function addSharedLink(tenantId: string, title: string, url: string, category: SharedLink["category"] = "other"): Promise<SharedLink | null> {
  const redis = getRedis();
  if (!redis) return null;

  const link: SharedLink = {
    id: generateId(),
    title,
    url,
    category,
    createdAt: new Date().toISOString(),
  };

  const key = `client:${tenantId}:links`;
  const links: SharedLink[] = (await redis.get(key)) || [];
  links.unshift(link);
  await redis.set(key, links);

  return link;
}

export async function getSharedLinks(tenantId: string): Promise<SharedLink[]> {
  const redis = getRedis();
  if (!redis) return [];
  return (await redis.get(`client:${tenantId}:links`)) || [];
}

export async function deleteSharedLink(tenantId: string, linkId: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const key = `client:${tenantId}:links`;
  const links: SharedLink[] = (await redis.get(key)) || [];
  const filtered = links.filter((l) => l.id !== linkId);
  if (filtered.length === links.length) return false;

  await redis.set(key, filtered);
  return true;
}
