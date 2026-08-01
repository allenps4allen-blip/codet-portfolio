import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      website: "Website Development",
      ai: "AI Agents & Chatbots",
      automation: "Automations & Workflows",
      other: "Other",
    };

    await resend.emails.send({
      from: "CODET Contact Form <onboarding@resend.dev>",
      to: "codet.kuwait@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name} — ${serviceLabels[service] || service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${serviceLabels[service] || service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
