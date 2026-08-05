import { Redis } from "@upstash/redis";

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export type ClientEvent =
  | { type: "conversation_start" }
  | { type: "message"; intent: string }
  | { type: "action_completed"; action: string }
  | { type: "handoff"; reason: string }
  | { type: "conversation_end"; durationSeconds: number }
  | { type: "rating"; score: number };

export interface ClientDailyStats {
  conversations: number;
  messages: number;
  actionsCompleted: number;
  handoffs: number;
  ratings: number[];
  totalDurationSeconds: number;
  intents: Record<string, number>;
  actions: Record<string, number>;
  handoffReasons: Record<string, number>;
  hours: Record<string, number>;
}

function emptyClientDay(): ClientDailyStats {
  return {
    conversations: 0,
    messages: 0,
    actionsCompleted: 0,
    handoffs: 0,
    ratings: [],
    totalDurationSeconds: 0,
    intents: {},
    actions: {},
    handoffReasons: {},
    hours: {},
  };
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function hourKey(): string {
  return String(new Date().getHours());
}

export async function recordClientEvent(tenantId: string, event: ClientEvent): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const key = `client:${tenantId}:stats:${todayKey()}`;
  const hour = hourKey();

  const raw = await redis.get<ClientDailyStats>(key);
  const stats = raw || emptyClientDay();

  stats.hours[hour] = (stats.hours[hour] || 0) + 1;

  switch (event.type) {
    case "conversation_start":
      stats.conversations++;
      break;
    case "message":
      stats.messages++;
      if (event.intent) {
        stats.intents[event.intent] = (stats.intents[event.intent] || 0) + 1;
      }
      break;
    case "action_completed":
      stats.actionsCompleted++;
      if (event.action) {
        stats.actions[event.action] = (stats.actions[event.action] || 0) + 1;
      }
      break;
    case "handoff":
      stats.handoffs++;
      if (event.reason) {
        stats.handoffReasons[event.reason] = (stats.handoffReasons[event.reason] || 0) + 1;
      }
      break;
    case "conversation_end":
      if (event.durationSeconds > 0 && event.durationSeconds < 86400) {
        stats.totalDurationSeconds += event.durationSeconds;
      }
      break;
    case "rating":
      if (event.score >= 1 && event.score <= 5) {
        stats.ratings.push(event.score);
      }
      break;
  }

  await redis.set(key, stats, { ex: 90 * 86400 });
}

export async function getClientDailyStats(tenantId: string, date: string): Promise<ClientDailyStats> {
  const redis = getRedis();
  if (!redis) return emptyClientDay();
  const raw = await redis.get<ClientDailyStats>(`client:${tenantId}:stats:${date}`);
  return raw || emptyClientDay();
}

export async function getClientStatsRange(tenantId: string, days: number): Promise<{ date: string; stats: ClientDailyStats }[]> {
  const results: { date: string; stats: ClientDailyStats }[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const stats = await getClientDailyStats(tenantId, date);
    results.push({ date, stats });
  }

  return results;
}

export async function getClientSummary(tenantId: string, days: number = 7): Promise<{
  totalConversations: number;
  totalMessages: number;
  totalActions: number;
  totalHandoffs: number;
  handoffRate: number;
  avgRating: number;
  avgDurationSeconds: number;
  topIntents: { intent: string; count: number }[];
  topActions: { action: string; count: number }[];
  peakHour: number;
  conversationsWithDuration: number;
}> {
  const range = await getClientStatsRange(tenantId, days);

  let totalConversations = 0;
  let totalMessages = 0;
  let totalActions = 0;
  let totalHandoffs = 0;
  let totalDuration = 0;
  let conversationsWithDuration = 0;
  const allRatings: number[] = [];
  const intentTotals: Record<string, number> = {};
  const actionTotals: Record<string, number> = {};
  const hourTotals: Record<string, number> = {};

  for (const { stats } of range) {
    totalConversations += stats.conversations;
    totalMessages += stats.messages;
    totalActions += stats.actionsCompleted;
    totalHandoffs += stats.handoffs;
    totalDuration += stats.totalDurationSeconds;
    if (stats.totalDurationSeconds > 0) conversationsWithDuration += stats.conversations;
    allRatings.push(...stats.ratings);

    for (const [intent, count] of Object.entries(stats.intents)) {
      intentTotals[intent] = (intentTotals[intent] || 0) + count;
    }
    for (const [action, count] of Object.entries(stats.actions)) {
      actionTotals[action] = (actionTotals[action] || 0) + count;
    }
    for (const [hour, count] of Object.entries(stats.hours)) {
      hourTotals[hour] = (hourTotals[hour] || 0) + count;
    }
  }

  const topIntents = Object.entries(intentTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([intent, count]) => ({ intent, count }));

  const topActions = Object.entries(actionTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([action, count]) => ({ action, count }));

  const peakEntry = Object.entries(hourTotals).sort((a, b) => b[1] - a[1])[0];

  const avgRating = allRatings.length > 0
    ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length
    : 0;

  return {
    totalConversations,
    totalMessages,
    totalActions,
    totalHandoffs,
    handoffRate: totalConversations > 0 ? (totalHandoffs / totalConversations) * 100 : 0,
    avgRating,
    avgDurationSeconds: conversationsWithDuration > 0 ? totalDuration / conversationsWithDuration : 0,
    topIntents,
    topActions,
    peakHour: peakEntry ? parseInt(peakEntry[0]) : 0,
    conversationsWithDuration,
  };
}
