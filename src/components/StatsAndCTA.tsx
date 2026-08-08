"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1800 }: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const statKeys = ["projectsDelivered", "clientSatisfaction", "apiCalls", "agentUptime"] as const;
const statValues = [
  { value: 50, suffix: "+" },
  { value: 98, suffix: "%" },
  { value: 2, suffix: "M+" },
  { value: 24, suffix: "/7" },
];

const statsResponsive = `
  @media (max-width: 640px) {
    .stats-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 32px 24px !important;
    }
    .stats-section {
      padding: 60px 24px !important;
    }
    .stat-value {
      font-size: 32px !important;
    }
    .cta-section {
      padding: 80px 24px 100px !important;
    }
    .cta-h2 {
      font-size: 28px !important;
    }
  }
`;

function StatsBar() {
  const t = useTranslations("home.statsBar");

  return (
    <div className="stats-section" style={s.statsSection}>
      <style dangerouslySetInnerHTML={{ __html: statsResponsive }} />
      <div className="stats-grid" style={s.statsGrid}>
        {statKeys.map((key, i) => (
          <div key={key} style={s.statItem}>
            <div className="stat-value" style={s.statValue}>
              <AnimatedCounter end={statValues[i].value} suffix={statValues[i].suffix} duration={1600 + i * 200} />
            </div>
            <div style={s.statLabel}>{t(key)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTASection() {
  const t = useTranslations("home.ctaSection");
  const [hovered, setHovered] = useState(false);
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
    <div ref={ref} className="cta-section" style={s.ctaSection}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div style={s.ctaGlow} />

      <div style={{
        ...s.ctaContent,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <span style={s.ctaEyebrow}>{t("eyebrow")}</span>
        <h2 className="cta-h2" style={s.ctaH2}>
          {t("headingLine1")}<br />
          <span style={{ color: "#00a884" }}>{t("headingLine2")}</span>
        </h2>
        <p style={s.ctaDesc}>
          {t("description")}
        </p>

        <a
          href="https://wa.me/96566565517?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20to%20discuss%20my%20project."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...s.ctaButton,
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 12px 40px rgba(0,168,132,0.35)"
              : "0 4px 20px rgba(0,168,132,0.2)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("button")}
        </a>

        <div style={s.trustRow}>
          <span style={s.trustItem}>&#x2713; {t("trust1")}</span>
          <span style={s.trustDot}>·</span>
          <span style={s.trustItem}>&#x2713; {t("trust2")}</span>
          <span style={s.trustDot}>·</span>
          <span style={s.trustItem}>&#x2713; {t("trust3")}</span>
        </div>
      </div>
    </div>
  );
}

export default function StatsAndCTA() {
  return (
    <div className="section-gradient-up" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <StatsBar />
      <CTASection />
    </div>
  );
}

const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

const s: Record<string, React.CSSProperties> = {
  statsSection: {
    padding: "80px 40px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  statsGrid: {
    display: "flex",
    justifyContent: "center",
    gap: 60,
    maxWidth: 800,
    margin: "0 auto",
  },
  statItem: {
    textAlign: "center",
  },
  statValue: {
    fontSize: 40,
    fontWeight: 700,
    color: "#e9edef",
    letterSpacing: -1,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginTop: 8,
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  ctaSection: {
    padding: "120px 40px 140px",
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,168,132,0.08) 0%, transparent 70%)",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    filter: "blur(60px)",
    animation: "pulse 5s ease-in-out infinite",
  },
  ctaContent: {
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    maxWidth: 560,
    margin: "0 auto",
  },
  ctaEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#00a884",
    display: "block",
    marginBottom: 16,
  },
  ctaH2: {
    fontSize: 36,
    fontWeight: 700,
    color: "#e9edef",
    margin: 0,
    lineHeight: 1.25,
    letterSpacing: -0.5,
  },
  ctaDesc: {
    fontSize: 15,
    color: "rgba(255,255,255,0.35)",
    margin: "18px 0 32px",
    lineHeight: 1.6,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 32px",
    background: "#00a884",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    border: "none",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    letterSpacing: 0.2,
  },
  trustRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    flexWrap: "wrap",
  },
  trustItem: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
  },
  trustDot: {
    color: "rgba(255,255,255,0.15)",
  },
};
