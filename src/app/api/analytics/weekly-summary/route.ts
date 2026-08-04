import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getWeeklySummary } from "@/lib/analytics";

const resend = new Resend(process.env.RESEND_API_KEY);

const TOPIC_LABELS: Record<string, string> = {
  book: "Booking",
  cancel: "Cancellation",
  hours: "Business Hours",
  arabic: "Arabic Support",
  services: "Services",
  reschedule: "Rescheduling",
  default: "General",
};

function formatHour(h: number): string {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await getWeeklySummary();

    const topTopicsHtml = summary.topTopics.length > 0
      ? summary.topTopics.map((t) =>
          `<li style="padding:4px 0;color:#d1d5db;">${TOPIC_LABELS[t.topic] || t.topic}: <strong style="color:#00a884;">${t.count}</strong></li>`
        ).join("")
      : `<li style="color:#6b7280;">No conversations yet</li>`;

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto;background:#111;padding:32px;border-radius:16px;">
        <h1 style="font-size:20px;font-weight:600;color:#e9edef;margin:0 0 4px 0;">Weekly Agent Report</h1>
        <p style="font-size:12px;color:#6b7280;margin:0 0 24px 0;">CODET AI Agent Performance</p>

        <div style="display:flex;gap:12px;margin-bottom:24px;">
          <div style="flex:1;background:#1a1a1a;padding:16px;border-radius:10px;border:1px solid #222;">
            <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Demo Sessions</div>
            <div style="font-size:28px;font-weight:600;color:#e9edef;margin-top:4px;">${summary.totalVisits}</div>
          </div>
          <div style="flex:1;background:#1a1a1a;padding:16px;border-radius:10px;border:1px solid #222;">
            <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Conversions</div>
            <div style="font-size:28px;font-weight:600;color:#00a884;margin-top:4px;">${summary.totalConversions}</div>
            <div style="font-size:11px;color:#6b7280;">${summary.conversionRate.toFixed(1)}% rate</div>
          </div>
        </div>

        <div style="background:#1a1a1a;padding:16px;border-radius:10px;border:1px solid #222;margin-bottom:16px;">
          <div style="font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:8px;">Lead Sources</div>
          <div style="display:flex;gap:20px;">
            <div>
              <span style="font-size:20px;font-weight:600;color:#25D366;">${summary.whatsappClicks}</span>
              <span style="font-size:11px;color:#6b7280;margin-left:6px;">WhatsApp</span>
            </div>
            <div>
              <span style="font-size:20px;font-weight:600;color:#6366f1;">${summary.contactSubmits}</span>
              <span style="font-size:11px;color:#6b7280;margin-left:6px;">Contact Form</span>
            </div>
          </div>
        </div>

        <div style="background:#1a1a1a;padding:16px;border-radius:10px;border:1px solid #222;margin-bottom:16px;">
          <div style="font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:8px;">What People Ask About</div>
          <ul style="list-style:none;padding:0;margin:0;">${topTopicsHtml}</ul>
        </div>

        <div style="background:#1a1a1a;padding:16px;border-radius:10px;border:1px solid #222;">
          <div style="font-size:12px;font-weight:600;color:#9ca3af;margin-bottom:4px;">Peak Activity</div>
          <div style="font-size:16px;color:#e9edef;">${formatHour(summary.peakHour)}</div>
          <div style="font-size:11px;color:#6b7280;">${summary.totalMessages} total messages</div>
        </div>

        <p style="font-size:11px;color:#4b5563;margin-top:24px;text-align:center;">
          <a href="https://www.codet-kw.com/admin/analytics" style="color:#00a884;text-decoration:none;">View full dashboard →</a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "CODET Analytics <onboarding@resend.dev>",
      to: "codet.kuwait@gmail.com",
      subject: `Weekly Agent Report — ${summary.totalVisits} sessions, ${summary.totalConversions} leads`,
      html,
    });

    return NextResponse.json({ ok: true, summary });
  } catch {
    return NextResponse.json({ error: "Failed to send summary" }, { status: 500 });
  }
}
