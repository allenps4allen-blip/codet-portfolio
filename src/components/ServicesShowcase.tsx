"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

function WebsiteDemo() {
  return (
    <div style={demo.browserWrap}>
      <div style={demo.browserBar}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ ...demo.dot, background: "#ff5f57" }} />
          <div style={{ ...demo.dot, background: "#febc2e" }} />
          <div style={{ ...demo.dot, background: "#28c840" }} />
        </div>
        <div style={demo.urlBar}>yourcompany.com</div>
        <div style={{ width: 36 }} />
      </div>
      <div style={{ padding: 0, background: "#0a0a0a" }}>
        <svg viewBox="0 0 320 200" width="100%" style={{ display: "block" }}>
          {/* Loading bar */}
          <rect x="0" y="0" width="0" height="2" fill="#00a884" rx="1">
            <animate attributeName="width" values="0;320;320;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.4;0.85;1" />
          </rect>

          {/* Nav bar */}
          <rect x="12" y="10" width="50" height="8" rx="2" fill="rgba(255,255,255,0.18)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.08;0.85;1" />
          </rect>
          <rect x="230" y="10" width="24" height="8" rx="2" fill="rgba(255,255,255,0.06)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.1;0.85;1" />
          </rect>
          <rect x="260" y="10" width="24" height="8" rx="2" fill="rgba(255,255,255,0.06)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.12;0.85;1" />
          </rect>
          <rect x="290" y="10" width="20" height="8" rx="4" fill="#00a88444" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.14;0.85;1" />
          </rect>

          {/* Hero heading */}
          <rect x="12" y="36" width="180" height="14" rx="3" fill="rgba(255,255,255,0.2)" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.12;0.2;0.85;1" />
          </rect>
          <rect x="12" y="56" width="140" height="10" rx="2" fill="rgba(255,255,255,0.08)" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.16;0.24;0.85;1" />
          </rect>

          {/* CTA button */}
          <rect x="12" y="76" width="70" height="18" rx="6" fill="#00a88444" stroke="#00a88466" strokeWidth="0.5" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.22;0.3;0.85;1" />
          </rect>
          <text x="47" y="89" fill="#00a884" fontSize="7" fontFamily="system-ui" fontWeight="600" textAnchor="middle" opacity="0">
            Get Started
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.22;0.3;0.85;1" />
          </text>

          {/* Hero image placeholder */}
          <rect x="210" y="32" width="100" height="68" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.18;0.26;0.85;1" />
          </rect>
          <rect x="224" y="48" width="72" height="36" rx="4" fill="#00a88412" opacity="0">
            <animate attributeName="opacity" values="0;0;0.6;0.6;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.22;0.3;0.85;1" />
          </rect>

          {/* Three feature cards */}
          {[0, 1, 2].map(i => (
            <g key={i} opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes={`0;${0.32 + i * 0.06};${0.4 + i * 0.06};0.85;1`} />
              <rect x={12 + i * 102} y="114" width="95" height="74" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <circle cx={36 + i * 102} cy="132" r="8" fill={i === 0 ? "#00a88420" : i === 1 ? "#3178C620" : "#FFD43B15"} />
              <text x={36 + i * 102} y="136" fontSize="8" fontFamily="system-ui" textAnchor="middle" fill="rgba(255,255,255,0.5)">
                {["⚡", "🎨", "📊"][i]}
              </text>
              <rect x={22 + i * 102} y="148" width="55" height="5" rx="1.5" fill="rgba(255,255,255,0.12)" />
              <rect x={22 + i * 102} y="158" width="70" height="3" rx="1" fill="rgba(255,255,255,0.05)" />
              <rect x={22 + i * 102} y="165" width="60" height="3" rx="1" fill="rgba(255,255,255,0.05)" />
              <rect x={22 + i * 102} y="172" width="50" height="3" rx="1" fill="rgba(255,255,255,0.05)" />
            </g>
          ))}

          {/* Lighthouse score badge */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.7;0.75;0.85;1" />
            <rect x="248" y="8" width="60" height="14" rx="7" fill="#00a88822" stroke="#00a88844" strokeWidth="0.5" />
            <circle cx="260" cy="15" r="4" fill="none" stroke="#00a884" strokeWidth="1.2" />
            <path d="M258 15 l1.5 1.5 3-3" stroke="#00a884" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <text x="272" y="18" fill="#00a884" fontSize="6" fontFamily="system-ui" fontWeight="700">100/100</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function AgentDemo() {
  return (
    <div style={demo.chatWrap}>
      <div style={demo.chatHeader}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.38 1.42 4.49 3.6 5.83L5 20l4.35-2.17C10.22 17.94 11.1 18 12 18c4.97 0 9-3.13 9-7s-4.03-7-9-7z" fill="#00a884" opacity="0.7"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#e9edef" }}>AI Assistant</div>
          <div style={{ fontSize: 9, color: "#00a884" }}>online</div>
        </div>
      </div>
      <div style={{ padding: 0, background: "#0a0a0a" }}>
        <svg viewBox="0 0 320 180" width="100%" style={{ display: "block" }}>
          {/* User message 1 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="7s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
            <rect x="150" y="10" width="158" height="28" rx="10" fill="#005c4b" />
            <text x="160" y="28" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="system-ui">What are your hours?</text>
            <text x="290" y="32" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="system-ui">10:42</text>
          </g>

          {/* Bot message 1 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="7s" begin="1s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
            <rect x="10" y="48" width="200" height="38" rx="10" fill="rgba(255,255,255,0.07)" />
            <text x="20" y="64" fill="rgba(255,255,255,0.85)" fontSize="8" fontFamily="system-ui">Sun–Thu, 9 AM – 6 PM!</text>
            <text x="20" y="78" fill="rgba(255,255,255,0.85)" fontSize="8" fontFamily="system-ui">Need to book?</text>
          </g>

          {/* User message 2 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="7s" begin="2.2s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
            <rect x="190" y="96" width="118" height="28" rx="10" fill="#005c4b" />
            <text x="200" y="114" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="system-ui">Yes, tomorrow at 10</text>
          </g>

          {/* Bot message 2 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="7s" begin="3.5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
            <rect x="10" y="134" width="210" height="28" rx="10" fill="rgba(255,255,255,0.07)" />
            <text x="20" y="152" fill="rgba(255,255,255,0.85)" fontSize="8" fontFamily="system-ui">✅ Done! See you at 10 AM.</text>
          </g>

          {/* Resolved badge */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="7s" begin="4.8s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.2;0.3" />
            <rect x="85" y="168" width="150" height="8" rx="4" fill="transparent" />
            <text x="160" y="175" fill="#00a884" fontSize="6.5" fontFamily="system-ui" textAnchor="middle" fontWeight="600">✓ Resolved in 47 seconds</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function AutomationDemo() {
  return (
    <div style={demo.autoWrap}>
      <svg viewBox="0 0 320 140" width="100%" style={{ display: "block" }}>
        {/* Connection lines */}
        <line x1="68" y1="48" x2="108" y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="168" y1="48" x2="208" y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="268" y1="48" x2="300" y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Flow particles */}
        <circle r="3" fill="#00a884">
          <animate attributeName="cx" values="68;108" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;48" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
        </circle>
        <circle r="3" fill="#00a884">
          <animate attributeName="cx" values="168;208" dur="1.2s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;48" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin="0.5s" repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
        </circle>
        <circle r="3" fill="#00a884">
          <animate attributeName="cx" values="268;300" dur="1.2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="48;48" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin="1s" repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
        </circle>

        {/* Nodes */}
        {[
          { x: 10, label: "Email", icon: "📧", color: "#00a884" },
          { x: 110, label: "Extract", icon: "🔍", color: "#3178C6" },
          { x: 210, label: "CRM", icon: "💼", color: "#FFD43B" },
          { x: 300, label: "Notify", icon: "🔔", color: "#28c840" },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y="28" width="56" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke={`${n.color}55`} strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </rect>
            <text x={n.x + 28} y="50" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="system-ui" textAnchor="middle">{n.icon}</text>
            <text x={n.x + 28} y="62" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="system-ui" textAnchor="middle" fontWeight="500">{n.label}</text>
            <circle cx={n.x + 50} cy="32" r="3" fill={n.color}>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Divider */}
        <line x1="10" y1="84" x2="310" y2="84" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

        {/* Stats row */}
        <rect x="10" y="92" width="90" height="24" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <text x="18" y="102" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui">Processed</text>
        <text x="18" y="112" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="700" fontFamily="system-ui">2,847</text>
        <text x="52" y="112" fill="#28c840" fontSize="5" fontFamily="system-ui">+124</text>

        <rect x="115" y="92" width="90" height="24" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <text x="123" y="102" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui">Success Rate</text>
        <text x="123" y="112" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="700" fontFamily="system-ui">99.8%</text>

        <rect x="220" y="92" width="90" height="24" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <text x="228" y="102" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui">Avg Time</text>
        <text x="228" y="112" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="700" fontFamily="system-ui">1.2s</text>

        {/* Live indicator */}
        <rect x="10" y="124" width="300" height="12" rx="4" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <circle cx="20" cy="130" r="2" fill="#28c840">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="28" y="133" fill="rgba(255,255,255,0.2)" fontSize="5" fontFamily="system-ui">Live: New lead → Extracted → Synced to HubSpot → Slack notified</text>
      </svg>
    </div>
  );
}

const serviceKeys = ["websites", "aiAgents", "automations"] as const;
const serviceDemos = [WebsiteDemo, AgentDemo, AutomationDemo];
const serviceHrefs = [null, "/demo/ai-agent", null];

export default function ServicesShowcase() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const tSection = useTranslations("home.servicesSection");
  const tServices = useTranslations("home.services");

  return (
    <div className="services-section" style={s.section}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div style={s.header}>
        <span style={s.eyebrow}>{tSection("eyebrow")}</span>
        <h2 style={s.h2}>{tSection("heading")}</h2>
      </div>

      <div className="services-grid" style={s.grid}>
        {serviceKeys.map((key, i) => {
          const Demo = serviceDemos[i];
          const href = serviceHrefs[i];
          return (
            <div key={key}>
              <div
                className="mobile-tap"
                style={{ ...s.card, cursor: href ? "pointer" : "default" }}
                onClick={() => href && router.push(`/${locale}${href}`)}
              >
                <div style={s.demoArea}>
                  <Demo />
                </div>
                <div style={s.cardContent}>
                  <h3 style={s.cardTitle}>
                    {tServices(`${key}.title`)}
                    {href && (
                      <span style={{ marginInlineStart: 8, fontSize: 12, color: "#00a884", fontWeight: 500 }}>
                        {tSection("seeDemo")} &#x2192;
                      </span>
                    )}
                  </h3>
                  <p style={s.cardDesc}>{tServices(`${key}.description`)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const keyframes = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes typingDot {
    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-2px); }
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.6); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const demo: Record<string, React.CSSProperties> = {
  browserWrap: {
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  browserBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "7px 10px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  dot: { width: 8, height: 8, borderRadius: "50%" },
  urlBar: {
    flex: 1,
    fontSize: 9,
    color: "rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 4,
    padding: "3px 8px",
    textAlign: "center",
  },
  chatWrap: {
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 10px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  autoWrap: {
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
    overflow: "hidden",
  },
};

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: "center",
    marginBottom: 60,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#00a884",
    display: "block",
    marginBottom: 14,
  },
  h2: {
    fontSize: 40,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    letterSpacing: -0.5,
  },
  grid: {
    display: "flex",
    gap: 24,
    maxWidth: 1280,
    margin: "0 auto",
  },
  card: {
    flex: 1,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
    transition: "all 0.35s ease",
  },
  demoArea: {
    padding: "20px 20px 0",
  },
  cardContent: {
    padding: "24px 24px 28px",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.4)",
    margin: "10px 0 0",
  },
};
