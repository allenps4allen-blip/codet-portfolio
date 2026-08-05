import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/testimonials";

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
    const testimonials = await getAllTestimonials();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "add": {
        const { quote, name, role, rating, order } = body;
        if (!name || !quote?.en) return NextResponse.json({ error: "name and quote.en required" }, { status: 400 });
        const testimonial = await addTestimonial({
          quote: { en: quote.en || "", ar: quote.ar || "" },
          name, role: { en: role?.en || "", ar: role?.ar || "" },
          rating: Math.min(5, Math.max(1, rating || 5)),
          active: true, order: order ?? 0,
        });
        return NextResponse.json({ testimonial });
      }
      case "update": {
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
        const ok = await updateTestimonial(id, updates);
        return NextResponse.json({ ok });
      }
      case "delete": {
        const { id } = body;
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
        const ok = await deleteTestimonial(id);
        return NextResponse.json({ ok });
      }
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
