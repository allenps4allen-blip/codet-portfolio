"use client";

import HeroScrollDemo from "@/components/HeroScrollDemo";
import { useRouter } from "next/navigation";

export default function AIAgentDemoPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#050505", minHeight: "100vh", animation: "fadeIn 0.3s ease-out" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .demo-back-btn {
          position: fixed;
          top: 80px;
          left: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        @media (max-width: 768px) {
          .demo-back-btn {
            top: 12px;
            left: 12px;
            padding: 6px 12px;
            font-size: 11px;
            border-radius: 8px;
          }
        }
      `}} />
      <button className="demo-back-btn" onClick={() => router.back()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Back
      </button>
      <HeroScrollDemo />
    </div>
  );
}
