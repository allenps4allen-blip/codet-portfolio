import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createTenant, listTenants } from "@/lib/tenants";
import { getClientSummary } from "@/lib/client-analytics";

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
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tenants = await listTenants();
    const tenantsWithStats = await Promise.all(
      tenants.map(async (tenant) => {
        const summary = await getClientSummary(tenant.id, 7);
        return { ...tenant, weeklyStats: summary };
      })
    );
    return NextResponse.json({ tenants: tenantsWithStats });
  } catch {
    return NextResponse.json({ error: "Failed to fetch tenants" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 });
    }

    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const tenant = await createTenant(name, email, password);
    if (!tenant) {
      return NextResponse.json({ error: "Failed to create tenant" }, { status: 500 });
    }

    return NextResponse.json({ tenant });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
