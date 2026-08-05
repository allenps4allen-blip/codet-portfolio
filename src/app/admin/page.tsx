"use client";

import { useState, useEffect, useCallback } from "react";

interface OverviewData {
  analytics: { totalVisits: number; totalMessages: number; totalConversions: number; conversionRate: number } | null;
  clients: { total: number; active: number } | null;
  blog: { total: number; published: number; drafts: number } | null;
}

function StatCard({ label, value, sub, color, href }: { label: string; value: string | number; sub?: string; color?: string; href?: string }) {
  const card = (
    <div style={{
      padding: "20px 22px", background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
      cursor: href ? "pointer" : "default", transition: "border-color 0.2s",
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || "#e9edef", marginTop: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
  if (href) return <a href={href} style={{ textDecoration: "none" }}>{card}</a>;
  return card;
}

function QuickLink({ label, href, description }: { label: string; href: string; description: string }) {
  return (
    <a href={href} style={{
      display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12, textDecoration: "none", transition: "border-color 0.2s",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#e9edef" }}>{label}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{description}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  );
}

export default function AdminHomePage() {
  const [data, setData] = useState<OverviewData>({ analytics: null, clients: null, blog: null });
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setError("Invalid password");
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [statsRes, tenantsRes, blogRes] = await Promise.all([
      fetch("/api/admin/stats?days=7").catch(() => null),
      fetch("/api/admin/tenants").catch(() => null),
      fetch("/api/admin/blog").catch(() => null),
    ]);

    if (statsRes?.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }

    const overview: OverviewData = { analytics: null, clients: null, blog: null };

    if (statsRes?.ok) {
      const d = await statsRes.json();
      overview.analytics = d.summary ? {
        totalVisits: d.summary.totalVisits,
        totalMessages: d.summary.totalMessages,
        totalConversions: d.summary.totalConversions,
        conversionRate: d.summary.conversionRate,
      } : null;
    }

    if (tenantsRes?.ok) {
      const d = await tenantsRes.json();
      const tenants = d.tenants || [];
      overview.clients = { total: tenants.length, active: tenants.filter((t: { active: boolean }) => t.active).length };
    }

    if (blogRes?.ok) {
      const d = await blogRes.json();
      const posts = d.posts || [];
      overview.blog = {
        total: posts.length,
        published: posts.filter((p: { status: string }) => p.status === "published").length,
        drafts: posts.filter((p: { status: string }) => p.status === "draft").length,
      };
    }

    setData(overview);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  // Try to load on mount (cookie may already exist)
  useEffect(() => {
    fetch("/api/admin/stats?days=1").then((r) => {
      if (r.ok) { setAuthed(true); }
      else setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
        <form onSubmit={login} style={{ width: 340, padding: 32, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, color: "#e9edef", margin: 0 }}>Admin Panel</h1>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>CODET</p>
            </div>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" autoFocus
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#e9edef", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none", marginBottom: 12 }} />
          {error && <p style={{ fontSize: 12, color: "#ff6b6b", margin: "0 0 8px 0" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: "#00a884", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#e9edef", margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: "6px 0 0 0" }}>
            {loading ? "Loading..." : "CODET Admin — Overview"}
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
          <StatCard label="Demo Visits" value={data.analytics?.totalVisits ?? "—"} sub="last 7 days" href="/admin/analytics" />
          <StatCard label="Messages" value={data.analytics?.totalMessages ?? "—"} sub="agent conversations" href="/admin/analytics" />
          <StatCard label="Conversions" value={data.analytics?.totalConversions ?? "—"} sub={`${(data.analytics?.conversionRate ?? 0).toFixed(1)}% rate`} color="#00a884" href="/admin/analytics" />
          <StatCard label="Active Clients" value={data.clients?.active ?? "—"} sub={`${data.clients?.total ?? 0} total`} color="#6366f1" href="/admin/clients" />
          <StatCard label="Blog Posts" value={data.blog?.published ?? "—"} sub={`${data.blog?.drafts ?? 0} drafts`} color="#f59e0b" href="/admin/blog" />
        </div>

        {/* Quick Links */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
            Quick Access
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <QuickLink label="Analytics" href="/admin/analytics" description="Agent performance, conversion tracking, topic analysis" />
          <QuickLink label="Client Management" href="/admin/clients" description="Manage clients, projects, invoices, and shared files" />
          <QuickLink label="Blog Manager" href="/admin/blog" description="Create and manage bilingual blog posts" />
          <QuickLink label="Testimonials" href="/admin/testimonials" description="Manage client reviews shown on the homepage" />
          <QuickLink label="View Site" href="/en" description="Open the live CODET website" />
        </div>
      </div>
    </div>
  );
}
