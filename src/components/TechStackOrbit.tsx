"use client";

import { useState, useEffect } from "react";

const innerRing = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Python", color: "#3776AB" },
  { name: "TypeScript", color: "#3178C6" },
];

const outerRing = [
  { name: "OpenAI", color: "#ffffff" },
  { name: "Claude", color: "#D4A574" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Vercel", color: "#ffffff" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Make", color: "#6D00CC" },
  { name: "Telegram", color: "#26A5E4" },
];

export default function TechStackOrbit() {
  const [angle, setAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let frame: number;
    let last = 0;
    const animate = (ts: number) => {
      if (last) {
        const delta = (ts - last) / 1000;
        setAngle((a) => a + delta * 8);
      }
      last = ts;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const size = isMobile ? 300 : 440;
  const innerRadius = isMobile ? 68 : 100;
  const outerRadius = isMobile ? 126 : 185;
  const cx = size / 2;
  const cy = size / 2;
  const innerNodeR = isMobile ? 16 : 22;
  const outerNodeR = isMobile ? 14 : 20;
  const innerFontSize = isMobile ? 6 : 8;
  const outerFontSize = isMobile ? 5.5 : 7.5;

  return (
    <div style={{ ...s.section as React.CSSProperties, padding: isMobile ? "60px 20px" : "100px 40px" }}>
      <div style={s.header as React.CSSProperties}>
        <span style={s.eyebrow as React.CSSProperties}>Tech Stack</span>
        <h2 style={s.h2 as React.CSSProperties}>Built with the best tools</h2>
        <p style={s.subtitle as React.CSSProperties}>We pick the right technology for each job — never the other way around.</p>
      </div>

      <div style={s.orbitContainer as React.CSSProperties}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: "visible", maxWidth: "100%" }}>
          <circle cx={cx} cy={cy} r={innerRadius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx={cx} cy={cy} r={outerRadius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />

          <circle cx={cx} cy={cy} r={isMobile ? 22 : 32} fill="rgba(0,168,132,0.1)" stroke="rgba(0,168,132,0.3)" strokeWidth="1.5" />
          <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#00a884" fontSize={isMobile ? 8 : 11} fontWeight="700" fontFamily="-apple-system, sans-serif">CODET</text>

          <circle cx={cx} cy={cy} r={isMobile ? 30 : 45} fill="none" stroke="rgba(0,168,132,0.08)" strokeWidth="20">
            <animate attributeName="r" values={isMobile ? "25;35;25" : "35;50;35"} dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
          </circle>

          {innerRing.map((_, i) => {
            const a = (angle + (i * 360) / innerRing.length) * (Math.PI / 180);
            const x = cx + Math.cos(a) * innerRadius;
            const y = cy + Math.sin(a) * innerRadius;
            return (
              <line key={`line-${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,168,132,0.08)" strokeWidth="1" />
            );
          })}

          {innerRing.map((tech, i) => {
            const a = (angle + (i * 360) / innerRing.length) * (Math.PI / 180);
            const x = cx + Math.cos(a) * innerRadius;
            const y = cy + Math.sin(a) * innerRadius;
            return (
              <g key={`inner-${i}`}>
                <circle cx={x} cy={y} r={innerNodeR} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={tech.color} fontSize={innerFontSize} fontWeight="600" fontFamily="-apple-system, sans-serif" opacity="0.8">
                  {tech.name}
                </text>
              </g>
            );
          })}

          {outerRing.map((tech, i) => {
            const a = (-angle * 0.6 + (i * 360) / outerRing.length) * (Math.PI / 180);
            const x = cx + Math.cos(a) * outerRadius;
            const y = cy + Math.sin(a) * outerRadius;
            return (
              <g key={`outer-${i}`}>
                <circle cx={x} cy={y} r={outerNodeR} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={tech.color} fontSize={outerFontSize} fontWeight="500" fontFamily="-apple-system, sans-serif" opacity="0.6">
                  {tech.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

const s = {
  section: {
    padding: "100px 40px",
    background: "#050505",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: "center" as const,
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase" as const,
    color: "#00a884",
    display: "block",
    marginBottom: 12,
  },
  h2: {
    fontSize: 32,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.35)",
    marginTop: 10,
  },
  orbitContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
