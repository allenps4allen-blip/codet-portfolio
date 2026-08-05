import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSubscribers } from "@/lib/newsletter";

async function isAdminAuthed(): Promise<boolean> {
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

export async function GET() {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
