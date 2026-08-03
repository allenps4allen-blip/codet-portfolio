"use client";

import HeroScrollDemo from "@/components/HeroScrollDemo";
import { useRouter } from "next/navigation";

export default function AIAgentDemoPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#050505", minHeight: "100vh", animation: "fadeIn 0.3s ease-out" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
      <button
        onClick={() => router.back()}
        style={{
          position: "fixed",
          top: 80,
          left: 20,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 16px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          color: "rgba(255,255,255,0.6)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          backdropFilter: "blur(20px)",
          transition: "all 0.2s ease",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Back
      </button>
      <HeroScrollDemo />
    </div>
  );
}
