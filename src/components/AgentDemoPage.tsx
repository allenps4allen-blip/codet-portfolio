"use client";

import { useState, useRef, useEffect } from "react";

const promptSuggestions = [
  "Book an appointment for Thursday",
  "What are your working hours?",
  "I want to cancel my booking",
  "Do you speak Arabic?",
  "What services do you offer?",
  "Can I reschedule to next week?",
];

interface ThinkingStep {
  icon: string;
  text: string;
  duration: number;
}

const thinkingSteps: Record<string, ThinkingStep[]> = {
  default: [
    { icon: "\u{1F50D}", text: "Analyzing intent…", duration: 400 },
    { icon: "\u{1F9E0}", text: "Retrieving context…", duration: 600 },
    { icon: "✍️", text: "Composing response…", duration: 500 },
  ],
  book: [
    { icon: "\u{1F50D}", text: "Intent: appointment booking", duration: 400 },
    { icon: "\u{1F4C5}", text: "Checking calendar availability…", duration: 700 },
    { icon: "✅", text: "3 slots found for Thursday", duration: 400 },
    { icon: "✍️", text: "Composing response…", duration: 500 },
  ],
  cancel: [
    { icon: "\u{1F50D}", text: "Intent: cancellation request", duration: 400 },
    { icon: "\u{1F50E}", text: "Looking up booking records…", duration: 600 },
    { icon: "⚠️", text: "Checking cancellation policy…", duration: 500 },
    { icon: "✍️", text: "Composing response…", duration: 400 },
  ],
  hours: [
    { icon: "\u{1F50D}", text: "Intent: business hours inquiry", duration: 400 },
    { icon: "\u{1F4CB}", text: "Retrieving business info…", duration: 500 },
    { icon: "✍️", text: "Composing response…", duration: 400 },
  ],
  arabic: [
    { icon: "\u{1F50D}", text: "Intent: language capability", duration: 400 },
    { icon: "\u{1F310}", text: "Language detection: English", duration: 400 },
    { icon: "\u{1F1F0}\u{1F1FC}", text: "Arabic support: enabled", duration: 400 },
    { icon: "✍️", text: "Composing bilingual response…", duration: 500 },
  ],
};

const responses: Record<string, string> = {
  book: "I'd be happy to help you book! We have the following slots available on Thursday:\n\n\u{1F550} 10:00 AM\n\u{1F551} 2:00 PM\n\u{1F553} 4:30 PM\n\nWhich time works best for you?",
  hours: "We're open Sunday through Thursday, 9:00 AM to 6:00 PM (AST). Our AI support is available 24/7 though — so feel free to reach out anytime!",
  cancel: "I can help with that. Could you share your booking reference number or the name the appointment was booked under? I'll look it up right away.",
  arabic: "Yes! I'm fully bilingual. أقدر أساعدك بالعربي بعد! Just switch to Arabic anytime and I'll respond accordingly. \u{1F60A}",
  services: "We offer three core services:\n\n\u{1F310} Website Development — custom, high-performance sites\n\u{1F916} AI Agents — intelligent chatbots for support & bookings\n⚡ Automations — workflow optimization & tool integration\n\nWould you like details on any of these?",
  reschedule: "Of course! Please share your booking reference or the name it's under, and I'll check availability for next week. Any preferred day or time?",
  default: "I'm here to help! I can assist with bookings, answer questions about our services, or help you get in touch with our team. What would you like to know?",
};

function getResponseKey(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("book") || lower.includes("appointment")) return "book";
  if (lower.includes("cancel")) return "cancel";
  if (lower.includes("hour") || lower.includes("open") || lower.includes("when")) return "hours";
  if (lower.includes("arabic") || lower.includes("عربي")) return "arabic";
  if (lower.includes("service") || lower.includes("offer")) return "services";
  if (lower.includes("reschedule") || lower.includes("next week")) return "reschedule";
  return "default";
}

function BrainPanel({ steps, isThinking }: { steps: ThinkingStep[]; isThinking: boolean }) {
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
      const t = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i]);
      }, cumDelay);
      timeoutRefs.current.push(t);
    });

    return () => timeoutRefs.current.forEach(clearTimeout);
  }, [steps, isThinking]);

  return (
    <div style={st.brainPanel}>
      <div style={st.brainHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: isThinking ? "#00a884" : "rgba(255,255,255,0.15)", boxShadow: isThinking ? "0 0 8px rgba(0,168,132,0.5)" : "none", transition: "all 0.3s ease" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}>Agent Brain</span>
        </div>
        {isThinking && <span style={{ fontSize: 10, color: "#00a884", animation: "agentPulse 1.5s infinite" }}>Processing…</span>}
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
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Send a message to see the agent think…</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentDemoPage() {
  const [messages, setMessages] = useState([
    { from: "agent", text: "Hi! \u{1F44B} I'm CODET's AI assistant. Try asking me anything — book an appointment, ask about services, or switch to Arabic!" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [brainSteps, setBrainSteps] = useState<ThinkingStep[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = (text: string) => {
    if (!text.trim() || isThinking) return;
    const userMsg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);

    const key = getResponseKey(userMsg);
    const steps = thinkingSteps[key] || thinkingSteps.default;
    setBrainSteps(steps);
    setIsThinking(true);

    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 200) + 600;

    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [...prev, { from: "agent", text: responses[key] || responses.default }]);
    }, totalDuration);
  };

  return (
    <div style={{ ...st.page, padding: isMobile ? "80px 16px 60px" : "80px 40px 100px" }}>
      <style>{css}</style>

      <div style={st.header}>
        <span style={st.eyebrow}>Live Demo</span>
        <h2 style={{ ...st.h1, fontSize: isMobile ? 24 : 32 }}>See the AI agent in action</h2>
        <p style={st.subtitle}>This is a simulated preview. Your agent will be custom-trained on your business data.</p>
      </div>

      <div style={{ ...st.pillsRow, display: isMobile ? "none" : "flex" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginRight: 8 }}>Try asking:</span>
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt)}
            style={st.pill}
            disabled={isThinking}
          >
            {prompt}
          </button>
        ))}
      </div>

      {isMobile && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          {promptSuggestions.slice(0, 3).map((prompt, i) => (
            <button key={i} onClick={() => sendMessage(prompt)} style={{ ...st.pill, fontSize: 11, padding: "5px 10px" }} disabled={isThinking}>
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
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e9edef" }}>CODET AI Agent</div>
                <div style={{ fontSize: 10, color: "#00a884" }}>online · responds instantly</div>
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
              placeholder="Type a message…"
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

        <BrainPanel steps={brainSteps} isThinking={isThinking} />
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
