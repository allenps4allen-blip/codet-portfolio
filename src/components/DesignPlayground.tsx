"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const styleKeys = ["minimal", "warm", "bold", "corporate"] as const;
type StyleKey = (typeof styleKeys)[number];

const themes = {
  minimal: {
    accent: "#00a884",
    brand: "BRAND",
    bg: "#0c0c0c",
    cardBg: "rgba(255,255,255,0.03)",
    cardBorder: "1px solid rgba(255,255,255,0.06)",
    navBg: "transparent",
    textPrimary: "rgba(255,255,255,0.9)",
    textSecondary: "rgba(255,255,255,0.4)",
    btnStyle: "filled" as const,
    btnRadius: 24,
    heroAlign: "center" as const,
    cardRadius: 8,
    gridCols: "1fr 1fr 1fr",
    iconShape: "circle" as const,
  },
  warm: {
    accent: "#d97706",
    brand: "ARTISAN",
    bg: "#1a1410",
    cardBg: "rgba(217,119,6,0.06)",
    cardBorder: "none",
    navBg: "rgba(217,119,6,0.04)",
    textPrimary: "#f5e6d3",
    textSecondary: "rgba(245,230,211,0.45)",
    btnStyle: "outline" as const,
    btnRadius: 6,
    heroAlign: "left" as const,
    cardRadius: 14,
    gridCols: "1fr",
    iconShape: "square" as const,
  },
  bold: {
    accent: "#e040fb",
    brand: "NEON",
    bg: "#0a0014",
    cardBg: "rgba(224,64,251,0.06)",
    cardBorder: "1px solid rgba(224,64,251,0.15)",
    navBg: "rgba(224,64,251,0.03)",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255,255,255,0.5)",
    btnStyle: "glow" as const,
    btnRadius: 0,
    heroAlign: "center" as const,
    cardRadius: 2,
    gridCols: "1fr 1fr",
    iconShape: "diamond" as const,
  },
  corporate: {
    accent: "#3b82f6",
    brand: "NEXUS",
    bg: "#f8f9fb",
    cardBg: "#ffffff",
    cardBorder: "1px solid #e2e5ea",
    navBg: "#ffffff",
    textPrimary: "#1a1a2e",
    textSecondary: "#6b7280",
    btnStyle: "filled" as const,
    btnRadius: 8,
    heroAlign: "center" as const,
    cardRadius: 12,
    gridCols: "1fr 1fr 1fr",
    iconShape: "rounded" as const,
  },
};

export default function DesignPlayground() {
  const t = useTranslations("designPlayground");
  const [active, setActive] = useState<StyleKey>("minimal");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const th = themes[active];

  const iconShapeStyle = (size: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? 14 : 16,
      transition: "all 0.4s ease",
    };
    switch (th.iconShape) {
      case "circle":
        return { ...base, borderRadius: "50%", background: `${th.accent}20` };
      case "square":
        return { ...base, borderRadius: 4, background: `${th.accent}15`, border: `1px solid ${th.accent}30` };
      case "diamond":
        return { ...base, borderRadius: 2, transform: "rotate(45deg)", background: `${th.accent}20`, border: `1px solid ${th.accent}40` };
      case "rounded":
        return { ...base, borderRadius: 10, background: `${th.accent}12`, border: `1px solid ${th.accent}20` };
    }
  };

  const renderBtn = (label: string) => {
    const base: React.CSSProperties = {
      display: "inline-block",
      padding: isMobile ? "10px 24px" : "10px 28px",
      fontSize: isMobile ? 12 : 13,
      fontWeight: 600,
      borderRadius: th.btnRadius,
      transition: "all 0.4s ease",
      border: "none",
    };
    switch (th.btnStyle) {
      case "filled":
        return <div style={{ ...base, background: th.accent, color: active === "corporate" ? "#fff" : "#050505" }}>{label}</div>;
      case "outline":
        return <div style={{ ...base, background: "transparent", border: `1.5px solid ${th.accent}`, color: th.accent }}>{label}</div>;
      case "glow":
        return (
          <div style={{
            ...base,
            background: th.accent,
            color: "#fff",
            boxShadow: `0 0 20px ${th.accent}60, 0 0 40px ${th.accent}30`,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
          }}>
            {label}
          </div>
        );
    }
  };

  const renderMinimalPreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 16px" : "14px 28px" }}>
        <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 600, letterSpacing: 3, color: th.textPrimary, transition: "color 0.3s" }}>
          {th.brand}
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 24, fontSize: 11, color: th.textSecondary }}>
            <span>{t("preview.navHome")}</span>
            <span>{t("preview.navAbout")}</span>
            <span>{t("preview.navServices")}</span>
            <span>{t("preview.navContact")}</span>
          </div>
        )}
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
      <div style={{ padding: isMobile ? "36px 20px 28px" : "52px 32px 36px", textAlign: "center" }}>
        <div style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, color: th.textPrimary, lineHeight: 1.3, letterSpacing: -0.5 }}>
          {t("preview.headingLine1")}{" "}
          <span style={{ color: th.accent, fontWeight: 600, transition: "color 0.4s ease" }}>
            {t(`accentWords.${active}`)}
          </span>
        </div>
        <div style={{ fontSize: 13, color: th.textSecondary, maxWidth: 340, margin: "14px auto 24px" }}>
          {t("preview.sub")}
        </div>
        {renderBtn(t("preview.btn"))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: th.gridCols, gap: isMobile ? 8 : 12, padding: isMobile ? "0 16px 24px" : "0 28px 32px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{
            padding: isMobile ? "16px 10px" : "20px 14px",
            borderRadius: th.cardRadius,
            background: th.cardBg,
            border: th.cardBorder,
            textAlign: "center",
            transition: "all 0.4s ease",
          }}>
            <div style={{ ...iconShapeStyle(isMobile ? 32 : 36), margin: "0 auto 10px" }}>
              {["⚡", "🎨", "🔒"][i]}
            </div>
            <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: th.textPrimary, transition: "color 0.3s" }}>
              {t(`preview.${key}`)}
            </div>
            <div style={{ fontSize: isMobile ? 9 : 10, color: th.textSecondary, marginTop: 4, transition: "color 0.3s" }}>
              {t(`preview.${key}Desc`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWarmPreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "10px 16px" : "12px 24px",
        background: th.navBg,
        borderBottom: `1px solid ${th.accent}15`,
      }}>
        <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: th.accent, fontStyle: "italic" }}>
          {th.brand}
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 20, fontSize: 11, color: th.textSecondary, fontStyle: "italic" }}>
            <span>{t("preview.navHome")}</span>
            <span>{t("preview.navAbout")}</span>
            <span>{t("preview.navServices")}</span>
            <span>{t("preview.navContact")}</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 0 : 24, padding: isMobile ? "28px 20px 20px" : "40px 28px 28px" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: th.accent, marginBottom: 12 }}>
            ✦ {t("preview.navServices")}
          </div>
          <div style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: th.textPrimary, lineHeight: 1.2, marginBottom: 10 }}>
            {t("preview.headingLine1")}{" "}
            <span style={{ color: th.accent, transition: "color 0.4s ease" }}>
              {t(`accentWords.${active}`)}
            </span>
          </div>
          <div style={{ fontSize: 13, color: th.textSecondary, marginBottom: 20, maxWidth: 300 }}>
            {t("preview.sub")}
          </div>
          {renderBtn(t("preview.btn"))}
        </div>
        {!isMobile && (
          <div style={{
            width: 160,
            borderRadius: th.cardRadius,
            background: `linear-gradient(135deg, ${th.accent}15, ${th.accent}05)`,
            border: `1px solid ${th.accent}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
          }}>
            ✦
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: isMobile ? "0 16px 20px" : "0 28px 28px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: isMobile ? "12px 14px" : "14px 18px",
            borderRadius: th.cardRadius,
            background: th.cardBg,
            transition: "all 0.4s ease",
          }}>
            <div style={{ ...iconShapeStyle(isMobile ? 34 : 38), flexShrink: 0 }}>
              <span style={th.iconShape === "diamond" ? { transform: "rotate(-45deg)" } : undefined}>
                {["⚡", "🎨", "🔒"][i]}
              </span>
            </div>
            <div>
              <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 600, color: th.textPrimary }}>
                {t(`preview.${key}`)}
              </div>
              <div style={{ fontSize: isMobile ? 10 : 11, color: th.textSecondary, marginTop: 2 }}>
                {t(`preview.${key}Desc`)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBoldPreview = () => (
    <div style={{
      background: `linear-gradient(180deg, ${th.bg}, #0d0020)`,
      transition: "background 0.4s ease",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${th.accent}15, transparent)`,
        filter: "blur(40px)",
      }} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "10px 16px" : "12px 24px",
        background: th.navBg,
        borderBottom: `1px solid ${th.accent}20`,
      }}>
        <div style={{
          fontSize: isMobile ? 14 : 16,
          fontWeight: 800,
          color: th.accent,
          letterSpacing: 4,
          textTransform: "uppercase" as const,
          textShadow: `0 0 10px ${th.accent}60`,
        }}>
          {th.brand}
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 20, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: th.textSecondary }}>
            <span>{t("preview.navHome")}</span>
            <span>{t("preview.navAbout")}</span>
            <span>{t("preview.navServices")}</span>
            <span>{t("preview.navContact")}</span>
          </div>
        )}
      </div>
      <div style={{ padding: isMobile ? "36px 20px 28px" : "52px 28px 36px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          fontSize: isMobile ? 28 : 40,
          fontWeight: 900,
          color: th.textPrimary,
          lineHeight: 1.1,
          letterSpacing: -1,
          textTransform: "uppercase" as const,
        }}>
          {t("preview.headingLine1")}{" "}
          <span style={{
            color: th.accent,
            textShadow: `0 0 20px ${th.accent}50`,
            transition: "all 0.4s ease",
          }}>
            {t(`accentWords.${active}`)}
          </span>
        </div>
        <div style={{ fontSize: 12, color: th.textSecondary, maxWidth: 320, margin: "14px auto 24px", letterSpacing: 1 }}>
          {t("preview.sub")}
        </div>
        {renderBtn(t("preview.btn"))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : th.gridCols, gap: 10, padding: isMobile ? "0 16px 24px" : "0 28px 32px", position: "relative", zIndex: 1 }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{
            padding: isMobile ? "14px" : "18px",
            borderRadius: th.cardRadius,
            background: th.cardBg,
            border: th.cardBorder,
            transition: "all 0.4s ease",
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? 12 : 0,
          }}>
            <div style={{ ...iconShapeStyle(isMobile ? 32 : 36), marginBottom: isMobile ? 0 : 10 }}>
              <span style={th.iconShape === "diamond" ? { transform: "rotate(-45deg)", fontSize: isMobile ? 12 : 14 } : undefined}>
                {["⚡", "🎨", "🔒"][i]}
              </span>
            </div>
            <div>
              <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: th.textPrimary, letterSpacing: 1, textTransform: "uppercase" as const }}>
                {t(`preview.${key}`)}
              </div>
              <div style={{ fontSize: isMobile ? 9 : 10, color: th.textSecondary, marginTop: 4 }}>
                {t(`preview.${key}Desc`)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCorporatePreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "10px 16px" : "12px 24px",
        background: th.navBg,
        borderBottom: th.cardBorder,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: th.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 800,
            color: "#fff",
          }}>
            N
          </div>
          <div style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, color: th.textPrimary }}>
            {th.brand}
          </div>
        </div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 20, fontSize: 12, fontWeight: 500, color: th.textSecondary }}>
            <span>{t("preview.navHome")}</span>
            <span>{t("preview.navAbout")}</span>
            <span>{t("preview.navServices")}</span>
            <span>{t("preview.navContact")}</span>
          </div>
        )}
      </div>
      <div style={{ padding: isMobile ? "28px 20px" : "40px 28px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 20,
          background: `${th.accent}12`,
          fontSize: 11,
          fontWeight: 600,
          color: th.accent,
          marginBottom: 14,
        }}>
          ✨ {t("preview.navServices")}
        </div>
        <div style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: th.textPrimary, lineHeight: 1.2, marginBottom: 10 }}>
          {t("preview.headingLine1")}{" "}
          <span style={{
            color: th.accent,
            transition: "color 0.4s ease",
            background: `linear-gradient(135deg, ${th.accent}, #60a5fa)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {t(`accentWords.${active}`)}
          </span>
        </div>
        <div style={{ fontSize: 13, color: th.textSecondary, maxWidth: 360, margin: "0 auto 22px" }}>
          {t("preview.sub")}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {renderBtn(t("preview.btn"))}
          <div style={{
            display: "inline-block",
            padding: isMobile ? "10px 24px" : "10px 28px",
            fontSize: isMobile ? 12 : 13,
            fontWeight: 600,
            borderRadius: th.btnRadius,
            background: "transparent",
            border: `1.5px solid ${th.accent}40`,
            color: th.accent,
          }}>
            {t("preview.navAbout")} →
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : th.gridCols, gap: 12, padding: isMobile ? "0 16px 24px" : "0 28px 32px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{
            padding: isMobile ? "16px" : "20px",
            borderRadius: th.cardRadius,
            background: th.cardBg,
            border: th.cardBorder,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            textAlign: "left",
            transition: "all 0.4s ease",
          }}>
            <div style={{ ...iconShapeStyle(isMobile ? 34 : 40), marginBottom: 12 }}>
              <span>{["⚡", "🎨", "🔒"][i]}</span>
            </div>
            <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, color: th.textPrimary }}>
              {t(`preview.${key}`)}
            </div>
            <div style={{ fontSize: isMobile ? 10 : 11, color: th.textSecondary, marginTop: 4, lineHeight: 1.5 }}>
              {t(`preview.${key}Desc`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const previewRenderers: Record<StyleKey, () => React.ReactNode> = {
    minimal: renderMinimalPreview,
    warm: renderWarmPreview,
    bold: renderBoldPreview,
    corporate: renderCorporatePreview,
  };

  return (
    <section className="section-gradient-up" style={{ padding: isMobile ? "60px 16px" : "100px 40px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="dot-matrix" style={{ position: "absolute", inset: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 50 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "#00a884" }}>{t("eyebrow")}</span>
            <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 600, color: "#e9edef", margin: "12px 0 0", letterSpacing: -0.5 }}>{t("heading")}</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginTop: 10, maxWidth: 400, marginInline: "auto" }}>{t("subtitle")}</p>
          </div>
        </FadeIn>

        {/* Style presets */}
        <div style={{ display: "flex", gap: isMobile ? 8 : 12, marginBottom: isMobile ? 16 : 24, overflowX: "auto", paddingBottom: 4, justifyContent: isMobile ? "flex-start" : "center" }}>
          {styleKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="mobile-tap"
              style={{
                padding: isMobile ? "10px 14px" : "12px 20px",
                borderRadius: 12,
                border: active === key ? `1.5px solid ${themes[key].accent}` : "1px solid rgba(255,255,255,0.08)",
                background: active === key ? `${themes[key].accent}10` : "rgba(255,255,255,0.02)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease",
                flexShrink: 0,
                textAlign: "center" as const,
              }}
            >
              <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, color: active === key ? themes[key].accent : "rgba(255,255,255,0.6)" }}>
                {t(`styles.${key}.name`)}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                {t(`styles.${key}.desc`)}
              </div>
            </button>
          ))}
        </div>

        {/* Live preview */}
        <div className="glass-card" style={{ borderRadius: 16, overflow: "hidden" }}>
          {/* Browser chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, marginInlineStart: 8, padding: "4px 12px", borderRadius: 6, background: "rgba(255,255,255,0.05)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              {t("preview.url")}
            </div>
          </div>

          {previewRenderers[active]()}

          {/* CTA bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "12px 16px" : "14px 24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <span style={{ fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.3)" }}>{t("cta")}</span>
            <a
              href="https://wa.me/96566565517?text=Hi%2C%20I%20tried%20the%20design%20playground%20on%20your%20site%20and%20I%27m%20interested%20in%20building%20something%20similar."
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-tap"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 8,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                color: "#050505",
                background: "#00a884",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              {t("ctaButton")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
