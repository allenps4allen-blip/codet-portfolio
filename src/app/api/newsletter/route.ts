import { NextResponse } from "next/server";
import { subscribe, unsubscribe } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, locale } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (action === "unsubscribe") {
      const ok = await unsubscribe(email);
      return NextResponse.json({ ok });
    }

    const subscriber = await subscribe(email, locale || "en");
    return NextResponse.json({ ok: true, subscriber });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
