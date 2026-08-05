import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";
export const alt = "CODET Blog";

const categoryColors: Record<string, string> = {
  ai: "#8b5cf6",
  "web-development": "#00a884",
  automation: "#f59e0b",
  "case-study": "#6366f1",
  "industry-insights": "#ec4899",
  general: "#64748b",
};

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = await params;

  let title = "Blog Post";
  let category = "general";

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.post) {
        title = locale === "ar" && data.post.title.ar ? data.post.title.ar : data.post.title.en;
        category = data.post.category;
      }
    }
  } catch {
    // fallback title
  }

  const catColor = categoryColors[category] || categoryColors.general;

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", background: "#050505",
        fontFamily: "sans-serif", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div style={{
          position: "absolute", top: "-100px", right: "-50px", width: "400px", height: "400px",
          borderRadius: "50%", background: `radial-gradient(circle, ${catColor}30, transparent 70%)`,
        }} />

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "60px 80px", position: "relative", zIndex: 1,
        }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#ffffff", letterSpacing: "-1px", marginBottom: "16px" }}>
            CODET
          </div>

          <div style={{
            fontSize: 14, fontWeight: 600, color: catColor, textTransform: "uppercase",
            letterSpacing: "2px", marginBottom: "24px", padding: "4px 16px",
            borderRadius: "20px", background: `${catColor}20`,
          }}>
            {category.replace(/-/g, " ")}
          </div>

          <div style={{
            fontSize: title.length > 50 ? 36 : 48, fontWeight: 700, color: "#e9edef",
            lineHeight: 1.2, maxWidth: "900px",
            direction: locale === "ar" ? "rtl" : "ltr",
          }}>
            {title}
          </div>

          <div style={{ width: "60px", height: "4px", borderRadius: "2px", background: catColor, marginTop: "32px" }} />
        </div>

        <div style={{
          position: "absolute", bottom: "30px", display: "flex", alignItems: "center",
          gap: "8px", fontSize: 16, color: "rgba(255,255,255,0.3)",
        }}>
          codet-kw.com/blog
        </div>
      </div>
    ),
    { ...size }
  );
}
