"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const stepIcons = ["🔍", "✏️", "⚡", "🚀"];
const stepIds = [1, 2, 3, 4];

export default function ProcessPipeline() {
  const t = useTranslations("home.process");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const start = window.innerHeight * 0.8;
      const end = -rect.height * 0.3;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStep = Math.floor(progress * (stepIds.length + 0.5));
  const lineProgress = Math.min(1, progress * 1.15);

  return (
    <div ref={sectionRef} className="process-section section-gradient-up" style={s.section}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div style={s.header}>
        <span style={s.eyebrow}>{t("eyebrow")}</span>
        <h2 style={s.h2}>{t("heading")}</h2>
      </div>

      <div className="process-timeline" style={s.timeline}>
        {/* Vertical connector line */}
        <div style={s.lineTrack}>
          <div style={{ ...s.lineFill, height: `${lineProgress * 100}%` }} />
          <div style={{
            position: "absolute",
            top: `${lineProgress * 100}%`,
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#00a884",
            boxShadow: "0 0 16px rgba(0,168,132,0.6)",
            opacity: lineProgress > 0.02 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
        </div>

        {stepIds.map((id, i) => {
          const isActive = isMobile ? true : i < activeStep;
          const isCurrent = isMobile ? false : i === activeStep - 1;
          const isExpanded = isMobile ? expandedStep === i : isActive;

          return (
            <div
              key={id}
              className="process-step mobile-tap"
              style={{
                ...s.step,
                opacity: isMobile ? 1 : (isActive ? 1 : 0.25),
                transform: isMobile ? "none" : (isActive ? "translateY(0)" : "translateY(20px)"),
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: isMobile ? "pointer" : "default",
              }}
              onClick={() => isMobile && setExpandedStep(expandedStep === i ? null : i)}
            >
              <div className="process-node" style={{
                ...s.node,
                background: isMobile ? (isExpanded ? "#00a884" : "rgba(255,255,255,0.06)") : (isActive ? "#00a884" : "rgba(255,255,255,0.06)"),
                borderColor: isMobile ? (isExpanded ? "#00a884" : "rgba(255,255,255,0.1)") : (isActive ? "#00a884" : "rgba(255,255,255,0.1)"),
                boxShadow: isCurrent ? "0 0 24px rgba(0,168,132,0.4)" : "none",
                transition: "all 0.4s ease",
              }}>
                <span style={{ fontSize: isMobile ? 16 : 20 }}>{stepIcons[i]}</span>
              </div>

              <div style={s.stepContent}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 className="process-step-title" style={{ ...s.stepTitle, color: isActive ? "#e9edef" : "rgba(255,255,255,0.3)" }}>
                    {t(`steps.${id}.title`)}
                  </h3>
                  {isCurrent && (
                    <div style={s.activeBadge}>{t("inProgress")}</div>
                  )}
                  {!isMobile && isActive && !isCurrent && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00a884" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                  {isMobile && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginInlineStart: "auto", transition: "transform 0.3s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </div>
                <div style={{ maxHeight: isExpanded ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <p className="process-step-desc" style={{ ...s.stepDesc, color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.15)" }}>
                    {t(`steps.${id}.desc`)}
                  </p>
                  {isExpanded && (
                    <div style={{ ...s.detail, animation: "fadeSlideIn 0.4s ease-out" }}>
                      {t(`steps.${id}.detail`)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px 120px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: 70,
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
    position: "relative",
    maxWidth: 560,
    margin: "0 auto",
    paddingLeft: 60,
  },
  lineTrack: {
    position: "absolute",
    left: 24,
    top: 24,
    bottom: 24,
    width: 2,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 1,
  },
  lineFill: {
    width: "100%",
    background: "linear-gradient(to bottom, #00a884, #00a884)",
    borderRadius: 1,
    transition: "height 0.3s ease-out",
  },
  step: {
    display: "flex",
    gap: 24,
    marginBottom: 56,
    position: "relative",
  },
  node: {
    width: 48,
    height: 48,
    borderRadius: 14,
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepContent: {
    paddingTop: 4,
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
    transition: "color 0.4s ease",
  },
  stepDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    margin: "8px 0 0",
    transition: "color 0.4s ease",
  },
  detail: {
    fontSize: 12,
    color: "rgba(0,168,132,0.5)",
    marginTop: 10,
    letterSpacing: 0.3,
  },
  activeBadge: {
    fontSize: 10,
    fontWeight: 600,
    color: "#050505",
    background: "#00a884",
    padding: "2px 8px",
    borderRadius: 20,
    letterSpacing: 0.5,
    animation: "fadeSlideIn 0.3s ease-out",
  },
};
