import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStatsRange, getWeeklySummary } from "@/lib/analytics";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const password = decoded.split(":").slice(1).join(":");
    return password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = Math.min(parseInt(url.searchParams.get("days") || "7"), 90);

  try {
    const [range, summary] = await Promise.all([
      getStatsRange(days),
      getWeeklySummary(),
    ]);

    return NextResponse.json({ range, summary });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
