"use client";

import { useState, useEffect, useCallback } from "react";

interface ClientDailyStats {
  conversations: number;
  messages: number;
  actionsCompleted: number;
  handoffs: number;
  ratings: number[];
  totalDurationSeconds: number;
  intents: Record<string, number>;
  actions: Record<string, number>;
  handoffReasons: Record<string, number>;
  hours: Record<string, number>;
}

interface ClientSummary {
  totalConversations: number;
  totalMessages: number;
  totalActions: number;
  totalHandoffs: number;
  handoffRate: number;
  avgRating: number;
  avgDurationSeconds: number;
  topIntents: { intent: string; count: number }[];
  topActions: { action: string; count: number }[];
  peakHour: number;
}

interface DashboardData {
  range: { date: string; stats: ClientDailyStats }[];
  summary: ClientSummary;
}

function formatHour(h: number): string {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div style={s.card}>
      <div style={s.cardLabel}>{label}</div>
      <div style={{ ...s.cardValue, color: accent ? "#00a884" : "#e9edef" }}>{value}</div>
      {sub && <div style={s.cardSub}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, label, color }: { data: { name: string; value: number }[]; label: string; color?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barColor = color || "#00a884";
  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, padding: "0 4px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{d.value || ""}</span>
            <div style={{
              width: "100%",
              maxWidth: 32,
              height: `${(d.value / max) * 80}px`,
              minHeight: d.value > 0 ? 4 : 0,
              background: barColor,
              borderRadius: "4px 4px 0 0",
              transition: "height 0.3s ease",
            }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankedList({ title, items, emptyText }: { title: string; items: { label: string; count: number }[]; emptyText?: string }) {
  const max = Math.max(...items.map((t) => t.count), 1);
  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>{title}</div>
      {items.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", padding: 12 }}>{emptyText || "No data yet"}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", width: 110, flexShrink: 0, textTransform: "capitalize" }}>
              {item.label}
            </span>
            <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${(item.count / max) * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #00a884, #005c4b)",
                borderRadius: 4,
                transition: "width 0.5s ease",
              }} />
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", width: 30, textAlign: "right" }}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HourlyHeatmap({ range }: { range: { date: string; stats: ClientDailyStats }[] }) {
  const hourTotals: Record<string, number> = {};
  for (const { stats } of range) {
    for (const [hour, count] of Object.entries(stats.hours)) {
      hourTotals[hour] = (hourTotals[hour] || 0) + count;
    }
  }
  const max = Math.max(...Object.values(hourTotals), 1);
  const hours = Array.from({ length: 24 }, (_, i) => ({ hour: i, count: hourTotals[String(i)] || 0 }));

  return (
    <div style={s.chartBox}>
      <div style={s.chartTitle}>When Your Customers Reach Out</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {hours.map((h) => {
          const intensity = h.count / max;
          return (
            <div key={h.hour} title={`${formatHour(h.hour)}: ${h.count} events`} style={{
              width: 28, height: 28, borderRadius: 4,
              background: h.count > 0 ? `rgba(0, 168, 132, ${0.15 + intensity * 0.85})` : "rgba(255,255,255,0.03)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: intensity > 0.5 ? "white" : "rgba(255,255,255,0.3)", cursor: "default",
            }}>
              {h.hour}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>Hours shown in UTC</div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ fontSize: 16, color: star <= Math.round(rating) ? "#f59e0b" : "rgba(255,255,255,0.1)" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (name: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/client/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      onLogin(data.name);
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
      <form onSubmit={handleSubmit} style={{ width: 360, padding: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, color: "#e9edef", margin: 0 }}>Agent Dashboard</h1>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>Powered by CODET</p>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoFocus
            style={{ ...s.loginInput, marginBottom: 8 }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            style={s.loginInput} />
        </div>

        {error && <p style={{ fontSize: 12, color: "#ff6b6b", margin: "0 0 8px 0" }}>{error}</p>}

        <button type="submit" disabled={loading || !email || !password} style={{
          width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
          background: "#00a884", color: "white", fontSize: 14, fontWeight: 600,
          cursor: loading ? "wait" : "pointer", opacity: loading || !email || !password ? 0.5 : 1, fontFamily: "inherit",
        }}>
          {loading ? "..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function ClientDashboard() {
  const [authed, setAuthed] = useState(false);
  const [clientName, setClientName] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/client/stats?days=${days}`);
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

  if (!authed) {
    return (
      <LoginForm onLogin={(name) => { setClientName(name); setAuthed(true); }} />
    );
  }

  const summary = data?.summary;
  const range = data?.range || [];

  const conversationChart = [...range].reverse().map((r) => ({
    name: r.date.slice(5),
    value: r.stats.conversations,
  }));

  const actionsChart = [...range].reverse().map((r) => ({
    name: r.date.slice(5),
    value: r.stats.actionsCompleted,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 600, color: "#e9edef", margin: 0 }}>{clientName}</h1>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "6px 0 0 0" }}>
              {loading ? "Loading..." : `Agent performance — last ${days} days`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[7, 14, 30].map((d) => (
              <button key={d} onClick={() => setDays(d)} style={{
                padding: "6px 14px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                background: days === d ? "#00a884" : "transparent",
                color: days === d ? "white" : "rgba(255,255,255,0.4)",
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              }}>
                {d}d
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
          <StatCard label="Conversations" value={summary?.totalConversations ?? "—"} sub="handled by your agent" />
          <StatCard label="Actions Completed" value={summary?.totalActions ?? "—"} sub="bookings, orders, etc." accent />
          <StatCard
            label="Handoff Rate"
            value={summary ? `${summary.handoffRate.toFixed(1)}%` : "—"}
            sub={`${summary?.totalHandoffs ?? 0} needed a human`}
          />
          <StatCard
            label="Avg Duration"
            value={summary ? formatDuration(summary.avgDurationSeconds) : "—"}
            sub="per conversation"
          />
          <StatCard
            label="Peak Activity"
            value={summary ? formatHour(summary.peakHour) : "—"}
            sub="busiest hour"
          />
        </div>

        {/* Rating row */}
        {summary && summary.avgRating > 0 && (
          <div style={{ ...s.chartBox, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={s.chartTitle}>Customer Satisfaction</div>
              <StarRating rating={summary.avgRating} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "#f59e0b" }}>{summary.avgRating.toFixed(1)}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>out of 5</div>
          </div>
        )}

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <BarChart data={conversationChart} label="Conversations Per Day" />
          <BarChart data={actionsChart} label="Actions Completed" color="#6366f1" />
        </div>

        {/* Topics & Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <RankedList
            title="What Customers Ask About"
            items={(summary?.topIntents || []).map((i) => ({ label: i.intent, count: i.count }))}
            emptyText="No conversations yet"
          />
          <RankedList
            title="Actions Your Agent Completed"
            items={(summary?.topActions || []).map((a) => ({ label: a.action, count: a.count }))}
            emptyText="No actions recorded yet"
          />
        </div>

        {/* Hourly heatmap */}
        <HourlyHeatmap range={range} />

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
          Powered by CODET · codet-kw.com
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
  loginInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "#e9edef",
    fontSize: 14,
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    outline: "none",
  },
};
