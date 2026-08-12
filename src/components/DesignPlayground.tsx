"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const styleKeys = ["minimal", "warm", "bold", "corporate"] as const;
type StyleKey = (typeof styleKeys)[number];

const themes: Record<StyleKey, { accent: string; brand: string; iconBg: string }> = {
  minimal: { accent: "#00a884", brand: "BRAND", iconBg: "rgba(0,168,132,0.15)" },
  warm: { accent: "#d97706", brand: "ARTISAN", iconBg: "rgba(217,119,6,0.15)" },
  bold: { accent: "#e040fb", brand: "NEON", iconBg: "rgba(224,64,251,0.15)" },
  corporate: { accent: "#3b82f6", brand: "NEXUS", iconBg: "rgba(59,130,246,0.15)" },
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

  const theme = themes[active];

  return (
    <section className="section-gradient-up" style={{ padding: isMobile ? "60px 16px" : "100px 40px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
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

          {/* Preview content */}
          <div style={{ background: "#0a0a0a", padding: 0, transition: "all 0.4s ease" }}>
            {/* Nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 16px" : "12px 24px" }}>
              <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", transition: "color 0.3s" }}>
                {themes[active].brand}
              </div>
              {!isMobile && (
                <div style={{ display: "flex", gap: 20, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  <span>{t("preview.navHome")}</span>
                  <span>{t("preview.navAbout")}</span>
                  <span>{t("preview.navServices")}</span>
                  <span>{t("preview.navContact")}</span>
                </div>
              )}
            </div>

            {/* Hero */}
            <div style={{ padding: isMobile ? "30px 20px 24px" : "44px 32px 32px", textAlign: "center" }}>
              <div style={{ fontSize: isMobile ? 26 : 36, fontWeight: 700, color: "rgba(255,255,255,0.95)", lineHeight: 1.2, marginBottom: 10 }}>
                {t("preview.headingLine1")}{" "}
                <span style={{ color: theme.accent, transition: "color 0.4s ease" }}>
                  {t(`accentWords.${active}`)}
                </span>
              </div>
              <div style={{ fontSize: isMobile ? 12 : 13, color: "rgba(255,255,255,0.4)", maxWidth: 360, margin: "0 auto 20px" }}>
                {t("preview.sub")}
              </div>
              <div style={{
                display: "inline-block",
                padding: isMobile ? "10px 24px" : "10px 28px",
                borderRadius: 24,
                fontSize: isMobile ? 12 : 13,
                fontWeight: 600,
                color: "#050505",
                background: theme.accent,
                transition: "background 0.4s ease",
              }}>
                {t("preview.btn")}
              </div>
            </div>

            {/* Feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: isMobile ? 8 : 10, padding: isMobile ? "0 16px 20px" : "0 24px 28px" }}>
              {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
                <div key={key} style={{
                  padding: isMobile ? "14px 8px" : "16px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}>
                  <div style={{
                    width: isMobile ? 32 : 36,
                    height: isMobile ? 32 : 36,
                    borderRadius: "50%",
                    margin: "0 auto 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? 14 : 16,
                    background: theme.iconBg,
                    transition: "background 0.4s ease",
                  }}>
                    {["⚡", "🎨", "🔒"][i]}
                  </div>
                  <div style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                    {t(`preview.${key}`)}
                  </div>
                  <div style={{ fontSize: isMobile ? 9 : 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                    {t(`preview.${key}Desc`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

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

const keyframes = `
  @keyframes designFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
