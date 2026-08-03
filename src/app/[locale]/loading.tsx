export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
          border-radius: 8px;
        }
      `}</style>
      <div style={{ minHeight: "100vh", padding: "160px 24px 80px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="skeleton" style={{ width: 120, height: 12 }} />
          <div className="skeleton" style={{ width: 400, height: 36, maxWidth: "80%" }} />
          <div className="skeleton" style={{ width: 300, height: 16, maxWidth: "60%" }} />
        </div>
        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="skeleton" style={{ width: "100%", height: 140 }} />
          <div className="skeleton" style={{ width: "100%", height: 140 }} />
          <div className="skeleton" style={{ width: "100%", height: 140 }} />
        </div>
      </div>
    </>
  );
}
