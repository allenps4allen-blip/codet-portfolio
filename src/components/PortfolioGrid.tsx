"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface MockupBlock {
  w: string;
  h: number;
  color: string;
  mt?: number;
  ml?: string | number;
  radius?: number;
  inline?: boolean;
}

interface Project {
  title: string;
  type: string;
  category: string;
  desc: string;
  metrics: { label: string; value: string }[];
  color: string;
  mockupBlocks: MockupBlock[];
}

const projects: Project[] = [
  {
    title: "SaaS Analytics Dashboard",
    type: "Web Application",
    category: "websites",
    desc: "Full-stack analytics platform with real-time data visualization, user management, and automated reporting.",
    metrics: [{ label: "Users", value: "2,847" }, { label: "Performance", value: "94.2%" }],
    color: "#3178C6",
    mockupBlocks: [
      { w: "100%", h: 20, color: "rgba(49,120,198,0.3)" },
      { w: "60%", h: 8, color: "rgba(255,255,255,0.08)", mt: 10 },
      { w: "40%", h: 8, color: "rgba(255,255,255,0.06)", mt: 6 },
      { w: "100%", h: 60, color: "rgba(49,120,198,0.1)", mt: 14, radius: 8 },
    ],
  },
  {
    title: "AI Customer Support Agent",
    type: "AI Agent",
    category: "ai",
    desc: "Multilingual chatbot trained on 10,000+ support tickets, deployed across web and WhatsApp with 85% resolution rate.",
    metrics: [{ label: "Resolution", value: "85%" }, { label: "Tickets trained", value: "10K+" }],
    color: "#00a884",
    mockupBlocks: [
      { w: "45%", h: 16, color: "rgba(0,168,132,0.2)", ml: "auto", radius: 10 },
      { w: "55%", h: 16, color: "rgba(255,255,255,0.06)", mt: 8, radius: 10 },
      { w: "40%", h: 16, color: "rgba(0,168,132,0.2)", mt: 8, ml: "auto", radius: 10 },
      { w: "50%", h: 16, color: "rgba(255,255,255,0.06)", mt: 8, radius: 10 },
    ],
  },
  {
    title: "E-Commerce Platform",
    type: "Website",
    category: "websites",
    desc: "High-conversion online store with custom product configurator, payment gateway integration, and inventory automation.",
    metrics: [{ label: "Conversion", value: "+140%" }, { label: "Load time", value: "1.2s" }],
    color: "#FFD43B",
    mockupBlocks: [
      { w: "100%", h: 50, color: "rgba(255,212,59,0.1)", radius: 8 },
      { w: "48%", h: 30, color: "rgba(255,255,255,0.05)", mt: 8, radius: 6, inline: true },
      { w: "48%", h: 30, color: "rgba(255,255,255,0.05)", mt: 8, radius: 6, inline: true, ml: "4%" },
    ],
  },
  {
    title: "Lead Generation Workflow",
    type: "Automation",
    category: "automations",
    desc: "End-to-end automation connecting LinkedIn, CRM, and email sequences — generating 3x more qualified leads.",
    metrics: [{ label: "Lead increase", value: "3x" }, { label: "Time saved", value: "20hrs/wk" }],
    color: "#FF4A00",
    mockupBlocks: [
      { w: "22%", h: 22, color: "rgba(255,74,0,0.15)", radius: 6, inline: true },
      { w: "12%", h: 2, color: "rgba(255,74,0,0.3)", mt: 10, inline: true, ml: "3%" },
      { w: "22%", h: 22, color: "rgba(255,74,0,0.15)", radius: 6, inline: true, ml: "3%" },
      { w: "12%", h: 2, color: "rgba(255,74,0,0.3)", mt: 10, inline: true, ml: "3%" },
      { w: "22%", h: 22, color: "rgba(255,74,0,0.15)", radius: 6, inline: true, ml: "3%" },
    ],
  },
  {
    title: "Restaurant Ordering System",
    type: "Web Application",
    category: "websites",
    desc: "Multi-tenant ordering platform with real-time kitchen display, delivery tracking, and POS integration.",
    metrics: [{ label: "Orders/day", value: "500+" }, { label: "Uptime", value: "99.9%" }],
    color: "#E44D26",
    mockupBlocks: [
      { w: "30%", h: 40, color: "rgba(228,77,38,0.1)", radius: 8, inline: true },
      { w: "30%", h: 40, color: "rgba(228,77,38,0.08)", radius: 8, inline: true, ml: "5%" },
      { w: "30%", h: 40, color: "rgba(228,77,38,0.06)", radius: 8, inline: true, ml: "5%" },
    ],
  },
  {
    title: "Document Processing Pipeline",
    type: "AI Agent",
    category: "ai",
    desc: "AI-powered document extraction and classification system processing 5,000+ invoices monthly with 98% accuracy.",
    metrics: [{ label: "Accuracy", value: "98%" }, { label: "Invoices/mo", value: "5,000+" }],
    color: "#8B5CF6",
    mockupBlocks: [
      { w: "100%", h: 30, color: "rgba(139,92,246,0.1)", radius: 6 },
      { w: "70%", h: 6, color: "rgba(139,92,246,0.2)", mt: 10, radius: 3 },
      { w: "85%", h: 6, color: "rgba(139,92,246,0.15)", mt: 6, radius: 3 },
      { w: "55%", h: 6, color: "rgba(139,92,246,0.1)", mt: 6, radius: 3 },
    ],
  },
];

const filterKeys = ["all", "websites", "ai", "automations"] as const;
const filterTranslationKeys = ["filterAll", "filterWebsites", "filterAI", "filterAutomations"] as const;

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = hovered ? (mouse.y - 0.5) * -8 : 0;
  const rotateY = hovered ? (mouse.x - 0.5) * 8 : 0;

  return (
    <div
      ref={cardRef}
      style={{
        ...s.card,
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hovered ? 1.02 : 1})`,
        borderColor: hovered ? `${project.color}33` : "rgba(255,255,255,0.06)",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}11` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
    >
      <div style={s.mockup}>
        <div style={s.mockupBar}>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
          </div>
        </div>
        <div style={s.mockupBody}>
          {project.mockupBlocks.map((block, i) => (
            <div
              key={i}
              style={{
                width: block.w,
                height: block.h,
                background: block.color,
                borderRadius: block.radius || 3,
                marginTop: block.mt || 0,
                marginLeft: block.ml || 0,
                display: block.inline ? "inline-block" : "block",
                verticalAlign: "middle",
                opacity: hovered ? 1 : 0.6,
                transform: hovered ? "translateY(0)" : "translateY(3px)",
                transition: `all 0.4s ease ${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div style={s.cardContent}>
        <span style={{ ...s.typeBadge, color: project.color, borderColor: `${project.color}33` }}>{project.type}</span>
        <h3 style={s.cardTitle}>{project.title}</h3>
        <p style={s.cardDesc}>{project.desc}</p>
        <div style={s.metricsRow}>
          {project.metrics.map((m, i) => (
            <div key={i} style={s.metric}>
              <span style={{ ...s.metricValue, color: project.color }}>{m.value}</span>
              <span style={s.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  const t = useTranslations("work.portfolio");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ ...s.section, padding: isMobile ? "60px 20px" : "100px 40px" }}>
      <style>{css}</style>

      <div style={s.header}>
        <span style={s.eyebrow}>{t("eyebrow")}</span>
        <h2 style={s.h2}>{t("heading")}</h2>
      </div>

      <div style={s.filters}>
        {filterKeys.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            style={{
              ...s.filterBtn,
              background: activeFilter === key ? "rgba(0,168,132,0.15)" : "transparent",
              color: activeFilter === key ? "#00a884" : "rgba(255,255,255,0.35)",
              borderColor: activeFilter === key ? "rgba(0,168,132,0.3)" : "rgba(255,255,255,0.08)",
            }}
          >
            {t(filterTranslationKeys[i])}
          </button>
        ))}
      </div>

      <div style={{ ...s.grid, gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
        {filtered.map((project, i) => (
          <div key={project.title} style={{ animation: `fadeSlideIn 0.4s ease-out ${i * 0.08}s both` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

const css = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px",
    background: "#050505",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
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
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 48,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "7px 18px",
    borderRadius: 20,
    border: "1px solid",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "default",
    transition: "all 0.35s ease",
    willChange: "transform",
  },
  mockup: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "rgba(0,0,0,0.3)",
  },
  mockupBar: {
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  mockupBody: {
    padding: "16px",
    minHeight: 110,
  },
  cardContent: {
    padding: "20px",
  },
  typeBadge: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    padding: "3px 10px",
    borderRadius: 20,
    border: "1px solid",
    display: "inline-block",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#e9edef",
    margin: "0 0 8px",
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 16px",
  },
  metricsRow: {
    display: "flex",
    gap: 24,
    borderTop: "1px solid rgba(255,255,255,0.04)",
    paddingTop: 14,
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  metricLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
};
