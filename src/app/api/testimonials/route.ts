import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/testimonials";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
