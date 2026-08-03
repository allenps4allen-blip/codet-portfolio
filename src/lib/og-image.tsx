import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateOGImage(title: string, subtitle: string, locale: string) {
  const isArabic = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#050505",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background dots pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-50px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 168, 132, 0.15), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-30px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(120, 70, 255, 0.1), transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "60px 80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
              marginBottom: "40px",
            }}
          >
            CODET
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 30 ? 44 : 56,
              fontWeight: 700,
              color: "#e9edef",
              lineHeight: 1.2,
              maxWidth: "900px",
              direction: isArabic ? "rtl" : "ltr",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.45)",
              marginTop: "20px",
              maxWidth: "700px",
              lineHeight: 1.5,
              direction: isArabic ? "rtl" : "ltr",
            }}
          >
            {subtitle}
          </div>

          {/* Accent bar */}
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: "#00a884",
              marginTop: "32px",
            }}
          />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 16,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          codet-kw.com
        </div>
      </div>
    ),
    { ...size }
  );
}
