"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      maxWidth: 480,
      width: "calc(100% - 48px)",
      padding: "16px 20px",
      background: "rgba(20,20,20,0.95)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      backdropFilter: "blur(20px)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      animation: "cookieSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, margin: 0 }}>
        {isArabic
          ? "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور."
          : "We use cookies to improve your experience and analyze site traffic."}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={accept}
          style={{
            padding: "12px 20px",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
            background: "#00a884",
            color: "white",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {isArabic ? "قبول" : "Accept"}
        </button>
        <button
          onClick={decline}
          style={{
            padding: "12px 20px",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {isArabic ? "رفض" : "Decline"}
        </button>
      </div>
    </div>
  );
}
