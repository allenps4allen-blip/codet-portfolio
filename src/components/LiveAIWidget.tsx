"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAgentAnalytics } from "@/hooks/useAgentAnalytics";

export default function LiveAIWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("demo");
  const { trackWidgetClick } = useAgentAnalytics();
  const [showPulse, setShowPulse] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (pathname.includes("/demo")) return null;

  const locale = pathname.split("/")[1] || "en";

  return (
    <>
      <style>{`
        @keyframes aiWidgetPulse {
          0% { box-shadow: 0 0 0 0 rgba(0,168,132,0.4); }
          70% { box-shadow: 0 0 0 14px rgba(0,168,132,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,168,132,0); }
        }
        @media (max-width: 767px) {
          .ai-widget-float {
            bottom: calc(68px + env(safe-area-inset-bottom, 0px) + 80px) !important;
          }
        }
      `}</style>
      <button
        onClick={() => {
          trackWidgetClick(pathname || "/");
          router.push(`/${locale}/demo`);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={t("widgetTooltip")}
        className="ai-widget-float"
        style={{
          position: "fixed",
          bottom: 92,
          right: 24,
          zIndex: 999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#00a884",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s ease",
          animation: showPulse ? "aiWidgetPulse 1.5s ease-out 2" : "none",
          boxShadow: "0 4px 20px rgba(0,168,132,0.3)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          <path d="M12 10c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
        </svg>
        {hovered && (
          <span style={{
            position: "absolute",
            right: 64,
            whiteSpace: "nowrap",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            fontSize: 12,
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: 8,
            pointerEvents: "none",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            {t("widgetTooltip")}
          </span>
        )}
      </button>
    </>
  );
}
