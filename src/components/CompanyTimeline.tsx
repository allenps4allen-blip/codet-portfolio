"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  { date: "2025 Q3", title: "Founded", desc: "CODET was established with a mission to digitalize businesses in the Gulf." },
  { date: "2025 Q4", title: "First 10 clients", desc: "Delivered websites, automations, and AI agents for our first batch of clients." },
  { date: "2026 Q1", title: "Launched AI Agent platform", desc: "Released our custom AI agent builder with multi-channel deployment." },
  { date: "2026 Q2", title: "50+ projects delivered", desc: "Crossed the 50-project milestone across websites, AI, and automations." },
];

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: visible ? "#00a884" : "rgba(255,255,255,0.1)",
          boxShadow: visible ? "0 0 12px rgba(0,168,132,0.4)" : "none",
          transition: "all 0.6s ease",
          border: "2px solid #050505",
          position: "relative",
          zIndex: 1,
        }} />
        {index < milestones.length - 1 && (
          <div style={{
            width: 2,
            flex: 1,
            background: "linear-gradient(to bottom, rgba(0,168,132,0.3), rgba(0,168,132,0.05))",
            minHeight: 40,
          }} />
        )}
      </div>
      <div style={{ paddingBottom: 32 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#00a884",
        }}>
          {milestone.date}
        </span>
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#e9edef",
          margin: "6px 0 6px",
        }}>
          {milestone.title}
        </h3>
        <p style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.4)",
          margin: 0,
        }}>
          {milestone.desc}
        </p>
      </div>
    </div>
  );
}

export default function CompanyTimeline() {
  return (
    <div style={s.section}>
      <div style={s.header}>
        <span style={s.eyebrow}>Our Journey</span>
        <h2 style={s.h2}>Company Timeline</h2>
      </div>
      <div style={s.timeline}>
        {milestones.map((m, i) => (
          <TimelineItem key={i} milestone={m} index={i} />
        ))}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "80px 40px",
    background: "#050505",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: "center",
    marginBottom: 48,
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
  timeline: {
    maxWidth: 500,
    margin: "0 auto",
  },
};
