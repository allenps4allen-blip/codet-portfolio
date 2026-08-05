"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ──

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

type PortalTab = "project" | "updates" | "invoices" | "links";

// ── Helpers ──

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Shared ──

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

// ── Portal Action Helper ──

async function portalAction(action: string, tenantId: string, extra: Record<string, unknown> = {}): Promise<Record<string, unknown> | null> {
  const res = await fetch("/api/admin/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, tenantId, ...extra }),
  });
  if (res.ok) return res.json();
  return null;
}

// ── Portal: Project Manager ──

function ProjectManager({ tenantId, projects, onRefresh }: { tenantId: string; projects: Project[]; onRefresh: () => void }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [creating, setCreating] = useState(false);

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    setCreating(true);
    await portalAction("createProject", tenantId, { name: newProjectName });
    setNewProjectName("");
    setCreating(false);
    onRefresh();
  };

  const toggleMilestone = async (projectId: string, milestoneId: string, completed: boolean) => {
    await portalAction("updateMilestone", tenantId, { projectId, milestoneId, completed: !completed });
    onRefresh();
  };

  const setStatus = async (projectId: string, status: string) => {
    await portalAction("updateProjectStatus", tenantId, { projectId, status });
    onRefresh();
  };

  const statusColors: Record<string, string> = { active: "#00a884", completed: "#6366f1", paused: "#f59e0b" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Create project */}
      <div style={{ display: "flex", gap: 8 }}>
        <input value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} placeholder="New project name..."
          onKeyDown={(e) => e.key === "Enter" && createProject()}
          style={{ ...inputStyle, flex: 1 }} />
        <button onClick={createProject} disabled={creating || !newProjectName.trim()} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", opacity: !newProjectName.trim() ? 0.4 : 1, whiteSpace: "nowrap",
        }}>
          + Project
        </button>
      </div>

      {projects.length === 0 && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>No projects yet</p>}

      {projects.map((project) => {
        const completedCount = project.milestones.filter((m) => m.completed).length;
        const total = project.milestones.length;
        const pct = total > 0 ? (completedCount / total) * 100 : 0;

        return (
          <div key={project.id} style={{ padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#e9edef" }}>{project.name}</span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 8,
                  background: `${statusColors[project.status] || "#888"}20`,
                  color: statusColors[project.status] || "#888",
                  textTransform: "capitalize",
                }}>{project.status}</span>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {["active", "paused", "completed"].filter((s) => s !== project.status).map((s) => (
                  <button key={s} onClick={() => setStatus(project.id, s)} style={{
                    padding: "3px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)",
                    background: "transparent", color: statusColors[s], fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                    textTransform: "capitalize",
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{completedCount}/{total}</span>
                <span style={{ fontSize: 10, color: "#00a884", fontWeight: 600 }}>{Math.round(pct)}%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#00a884", borderRadius: 2, transition: "width 0.3s" }} />
              </div>
            </div>

            {/* Milestones */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {project.milestones.map((m) => (
                <div key={m.id} onClick={() => toggleMilestone(project.id, m.id, m.completed)}
                  style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "4px 0" }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: `2px solid ${m.completed ? "#00a884" : "rgba(255,255,255,0.1)"}`,
                    background: m.completed ? "#00a884" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {m.completed && <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
                  </div>
                  <span style={{ fontSize: 12, color: m.completed ? "rgba(255,255,255,0.35)" : "#e9edef", textDecoration: m.completed ? "line-through" : "none" }}>
                    {m.label}
                  </span>
                  {m.completedAt && <span style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", marginLeft: "auto" }}>{formatDate(m.completedAt)}</span>}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Portal: Updates Manager ──

function UpdatesManager({ tenantId, updates, onRefresh }: { tenantId: string; updates: Update[]; onRefresh: () => void }) {
  const [msg, setMsg] = useState("");
  const [posting, setPosting] = useState(false);

  const post = async () => {
    if (!msg.trim()) return;
    setPosting(true);
    await portalAction("postUpdate", tenantId, { message: msg });
    setMsg("");
    setPosting(false);
    onRefresh();
  };

  const remove = async (updateId: string) => {
    await portalAction("deleteUpdate", tenantId, { updateId });
    onRefresh();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Post an update to the client..."
          onKeyDown={(e) => e.key === "Enter" && post()}
          style={{ ...inputStyle, flex: 1 }} maxLength={1000} />
        <button onClick={post} disabled={posting || !msg.trim()} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", opacity: !msg.trim() ? 0.4 : 1, whiteSpace: "nowrap",
        }}>
          Post
        </button>
      </div>

      {updates.length === 0 && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>No updates posted</p>}

      {updates.map((u) => (
        <div key={u.id} style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
          padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, color: "#e9edef", margin: 0, lineHeight: 1.5 }}>{u.message}</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", margin: "4px 0 0 0" }}>{formatDate(u.createdAt)}</p>
          </div>
          <button onClick={() => remove(u.id)} style={{
            padding: "4px 8px", borderRadius: 4, border: "1px solid rgba(255,100,100,0.15)",
            background: "transparent", color: "#ff6b6b", fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Portal: Invoice Manager ──

function InvoiceManager({ tenantId, invoices, onRefresh }: { tenantId: string; invoices: Invoice[]; onRefresh: () => void }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [adding, setAdding] = useState(false);

  const addInvoice = async () => {
    const num = parseFloat(amount);
    if (!desc.trim() || isNaN(num) || num <= 0) return;
    setAdding(true);
    await portalAction("addInvoice", tenantId, { description: desc, amount: num, currency: "KWD" });
    setDesc("");
    setAmount("");
    setAdding(false);
    onRefresh();
  };

  const setStatus = async (invoiceId: string, status: string) => {
    await portalAction("updateInvoiceStatus", tenantId, { invoiceId, status });
    onRefresh();
  };

  const statusColors: Record<string, string> = { paid: "#00a884", pending: "#f59e0b", overdue: "#ff6b6b" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description (e.g. Phase 1 payment)"
          style={{ ...inputStyle, flex: 2 }} />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (KWD)" type="number" step="0.01" min="0"
          onKeyDown={(e) => e.key === "Enter" && addInvoice()}
          style={{ ...inputStyle, flex: 1 }} />
        <button onClick={addInvoice} disabled={adding || !desc.trim() || !amount} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", opacity: !desc.trim() || !amount ? 0.4 : 1, whiteSpace: "nowrap",
        }}>
          + Invoice
        </button>
      </div>

      {invoices.length === 0 && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>No invoices</p>}

      {invoices.map((inv) => (
        <div key={inv.id} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#e9edef" }}>{inv.description}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>{formatDate(inv.issuedAt)}</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e9edef" }}>{inv.amount} {inv.currency}</div>
          <span style={{
            fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 8,
            background: `${statusColors[inv.status]}20`, color: statusColors[inv.status],
            textTransform: "capitalize",
          }}>
            {inv.status}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {["pending", "paid", "overdue"].filter((s) => s !== inv.status).map((s) => (
              <button key={s} onClick={() => setStatus(inv.id, s)} style={{
                padding: "3px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent", color: statusColors[s], fontSize: 9, cursor: "pointer",
                fontFamily: "inherit", textTransform: "capitalize",
              }}>{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Portal: Links Manager ──

function LinksManager({ tenantId, links, onRefresh }: { tenantId: string; links: SharedLink[]; onRefresh: () => void }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("other");
  const [adding, setAdding] = useState(false);

  const addLink = async () => {
    if (!title.trim() || !url.trim()) return;
    setAdding(true);
    await portalAction("addLink", tenantId, { title, url, category });
    setTitle("");
    setUrl("");
    setCategory("other");
    setAdding(false);
    onRefresh();
  };

  const remove = async (linkId: string) => {
    await portalAction("deleteLink", tenantId, { linkId });
    onRefresh();
  };

  const categoryIcons: Record<string, string> = { design: "🎨", document: "📄", asset: "📦", other: "🔗" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ ...inputStyle, flex: 1 }} />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL"
          onKeyDown={(e) => e.key === "Enter" && addLink()}
          style={{ ...inputStyle, flex: 2 }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, width: 100, cursor: "pointer" }}>
          <option value="other">Link</option>
          <option value="design">Design</option>
          <option value="document">Document</option>
          <option value="asset">Asset</option>
        </select>
        <button onClick={addLink} disabled={adding || !title.trim() || !url.trim()} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: "#00a884", color: "white", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit", opacity: !title.trim() || !url.trim() ? 0.4 : 1, whiteSpace: "nowrap",
        }}>
          + Link
        </button>
      </div>

      {links.length === 0 && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>No shared links</p>}

      {links.map((link) => (
        <div key={link.id} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8,
        }}>
          <span style={{ fontSize: 16 }}>{categoryIcons[link.category] || "🔗"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#e9edef" }}>{link.title}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 1 }}>{link.url}</div>
          </div>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>{formatDate(link.createdAt)}</span>
          <button onClick={() => remove(link.id)} style={{
            padding: "4px 8px", borderRadius: 4, border: "1px solid rgba(255,100,100,0.15)",
            background: "transparent", color: "#ff6b6b", fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Client Detail Panel ──

function ClientDetail({ tenant, onClose }: { tenant: TenantWithStats; onClose: () => void }) {
  const [tab, setTab] = useState<PortalTab>("project");
  const [portal, setPortal] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPortal = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/portal?tenantId=${tenant.id}`);
    if (res.ok) setPortal(await res.json());
    setLoading(false);
  }, [tenant.id]);

  useEffect(() => { fetchPortal(); }, [fetchPortal]);

  const tabs: { id: PortalTab; label: string }[] = [
    { id: "project", label: "Projects" },
    { id: "updates", label: "Updates" },
    { id: "invoices", label: "Invoices" },
    { id: "links", label: "Files & Links" },
  ];

  return (
    <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,168,132,0.2)", borderRadius: 12, marginBottom: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{tenant.name.charAt(0)}</span>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e9edef", margin: 0 }}>{tenant.name}</h3>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>{tenant.email}</p>
          </div>
        </div>
        <button onClick={onClose} style={{
          padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)",
          background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 11,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          Close
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 1 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 16px", border: "none", borderBottom: tab === t.id ? "2px solid #00a884" : "2px solid transparent",
            background: "transparent", color: tab === t.id ? "#00a884" : "rgba(255,255,255,0.35)",
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>Loading portal data...</p>}

      {!loading && portal && (
        <>
          {tab === "project" && <ProjectManager tenantId={tenant.id} projects={portal.projects} onRefresh={fetchPortal} />}
          {tab === "updates" && <UpdatesManager tenantId={tenant.id} updates={portal.updates} onRefresh={fetchPortal} />}
          {tab === "invoices" && <InvoiceManager tenantId={tenant.id} invoices={portal.invoices} onRefresh={fetchPortal} />}
          {tab === "links" && <LinksManager tenantId={tenant.id} links={portal.links} onRefresh={fetchPortal} />}
        </>
      )}
    </div>
  );
}

// ── Main Page ──

export default function AdminClientsPage() {
  const [tenants, setTenants] = useState<TenantWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);

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

  const selectedTenant = tenants.find((t) => t.id === selectedTenantId);

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
              &larr; Analytics
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

        {/* Selected client portal */}
        {selectedTenant && (
          <ClientDetail tenant={selectedTenant} onClose={() => setSelectedTenantId(null)} />
        )}

        {/* Tenant list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tenants.map((tenant) => (
            <div key={tenant.id} style={{
              padding: 20, background: selectedTenantId === tenant.id ? "rgba(0,168,132,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${selectedTenantId === tenant.id ? "rgba(0,168,132,0.25)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 12, cursor: "pointer", transition: "border-color 0.2s",
            }} onClick={() => setSelectedTenantId(selectedTenantId === tenant.id ? null : tenant.id)}>
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
                    {selectedTenantId !== tenant.id && (
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)" }}>Click to manage portal</span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>{tenant.email}</p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CopyButton text={tenant.apiKey} />
                </div>
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
