"use client";

import { useState, useEffect, useCallback } from "react";

interface DailyStats {
  demoVisits: number;
  messages: number;
  promptClicks: number;
  widgetClicks: number;
  whatsappClicks: number;
  contactSubmits: number;
  conversions: number;
  topics: Record<string, number>;
  hours: Record<string, number>;
}

interface Summary {
  totalVisits: number;
  totalMessages: number;
  totalConversions: number;
  conversionRate: number;
  topTopics: { topic: string; count: number }[];
  peakHour: number;
  whatsappClicks: number;
  contactSubmits: number;
}

interface DashboardData {
  range: { date: string; stats: DailyStats }[];
  summary: Summary;
}

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

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={s.card}>
      <div style={s.cardLabel}>{label}</div>
      <div style={s.cardValue}>{value}</div>
      {sub && <div style={s.cardSub}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, label }: { data: { name: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, padding: "0 4px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{d.value || ""}</span>
            <div
              style={{
                width: "100%",
                maxWidth: 32,
                height: `${(d.value / max) * 80}px`,
                minHeight: d.value > 0 ? 4 : 0,
                background: "#00a884",
                borderRadius: "4px 4px 0 0",
                transition: "height 0.3s ease",
              }}
            />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicsList({ topics }: { topics: { topic: string; count: number }[] }) {
  const max = Math.max(...topics.map((t) => t.count), 1);
  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>What People Ask About</div>
      {topics.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", padding: 12 }}>No data yet</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {topics.map((t) => (
          <div key={t.topic} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", width: 90, flexShrink: 0 }}>
              {TOPIC_LABELS[t.topic] || t.topic}
            </span>
            <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  width: `${(t.count / max) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #00a884, #005c4b)",
                  borderRadius: 4,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", width: 30, textAlign: "right" }}>{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HourlyHeatmap({ range }: { range: { date: string; stats: DailyStats }[] }) {
  const hourTotals: Record<string, number> = {};
  for (const { stats } of range) {
    for (const [hour, count] of Object.entries(stats.hours)) {
      hourTotals[hour] = (hourTotals[hour] || 0) + count;
    }
  }
  const max = Math.max(...Object.values(hourTotals), 1);

  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: hourTotals[String(i)] || 0,
  }));

  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>When Visitors Are Active</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {hours.map((h) => {
          const intensity = h.count / max;
          return (
            <div
              key={h.hour}
              title={`${formatHour(h.hour)}: ${h.count} events`}
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                background: h.count > 0 ? `rgba(0, 168, 132, ${0.15 + intensity * 0.85})` : "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                color: intensity > 0.5 ? "white" : "rgba(255,255,255,0.3)",
                cursor: "default",
              }}
            >
              {h.hour}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>
        Hours shown in server timezone (UTC)
      </div>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onLogin();
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
      <form onSubmit={handleSubmit} style={{ width: 320, padding: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#e9edef", margin: "0 0 4px 0" }}>Agent Analytics</h1>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "0 0 24px 0" }}>Enter your admin password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "#e9edef",
            fontSize: 14,
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        {error && <p style={{ fontSize: 12, color: "#ff6b6b", margin: "8px 0 0 0" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "10px 0",
            borderRadius: 8,
            border: "none",
            background: "#00a884",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading || !password ? 0.5 : 1,
            fontFamily: "inherit",
          }}
        >
          {loading ? "..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/stats?days=${days}`);
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    if (res.ok) {
      setData(await res.json());
    }
    setLoading(false);
  }, [days]);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  if (!authed) return <LoginForm onLogin={() => setAuthed(true)} />;

  const summary = data?.summary;
  const range = data?.range || [];

  const chartData = [...range].reverse().map((r) => ({
    name: r.date.slice(5),
    value: r.stats.demoVisits,
  }));

  const conversionData = [...range].reverse().map((r) => ({
    name: r.date.slice(5),
    value: r.stats.conversions,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#e9edef", margin: 0 }}>Agent Performance</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>
              {loading ? "Loading..." : `Last ${days} days`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <a href="/admin/clients" style={{
              padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600,
              textDecoration: "none", display: "inline-flex", alignItems: "center",
            }}>
              Clients &rarr;
            </a>
            <a href="/admin/blog" style={{
              padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600,
              textDecoration: "none", display: "inline-flex", alignItems: "center",
            }}>
              Blog &rarr;
            </a>
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: days === d ? "#00a884" : "transparent",
                  color: days === d ? "white" : "rgba(255,255,255,0.4)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
          <StatCard label="Demo Sessions" value={summary?.totalVisits ?? "—"} sub="total this week" />
          <StatCard label="Messages Sent" value={summary?.totalMessages ?? "—"} sub="conversations engaged" />
          <StatCard
            label="Conversion Rate"
            value={summary ? `${summary.conversionRate.toFixed(1)}%` : "—"}
            sub={`${summary?.totalConversions ?? 0} leads from demo`}
          />
          <StatCard
            label="Peak Activity"
            value={summary ? formatHour(summary.peakHour) : "—"}
            sub="busiest hour"
          />
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <BarChart data={chartData} label="Demo Visits" />
          <BarChart data={conversionData} label="Conversions (Demo → Lead)" />
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <TopicsList topics={summary?.topTopics || []} />
          <HourlyHeatmap range={range} />
        </div>

        {/* Conversion breakdown */}
        <div style={s.chartBox}>
          <div style={s.chartTitle}>Conversion Breakdown</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "4px 0" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#00a884" }}>{summary?.whatsappClicks ?? 0}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>WhatsApp clicks</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#00a884" }}>{summary?.contactSubmits ?? 0}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Contact form submissions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  card: {
    padding: "18px 20px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 600,
    color: "#e9edef",
    marginTop: 4,
  },
  cardSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    marginTop: 2,
  },
  chartBox: {
    padding: 20,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 16,
  },
};
