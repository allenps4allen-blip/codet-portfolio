"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ──

interface ClientDailyStats {
  conversations: number;
  messages: number;
  actionsCompleted: number;
  handoffs: number;
  ratings: number[];
  totalDurationSeconds: number;
  intents: Record<string, number>;
  actions: Record<string, number>;
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

interface Milestone { id: string; label: string; completed: boolean; completedAt: string | null; }
interface Project { id: string; name: string; status: string; milestones: Milestone[]; }
interface Update { id: string; message: string; createdAt: string; }
interface Invoice { id: string; description: string; amount: number; currency: string; status: string; issuedAt: string; paidAt: string | null; }
interface SharedLink { id: string; title: string; url: string; category: string; createdAt: string; }

interface PortalData {
  projects: Project[];
  updates: Update[];
  invoices: Invoice[];
  links: SharedLink[];
}

type Tab = "overview" | "analytics" | "invoices" | "files";

// ── Helpers ──

function formatHour(h: number): string {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  return `${Math.round(seconds / 60)}m`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

// ── Shared Components ──

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
  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100, padding: "0 4px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{d.value || ""}</span>
            <div style={{
              width: "100%", maxWidth: 28,
              height: `${(d.value / max) * 70}px`,
              minHeight: d.value > 0 ? 4 : 0,
              background: color || "#00a884",
              borderRadius: "4px 4px 0 0",
            }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Overview ──

function OverviewTab({ portal, summary }: { portal: PortalData; summary: ClientSummary | null }) {
  const activeProject = portal.projects.find((p) => p.status === "active");
  const completedMilestones = activeProject ? activeProject.milestones.filter((m) => m.completed).length : 0;
  const totalMilestones = activeProject ? activeProject.milestones.length : 0;
  const progressPct = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Project Progress */}
      {activeProject && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Project: {activeProject.name}</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{completedMilestones} of {totalMilestones} milestones</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#00a884" }}>{Math.round(progressPct)}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(90deg, #00a884, #005c4b)", borderRadius: 4, transition: "width 0.5s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeProject.milestones.map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `2px solid ${m.completed ? "#00a884" : "rgba(255,255,255,0.1)"}`,
                  background: m.completed ? "#00a884" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {m.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
                  {!m.completed && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: 13, color: m.completed ? "rgba(255,255,255,0.5)" : "#e9edef", textDecoration: m.completed ? "line-through" : "none" }}>
                  {m.label}
                </span>
                {m.completedAt && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>{formatDate(m.completedAt)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Updates */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Recent Updates</div>
        {portal.updates.length === 0 && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>No updates yet</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {portal.updates.slice(0, 5).map((u) => (
            <div key={u.id} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00a884", marginTop: 6, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, color: "#e9edef", margin: 0, lineHeight: 1.5 }}>{u.message}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", margin: "4px 0 0 0" }}>{timeAgo(u.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      {summary && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <StatCard label="Conversations" value={summary.totalConversations} sub="this week" />
          <StatCard label="Actions" value={summary.totalActions} sub="completed" accent />
          <StatCard label="Peak Hour" value={formatHour(summary.peakHour)} sub="busiest time" />
        </div>
      )}
    </div>
  );
}

// ── Tab: Analytics ──

function AnalyticsTab({ data, days, setDays }: { data: DashboardData | null; days: number; setDays: (d: number) => void }) {
  const summary = data?.summary;
  const range = data?.range || [];

  const convChart = [...range].reverse().map((r) => ({ name: r.date.slice(5), value: r.stats.conversations }));
  const actChart = [...range].reverse().map((r) => ({ name: r.date.slice(5), value: r.stats.actionsCompleted }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        {[7, 14, 30].map((d) => (
          <button key={d} onClick={() => setDays(d)} style={{
            padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)",
            background: days === d ? "#00a884" : "transparent",
            color: days === d ? "white" : "rgba(255,255,255,0.4)",
            fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>{d}d</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        <StatCard label="Conversations" value={summary?.totalConversations ?? "—"} sub="handled" />
        <StatCard label="Actions" value={summary?.totalActions ?? "—"} sub="completed" accent />
        <StatCard label="Handoff Rate" value={summary ? `${summary.handoffRate.toFixed(1)}%` : "—"} sub={`${summary?.totalHandoffs ?? 0} escalated`} />
        <StatCard label="Avg Duration" value={summary ? formatDuration(summary.avgDurationSeconds) : "—"} sub="per chat" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <BarChart data={convChart} label="Conversations" />
        <BarChart data={actChart} label="Actions Completed" color="#6366f1" />
      </div>

      {summary && summary.topIntents.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Top Customer Questions</div>
          {summary.topIntents.map((i) => {
            const max = Math.max(...summary.topIntents.map((x) => x.count), 1);
            return (
              <div key={i.intent} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", width: 100, textTransform: "capitalize" }}>{i.intent}</span>
                <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(i.count / max) * 100}%`, height: "100%", background: "linear-gradient(90deg, #00a884, #005c4b)", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", width: 24, textAlign: "right" }}>{i.count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Tab: Invoices ──

function InvoicesTab({ invoices }: { invoices: Invoice[] }) {
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  const statusColors: Record<string, string> = { paid: "#00a884", pending: "#f59e0b", overdue: "#ff6b6b" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <StatCard label="Total Paid" value={`${totalPaid.toFixed(0)} KWD`} accent />
        <StatCard label="Outstanding" value={`${totalPending.toFixed(0)} KWD`} sub={`${invoices.filter((i) => i.status !== "paid").length} invoices`} />
      </div>

      {invoices.length === 0 && (
        <div style={{ ...s.section, textAlign: "center", padding: 40 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>No invoices yet</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {invoices.map((inv) => (
          <div key={inv.id} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#e9edef" }}>{inv.description}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{formatDate(inv.issuedAt)}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e9edef" }}>{inv.amount} {inv.currency}</div>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 10,
              background: `${statusColors[inv.status]}20`,
              color: statusColors[inv.status],
              textTransform: "capitalize",
            }}>
              {inv.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Files ──

function FilesTab({ links }: { links: SharedLink[] }) {
  const categoryIcons: Record<string, string> = { design: "🎨", document: "📄", asset: "📦", other: "🔗" };
  const categoryLabels: Record<string, string> = { design: "Design", document: "Document", asset: "Asset", other: "Link" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {links.length === 0 && (
        <div style={{ ...s.section, textAlign: "center", padding: 40 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>No shared files yet</p>
        </div>
      )}

      {links.map((link) => (
        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10, textDecoration: "none", transition: "border-color 0.2s ease",
        }}>
          <span style={{ fontSize: 20 }}>{categoryIcons[link.category] || "🔗"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#e9edef" }}>{link.title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>
              {categoryLabels[link.category] || "Link"} · {timeAgo(link.createdAt)}
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      ))}
    </div>
  );
}

// ── Login Form ──

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
            <h1 style={{ fontSize: 18, fontWeight: 600, color: "#e9edef", margin: 0 }}>Client Portal</h1>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>Powered by CODET</p>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoFocus
            style={{ ...s.input, marginBottom: 8 }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            style={s.input} />
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

// ── Main Dashboard ──

export default function ClientDashboard() {
  const [authed, setAuthed] = useState(false);
  const [clientName, setClientName] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [analytics, setAnalytics] = useState<DashboardData | null>(null);
  const [portal, setPortal] = useState<PortalData | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [statsRes, portalRes] = await Promise.all([
      fetch(`/api/client/stats?days=${days}`),
      fetch("/api/client/portal"),
    ]);

    if (statsRes.status === 401 || portalRes.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }

    if (statsRes.ok) setAnalytics(await statsRes.json());
    if (portalRes.ok) setPortal(await portalRes.json());
    setLoading(false);
  }, [days]);

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed, fetchAll]);

  if (!authed) return <LoginForm onLogin={(name) => { setClientName(name); setAuthed(true); }} />;

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "invoices", label: "Invoices" },
    { id: "files", label: "Files" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#050505", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#e9edef" }}>{clientName}</span>
          {loading && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>Loading...</span>}
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none",
              background: tab === t.id ? "rgba(0,168,132,0.15)" : "transparent",
              color: tab === t.id ? "#00a884" : "rgba(255,255,255,0.35)",
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
        {tab === "overview" && portal && <OverviewTab portal={portal} summary={analytics?.summary || null} />}
        {tab === "analytics" && <AnalyticsTab data={analytics} days={days} setDays={setDays} />}
        {tab === "invoices" && <InvoicesTab invoices={portal?.invoices || []} />}
        {tab === "files" && <FilesTab links={portal?.links || []} />}
      </div>

      <div style={{ textAlign: "center", padding: "0 0 24px", fontSize: 10, color: "rgba(255,255,255,0.1)" }}>
        Powered by CODET · codet-kw.com
      </div>
    </div>
  );
}

// ── Styles ──

const s: Record<string, React.CSSProperties> = {
  card: {
    padding: "16px 18px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 600,
    color: "#e9edef",
    marginTop: 4,
  },
  cardSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.2)",
    marginTop: 2,
  },
  section: {
    padding: 20,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 16,
  },
  input: {
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
