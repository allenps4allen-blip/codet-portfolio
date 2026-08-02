"use client";

import { useState, useEffect, useRef } from "react";

function AnimatedNumber({ value, prefix = "", suffix = "" }: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = null;
    const duration = 600;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startRef.current + (value - startRef.current) * eased);
      setDisplay(current);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

function Slider({ label, value, onChange, min, max, step = 1, unit = "" }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={s.sliderGroup}>
      <div style={s.sliderHeader}>
        <span style={s.sliderLabel}>{label}</span>
        <span style={s.sliderValue}>{value}{unit}</span>
      </div>
      <div style={s.sliderTrackWrap}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={s.sliderInput}
        />
        <div style={s.sliderTrack}>
          <div style={{ ...s.sliderFill, width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(8);
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(5);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const weeklyWaste = employees * hours * rate;
  const monthlySavings = Math.round(weeklyWaste * 4 * 0.85);
  const yearlySavings = monthlySavings * 12;
  const hoursReclaimed = employees * hours * 4;

  return (
    <div ref={sectionRef} className="roi-section" style={s.section}>
      <div style={s.header}>
        <span style={s.eyebrow}>ROI Calculator</span>
        <h2 style={s.h2}>See your potential savings</h2>
        <p style={s.subtitle}>Adjust the sliders to match your team. Results update instantly.</p>
      </div>

      <div style={{
        ...s.card,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={s.slidersSection}>
          <Slider label="Team size" value={employees} onChange={setEmployees} min={1} max={50} unit=" people" />
          <Slider label="Hours wasted on manual tasks / week" value={hours} onChange={setHours} min={1} max={40} unit=" hrs" />
          <Slider label="Average hourly cost" value={rate} onChange={setRate} min={2} max={25} step={1} unit=" KD" />
        </div>

        <div style={s.resultsSection}>
          <div style={s.resultCard}>
            <span style={s.resultCardLabel}>Monthly savings</span>
            <div style={s.resultCardValue}>
              <AnimatedNumber value={monthlySavings} suffix=" KD" />
            </div>
          </div>

          <div style={s.resultCard}>
            <span style={s.resultCardLabel}>Yearly savings</span>
            <div style={{ ...s.resultCardValue, color: "#e9edef", fontSize: 28 }}>
              <AnimatedNumber value={yearlySavings} suffix=" KD" />
            </div>
          </div>

          <div style={s.resultCard}>
            <span style={s.resultCardLabel}>Hours reclaimed / month</span>
            <div style={{ ...s.resultCardValue, color: "#e9edef", fontSize: 28 }}>
              <AnimatedNumber value={hoursReclaimed} suffix=" hrs" />
            </div>
          </div>
        </div>

        <div style={s.comparison}>
          <div style={s.compRow}>
            <span style={s.compLabel}>Current weekly cost</span>
            <div style={s.compBarTrack}>
              <div style={{ ...s.compBar, width: "100%", background: "rgba(255,70,70,0.2)" }}>
                <span style={s.compBarText}>{weeklyWaste.toLocaleString()} KD</span>
              </div>
            </div>
          </div>
          <div style={s.compRow}>
            <span style={s.compLabel}>With CODET automation</span>
            <div style={s.compBarTrack}>
              <div style={{ ...s.compBar, width: `${Math.max(10, 15)}%`, background: "rgba(0,168,132,0.25)" }}>
                <span style={s.compBarText}>{Math.round(weeklyWaste * 0.15).toLocaleString()} KD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: 50,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase",
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
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 20,
    maxWidth: 640,
    width: "100%",
    padding: "36px 32px",
  },
  slidersSection: {
    display: "flex",
    flexDirection: "column",
    gap: 28,
    marginBottom: 32,
  },
  resultsSection: {
    display: "flex",
    gap: 12,
    marginBottom: 28,
  },
  resultCard: {
    flex: 1,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "16px 14px",
    textAlign: "center",
  },
  resultCardLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    display: "block",
    marginBottom: 8,
  },
  resultCardValue: {
    fontSize: 32,
    fontWeight: 700,
    color: "#00a884",
    letterSpacing: -1,
    lineHeight: 1,
  },
  comparison: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  compRow: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  compLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
  },
  compBarTrack: {
    width: "100%",
    height: 24,
    background: "rgba(255,255,255,0.04)",
    borderRadius: 6,
    overflow: "hidden",
  },
  compBar: {
    height: "100%",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    transition: "width 0.4s ease",
  },
  compBarText: {
    fontSize: 10,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    fontVariantNumeric: "tabular-nums",
  },
  sliderGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sliderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    fontWeight: 500,
  },
  sliderValue: {
    fontSize: 14,
    color: "#e9edef",
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
  },
  sliderTrackWrap: {
    position: "relative",
    height: 18,
  },
  sliderInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
  },
  sliderTrack: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "100%",
    height: 4,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 2,
    pointerEvents: "none",
  },
  sliderFill: {
    height: "100%",
    background: "linear-gradient(90deg, #005c4b, #00a884)",
    borderRadius: 2,
    transition: "width 0.05s ease",
  },
};
