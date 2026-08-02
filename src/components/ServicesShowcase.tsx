"use client";

import { useState, useEffect } from "react";

function WebsiteDemo() {
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2000;
    const pause = 1500;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const cycle = elapsed % (duration + pause);
      const p = Math.min(1, cycle / duration);
      setLoadProgress(p);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={demo.browserWrap}>
      <div style={demo.browserBar}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ ...demo.dot, background: "#ff5f57" }} />
          <div style={{ ...demo.dot, background: "#febc2e" }} />
          <div style={{ ...demo.dot, background: "#28c840" }} />
        </div>
        <div style={demo.urlBar}>yourcompany.com</div>
        <div style={{ width: 36 }} />
      </div>
      <div style={demo.browserBody}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 2, background: "#00a884", width: `${loadProgress * 100}%`, transition: "width 0.05s linear", borderRadius: 1, zIndex: 2 }} />
        <div style={{ ...demo.block, width: "65%", height: 14, opacity: loadProgress > 0.15 ? 1 : 0, transition: "opacity 0.3s ease", background: "rgba(255,255,255,0.15)" }} />
        <div style={{ ...demo.block, width: "45%", height: 8, marginTop: 6, opacity: loadProgress > 0.25 ? 1 : 0, transition: "opacity 0.3s ease" }} />
        <div style={{ ...demo.block, width: "30%", height: 22, marginTop: 12, borderRadius: 6, opacity: loadProgress > 0.35 ? 1 : 0, transition: "opacity 0.3s ease", background: "rgba(0,168,132,0.4)" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          {[0.45, 0.55, 0.65].map((t, i) => (
            <div key={i} style={{ flex: 1, opacity: loadProgress > t ? 1 : 0, transition: "opacity 0.3s ease, transform 0.3s ease", transform: loadProgress > t ? "translateY(0)" : "translateY(8px)" }}>
              <div style={{ ...demo.block, height: 36, borderRadius: 6 }} />
              <div style={{ ...demo.block, width: "80%", height: 6, marginTop: 6 }} />
              <div style={{ ...demo.block, width: "60%", height: 6, marginTop: 4 }} />
            </div>
          ))}
        </div>
        {loadProgress >= 1 && (
          <div style={{ position: "absolute", bottom: 8, right: 10, display: "flex", alignItems: "center", gap: 5, animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#00a884" strokeWidth="2.5" /><path d="M8 12l3 3 5-5" stroke="#00a884" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 10, color: "#00a884", fontWeight: 700 }}>100 / 100</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AgentDemo() {
  const msgs = [
    { from: "user", text: "What are your hours?" },
    { from: "bot", text: "We're open Sun–Thu, 9 AM – 6 PM! Need to book?" },
    { from: "user", text: "Yes, tomorrow at 10" },
    { from: "bot", text: "✅ Done! See you at 10 AM." },
  ];
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const totalDuration = msgs.length * 800;
    const pause = 2000;
    const cycle = totalDuration + pause;

    const tick = () => {
      const now = Date.now();
      const elapsed = now % cycle;
      const count = Math.min(msgs.length, Math.floor(elapsed / 800) + 1);
      if (elapsed > totalDuration) {
        setVisibleCount(msgs.length);
      } else {
        setVisibleCount(count);
      }
    };

    const interval = setInterval(tick, 200);
    tick();
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={demo.chatWrap}>
      <div style={demo.chatHeader}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)" }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#e9edef" }}>AI Assistant</div>
          <div style={{ fontSize: 9, color: "#00a884" }}>online</div>
        </div>
      </div>
      <div style={demo.chatBody}>
        {msgs.slice(0, visibleCount).map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", animation: "fadeSlideIn 0.3s ease-out" }}>
            <div style={{ fontSize: 10, lineHeight: 1.4, padding: "5px 8px", borderRadius: 8, maxWidth: "78%", color: "#e9edef", background: m.from === "user" ? "#005c4b" : "rgba(255,255,255,0.08)", ...(m.from === "user" ? { borderBottomRightRadius: 3 } : { borderBottomLeftRadius: 3 }) }}>
              {m.text}
            </div>
          </div>
        ))}
        {visibleCount > 0 && visibleCount < msgs.length && visibleCount % 2 === 1 && (
          <div style={{ display: "flex", gap: 3, padding: "4px 8px", animation: "fadeSlideIn 0.2s ease-out" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.3)", animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function AutomationDemo() {
  const [step, setStep] = useState(0);
  const nodes = ["Email", "Extract", "CRM", "Notify"];

  useEffect(() => {
    const totalSteps = nodes.length;
    const stepDuration = 600;
    const pause = 2000;
    const cycle = totalSteps * stepDuration + pause;

    const tick = () => {
      const now = Date.now();
      const elapsed = now % cycle;
      const s = Math.min(totalSteps, Math.floor(elapsed / stepDuration));
      setStep(s);
    };

    const interval = setInterval(tick, 150);
    tick();
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={demo.autoWrap}>
      <div style={demo.autoFlow}>
        {nodes.map((n, i) => (
          <div key={i} style={demo.autoNodeRow}>
            <div style={{
              ...demo.autoNode,
              color: i < step ? "#050505" : "rgba(255,255,255,0.3)",
              background: i < step ? "#00a884" : "rgba(255,255,255,0.06)",
              borderColor: i < step ? "#00a884" : "rgba(255,255,255,0.08)",
              transform: i < step ? "scale(1.05)" : "scale(1)",
            }}>
              {n}
            </div>
            {i < nodes.length - 1 && (
              <div style={{
                ...demo.autoConnector,
                background: i < step - 1 ? "#00a884" : "rgba(255,255,255,0.08)",
              }}>
                <div style={{
                  ...demo.autoArrow,
                  borderColor: i < step - 1 ? "#00a884" : "rgba(255,255,255,0.15)",
                }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {step >= nodes.length && (
        <div style={{ textAlign: "center" as const, marginTop: 14, animation: "fadeSlideIn 0.4s ease-out" }}>
          <span style={{ fontSize: 10, color: "#00a884", fontWeight: 600 }}>&#x2713; Workflow completed in 1.2s</span>
        </div>
      )}
    </div>
  );
}

const services = [
  { title: "Websites", desc: "Lightning-fast, conversion-optimized sites built with modern frameworks. Every pixel earns its place.", Demo: WebsiteDemo },
  { title: "AI Agents", desc: "Intelligent agents that handle support, bookings, and lead gen around the clock — in any language.", Demo: AgentDemo },
  { title: "Automations", desc: "End-to-end workflows that eliminate busywork. Your systems talk to each other so your team doesn't have to.", Demo: AutomationDemo },
];

export default function ServicesShowcase() {
  return (
    <div className="services-section" style={s.section}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div style={s.header}>
        <span style={s.eyebrow}>Services</span>
        <h2 style={s.h2}>What we build</h2>
      </div>

      <div className="services-grid" style={s.grid}>
        {services.map((svc, i) => (
          <div key={i} style={s.card}>
            <div style={s.demoArea}>
              <svc.Demo />
            </div>
            <div style={s.cardContent}>
              <h3 style={s.cardTitle}>{svc.title}</h3>
              <p style={s.cardDesc}>{svc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-2px); }
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.6); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const demo: Record<string, React.CSSProperties> = {
  browserWrap: {
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  browserBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "7px 10px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  dot: { width: 8, height: 8, borderRadius: "50%" },
  urlBar: {
    flex: 1,
    fontSize: 9,
    color: "rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 4,
    padding: "3px 8px",
    textAlign: "center",
  },
  browserBody: {
    padding: 14,
    minHeight: 130,
    position: "relative",
  },
  block: {
    height: 8,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 3,
  },
  chatWrap: {
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  chatBody: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minHeight: 130,
  },
  autoWrap: {
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
    padding: "24px 14px",
    minHeight: 130,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  autoFlow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 0,
  },
  autoNodeRow: {
    display: "flex",
    alignItems: "center",
  },
  autoNode: {
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 600,
    border: "1px solid",
    transition: "all 0.4s ease",
    whiteSpace: "nowrap",
  },
  autoConnector: {
    width: 20,
    height: 2,
    transition: "background 0.4s ease",
    position: "relative",
    flexShrink: 0,
  },
  autoArrow: {
    position: "absolute",
    right: 0,
    top: -3,
    width: 6,
    height: 6,
    borderTop: "2px solid",
    borderRight: "2px solid",
    transform: "rotate(45deg)",
    transition: "border-color 0.4s ease",
  },
};

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: "center",
    marginBottom: 60,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#00a884",
    display: "block",
    marginBottom: 12,
  },
  h2: {
    fontSize: 32,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    letterSpacing: -0.5,
  },
  grid: {
    display: "flex",
    gap: 20,
    maxWidth: 960,
    margin: "0 auto",
  },
  card: {
    flex: 1,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "default",
    transition: "all 0.35s ease",
  },
  demoArea: {
    padding: "16px 16px 0",
  },
  cardContent: {
    padding: "20px 20px 24px",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.4)",
    margin: "8px 0 0",
  },
};
