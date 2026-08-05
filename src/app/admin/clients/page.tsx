"use client";

import { useState, useEffect, useCallback } from "react";

interface TenantWithStats {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  createdAt: string;
  active: boolean;
  weeklyStats: {
    totalConversations: number;
    totalActions: number;
    handoffRate: number;
    avgRating: number;
  };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{
        padding: "4px 10px", borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.08)",
        background: copied ? "rgba(0,168,132,0.2)" : "transparent",
        color: copied ? "#00a884" : "rgba(255,255,255,0.4)",
        fontSize: 11, cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {copied ? "Copied!" : "Copy Key"}
    </button>
  );
}

export default function AdminClientsPage() {
  const [tenants, setTenants] = useState<TenantWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/tenants");
    if (res.ok) {
      const data = await res.json();
      setTenants(data.tenants);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setFormError("");

    const res = await fetch("/api/admin/tenants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName, email: formEmail, password: formPassword }),
    });

    if (res.ok) {
      setFormName("");
      setFormEmail("");
      setFormPassword("");
      setShowForm(false);
      fetchTenants();
    } else {
      const data = await res.json();
      setFormError(data.error || "Failed to create client");
    }
    setCreating(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#e9edef", margin: 0 }}>Client Management</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>
              {loading ? "Loading..." : `${tenants.length} client${tenants.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/admin/analytics" style={{
              padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600,
              textDecoration: "none", display: "inline-flex", alignItems: "center",
            }}>
              ← Analytics
            </a>
            <button onClick={() => setShowForm(!showForm)} style={{
              padding: "8px 16px", borderRadius: 8, border: "none",
              background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              + Add Client
            </button>
          </div>
        </div>

        {/* Create form */}
        {showForm && (
          <form onSubmit={handleCreate} style={{
            padding: 20, marginBottom: 24, background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,168,132,0.3)", borderRadius: 12,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                placeholder="Business name" required style={inputStyle} />
              <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                placeholder="Client email" required style={inputStyle} />
              <input type="text" value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                placeholder="Dashboard password (6+ chars)" required minLength={6} style={inputStyle} />
            </div>
            {formError && <p style={{ fontSize: 12, color: "#ff6b6b", margin: "0 0 8px 0" }}>{formError}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" disabled={creating} style={{
                padding: "8px 20px", borderRadius: 8, border: "none",
                background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", opacity: creating ? 0.5 : 1,
              }}>
                {creating ? "Creating..." : "Create Client"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{
                padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Tenant list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tenants.map((tenant) => (
            <div key={tenant.id} style={{
              padding: 20, background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e9edef", margin: 0 }}>{tenant.name}</h3>
                    <span style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 10,
                      background: tenant.active ? "rgba(0,168,132,0.15)" : "rgba(255,100,100,0.15)",
                      color: tenant.active ? "#00a884" : "#ff6b6b",
                    }}>
                      {tenant.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>{tenant.email}</p>
                </div>
                <CopyButton text={tenant.apiKey} />
              </div>

              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <code style={{
                  fontSize: 10, padding: "4px 8px", borderRadius: 6,
                  background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)",
                  fontFamily: "monospace", wordBreak: "break-all",
                }}>
                  {tenant.apiKey.slice(0, 12)}...{tenant.apiKey.slice(-8)}
                </code>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Conversations</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "#e9edef" }}>{tenant.weeklyStats.totalConversations}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>this week</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Actions</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "#00a884" }}>{tenant.weeklyStats.totalActions}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>completed</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Handoff Rate</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: tenant.weeklyStats.handoffRate > 20 ? "#ff6b6b" : "#e9edef" }}>
                    {tenant.weeklyStats.handoffRate.toFixed(0)}%
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>needed human</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Rating</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: "#f59e0b" }}>
                    {tenant.weeklyStats.avgRating > 0 ? tenant.weeklyStats.avgRating.toFixed(1) : "—"}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>avg score</div>
                </div>
              </div>
            </div>
          ))}

          {!loading && tenants.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
              No clients yet. Click &quot;+ Add Client&quot; to create your first one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "#e9edef",
  fontSize: 13,
  fontFamily: "inherit",
  boxSizing: "border-box",
  outline: "none",
};
