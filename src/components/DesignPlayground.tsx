"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import FadeIn from "./FadeIn";

const presetKeys = ["minimal", "warm", "bold", "corporate"] as const;
type PresetKey = (typeof presetKeys)[number];
type ActiveKey = PresetKey | "custom";

const tabOrder: ActiveKey[] = ["custom", ...presetKeys];

type BtnStyle = "filled" | "outline" | "glow";
type IconShape = "circle" | "square" | "diamond" | "rounded";
type HeroAlign = "center" | "left";
type BgMode = "dark" | "warm" | "neon" | "light";

interface ThemeConfig {
  accent: string;
  brand: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  navBg: string;
  textPrimary: string;
  textSecondary: string;
  btnStyle: BtnStyle;
  btnRadius: number;
  heroAlign: HeroAlign;
  cardRadius: number;
  gridCols: string;
  iconShape: IconShape;
}

const bgModes: Record<BgMode, { bg: string; navBg: string; textPrimary: string; textSecondary: string; cardBg: string; cardBorder: string }> = {
  dark: { bg: "#0c0c0c", navBg: "transparent", textPrimary: "rgba(255,255,255,0.9)", textSecondary: "rgba(255,255,255,0.4)", cardBg: "rgba(255,255,255,0.03)", cardBorder: "1px solid rgba(255,255,255,0.06)" },
  warm: { bg: "#1a1410", navBg: "rgba(255,200,100,0.04)", textPrimary: "#f5e6d3", textSecondary: "rgba(245,230,211,0.45)", cardBg: "rgba(255,200,100,0.05)", cardBorder: "none" },
  neon: { bg: "#0a0014", navBg: "rgba(200,100,255,0.03)", textPrimary: "#ffffff", textSecondary: "rgba(255,255,255,0.5)", cardBg: "rgba(200,100,255,0.06)", cardBorder: "1px solid rgba(200,100,255,0.12)" },
  light: { bg: "#f8f9fb", navBg: "#ffffff", textPrimary: "#1a1a2e", textSecondary: "#6b7280", cardBg: "#ffffff", cardBorder: "1px solid #e2e5ea" },
};

const themes: Record<PresetKey, ThemeConfig> = {
  minimal: {
    accent: "#00a884", brand: "BRAND", bg: "#0c0c0c", cardBg: "rgba(255,255,255,0.03)", cardBorder: "1px solid rgba(255,255,255,0.06)", navBg: "transparent", textPrimary: "rgba(255,255,255,0.9)", textSecondary: "rgba(255,255,255,0.4)",
    btnStyle: "filled", btnRadius: 24, heroAlign: "center", cardRadius: 8, gridCols: "1fr 1fr 1fr", iconShape: "circle",
  },
  warm: {
    accent: "#d97706", brand: "ARTISAN", bg: "#1a1410", cardBg: "rgba(217,119,6,0.06)", cardBorder: "none", navBg: "rgba(217,119,6,0.04)", textPrimary: "#f5e6d3", textSecondary: "rgba(245,230,211,0.45)",
    btnStyle: "outline", btnRadius: 6, heroAlign: "left", cardRadius: 14, gridCols: "1fr", iconShape: "square",
  },
  bold: {
    accent: "#e040fb", brand: "NEON", bg: "#0a0014", cardBg: "rgba(224,64,251,0.06)", cardBorder: "1px solid rgba(224,64,251,0.15)", navBg: "rgba(224,64,251,0.03)", textPrimary: "#ffffff", textSecondary: "rgba(255,255,255,0.5)",
    btnStyle: "glow", btnRadius: 0, heroAlign: "center", cardRadius: 2, gridCols: "1fr 1fr", iconShape: "diamond",
  },
  corporate: {
    accent: "#3b82f6", brand: "NEXUS", bg: "#f8f9fb", cardBg: "#ffffff", cardBorder: "1px solid #e2e5ea", navBg: "#ffffff", textPrimary: "#1a1a2e", textSecondary: "#6b7280",
    btnStyle: "filled", btnRadius: 8, heroAlign: "center", cardRadius: 12, gridCols: "1fr 1fr 1fr", iconShape: "rounded",
  },
};

const accentPresets = [
  { color: "#00a884", label: "Green" },
  { color: "#d97706", label: "Amber" },
  { color: "#e040fb", label: "Pink" },
  { color: "#3b82f6", label: "Blue" },
  { color: "#ef4444", label: "Red" },
  { color: "#8b5cf6", label: "Purple" },
];

export default function DesignPlayground() {
  const t = useTranslations("designPlayground");
  const [active, setActive] = useState<ActiveKey>("custom");
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const [customAccent, setCustomAccent] = useState("#8b5cf6");
  const [customBg, setCustomBg] = useState<BgMode>("dark");
  const [customLayout, setCustomLayout] = useState<HeroAlign>("center");
  const [customBtn, setCustomBtn] = useState<BtnStyle>("filled");
  const [customBtnRadius, setCustomBtnRadius] = useState(12);
  const [customIcon, setCustomIcon] = useState<IconShape>("circle");
  const [customCardRadius, setCustomCardRadius] = useState(10);
  const [customCols, setCustomCols] = useState<"1fr" | "1fr 1fr" | "1fr 1fr 1fr">("1fr 1fr 1fr");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) setShowScrollHint(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const getCustomTheme = (): ThemeConfig => {
    const m = bgModes[customBg];
    return {
      accent: customAccent, brand: "YOURS", ...m,
      btnStyle: customBtn, btnRadius: customBtnRadius, heroAlign: customLayout,
      cardRadius: customCardRadius, gridCols: customCols, iconShape: customIcon,
    };
  };

  const th: ThemeConfig = active === "custom" ? getCustomTheme() : themes[active];

  const iconShapeStyle = (size: number): React.CSSProperties => {
    const s = isMobile ? Math.round(size * 0.85) : size;
    const base: React.CSSProperties = { width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 12 : 16, transition: "all 0.4s ease" };
    switch (th.iconShape) {
      case "circle": return { ...base, borderRadius: "50%", background: `${th.accent}20` };
      case "square": return { ...base, borderRadius: 4, background: `${th.accent}15`, border: `1px solid ${th.accent}30` };
      case "diamond": return { ...base, borderRadius: 2, transform: "rotate(45deg)", background: `${th.accent}20`, border: `1px solid ${th.accent}40` };
      case "rounded": return { ...base, borderRadius: 10, background: `${th.accent}12`, border: `1px solid ${th.accent}20` };
    }
  };

  const isLightBg = customBg === "light" && active === "custom" || active === "corporate";

  const renderBtn = (label: string) => {
    const base: React.CSSProperties = { display: "inline-block", padding: isMobile ? "7px 18px" : "10px 28px", fontSize: isMobile ? 10 : 13, fontWeight: 600, borderRadius: th.btnRadius, transition: "all 0.4s ease", border: "none" };
    switch (th.btnStyle) {
      case "filled": return <div style={{ ...base, background: th.accent, color: isLightBg ? "#fff" : "#050505" }}>{label}</div>;
      case "outline": return <div style={{ ...base, background: "transparent", border: `1.5px solid ${th.accent}`, color: th.accent }}>{label}</div>;
      case "glow": return <div style={{ ...base, background: th.accent, color: "#fff", boxShadow: `0 0 20px ${th.accent}60, 0 0 40px ${th.accent}30`, letterSpacing: 2, textTransform: "uppercase" as const }}>{label}</div>;
    }
  };

  const renderMinimalPreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "8px 12px" : "14px 28px" }}>
        <div style={{ fontSize: isMobile ? 11 : 15, fontWeight: 600, letterSpacing: 3, color: th.textPrimary }}>{th.brand}</div>
        {!isMobile && <div style={{ display: "flex", gap: 24, fontSize: 11, color: th.textSecondary }}><span>{t("preview.navHome")}</span><span>{t("preview.navAbout")}</span><span>{t("preview.navServices")}</span><span>{t("preview.navContact")}</span></div>}
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
      <div style={{ padding: isMobile ? "24px 14px 20px" : "52px 32px 36px", textAlign: "center" }}>
        <div style={{ fontSize: isMobile ? 18 : 34, fontWeight: 300, color: th.textPrimary, lineHeight: 1.3, letterSpacing: -0.5 }}>
          {t("preview.headingLine1")}{" "}<span style={{ color: th.accent, fontWeight: 600, transition: "color 0.4s ease" }}>{t(`accentWords.${active}`)}</span>
        </div>
        <div style={{ fontSize: isMobile ? 10 : 13, color: th.textSecondary, maxWidth: 340, margin: isMobile ? "8px auto 16px" : "14px auto 24px" }}>{t("preview.sub")}</div>
        {renderBtn(t("preview.btn"))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: th.gridCols, gap: isMobile ? 6 : 12, padding: isMobile ? "0 12px 16px" : "0 28px 32px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{ padding: isMobile ? "10px 6px" : "20px 14px", borderRadius: th.cardRadius, background: th.cardBg, border: th.cardBorder, textAlign: "center", transition: "all 0.4s ease" }}>
            <div style={{ ...iconShapeStyle(isMobile ? 26 : 36), margin: "0 auto 6px" }}>{["⚡", "🎨", "🔒"][i]}</div>
            <div style={{ fontSize: isMobile ? 9 : 12, fontWeight: 600, color: th.textPrimary }}>{t(`preview.${key}`)}</div>
            <div style={{ fontSize: isMobile ? 8 : 10, color: th.textSecondary, marginTop: 2 }}>{t(`preview.${key}Desc`)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWarmPreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "8px 12px" : "12px 24px", background: th.navBg, borderBottom: `1px solid ${th.accent}15` }}>
        <div style={{ fontSize: isMobile ? 12 : 16, fontWeight: 700, color: th.accent, fontStyle: "italic" }}>{th.brand}</div>
        {!isMobile && <div style={{ display: "flex", gap: 20, fontSize: 11, color: th.textSecondary, fontStyle: "italic" }}><span>{t("preview.navHome")}</span><span>{t("preview.navAbout")}</span><span>{t("preview.navServices")}</span><span>{t("preview.navContact")}</span></div>}
      </div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 0 : 24, padding: isMobile ? "18px 14px 14px" : "40px 28px 28px" }}>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: isMobile ? 8 : 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: th.accent, marginBottom: isMobile ? 8 : 12 }}>✦ {t("preview.navServices")}</div>
          <div style={{ fontSize: isMobile ? 18 : 32, fontWeight: 700, color: th.textPrimary, lineHeight: 1.2, marginBottom: isMobile ? 6 : 10 }}>
            {t("preview.headingLine1")}{" "}<span style={{ color: th.accent, transition: "color 0.4s ease" }}>{t(`accentWords.${active}`)}</span>
          </div>
          <div style={{ fontSize: isMobile ? 10 : 13, color: th.textSecondary, marginBottom: isMobile ? 14 : 20, maxWidth: 300 }}>{t("preview.sub")}</div>
          {renderBtn(t("preview.btn"))}
        </div>
        {!isMobile && <div style={{ width: 160, borderRadius: th.cardRadius, background: `linear-gradient(135deg, ${th.accent}15, ${th.accent}05)`, border: `1px solid ${th.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>✦</div>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 6 : 8, padding: isMobile ? "0 12px 14px" : "0 28px 28px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14, padding: isMobile ? "10px 10px" : "14px 18px", borderRadius: th.cardRadius, background: th.cardBg, transition: "all 0.4s ease" }}>
            <div style={{ ...iconShapeStyle(isMobile ? 28 : 38), flexShrink: 0 }}><span style={th.iconShape === "diamond" ? { transform: "rotate(-45deg)" } : undefined}>{["⚡", "🎨", "🔒"][i]}</span></div>
            <div>
              <div style={{ fontSize: isMobile ? 10 : 13, fontWeight: 600, color: th.textPrimary }}>{t(`preview.${key}`)}</div>
              <div style={{ fontSize: isMobile ? 8 : 11, color: th.textSecondary, marginTop: 2 }}>{t(`preview.${key}Desc`)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBoldPreview = () => (
    <div style={{ background: `linear-gradient(180deg, ${th.bg}, #0d0020)`, transition: "background 0.4s ease", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${th.accent}15, transparent)`, filter: "blur(40px)" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "8px 12px" : "12px 24px", background: th.navBg, borderBottom: `1px solid ${th.accent}20` }}>
        <div style={{ fontSize: isMobile ? 11 : 16, fontWeight: 800, color: th.accent, letterSpacing: 4, textTransform: "uppercase" as const, textShadow: `0 0 10px ${th.accent}60` }}>{th.brand}</div>
        {!isMobile && <div style={{ display: "flex", gap: 20, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" as const, color: th.textSecondary }}><span>{t("preview.navHome")}</span><span>{t("preview.navAbout")}</span><span>{t("preview.navServices")}</span><span>{t("preview.navContact")}</span></div>}
      </div>
      <div style={{ padding: isMobile ? "24px 14px 20px" : "52px 28px 36px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: isMobile ? 20 : 40, fontWeight: 900, color: th.textPrimary, lineHeight: 1.1, letterSpacing: -1, textTransform: "uppercase" as const }}>
          {t("preview.headingLine1")}{" "}<span style={{ color: th.accent, textShadow: `0 0 20px ${th.accent}50`, transition: "all 0.4s ease" }}>{t(`accentWords.${active}`)}</span>
        </div>
        <div style={{ fontSize: isMobile ? 9 : 12, color: th.textSecondary, maxWidth: 320, margin: isMobile ? "8px auto 16px" : "14px auto 24px", letterSpacing: 1 }}>{t("preview.sub")}</div>
        {renderBtn(t("preview.btn"))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : th.gridCols, gap: isMobile ? 6 : 10, padding: isMobile ? "0 12px 16px" : "0 28px 32px", position: "relative", zIndex: 1 }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{ padding: isMobile ? "10px" : "18px", borderRadius: th.cardRadius, background: th.cardBg, border: th.cardBorder, transition: "all 0.4s ease", display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: isMobile ? "center" : "flex-start", gap: isMobile ? 10 : 0 }}>
            <div style={{ ...iconShapeStyle(isMobile ? 26 : 36), marginBottom: isMobile ? 0 : 10 }}><span style={th.iconShape === "diamond" ? { transform: "rotate(-45deg)", fontSize: isMobile ? 10 : 14 } : undefined}>{["⚡", "🎨", "🔒"][i]}</span></div>
            <div>
              <div style={{ fontSize: isMobile ? 9 : 12, fontWeight: 700, color: th.textPrimary, letterSpacing: 1, textTransform: "uppercase" as const }}>{t(`preview.${key}`)}</div>
              <div style={{ fontSize: isMobile ? 8 : 10, color: th.textSecondary, marginTop: 3 }}>{t(`preview.${key}Desc`)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCorporatePreview = () => (
    <div style={{ background: th.bg, transition: "background 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "8px 12px" : "12px 24px", background: th.navBg, borderBottom: th.cardBorder, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 5 : 8 }}>
          <div style={{ width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, borderRadius: 6, background: th.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 9 : 11, fontWeight: 800, color: "#fff" }}>N</div>
          <div style={{ fontSize: isMobile ? 12 : 15, fontWeight: 700, color: th.textPrimary }}>{th.brand}</div>
        </div>
        {!isMobile && <div style={{ display: "flex", gap: 20, fontSize: 12, fontWeight: 500, color: th.textSecondary }}><span>{t("preview.navHome")}</span><span>{t("preview.navAbout")}</span><span>{t("preview.navServices")}</span><span>{t("preview.navContact")}</span></div>}
      </div>
      <div style={{ padding: isMobile ? "20px 14px" : "40px 28px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: isMobile ? "3px 8px" : "4px 12px", borderRadius: 20, background: `${th.accent}12`, fontSize: isMobile ? 9 : 11, fontWeight: 600, color: th.accent, marginBottom: isMobile ? 10 : 14 }}>✨ {t("preview.navServices")}</div>
        <div style={{ fontSize: isMobile ? 18 : 32, fontWeight: 700, color: th.textPrimary, lineHeight: 1.2, marginBottom: isMobile ? 6 : 10 }}>
          {t("preview.headingLine1")}{" "}<span style={{ color: th.accent, transition: "color 0.4s ease", background: `linear-gradient(135deg, ${th.accent}, #60a5fa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t(`accentWords.${active}`)}</span>
        </div>
        <div style={{ fontSize: isMobile ? 10 : 13, color: th.textSecondary, maxWidth: 360, margin: isMobile ? "0 auto 14px" : "0 auto 22px" }}>{t("preview.sub")}</div>
        <div style={{ display: "flex", gap: isMobile ? 6 : 10, justifyContent: "center" }}>
          {renderBtn(t("preview.btn"))}
          <div style={{ display: "inline-block", padding: isMobile ? "7px 14px" : "10px 28px", fontSize: isMobile ? 10 : 13, fontWeight: 600, borderRadius: th.btnRadius, background: "transparent", border: `1.5px solid ${th.accent}40`, color: th.accent }}>{t("preview.navAbout")} →</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : th.gridCols, gap: isMobile ? 6 : 12, padding: isMobile ? "0 12px 16px" : "0 28px 32px" }}>
        {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
          <div key={key} style={{ padding: isMobile ? "12px" : "20px", borderRadius: th.cardRadius, background: th.cardBg, border: th.cardBorder, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", textAlign: "left", transition: "all 0.4s ease" }}>
            <div style={{ ...iconShapeStyle(isMobile ? 28 : 40), marginBottom: isMobile ? 8 : 12 }}><span>{["⚡", "🎨", "🔒"][i]}</span></div>
            <div style={{ fontSize: isMobile ? 11 : 14, fontWeight: 600, color: th.textPrimary }}>{t(`preview.${key}`)}</div>
            <div style={{ fontSize: isMobile ? 9 : 11, color: th.textSecondary, marginTop: 3, lineHeight: 1.5 }}>{t(`preview.${key}Desc`)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomPreview = () => {
    const isLight = customBg === "light";
    return (
      <div style={{ background: customBg === "neon" ? `linear-gradient(180deg, ${th.bg}, #0d0020)` : th.bg, transition: "background 0.4s ease", position: "relative", overflow: "hidden" }}>
        {customBg === "neon" && <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${th.accent}15, transparent)`, filter: "blur(40px)" }} />}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "8px 12px" : "12px 24px", background: th.navBg, borderBottom: isLight ? th.cardBorder : `1px solid rgba(255,255,255,0.06)`, boxShadow: isLight ? "0 1px 3px rgba(0,0,0,0.04)" : "none" }}>
          <div style={{ fontSize: isMobile ? 12 : 16, fontWeight: 700, color: th.accent, letterSpacing: 1 }}>{th.brand}</div>
          {!isMobile && <div style={{ display: "flex", gap: 20, fontSize: 11, color: th.textSecondary }}><span>{t("preview.navHome")}</span><span>{t("preview.navAbout")}</span><span>{t("preview.navServices")}</span><span>{t("preview.navContact")}</span></div>}
        </div>
        <div style={{ padding: isMobile ? "20px 14px 16px" : "44px 28px 32px", textAlign: customLayout, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: isMobile ? 18 : 36, fontWeight: 700, color: th.textPrimary, lineHeight: 1.2, marginBottom: isMobile ? 6 : 10, maxWidth: customLayout === "left" ? 400 : undefined }}>
            {t("preview.headingLine1")}{" "}<span style={{ color: th.accent, transition: "color 0.4s ease" }}>{t("accentWords.custom")}</span>
          </div>
          <div style={{ fontSize: isMobile ? 10 : 13, color: th.textSecondary, maxWidth: 360, margin: customLayout === "center" ? (isMobile ? "0 auto 14px" : "0 auto 22px") : (isMobile ? "0 0 14px" : "0 0 22px") }}>{t("preview.sub")}</div>
          {renderBtn(t("preview.btn"))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : th.gridCols, gap: isMobile ? 6 : 12, padding: isMobile ? "0 12px 16px" : "0 28px 32px", position: "relative", zIndex: 1 }}>
          {(["feat1", "feat2", "feat3"] as const).map((key, i) => (
            <div key={key} style={{ padding: isMobile ? "10px 8px" : "18px 14px", borderRadius: th.cardRadius, background: th.cardBg, border: th.cardBorder, boxShadow: isLight ? "0 1px 3px rgba(0,0,0,0.06)" : "none", textAlign: customCols === "1fr" ? "left" : "center", transition: "all 0.4s ease", display: customCols === "1fr" ? "flex" : "block", alignItems: "center", gap: customCols === "1fr" ? (isMobile ? 10 : 14) : 0 }}>
              <div style={{ ...iconShapeStyle(isMobile ? 26 : 36), margin: customCols === "1fr" ? 0 : (isMobile ? "0 auto 6px" : "0 auto 10px"), flexShrink: 0 }}>
                <span style={th.iconShape === "diamond" ? { transform: "rotate(-45deg)", fontSize: isMobile ? 10 : 14 } : undefined}>{["⚡", "🎨", "🔒"][i]}</span>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? 9 : 12, fontWeight: 600, color: th.textPrimary }}>{t(`preview.${key}`)}</div>
                <div style={{ fontSize: isMobile ? 8 : 10, color: th.textSecondary, marginTop: 2 }}>{t(`preview.${key}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const previewRenderers: Record<ActiveKey, () => React.ReactNode> = {
    minimal: renderMinimalPreview,
    warm: renderWarmPreview,
    bold: renderBoldPreview,
    corporate: renderCorporatePreview,
    custom: renderCustomPreview,
  };

  const sliderCSS = `
    .dp-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer; }
    .dp-slider::-webkit-slider-runnable-track { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); }
    .dp-slider::-moz-range-track { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); }
    .dp-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--dp-accent); background: var(--dp-accent); margin-top: -7px; box-shadow: 0 0 8px var(--dp-accent-glow); cursor: pointer; transition: transform 0.15s ease; }
    .dp-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--dp-accent); background: var(--dp-accent); box-shadow: 0 0 8px var(--dp-accent-glow); cursor: pointer; transition: transform 0.15s ease; }
    .dp-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
    .dp-slider::-moz-range-thumb:hover { transform: scale(1.2); }
    .dp-scroll-strip { scrollbar-width: none; -ms-overflow-style: none; }
    .dp-scroll-strip::-webkit-scrollbar { display: none; }
  `;

  const controlLabel: React.CSSProperties = { fontSize: isMobile ? 10 : 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5, marginBottom: isMobile ? 4 : 6 };
  const pillBtn = (isActive: boolean, accent?: string): React.CSSProperties => ({
    padding: isMobile ? "5px 10px" : "6px 12px", borderRadius: 8, fontSize: isMobile ? 10 : 11, fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease", border: isActive ? `1px solid ${accent || customAccent}` : "1px solid rgba(255,255,255,0.08)", background: isActive ? `${accent || customAccent}15` : "rgba(255,255,255,0.02)", color: isActive ? (accent || customAccent) : "rgba(255,255,255,0.5)", whiteSpace: "nowrap" as const,
  });

  const renderControls = () => (
    <div style={{ marginTop: isMobile ? 10 : 16, padding: isMobile ? "12px" : "20px 24px", borderRadius: isMobile ? 12 : 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", ["--dp-accent" as string]: customAccent, ["--dp-accent-glow" as string]: `${customAccent}60` }}>
      <style dangerouslySetInnerHTML={{ __html: sliderCSS }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 10 : 18 }}>
        <div style={{ width: isMobile ? 16 : 18, height: isMobile ? 16 : 18, borderRadius: 4, background: `${customAccent}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={isMobile ? 8 : 10} height={isMobile ? 8 : 10} viewBox="0 0 24 24" fill="none" stroke={customAccent} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
        </div>
        <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{t("custom.title")}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : 20 }}>
        {/* Accent color */}
        <div>
          <div style={controlLabel}>{t("custom.accent")}</div>
          <div style={{ display: "flex", gap: isMobile ? 5 : 6, flexWrap: "wrap" }}>
            {accentPresets.map((p) => (
              <button key={p.color} onClick={() => setCustomAccent(p.color)} className="mobile-tap" style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, borderRadius: 8, background: p.color, border: customAccent === p.color ? "2px solid #fff" : "2px solid transparent", cursor: "pointer", transition: "all 0.2s", transform: customAccent === p.color ? "scale(1.1)" : "scale(1)" }} title={p.label} />
            ))}
            <label style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, borderRadius: 8, background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`, cursor: "pointer", position: "relative", overflow: "hidden", border: "2px solid transparent" }} title={t("custom.customColor")}>
              <input type="color" value={customAccent} onChange={(e) => setCustomAccent(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
            </label>
          </div>
        </div>

        {/* Background */}
        <div>
          <div style={controlLabel}>{t("custom.background")}</div>
          <div style={{ display: "flex", gap: isMobile ? 4 : 6, flexWrap: "wrap" }}>
            {(["dark", "warm", "neon", "light"] as BgMode[]).map((bg) => (
              <button key={bg} onClick={() => setCustomBg(bg)} className="mobile-tap" style={pillBtn(customBg === bg)}>{t(`custom.bg_${bg}`)}</button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div>
          <div style={controlLabel}>{t("custom.layout")}</div>
          <div style={{ display: "flex", gap: isMobile ? 4 : 6 }}>
            <button onClick={() => setCustomLayout("center")} className="mobile-tap" style={pillBtn(customLayout === "center")}>{t("custom.centered")}</button>
            <button onClick={() => setCustomLayout("left")} className="mobile-tap" style={pillBtn(customLayout === "left")}>{t("custom.leftAligned")}</button>
          </div>
        </div>

        {/* Button style */}
        <div>
          <div style={controlLabel}>{t("custom.button")}</div>
          <div style={{ display: "flex", gap: isMobile ? 4 : 6, flexWrap: "wrap" }}>
            <button onClick={() => setCustomBtn("filled")} className="mobile-tap" style={pillBtn(customBtn === "filled")}>{t("custom.btn_filled")}</button>
            <button onClick={() => setCustomBtn("outline")} className="mobile-tap" style={pillBtn(customBtn === "outline")}>{t("custom.btn_outline")}</button>
            <button onClick={() => setCustomBtn("glow")} className="mobile-tap" style={pillBtn(customBtn === "glow")}>{t("custom.btn_glow")}</button>
          </div>
        </div>

        {/* Icon shape */}
        <div>
          <div style={controlLabel}>{t("custom.icons")}</div>
          <div style={{ display: "flex", gap: isMobile ? 4 : 6, flexWrap: "wrap" }}>
            {(["circle", "square", "diamond", "rounded"] as IconShape[]).map((s) => (
              <button key={s} onClick={() => setCustomIcon(s)} className="mobile-tap" style={pillBtn(customIcon === s)}>{t(`custom.icon_${s}`)}</button>
            ))}
          </div>
        </div>

        {/* Card columns */}
        <div>
          <div style={controlLabel}>{t("custom.columns")}</div>
          <div style={{ display: "flex", gap: isMobile ? 4 : 6 }}>
            {([["1fr", "1"], ["1fr 1fr", "2"], ["1fr 1fr 1fr", "3"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setCustomCols(val as typeof customCols)} className="mobile-tap" style={pillBtn(customCols === val)}>{label}</button>
            ))}
          </div>
        </div>

        {/* Button radius */}
        <div>
          <div style={controlLabel}>{t("custom.roundness")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, height: 6, borderRadius: 3, background: customAccent, width: `${(customBtnRadius / 24) * 100}%`, transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.5, transition: "width 0.1s ease" }} />
              <input type="range" min={0} max={24} value={customBtnRadius} onChange={(e) => setCustomBtnRadius(Number(e.target.value))} className="dp-slider" style={{ background: "transparent" }} />
            </div>
            <span style={{ fontSize: isMobile ? 10 : 11, color: "rgba(255,255,255,0.4)", minWidth: 28 }}>{customBtnRadius}px</span>
          </div>
        </div>

        {/* Card radius */}
        <div>
          <div style={controlLabel}>{t("custom.cardRadius")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, height: 6, borderRadius: 3, background: customAccent, width: `${(customCardRadius / 20) * 100}%`, transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.5, transition: "width 0.1s ease" }} />
              <input type="range" min={0} max={20} value={customCardRadius} onChange={(e) => setCustomCardRadius(Number(e.target.value))} className="dp-slider" style={{ background: "transparent" }} />
            </div>
            <span style={{ fontSize: isMobile ? 10 : 11, color: "rgba(255,255,255,0.4)", minWidth: 28 }}>{customCardRadius}px</span>
          </div>
        </div>
      </div>
    </div>
  );

  const getTabAccent = (key: ActiveKey) => key === "custom" ? customAccent : themes[key].accent;

  return (
    <section className="section-gradient-up" style={{ padding: isMobile ? "40px 12px" : "100px 40px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="dot-matrix" style={{ position: "absolute", inset: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 20 : 50 }}>
            <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "#00a884" }}>{t("eyebrow")}</span>
            <h2 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 600, color: "#e9edef", margin: isMobile ? "8px 0 0" : "12px 0 0", letterSpacing: -0.5 }}>{t("heading")}</h2>
            <p style={{ fontSize: isMobile ? 12 : 14, color: "rgba(255,255,255,0.4)", marginTop: isMobile ? 6 : 10, maxWidth: 400, marginInline: "auto" }}>{t("subtitle")}</p>
          </div>
        </FadeIn>

        {/* Scrollable tab strip */}
        <div style={{ position: "relative", marginBottom: isMobile ? 12 : 24 }}>
          <div
            ref={scrollRef}
            className="dp-scroll-strip"
            style={{
              display: "flex",
              gap: isMobile ? 8 : 12,
              overflowX: "auto",
              paddingBottom: 8,
              paddingInline: 2,
              scrollSnapType: "x mandatory",
            }}
          >
            {tabOrder.map((key) => {
              const accent = getTabAccent(key);
              const label = key === "custom" ? t("styles.custom.name") : t(`styles.${key}.name`);
              const desc = key === "custom" ? t("styles.custom.desc") : t(`styles.${key}.desc`);
              return (
                <button key={key} onClick={() => setActive(key)} className="mobile-tap" style={{
                  padding: isMobile ? "8px 14px" : "12px 20px", borderRadius: 12,
                  border: active === key ? `1.5px solid ${accent}` : "1px solid rgba(255,255,255,0.08)",
                  background: active === key ? `${accent}10` : "rgba(255,255,255,0.02)",
                  cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.3s ease", flexShrink: 0, textAlign: "center" as const,
                  scrollSnapAlign: "start",
                  minWidth: isMobile ? 100 : undefined,
                }}>
                  <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, color: active === key ? accent : "rgba(255,255,255,0.6)" }}>{label}</div>
                  <div style={{ fontSize: isMobile ? 9 : 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{desc}</div>
                </button>
              );
            })}
          </div>
          {/* Fade edges to signal scrollability */}
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 8, width: 40, background: "linear-gradient(90deg, transparent, #050505)", pointerEvents: "none", borderRadius: "0 12px 12px 0", opacity: showScrollHint ? 1 : 0, transition: "opacity 0.3s" }} />
          {/* Scroll indicator dots */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
              {tabOrder.map((key) => (
                <div key={key} style={{ width: active === key ? 16 : 5, height: 5, borderRadius: 3, background: active === key ? getTabAccent(key) : "rgba(255,255,255,0.15)", transition: "all 0.3s ease" }} />
              ))}
            </div>
          )}
        </div>

        {/* Live preview */}
        <div className="glass-card" style={{ borderRadius: isMobile ? 12 : 16, overflow: "hidden" }}>
          {/* Browser chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 6, padding: isMobile ? "7px 10px" : "10px 14px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: isMobile ? 4 : 5 }}>
              <div style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ flex: 1, marginInlineStart: isMobile ? 4 : 8, padding: isMobile ? "3px 8px" : "4px 12px", borderRadius: 6, background: "rgba(255,255,255,0.05)", fontSize: isMobile ? 9 : 11, color: "rgba(255,255,255,0.3)" }}>{t("preview.url")}</div>
          </div>

          {previewRenderers[active]()}

          {/* CTA bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 12px" : "14px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ fontSize: isMobile ? 10 : 13, color: "rgba(255,255,255,0.3)" }}>{t("cta")}</span>
            <a
              href="https://wa.me/96566565517?text=Hi%2C%20I%20tried%20the%20design%20playground%20on%20your%20site%20and%20I%27m%20interested%20in%20building%20something%20similar."
              target="_blank" rel="noopener noreferrer" className="mobile-tap"
              style={{ display: "inline-flex", alignItems: "center", gap: isMobile ? 4 : 6, padding: isMobile ? "6px 12px" : "8px 18px", borderRadius: 8, fontSize: isMobile ? 10 : 13, fontWeight: 600, color: "#050505", background: "#00a884", textDecoration: "none", transition: "all 0.25s ease" }}
            >
              {t("ctaButton")}
              <svg width={isMobile ? 11 : 14} height={isMobile ? 11 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </div>

        {/* Custom controls panel */}
        {active === "custom" && renderControls()}
      </div>
    </section>
  );
}
