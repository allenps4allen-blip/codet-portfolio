import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CODET — We digitalize your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(120, 119, 198, 0.15), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#fafafa",
              letterSpacing: "-2px",
            }}
          >
            CODET
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(250, 250, 250, 0.6)",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            We digitalize your business — websites, AI agents, automations &amp;
            workflows.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "32px",
            color: "rgba(250, 250, 250, 0.35)",
            fontSize: "16px",
          }}
        >
          <span>Websites</span>
          <span>·</span>
          <span>AI Agents</span>
          <span>·</span>
          <span>Automations</span>
          <span>·</span>
          <span>Workflows</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
