import { NextResponse } from "next/server";
import { recordEvent, type AnalyticsEvent } from "@/lib/analytics";

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 30;

const VALID_TYPES = ["demo_visit", "demo_message", "demo_prompt_click", "widget_click", "whatsapp_click", "contact_submit"];
const VALID_TOPICS = ["book", "cancel", "hours", "arabic", "services", "reschedule", "default"];

function validateEvent(raw: unknown): AnalyticsEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Record<string, unknown>;

  if (typeof e.type !== "string" || !VALID_TYPES.includes(e.type)) return null;

  switch (e.type) {
    case "demo_visit":
      return { type: "demo_visit" };
    case "demo_message":
      if (typeof e.topic !== "string" || !VALID_TOPICS.includes(e.topic)) return null;
      return { type: "demo_message", topic: e.topic };
    case "demo_prompt_click":
      if (typeof e.prompt !== "string" || e.prompt.length > 200) return null;
      return { type: "demo_prompt_click", prompt: e.prompt.slice(0, 200) };
    case "widget_click":
      if (typeof e.page !== "string" || e.page.length > 200) return null;
      return { type: "widget_click", page: e.page.slice(0, 200) };
    case "whatsapp_click":
      if (typeof e.page !== "string" || e.page.length > 200) return null;
      return { type: "whatsapp_click", page: e.page.slice(0, 200), afterDemo: e.afterDemo === true };
    case "contact_submit":
      return { type: "contact_submit", afterDemo: e.afterDemo === true };
    default:
      return null;
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const timestamps = rateLimit.get(ip)?.filter((t) => now - t < RATE_LIMIT_WINDOW) || [];
    if (timestamps.length >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    timestamps.push(now);
    rateLimit.set(ip, timestamps);

    const body = await request.json();
    if (!body.events || !Array.isArray(body.events) || body.events.length > 20) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const validated = body.events
      .map(validateEvent)
      .filter((e: AnalyticsEvent | null): e is AnalyticsEvent => e !== null);

    await Promise.all(validated.map(recordEvent));

    return NextResponse.json({ ok: true, recorded: validated.length });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
