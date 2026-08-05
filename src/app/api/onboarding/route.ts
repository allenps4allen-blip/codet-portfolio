import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, timeline, description, branding, channels } = body;

    if (!name || !email || !service) {
      return NextResponse.json({ error: "name, email, and service required" }, { status: 400 });
    }

    const summary = `
New Client Onboarding Submission
================================

Name: ${name}
Email: ${email}
Company: ${company || "Not specified"}
Service: ${service}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}
Has Branding: ${branding || "Not specified"}
Channels: ${channels || "Not specified"}

Project Description:
${description || "No description provided"}
    `.trim();

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "CODET Onboarding <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL || "codet.kuwait@gmail.com",
        subject: `New Onboarding: ${company || name} — ${service}`,
        text: summary,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
