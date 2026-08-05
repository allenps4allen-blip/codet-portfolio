import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTenantPassword } from "@/lib/tenants";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const tenant = await verifyTenantPassword(email, password);
    if (!tenant) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = Buffer.from(`${tenant.id}:${Date.now()}:${tenant.passwordHash.slice(0, 16)}`).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("client-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400 * 7,
      path: "/",
    });

    return NextResponse.json({ ok: true, name: tenant.name });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
