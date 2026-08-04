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

export type AnalyticsEvent =
  | { type: "demo_visit" }
  | { type: "demo_message"; topic: string }
  | { type: "demo_prompt_click"; prompt: string }
  | { type: "widget_click"; page: string }
  | { type: "whatsapp_click"; page: string; afterDemo: boolean }
  | { type: "contact_submit"; afterDemo: boolean };

interface DailyStats {
  demoVisits: number;
  messages: number;
  promptClicks: number;
  widgetClicks: number;
  whatsappClicks: number;
  contactSubmits: number;
  conversions: number;
  topics: Record<string, number>;
  hours: Record<string, number>;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function hourKey(): string {
  return String(new Date().getHours());
}

function emptyDay(): DailyStats {
  return {
    demoVisits: 0,
    messages: 0,
    promptClicks: 0,
    widgetClicks: 0,
    whatsappClicks: 0,
    contactSubmits: 0,
    conversions: 0,
    topics: {},
    hours: {},
  };
}

export async function recordEvent(event: AnalyticsEvent): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  const key = `stats:${todayKey()}`;
  const hour = hourKey();

  const raw = await redis.get<DailyStats>(key);
  const stats = raw || emptyDay();

  stats.hours[hour] = (stats.hours[hour] || 0) + 1;

  switch (event.type) {
    case "demo_visit":
      stats.demoVisits++;
      break;
    case "demo_message":
      stats.messages++;
      stats.topics[event.topic] = (stats.topics[event.topic] || 0) + 1;
      break;
    case "demo_prompt_click":
      stats.promptClicks++;
      break;
    case "widget_click":
      stats.widgetClicks++;
      break;
    case "whatsapp_click":
      stats.whatsappClicks++;
      if (event.afterDemo) stats.conversions++;
      break;
    case "contact_submit":
      stats.contactSubmits++;
      if (event.afterDemo) stats.conversions++;
      break;
  }

  await redis.set(key, stats, { ex: 90 * 86400 });
}

export async function getDailyStats(date: string): Promise<DailyStats> {
  const redis = getRedis();
  if (!redis) return emptyDay();

  const raw = await redis.get<DailyStats>(`stats:${date}`);
  return raw || emptyDay();
}

export async function getStatsRange(days: number): Promise<{ date: string; stats: DailyStats }[]> {
  const results: { date: string; stats: DailyStats }[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const stats = await getDailyStats(date);
    results.push({ date, stats });
  }

  return results;
}

export async function getWeeklySummary(): Promise<{
  totalVisits: number;
  totalMessages: number;
  totalConversions: number;
  conversionRate: number;
  topTopics: { topic: string; count: number }[];
  peakHour: number;
  whatsappClicks: number;
  contactSubmits: number;
}> {
  const week = await getStatsRange(7);

  let totalVisits = 0;
  let totalMessages = 0;
  let totalConversions = 0;
  let whatsappClicks = 0;
  let contactSubmits = 0;
  const topicTotals: Record<string, number> = {};
  const hourTotals: Record<string, number> = {};

  for (const { stats } of week) {
    totalVisits += stats.demoVisits;
    totalMessages += stats.messages;
    totalConversions += stats.conversions;
    whatsappClicks += stats.whatsappClicks;
    contactSubmits += stats.contactSubmits;

    for (const [topic, count] of Object.entries(stats.topics)) {
      topicTotals[topic] = (topicTotals[topic] || 0) + count;
    }
    for (const [hour, count] of Object.entries(stats.hours)) {
      hourTotals[hour] = (hourTotals[hour] || 0) + count;
    }
  }

  const topTopics = Object.entries(topicTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }));

  const peakHour = Object.entries(hourTotals).sort((a, b) => b[1] - a[1])[0];

  return {
    totalVisits,
    totalMessages,
    totalConversions,
    conversionRate: totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0,
    topTopics,
    peakHour: peakHour ? parseInt(peakHour[0]) : 0,
    whatsappClicks,
    contactSubmits,
  };
}
