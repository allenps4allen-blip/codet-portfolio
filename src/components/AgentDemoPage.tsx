"use client";

import { useState, useRef, useEffect } from "react";
import { useAgentAnalytics } from "@/hooks/useAgentAnalytics";

interface ThinkingStep {
  icon: string;
  text: string;
  duration: number;
}

interface DemoTranslations {
  eyebrow: string;
  heading: string;
  subtitle: string;
  tryAsking: string;
  prompts: string[];
  agentName: string;
  agentStatus: string;
  greeting: string;
  placeholder: string;
  brainTitle: string;
  processing: string;
  brainEmpty: string;
  thinking: Record<string, string>;
  responses: Record<string, string>;
}

function buildThinkingSteps(t: Record<string, string>): Record<string, ThinkingStep[]> {
  return {
    default: [
      { icon: "\u{1F50D}", text: t.analyzingIntent, duration: 400 },
      { icon: "\u{1F9E0}", text: t.retrievingContext, duration: 600 },
      { icon: "✍️", text: t.composingResponse, duration: 500 },
    ],
    book: [
      { icon: "\u{1F50D}", text: t.intentBooking, duration: 400 },
      { icon: "\u{1F4C5}", text: t.checkingCalendar, duration: 700 },
      { icon: "✅", text: t.slotsFound, duration: 400 },
      { icon: "✍️", text: t.composingResponse, duration: 500 },
    ],
    cancel: [
      { icon: "\u{1F50D}", text: t.intentCancel, duration: 400 },
      { icon: "\u{1F50E}", text: t.lookingUpBooking, duration: 600 },
      { icon: "⚠️", text: t.checkingPolicy, duration: 500 },
      { icon: "✍️", text: t.composingResponse, duration: 400 },
    ],
    hours: [
      { icon: "\u{1F50D}", text: t.intentHours, duration: 400 },
      { icon: "\u{1F4CB}", text: t.retrievingBusiness, duration: 500 },
      { icon: "✍️", text: t.composingResponse, duration: 400 },
    ],
    arabic: [
      { icon: "\u{1F50D}", text: t.intentLanguage, duration: 400 },
      { icon: "\u{1F310}", text: t.langDetection, duration: 400 },
      { icon: "\u{1F1F0}\u{1F1FC}", text: t.arabicEnabled, duration: 400 },
      { icon: "✍️", text: t.composingBilingual, duration: 500 },
    ],
  };
}

function getResponseKey(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("book") || lower.includes("appointment") || lower.includes("حجز") || lower.includes("موعد")) return "book";
  if (lower.includes("cancel") || lower.includes("إلغاء")) return "cancel";
  if (lower.includes("hour") || lower.includes("open") || lower.includes("when") || lower.includes("ساعات")) return "hours";
  if (lower.includes("arabic") || lower.includes("عربي") || lower.includes("العربية")) return "arabic";
  if (lower.includes("service") || lower.includes("offer") || lower.includes("خدم")) return "services";
  if (lower.includes("reschedule") || lower.includes("next week") || lower.includes("تأجيل") || lower.includes("الأسبوع")) return "reschedule";
  return "default";
}

function BrainPanel({ steps, isThinking, t }: { steps: ThinkingStep[]; isThinking: boolean; t: DemoTranslations }) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    if (!isThinking || !steps.length) {
      setVisibleSteps([]);
      return;
    }

    setVisibleSteps([]);
    let cumDelay = 0;
    steps.forEach((step, i) => {
      cumDelay += (i === 0 ? 200 : steps[i - 1].duration);
      const timeout = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i]);
      }, cumDelay);
      timeoutRefs.current.push(timeout);
    });

    return () => timeoutRefs.current.forEach(clearTimeout);
  }, [steps, isThinking]);

  return (
    <div style={st.brainPanel}>
      <div style={st.brainHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: isThinking ? "#00a884" : "rgba(255,255,255,0.15)", boxShadow: isThinking ? "0 0 8px rgba(0,168,132,0.5)" : "none", transition: "all 0.3s ease" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>{t.brainTitle}</span>
        </div>
        {isThinking && <span style={{ fontSize: 10, color: "#00a884", animation: "agentPulse 1.5s infinite" }}>{t.processing}</span>}
      </div>
      <div style={st.brainBody}>
        {visibleSteps.map((stepIdx) => {
          const step = steps[stepIdx];
          return (
            <div key={stepIdx} style={{ ...st.brainStep, animation: "agentFadeSlideIn 0.3s ease-out" }}>
              <span style={{ fontSize: 14 }}>{step.icon}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{step.text}</span>
              {stepIdx < visibleSteps.length - 1 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#00a884" style={{ marginLeft: "auto", flexShrink: 0 }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              )}
              {stepIdx === visibleSteps.length - 1 && isThinking && (
                <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#00a884", animation: `agentTypingDot 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              )}
            </div>
          );
        })}
        {!isThinking && visibleSteps.length === 0 && (
          <div style={{ padding: 20, textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>{t.brainEmpty}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentDemoPage({ translations }: { translations: DemoTranslations }) {
  const t = translations;
  const thinkingSteps = buildThinkingSteps(t.thinking);
  const { trackDemoVisit, trackMessage, trackPromptClick } = useAgentAnalytics();

  const [messages, setMessages] = useState([
    { from: "agent", text: t.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [brainSteps, setBrainSteps] = useState<ThinkingStep[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasTrackedVisit = useRef(false);

  useEffect(() => {
    if (!hasTrackedVisit.current) {
      hasTrackedVisit.current = true;
      trackDemoVisit();
    }
  }, [trackDemoVisit]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const sendMessage = (text: string, fromPrompt = false) => {
    if (!text.trim() || isThinking) return;
    const userMsg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);

    const key = getResponseKey(userMsg);
    trackMessage(key);
    if (fromPrompt) trackPromptClick(userMsg);
    const steps = thinkingSteps[key] || thinkingSteps.default;
    setBrainSteps(steps);
    setIsThinking(true);

    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 200) + 600;

    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [...prev, { from: "agent", text: t.responses[key] || t.responses.default }]);
    }, totalDuration);
  };

  return (
    <div style={{ ...st.page, padding: isMobile ? "80px 16px 60px" : "80px 40px 100px" }}>
      <style>{css}</style>

      <div style={st.header}>
        <span style={st.eyebrow}>{t.eyebrow}</span>
        <h2 style={{ ...st.h1, fontSize: isMobile ? 24 : 32 }}>{t.heading}</h2>
        <p style={st.subtitle}>{t.subtitle}</p>
      </div>

      <div style={{ ...st.pillsRow, display: isMobile ? "none" : "flex" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginRight: 8 }}>{t.tryAsking}</span>
        {t.prompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt, true)}
            style={st.pill}
            disabled={isThinking}
          >
            {prompt}
          </button>
        ))}
      </div>

      {isMobile && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          {t.prompts.slice(0, 3).map((prompt, i) => (
            <button key={i} onClick={() => sendMessage(prompt, true)} style={{ ...st.pill, fontSize: 11, padding: "5px 10px" }} disabled={isThinking}>
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div style={{ ...st.demoContainer, flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : 520 }}>
        <div style={{ ...st.chatPanel, minHeight: isMobile ? 400 : undefined }}>
          <div style={st.chatHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="9" r="2.5" /><path d="M9.5 15.5a3.5 3.5 0 117 0" strokeLinecap="round" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>{t.agentName}</div>
                <div style={{ fontSize: 10, color: "#00a884" }}>{t.agentStatus}</div>
              </div>
            </div>
          </div>

          <div ref={chatContainerRef} style={st.chatMessages}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", animation: "agentFadeSlideIn 0.3s ease-out" }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "9px 12px",
                  borderRadius: 12,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#e9edef",
                  whiteSpace: "pre-wrap",
                  background: msg.from === "user" ? "#005c4b" : "rgba(255,255,255,0.06)",
                  ...(msg.from === "user" ? { borderBottomRightRadius: 4 } : { borderBottomLeftRadius: 4 }),
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div style={{ display: "flex", animation: "agentFadeSlideIn 0.2s ease-out" }}>
                <div style={{ padding: "10px 14px", borderRadius: 12, borderBottomLeftRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.35)", animation: `agentTypingDot 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={st.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t.placeholder}
              disabled={isThinking}
              style={st.inputField}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isThinking || !input.trim()}
              style={{ ...st.sendBtn, opacity: input.trim() && !isThinking ? 1 : 0.4 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
        </div>

        <BrainPanel steps={brainSteps} isThinking={isThinking} t={t} />
      </div>
    </div>
  );
}

const css = `
  @keyframes agentFadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes agentTypingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-2px); }
  }
  @keyframes agentPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .agent-demo-input::placeholder { color: rgba(255,255,255,0.25); }
  .agent-demo-input:focus { outline: none; }
`;

const st: Record<string, React.CSSProperties> = {
  page: {
    padding: "80px 40px 100px",
    background: "#050505",
    position: "relative",
    zIndex: 1,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
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
  h1: {
    fontSize: 32,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.3)",
    marginTop: 10,
  },
  pillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 32,
    alignItems: "center",
  },
  pill: {
    padding: "6px 14px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  },
  demoContainer: {
    display: "flex",
    gap: 20,
    maxWidth: 900,
    margin: "0 auto",
    height: 520,
  },
  chatPanel: {
    flex: 1.2,
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
  },
  chatHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  chatInput: {
    display: "flex",
    gap: 8,
    padding: "12px 14px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
  },
  inputField: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "#e9edef",
    fontSize: 13,
    fontFamily: "inherit",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "none",
    background: "#00a884",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease",
    flexShrink: 0,
  },
  brainPanel: {
    flex: 0.8,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  brainHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brainBody: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto",
  },
  brainStep: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.04)",
  },
};
