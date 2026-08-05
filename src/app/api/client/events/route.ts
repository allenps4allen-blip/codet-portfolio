import { NextResponse } from "next/server";
import { getTenantByApiKey } from "@/lib/tenants";
import { recordClientEvent, type ClientEvent } from "@/lib/client-analytics";

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 60;

const VALID_TYPES = ["conversation_start", "message", "action_completed", "handoff", "conversation_end", "rating"];

function validateEvent(raw: unknown): ClientEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Record<string, unknown>;
  if (typeof e.type !== "string" || !VALID_TYPES.includes(e.type)) return null;

  switch (e.type) {
    case "conversation_start":
      return { type: "conversation_start" };
    case "message":
      return { type: "message", intent: typeof e.intent === "string" ? e.intent.slice(0, 100) : "general" };
    case "action_completed":
      return { type: "action_completed", action: typeof e.action === "string" ? e.action.slice(0, 100) : "unknown" };
    case "handoff":
      return { type: "handoff", reason: typeof e.reason === "string" ? e.reason.slice(0, 200) : "unknown" };
    case "conversation_end": {
      const dur = typeof e.durationSeconds === "number" ? e.durationSeconds : 0;
      return { type: "conversation_end", durationSeconds: Math.max(0, Math.min(dur, 86400)) };
    }
    case "rating": {
      const score = typeof e.score === "number" ? e.score : 0;
      if (score < 1 || score > 5) return null;
      return { type: "rating", score: Math.round(score) };
    }
    default:
      return null;
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || !apiKey.startsWith("codet_")) {
      return NextResponse.json({ error: "Missing or invalid API key" }, { status: 401 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const timestamps = rateLimit.get(ip)?.filter((t) => now - t < RATE_LIMIT_WINDOW) || [];
    if (timestamps.length >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    timestamps.push(now);
    rateLimit.set(ip, timestamps);

    const tenant = await getTenantByApiKey(apiKey);
    if (!tenant || !tenant.active) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.events || !Array.isArray(body.events) || body.events.length > 50) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const validated = body.events
      .map(validateEvent)
      .filter((e: ClientEvent | null): e is ClientEvent => e !== null);

    await Promise.all(validated.map((event: ClientEvent) => recordClientEvent(tenant.id, event)));

    return NextResponse.json({ ok: true, recorded: validated.length });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
