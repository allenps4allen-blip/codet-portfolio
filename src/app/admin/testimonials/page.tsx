"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: string;
  role: { en: string; ar: string };
  rating: number;
  active: boolean;
  order: number;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [quoteEn, setQuoteEn] = useState("");
  const [quoteAr, setQuoteAr] = useState("");
  const [name, setName] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [roleAr, setRoleAr] = useState("");
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) {
      const data = await res.json();
      setItems(data.testimonials || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleAdd = async () => {
    if (!quoteEn || !name) return;
    setSaving(true);
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", quote: { en: quoteEn, ar: quoteAr }, name, role: { en: roleEn, ar: roleAr }, rating, order: items.length }),
    });
    setQuoteEn(""); setQuoteAr(""); setName(""); setRoleEn(""); setRoleAr(""); setRating(5);
    setShowForm(false); setSaving(false);
    fetchAll();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", id, active: !active }),
    });
    fetchAll();
  };

  const remove = async (id: string) => {
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    fetchAll();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050505", padding: "32px 24px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#e9edef", margin: 0 }}>Testimonials</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>
              {loading ? "Loading..." : `${items.length} testimonial${items.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/admin" style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              &larr; Dashboard
            </a>
            <button onClick={() => setShowForm(!showForm)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#00a884", color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              + Add
            </button>
          </div>
        </div>

        {showForm && (
          <div style={{ padding: 20, marginBottom: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,168,132,0.3)", borderRadius: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <textarea value={quoteEn} onChange={(e) => setQuoteEn(e.target.value)} placeholder="Quote (English)" rows={3} style={inputStyle} />
              <textarea value={quoteAr} onChange={(e) => setQuoteAr(e.target.value)} placeholder="اقتباس (عربي)" rows={3} style={{ ...inputStyle, textAlign: "right" as const, direction: "rtl" as const }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", gap: 12, marginBottom: 12 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" style={inputStyle} />
              <input value={roleEn} onChange={(e) => setRoleEn(e.target.value)} placeholder="Role (English)" style={inputStyle} />
              <input value={roleAr} onChange={(e) => setRoleAr(e.target.value)} placeholder="دور (عربي)" style={{ ...inputStyle, textAlign: "right" as const }} />
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ ...inputStyle, cursor: "pointer" }}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleAdd} disabled={saving || !quoteEn || !name} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: "#00a884", color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: !quoteEn || !name ? 0.5 : 1 }}>
                {saving ? "Saving..." : "Add Testimonial"}
              </button>
              <button onClick={() => setShowForm(false)} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item) => (
            <div key={item.id} style={{ padding: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, opacity: item.active ? 1 : 0.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#00a884"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: "#e9edef", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>&ldquo;{item.quote.en}&rdquo;</p>
                  {item.quote.ar && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0", direction: "rtl" }}>{item.quote.ar}</p>}
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: 8 }}>{item.role.en}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginLeft: 16 }}>
                  <button onClick={() => toggleActive(item.id, item.active)} style={{ padding: "4px 10px", borderRadius: 6, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: item.active ? "#f59e0b" : "#00a884", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
                    {item.active ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => remove(item.id)} style={{ padding: "4px 10px", borderRadius: 6, background: "transparent", border: "1px solid rgba(255,100,100,0.2)", color: "#ff6b6b", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && items.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
              No testimonials yet. The site uses hardcoded fallbacks until you add some here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
  color: "#e9edef", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", outline: "none",
};
