import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getTenant } from "@/lib/tenants";
import { getProjects, getUpdates, getInvoices, getSharedLinks } from "@/lib/client-portal";

async function getAuthenticatedTenantId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("client-token")?.value;
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64").toString();
    const tenantId = decoded.split(":")[0];
    const tenant = await getTenant(tenantId);
    if (!tenant || !tenant.active) return null;

    const hashFragment = decoded.split(":")[2];
    if (hashFragment !== tenant.passwordHash.slice(0, 16)) return null;

    return tenantId;
  } catch {
    return null;
  }
}

export async function GET() {
  const tenantId = await getAuthenticatedTenantId();
  if (!tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [projects, updates, invoices, links] = await Promise.all([
      getProjects(tenantId),
      getUpdates(tenantId),
      getInvoices(tenantId),
      getSharedLinks(tenantId),
    ]);

    return NextResponse.json({ projects, updates, invoices, links });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
