"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const formatTime = (base: number, offset: number) => {
  const minutes = base + offset;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

function TypingIndicator() {
  return (
    <div style={{ display: "flex", padding: "2px 16px", animation: "fadeSlideIn 0.3s ease-out" }}>
      <div style={{ ...s.bubble, ...s.agentBubble, padding: "12px 16px", display: "flex", gap: 5, alignItems: "center", minWidth: 52 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.45)", animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

function SeenReceipt({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, padding: "0 16px 2px", animation: "fadeSlideIn 0.3s ease-out" }}>
      <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.3)" }}>{label}</span>
      <svg width="16" height="10" viewBox="0 0 20 12">
        <path d="M1.5 6.5l3.5 3.5 8-8" stroke="#53bdeb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 6.5l3.5 3.5 8-8" stroke="#53bdeb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function WaitingClock({ elapsed, waitingText, queueText }: { elapsed: number; waitingText: string; queueText: string }) {
  const urgent = elapsed > 20;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px 10px", gap: 8, animation: "fadeSlideIn 0.5s ease-out" }}>
      <div style={{ position: "relative", width: 44, height: 44 }}>
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <circle cx="22" cy="22" r="19" fill="none" stroke={urgent ? "rgba(255,70,70,0.6)" : "rgba(255,100,100,0.35)"} strokeWidth="2.5" strokeDasharray="119" strokeDashoffset={119 - (Math.min(elapsed, 50) / 50) * 119} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease", transform: "rotate(-90deg)", transformOrigin: "center" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={urgent ? "rgba(255,70,70,0.8)" : "rgba(255,100,100,0.5)"}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>
        </div>
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{waitingText}</span>
      <span style={{ fontSize: 22, color: urgent ? "rgba(255,70,70,0.85)" : "rgba(255,100,100,0.65)", fontWeight: 700, fontVariantNumeric: "tabular-nums", transition: "color 0.4s ease" }}>{elapsed} min</span>
      {urgent && <span style={{ fontSize: 10, color: "rgba(255,70,70,0.45)", marginTop: -2 }}>{queueText}</span>}
    </div>
  );
}

function PhoneFrame({ children, scale = 1, label, labelColor, opacity = 1, redBorder = 0, inputPlaceholder = "Type a message" }: {
  children: React.ReactNode;
  scale?: number;
  label?: string;
  labelColor?: string;
  opacity?: number;
  redBorder?: number;
  inputPlaceholder?: string;
}) {
  const borderColor = redBorder ? `rgba(255,70,70,${0.15 + redBorder * 0.4})` : "#2a2a2a";
  const shadow = redBorder
    ? `0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 ${30 + redBorder * 30}px rgba(255,50,50,${0.08 + redBorder * 0.12})`
    : "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset";

  return (
    <div className="hero-phone-frame" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity, transition: "opacity 0.8s ease" }}>
      {label && (
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" as const, color: labelColor || "rgba(255,255,255,0.4)" }}>
          {label}
        </div>
      )}
      <div style={{ transform: `scale(${scale})`, transition: "transform 0.8s ease-out", transformOrigin: "top center" }}>
        <div style={{ ...s.phone, border: `3px solid ${borderColor}`, boxShadow: shadow, transition: "border-color 0.5s ease, box-shadow 0.5s ease" }}>
          <div style={s.notch}><div style={s.notchCamera} /></div>
          <div style={s.statusBar}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>10:42</span>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 20 21" fill="white"><rect x="0" y="15" width="3" height="6" rx="0.5" opacity="0.4" /><rect x="5" y="11" width="3" height="10" rx="0.5" opacity="0.6" /><rect x="10" y="7" width="3" height="14" rx="0.5" opacity="0.8" /><rect x="15" y="3" width="3" height="18" rx="0.5" /></svg>
              <svg width="20" height="12" viewBox="0 0 28 14" fill="white"><rect x="0.5" y="0.5" width="23" height="13" rx="3" stroke="white" strokeWidth="1" fill="none" /><rect x="2.5" y="2.5" width="16" height="9" rx="1.5" /><rect x="25" y="4" width="2.5" height="6" rx="1" opacity="0.4" /></svg>
            </div>
          </div>
          {children}
          <div style={s.inputBar}>
            <div style={s.inputRow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>
              <div style={{ flex: 1, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{inputPlaceholder}</div>
            </div>
            <div style={s.micButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" /></svg>
            </div>
          </div>
          <div style={{ width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "4px auto 8px" }} />
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ name, status, statusColor }: { name: string; status: string; statusColor: string }) {
  return (
    <div style={s.chatHeader}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: statusColor === "#00a884" ? "linear-gradient(135deg, #00a884, #005c4b)" : "linear-gradient(135deg, #4a4a5a, #2a2a3a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="9" r="2.5" /><path d="M9.5 15.5a3.5 3.5 0 117 0" strokeLinecap="round" /></svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e9edef" }}>{name}</div>
          <div style={{ fontSize: 11, color: statusColor, fontWeight: 500 }}>{status}</div>
        </div>
      </div>
    </div>
  );
}

// Timeline: array of { time (ms from start), action }
// Total cycle ~14s, then 3s pause, then reset
const CYCLE_DURATION = 8500;

export default function HeroScrollDemo() {
  const t = useTranslations("demo.heroDemo");
  const [tick, setTick] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const agentConversation = [
    { sender: "customer", text: t("withAgent.1") },
    { sender: "agent", text: t("withAgent.2") },
    { sender: "agent", text: t("withAgent.3") },
    { sender: "customer", text: t("withAgent.4") },
    { sender: "agent", text: t("withAgent.5") },
    { sender: "agent", text: t("withAgent.6") },
  ];

  const noAgentConversation = [
    { sender: "customer", text: t("noAgent.1") },
    { sender: "system", text: t("noAgent.2") },
    { sender: "customer", text: t("noAgent.3") },
    { sender: "customer", text: t("noAgent.4") },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTick((prev) => {
        const next = prev + 50;
        return next >= CYCLE_DURATION ? 0 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Derive state from tick (ms into the cycle)
  const progress = Math.min(tick / 7000, 1); // 0-1 over 7s, then holds

  // Right phone (AI agent) — messages appear at these progress points
  const agentSteps = [0.05, 0.15, 0.22, 0.35, 0.45, 0.55];
  const visibleAgentCount = agentSteps.filter((s) => progress >= s).length;
  const visibleAgentMessages = agentConversation.slice(0, visibleAgentCount);
  const showAgentTyping = visibleAgentCount > 0 && visibleAgentCount < agentConversation.length &&
    agentConversation[visibleAgentCount - 1]?.sender === "customer";
  const allDone = visibleAgentCount === agentConversation.length;

  const rightScale = 1 + Math.min(progress, 0.7) * 0.14;

  // Left phone (no agent) — messages + waiting
  const leftMsgCount = progress < 0.08 ? 0 : progress < 0.18 ? 1 : progress < 0.28 ? 2 : progress < 0.55 ? 3 : 4;
  const visibleLeftMessages = noAgentConversation.slice(0, leftMsgCount);
  const showSeen = leftMsgCount >= 1;
  const showWaiting = progress > 0.35;
  const waitMinutes = showWaiting ? Math.min(47, Math.floor((progress - 0.35) * 90)) : 0;
  const redIntensity = Math.min(1, Math.max(0, (waitMinutes - 10) / 30));

  const leftOpacity = Math.max(0.3, 1 - progress * 1.1);
  const leftScale = Math.max(0.92, 1 - progress * 0.1);

  return (
    <div ref={containerRef} style={{ position: "relative", padding: isMobile ? "40px 0" : "60px 0" }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div style={s.container}>
        {/* Glows */}
        <div style={{ ...s.glow, left: "20%", background: `radial-gradient(circle, rgba(255,50,50,${0.04 + redIntensity * 0.08}) 0%, transparent 70%)`, transition: "background 0.5s ease" }} />
        <div style={{ ...s.glow, right: "8%", left: "auto", background: "radial-gradient(circle, rgba(0,168,132,0.12) 0%, transparent 70%)" }} />

        {/* Headline */}
        <div style={{ ...s.headline, marginBottom: isMobile ? 10 : 22 }}>
          <h2 style={{ ...s.h1, fontSize: isMobile ? 16 : 21 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>{t("withoutAI")}</span>
            <span style={{ margin: "0 18px", color: "rgba(255,255,255,0.12)", fontSize: 18 }}>{t("vs")}</span>
            <span style={{ color: "#00a884" }}>{t("withCodet")}</span>
          </h2>
        </div>

        {/* Phones */}
        <div style={isMobile ? { transform: "scale(0.5)", transformOrigin: "top center", marginBottom: -320 } : undefined}>
          <div style={{ ...s.phonePair, gap: isMobile ? 12 : 44 }}>
            {/* LEFT — no agent */}
            <PhoneFrame label={t("withoutLabel")} labelColor="rgba(255,100,100,0.55)" opacity={leftOpacity} scale={leftScale} redBorder={redIntensity} inputPlaceholder={t("typeMessage")}>
              <ChatHeader name={t("supportName")} status={t("supportStatus")} statusColor="rgba(255,255,255,0.3)" />
              <div style={s.chatArea}>
                <div style={s.encNotice}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                  <span>{t("encrypted")}</span>
                </div>
                <div style={s.dateChip}>{t("today")}</div>

                {visibleLeftMessages.map((msg, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: msg.sender === "customer" ? "flex-end" : "flex-start", padding: "2px 16px", animation: "fadeSlideIn 0.35s ease-out" }}>
                      <div style={{ ...s.bubble, ...(msg.sender === "customer" ? s.customerBubble : s.systemBubble) }}>
                        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.45 }}>{msg.text}</div>
                        <div style={s.timestamp}>
                          {formatTime(642, msg.sender === "customer" ? (i === 0 ? 0 : i === 2 ? 18 : 32) : 0)}
                          {msg.sender === "customer" && (
                            <svg width="16" height="10" viewBox="0 0 20 12" style={{ marginLeft: 2 }}>
                              <path d="M1.5 6.5l3.5 3.5 8-8" stroke={showSeen ? "#53bdeb" : "rgba(255,255,255,0.35)"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5 6.5l3.5 3.5 8-8" stroke={showSeen ? "#53bdeb" : "rgba(255,255,255,0.35)"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    {msg.sender === "customer" && i === 0 && showSeen && visibleLeftMessages.length <= 2 && (
                      <SeenReceipt label={t("seen")} />
                    )}
                  </div>
                ))}

                {showWaiting && <WaitingClock elapsed={waitMinutes} waitingText={t("waiting")} queueText={t("queuePosition")} />}

                {waitMinutes > 30 && (
                  <div style={{ textAlign: "center" as const, padding: "14px 20px 0", animation: "fadeSlideIn 0.5s ease-out" }}>
                    <span style={{ fontSize: 10.5, color: "rgba(255,70,70,0.4)", fontStyle: "italic" }}>{t("customerLeft")}</span>
                  </div>
                )}
              </div>
            </PhoneFrame>

            {/* RIGHT — AI agent */}
            <PhoneFrame scale={rightScale} label={t("withLabel")} labelColor="#00a884" inputPlaceholder={t("typeMessage")}>
              <ChatHeader name={t("agentName")} status={t("agentStatus")} statusColor="#00a884" />
              <div style={s.chatArea}>
                <div style={s.encNotice}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                  <span>{t("encrypted")}</span>
                </div>
                <div style={s.dateChip}>{t("today")}</div>

                {visibleAgentMessages.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.sender === "customer" ? "flex-end" : "flex-start", padding: "2px 16px", animation: "fadeSlideIn 0.35s ease-out" }}>
                    <div style={{ ...s.bubble, ...(msg.sender === "customer" ? s.customerBubble : s.agentBubble) }}>
                      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.45 }}>{msg.text}</div>
                      <div style={s.timestamp}>
                        {formatTime(642, i)}
                        {msg.sender === "customer" && (
                          <svg width="16" height="10" viewBox="0 0 20 12" style={{ marginLeft: 2 }}>
                            <path d="M1.5 6.5l3.5 3.5 8-8" stroke="#53bdeb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 6.5l3.5 3.5 8-8" stroke="#53bdeb" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {i === agentConversation.length - 1 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4, fontSize: 11, color: "#00a884", animation: "fadeSlideIn 0.4s ease-out" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M2 12l5.5 5.5L20 5" stroke="#00a884" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <animate attributeName="stroke-dasharray" from="0 30" to="30 30" dur="0.5s" fill="freeze" />
                            </path>
                          </svg>
                          {t("confirmed")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {showAgentTyping && <TypingIndicator />}

                {allDone && (
                  <div style={{ textAlign: "center" as const, padding: "14px 20px 0", animation: "fadeSlideIn 0.6s ease-out" }}>
                    <span style={{ fontSize: 10.5, color: "rgba(0,168,132,0.5)", fontStyle: "italic" }}>{t("bookedIn")}</span>
                  </div>
                )}
              </div>
            </PhoneFrame>
          </div>
        </div>

        {/* Progress bar */}
        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, height: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-3px); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
  }
`;

const s: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minHeight: 700,
  },
  headline: {
    textAlign: "center",
    marginBottom: 22,
    zIndex: 2,
  },
  h1: {
    fontSize: 21,
    fontWeight: 600,
    color: "white",
    margin: 0,
    letterSpacing: -0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  phonePair: {
    display: "flex",
    gap: 44,
    alignItems: "flex-start",
    zIndex: 2,
  },
  glow: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    filter: "blur(80px)",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 0,
  },
  phone: {
    position: "relative",
    width: 300,
    height: 620,
    background: "#0b141a",
    borderRadius: 40,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  notch: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 110,
    height: 26,
    background: "#000",
    borderRadius: "0 0 16px 16px",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
  },
  notchCamera: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#1a1a2e",
    border: "2px solid #0d0d1a",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 22px 5px",
    color: "white",
    zIndex: 5,
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px 10px",
    background: "#1f2c34",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 8,
  },
  encNotice: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "12px 16px 4px",
    fontSize: 9.5,
    color: "rgba(255,255,255,0.25)",
  },
  dateChip: {
    textAlign: "center",
    margin: "8px auto 4px",
    fontSize: 10,
    color: "rgba(255,255,255,0.45)",
    background: "rgba(255,255,255,0.05)",
    display: "block",
    padding: "3px 10px",
    borderRadius: 5,
    width: "fit-content",
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  bubble: {
    maxWidth: "82%",
    padding: "7px 10px 6px",
    borderRadius: 10,
    fontSize: 12.5,
    lineHeight: 1.4,
    color: "#e9edef",
  },
  customerBubble: {
    background: "#005c4b",
    borderTopRightRadius: 3,
  },
  agentBubble: {
    background: "#1f2c34",
    borderTopLeftRadius: 3,
  },
  systemBubble: {
    background: "#1f2c34",
    borderTopLeftRadius: 3,
    borderLeft: "2px solid rgba(255,255,255,0.08)",
  },
  timestamp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
    fontSize: 9.5,
    color: "rgba(255,255,255,0.35)",
    marginTop: 2,
  },
  inputBar: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 8px 6px",
    background: "#0b141a",
  },
  inputRow: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#1f2c34",
    borderRadius: 22,
    padding: "8px 12px",
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#00a884",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  progressTrack: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    width: 3,
    height: 70,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    overflow: "hidden",
    zIndex: 10,
  },
  progressFill: {
    width: "100%",
    background: "#00a884",
    borderRadius: 2,
    transition: "height 0.15s ease-out",
  },
};
