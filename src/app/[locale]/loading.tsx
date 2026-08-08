export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes logo-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes line-grow {
          0% { width: 0; }
          50% { width: 60px; }
          100% { width: 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
          border-radius: 8px;
        }
      `}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: "#e9edef", animation: "logo-pulse 2s ease-in-out infinite" }}>
          CODET
        </div>
        <div style={{ height: 2, borderRadius: 1, background: "#00a884", animation: "line-grow 2s ease-in-out infinite" }} />
      </div>
    </>
  );
}
