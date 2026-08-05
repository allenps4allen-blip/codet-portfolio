import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createProject, getProjects, updateMilestone, updateProjectStatus,
  postUpdate, getUpdates, deleteUpdate,
  addInvoice, getInvoices, updateInvoiceStatus,
  addSharedLink, getSharedLinks, deleteSharedLink,
} from "@/lib/client-portal";

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

export async function GET(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const tenantId = url.searchParams.get("tenantId");
  if (!tenantId) return NextResponse.json({ error: "tenantId required" }, { status: 400 });

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

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, tenantId } = body;

    if (!tenantId || !action) {
      return NextResponse.json({ error: "tenantId and action required" }, { status: 400 });
    }

    switch (action) {
      case "createProject": {
        const { name, milestones } = body;
        if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
        const project = await createProject(tenantId, name, milestones);
        return NextResponse.json({ project });
      }

      case "updateMilestone": {
        const { projectId, milestoneId, completed } = body;
        if (!projectId || !milestoneId) return NextResponse.json({ error: "projectId and milestoneId required" }, { status: 400 });
        const ok = await updateMilestone(tenantId, projectId, milestoneId, completed === true);
        return NextResponse.json({ ok });
      }

      case "updateProjectStatus": {
        const { projectId, status } = body;
        if (!projectId || !["active", "completed", "paused"].includes(status)) {
          return NextResponse.json({ error: "Invalid" }, { status: 400 });
        }
        const ok = await updateProjectStatus(tenantId, projectId, status);
        return NextResponse.json({ ok });
      }

      case "postUpdate": {
        const { message } = body;
        if (!message || typeof message !== "string" || message.length > 1000) {
          return NextResponse.json({ error: "message required (max 1000 chars)" }, { status: 400 });
        }
        const update = await postUpdate(tenantId, message);
        return NextResponse.json({ update });
      }

      case "deleteUpdate": {
        const { updateId } = body;
        if (!updateId) return NextResponse.json({ error: "updateId required" }, { status: 400 });
        const ok = await deleteUpdate(tenantId, updateId);
        return NextResponse.json({ ok });
      }

      case "addInvoice": {
        const { description, amount, currency } = body;
        if (!description || typeof amount !== "number" || amount <= 0) {
          return NextResponse.json({ error: "description and amount required" }, { status: 400 });
        }
        const invoice = await addInvoice(tenantId, description, amount, currency || "KWD");
        return NextResponse.json({ invoice });
      }

      case "updateInvoiceStatus": {
        const { invoiceId, status } = body;
        if (!invoiceId || !["pending", "paid", "overdue"].includes(status)) {
          return NextResponse.json({ error: "Invalid" }, { status: 400 });
        }
        const ok = await updateInvoiceStatus(tenantId, invoiceId, status);
        return NextResponse.json({ ok });
      }

      case "addLink": {
        const { title, url, category } = body;
        if (!title || !url) return NextResponse.json({ error: "title and url required" }, { status: 400 });
        const validCategories = ["design", "document", "asset", "other"];
        const link = await addSharedLink(tenantId, title, url, validCategories.includes(category) ? category : "other");
        return NextResponse.json({ link });
      }

      case "deleteLink": {
        const { linkId } = body;
        if (!linkId) return NextResponse.json({ error: "linkId required" }, { status: 400 });
        const ok = await deleteSharedLink(tenantId, linkId);
        return NextResponse.json({ ok });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
