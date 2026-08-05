import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getTenant } from "@/lib/tenants";
import { getClientStatsRange, getClientSummary } from "@/lib/client-analytics";

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

export async function GET(request: Request) {
  const tenantId = await getAuthenticatedTenantId();
  if (!tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = Math.min(parseInt(url.searchParams.get("days") || "7"), 90);

  try {
    const [range, summary] = await Promise.all([
      getClientStatsRange(tenantId, days),
      getClientSummary(tenantId, days),
    ]);

    return NextResponse.json({ range, summary });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
