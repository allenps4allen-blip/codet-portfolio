"use client";

import { useState, useEffect, useRef } from "react";

function AnimatedNumber({ value, prefix = "", suffix = "", color = "#e9edef" }: {
  value: number;
  prefix?: string;
  suffix?: string;
  color?: string;
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
    <span style={{ color, fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>
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
  const [employees, setEmployees] = useState(12);
  const [hours, setHours] = useState(15);
  const [rate, setRate] = useState(8);
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

  const monthlySavings = employees * hours * rate * 4;
  const yearlySavings = monthlySavings * 12;
  const hoursReclaimed = employees * hours * 4;
  const tasksAutomated = Math.round(employees * hours * 0.7 * 4);

  return (
    <div ref={sectionRef} className="roi-section" style={s.section}>
      <div style={s.header}>
        <span style={s.eyebrow}>ROI Calculator</span>
        <h2 style={s.h2}>How much could you save?</h2>
        <p style={s.subtitle}>Drag the sliders to match your business. Watch the numbers change.</p>
      </div>

      <div className="roi-card" style={{ ...s.card, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <div style={s.inputSide}>
          <Slider label="Team size" value={employees} onChange={setEmployees} min={1} max={80} unit=" people" />
          <Slider label="Hours on repetitive tasks / week" value={hours} onChange={setHours} min={1} max={40} unit=" hrs" />
          <Slider label="Average hourly cost" value={rate} onChange={setRate} min={2} max={40} step={1} unit=" KD" />
        </div>

        <div className="roi-divider" style={s.divider} />

        <div style={s.resultSide}>
          <div style={s.resultMain}>
            <span style={s.resultLabel}>Monthly savings</span>
            <div style={s.resultBig}>
              <AnimatedNumber value={monthlySavings} suffix=" KD" color="#00a884" />
            </div>
          </div>

          <div className="roi-result-row" style={s.resultRow}>
            <div style={s.resultSmall}>
              <span style={s.resultLabel}>Yearly savings</span>
              <AnimatedNumber value={yearlySavings} suffix=" KD" color="#e9edef" />
            </div>
            <div style={s.resultSmall}>
              <span style={s.resultLabel}>Hours reclaimed / mo</span>
              <AnimatedNumber value={hoursReclaimed} suffix=" hrs" color="#e9edef" />
            </div>
            <div style={s.resultSmall}>
              <span style={s.resultLabel}>Tasks automated / mo</span>
              <AnimatedNumber value={tasksAutomated} color="#e9edef" />
            </div>
          </div>

          <div style={s.barSection}>
            <div style={s.barLabel}>
              <span>Manual cost</span>
              <span>With automation</span>
            </div>
            <div style={s.barTrack}>
              <div style={{ ...s.barFull, width: "100%" }}>
                <span style={s.barText}>{(employees * hours * rate * 4).toLocaleString()} KD</span>
              </div>
            </div>
            <div style={s.barTrack}>
              <div style={{ ...s.barSaved, width: `${Math.max(8, 100 - (monthlySavings / (employees * hours * rate * 4)) * 100)}%` }}>
                <span style={s.barText}>{Math.round(employees * hours * rate * 4 * 0.15).toLocaleString()} KD</span>
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
    minHeight: "80vh",
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
    display: "flex",
    gap: 0,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 20,
    maxWidth: 820,
    width: "100%",
    overflow: "hidden",
  },
  inputSide: {
    flex: 1,
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  divider: {
    width: 1,
    background: "rgba(255,255,255,0.06)",
  },
  resultSide: {
    flex: 1.1,
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
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
  resultMain: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  resultLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  resultBig: {
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: -1,
  },
  resultRow: {
    display: "flex",
    gap: 20,
  },
  resultSmall: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    fontSize: 18,
    fontWeight: 600,
  },
  barSection: {
    marginTop: 8,
  },
  barLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    marginBottom: 8,
  },
  barTrack: {
    width: "100%",
    height: 24,
    background: "rgba(255,255,255,0.04)",
    borderRadius: 6,
    marginBottom: 6,
    overflow: "hidden",
  },
  barFull: {
    height: "100%",
    background: "rgba(255,70,70,0.2)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    transition: "width 0.4s ease",
  },
  barSaved: {
    height: "100%",
    background: "rgba(0,168,132,0.25)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    transition: "width 0.4s ease",
  },
  barText: {
    fontSize: 10,
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    fontVariantNumeric: "tabular-nums",
  },
};
