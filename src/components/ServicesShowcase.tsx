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
        <div style={demo.urlBar}>store.yourcompany.com</div>
        <div style={{ width: 36 }} />
      </div>
      <div style={{ overflow: "hidden", height: 340, background: "#0a0a0a", position: "relative" as const }}>
        <div style={{ animation: "storeScroll 12s ease-in-out infinite" }}>
          <svg viewBox="0 0 400 800" width="100%" style={{ display: "block" }}>
            {/* Nav */}
            <rect width="400" height="32" fill="rgba(255,255,255,0.02)" />
            <rect x="16" y="10" width="55" height="10" rx="3" fill="rgba(255,255,255,0.15)" />
            <rect x="240" y="10" width="30" height="10" rx="3" fill="rgba(255,255,255,0.06)" />
            <rect x="278" y="10" width="30" height="10" rx="3" fill="rgba(255,255,255,0.06)" />
            <rect x="316" y="10" width="30" height="10" rx="3" fill="rgba(255,255,255,0.06)" />
            <rect x="356" y="8" width="30" height="14" rx="7" fill="#00a88833" />
            <text x="371" y="19" fill="#00a884" fontSize="8" fontFamily="system-ui" textAnchor="middle" fontWeight="600">🛒</text>

            {/* Hero banner with gradient */}
            <defs>
              <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00a884" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#005c4b" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="cardGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00a884" stopOpacity="0.12" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="32" width="400" height="140" fill="url(#heroBg)" />
            <text x="30" y="72" fill="rgba(255,255,255,0.85)" fontSize="18" fontWeight="700" fontFamily="system-ui">Summer Collection</text>
            <text x="30" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="system-ui">Discover our latest arrivals — crafted for the season.</text>
            <rect x="30" y="108" width="80" height="24" rx="8" fill="#00a884" />
            <text x="70" y="124" fill="#050505" fontSize="8" fontWeight="700" fontFamily="system-ui" textAnchor="middle">Shop Now →</text>
            <rect x="120" y="108" width="80" height="24" rx="8" fill="transparent" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="160" y="124" fill="rgba(255,255,255,0.5)" fontSize="8" fontWeight="500" fontFamily="system-ui" textAnchor="middle">View All</text>

            {/* Hero product image area */}
            <rect x="260" y="50" width="120" height="110" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <rect x="276" y="70" width="88" height="70" rx="6" fill="#00a88812" />
            <text x="320" y="110" fill="rgba(255,255,255,0.2)" fontSize="22" fontFamily="system-ui" textAnchor="middle">👜</text>

            {/* Category pills */}
            <text x="30" y="195" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="system-ui" fontWeight="600" letterSpacing="1">CATEGORIES</text>
            {["All", "New", "Trending", "Sale"].map((cat, i) => (
              <g key={i}>
                <rect x={30 + i * 68} y="205" width="58" height="20" rx="10" fill={i === 0 ? "#00a88830" : "rgba(255,255,255,0.04)"} stroke={i === 0 ? "#00a88455" : "rgba(255,255,255,0.06)"} strokeWidth="0.8" />
                <text x={59 + i * 68} y="219" fill={i === 0 ? "#00a884" : "rgba(255,255,255,0.35)"} fontSize="7" fontFamily="system-ui" textAnchor="middle" fontWeight={i === 0 ? "600" : "400"}>{cat}</text>
              </g>
            ))}

            {/* Product grid */}
            {[
              { x: 16, y: 240, name: "Leather Tote", price: "$189", rating: "4.9", emoji: "👜", color: "#00a884" },
              { x: 144, y: 240, name: "Canvas Sneakers", price: "$129", rating: "4.8", emoji: "👟", color: "#3178C6" },
              { x: 272, y: 240, name: "Silk Scarf", price: "$79", rating: "4.7", emoji: "🧣", color: "#E44D26" },
              { x: 16, y: 470, name: "Denim Jacket", price: "$245", rating: "4.9", emoji: "🧥", color: "#FFD43B" },
              { x: 144, y: 470, name: "Watch Classic", price: "$349", rating: "5.0", emoji: "⌚", color: "#8B5CF6" },
              { x: 272, y: 470, name: "Sunglasses", price: "$159", rating: "4.8", emoji: "🕶️", color: "#FF4A00" },
            ].map((p, i) => (
              <g key={i}>
                <rect x={p.x} y={p.y} width="116" height="210" rx="10" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8">
                  <animate attributeName="stroke-opacity" values="0.05;0.12;0.05" dur="4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </rect>
                {/* Product image */}
                <rect x={p.x + 6} y={p.y + 6} width="104" height="110" rx="7" fill={`${p.color}10`}>
                  <animate attributeName="fill-opacity" values="0.8;1;0.8" dur="5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </rect>
                <text x={p.x + 58} y={p.y + 72} fill="rgba(255,255,255,0.25)" fontSize="28" fontFamily="system-ui" textAnchor="middle">{p.emoji}</text>
                {/* Fav heart */}
                <circle cx={p.x + 98} cy={p.y + 18} r="10" fill="rgba(0,0,0,0.4)" />
                <text x={p.x + 98} y={p.y + 22} fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="system-ui" textAnchor="middle">♡</text>
                {/* Info */}
                <text x={p.x + 12} y={p.y + 132} fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="600" fontFamily="system-ui">{p.name}</text>
                <text x={p.x + 12} y={p.y + 146} fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="system-ui">★ {p.rating} · Free shipping</text>
                <text x={p.x + 12} y={p.y + 166} fill={p.color} fontSize="14" fontWeight="700" fontFamily="system-ui">{p.price}</text>
                {/* Add to cart */}
                <rect x={p.x + 8} y={p.y + 178} width="100" height="24" rx="8" fill={`${p.color}20`} stroke={`${p.color}44`} strokeWidth="0.8">
                  <animate attributeName="fill" values={`${p.color}20;${p.color}38;${p.color}20`} dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
                </rect>
                <text x={p.x + 58} y={p.y + 194} fill={p.color} fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Add to Cart</text>
              </g>
            ))}

            {/* Trust bar between product rows */}
            <rect x="16" y="460" width="368" height="1" fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>
        {/* Top/bottom fade overlays */}
        <div style={{ position: "absolute" as const, top: 0, left: 0, right: 0, height: 30, background: "linear-gradient(to bottom, #0a0a0a, transparent)", pointerEvents: "none" as const, zIndex: 1 }} />
        <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(to top, #0a0a0a, transparent)", pointerEvents: "none" as const, zIndex: 1 }} />
      </div>
    </div>
  );
}

function AgentDemo() {
  return (
    <div style={{ ...demo.chatWrap, height: "100%", display: "flex", flexDirection: "column" as const }}>
      <div style={demo.chatHeader}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #00a884, #005c4b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.38 1.42 4.49 3.6 5.83L5 20l4.35-2.17C10.22 17.94 11.1 18 12 18c4.97 0 9-3.13 9-7s-4.03-7-9-7z" fill="#00a884" opacity="0.7"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e9edef" }}>AI Assistant</div>
          <div style={{ fontSize: 9, color: "#00a884" }}>online</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 0, background: "#0a0a0a" }}>
        <svg viewBox="0 0 400 340" width="100%" style={{ display: "block" }}>
          {/* User message 1 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="9s" repeatCount="indefinite" keyTimes="0;0.01;0.05;0.7;0.88;1" />
            <rect x="180" y="16" width="200" height="34" rx="12" fill="#005c4b" />
            <text x="194" y="38" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="system-ui">What are your hours?</text>
            <text x="358" y="42" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="system-ui">10:42 AM</text>
          </g>

          {/* Bot message 1 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="9s" begin="1.2s" repeatCount="indefinite" keyTimes="0;0.01;0.05;0.7;0.88;1" />
            <rect x="16" y="64" width="260" height="52" rx="12" fill="rgba(255,255,255,0.06)" />
            <text x="28" y="86" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="system-ui">Sun–Thu, 9 AM – 6 PM!</text>
            <text x="28" y="104" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="system-ui">Need to book an appointment?</text>
          </g>

          {/* User message 2 */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="9s" begin="2.8s" repeatCount="indefinite" keyTimes="0;0.01;0.05;0.7;0.88;1" />
            <rect x="220" y="132" width="160" height="34" rx="12" fill="#005c4b" />
            <text x="234" y="154" fill="rgba(255,255,255,0.9)" fontSize="10" fontFamily="system-ui">Yes, tomorrow at 10</text>
          </g>

          {/* Bot typing indicator */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0;0" dur="9s" begin="3.8s" repeatCount="indefinite" keyTimes="0;0.01;0.03;0.06;0.08;1" />
            <rect x="16" y="182" width="60" height="30" rx="12" fill="rgba(255,255,255,0.06)" />
            <circle cx="32" cy="197" r="3" fill="rgba(255,255,255,0.3)">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="44" cy="197" r="3" fill="rgba(255,255,255,0.3)">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" begin="0.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="56" cy="197" r="3" fill="rgba(255,255,255,0.3)">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Bot confirmation */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;0" dur="9s" begin="4.4s" repeatCount="indefinite" keyTimes="0;0.01;0.05;0.7;0.88;1" />
            <rect x="16" y="182" width="280" height="52" rx="12" fill="rgba(255,255,255,0.06)" />
            <text x="28" y="204" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="system-ui">✅ Done! See you at 10 AM.</text>
            <text x="28" y="222" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="system-ui">I've sent a calendar invite to your email.</text>
          </g>

          {/* Resolved badge */}
          <g opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" dur="9s" begin="6.5s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.15;0.22" />
            <rect x="110" y="252" width="180" height="28" rx="14" fill="#00a88815" stroke="#00a88833" strokeWidth="0.8" />
            <text x="200" y="270" fill="#00a884" fontSize="8" fontFamily="system-ui" textAnchor="middle" fontWeight="600">✓ Resolved in 47 seconds</text>
          </g>

          {/* Input bar */}
          <rect x="16" y="300" width="330" height="28" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <text x="32" y="318" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="system-ui">Type a message...</text>
          <circle cx="368" cy="314" r="12" fill="#00a88830" />
          <text x="368" y="318" fill="#00a884" fontSize="10" fontFamily="system-ui" textAnchor="middle">→</text>
        </svg>
      </div>
    </div>
  );
}

function AutomationDemo() {
  return (
    <div style={{ ...demo.autoWrap, height: "100%", display: "flex", flexDirection: "column" as const }}>
      <svg viewBox="0 0 400 380" width="100%" style={{ display: "block", flex: 1 }}>
        {/* Header */}
        <rect width="400" height="30" fill="rgba(255,255,255,0.02)" />
        <text x="16" y="20" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="system-ui" fontWeight="600" letterSpacing="1">AUTOMATION PIPELINE</text>
        <circle cx="370" cy="15" r="4" fill="#28c840">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="354" y="18" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="system-ui" textAnchor="end">Live</text>

        {/* Connection lines */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <line x1={78 + i * 100} y1="90" x2={118 + i * 100} y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="5 4" />
            <circle r="4" fill="#00a884">
              <animate attributeName="cx" values={`${78 + i * 100};${118 + i * 100}`} dur="1.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="90;90" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
            </circle>
          </g>
        ))}

        {/* Nodes */}
        {[
          { x: 10, label: "Email", icon: "📧", color: "#00a884" },
          { x: 110, label: "Extract", icon: "🔍", color: "#3178C6" },
          { x: 210, label: "CRM", icon: "💼", color: "#FFD43B" },
          { x: 310, label: "Notify", icon: "🔔", color: "#28c840" },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y="56" width="66" height="68" rx="10" fill="rgba(255,255,255,0.03)" stroke={`${n.color}55`} strokeWidth="1.2">
              <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </rect>
            <text x={n.x + 33} y="88" fill="rgba(255,255,255,0.7)" fontSize="20" fontFamily="system-ui" textAnchor="middle">{n.icon}</text>
            <text x={n.x + 33} y="114" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="system-ui" textAnchor="middle" fontWeight="600">{n.label}</text>
            <circle cx={n.x + 56} cy="62" r="4" fill={n.color}>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Divider */}
        <line x1="16" y1="150" x2="384" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

        {/* Stats */}
        {[
          { label: "Processed", value: "2,847", change: "+124", x: 16, w: 115 },
          { label: "Success Rate", value: "99.8%", change: "", x: 143, w: 115 },
          { label: "Avg Time", value: "1.2s", change: "-0.3s", x: 270, w: 115 },
        ].map((m, i) => (
          <g key={i}>
            <rect x={m.x} y="164" width={m.w} height="52" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            <text x={m.x + 12} y="180" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="system-ui" fontWeight="500">{m.label}</text>
            <text x={m.x + 12} y="204" fill="rgba(255,255,255,0.85)" fontSize="18" fontWeight="700" fontFamily="system-ui">{m.value}</text>
            {m.change && <text x={m.x + 80} y="204" fill="#28c840" fontSize="7" fontFamily="system-ui" fontWeight="500">{m.change}</text>}
          </g>
        ))}

        {/* Mini chart */}
        <rect x="16" y="230" width="368" height="80" rx="6" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <text x="28" y="248" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" fontWeight="500" letterSpacing="0.5">THROUGHPUT (LAST 24H)</text>
        {[258, 268, 278, 288, 298].map((y, i) => (
          <line key={i} x1="28" y1={y} x2="372" y2={y} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        ))}
        <polyline fill="none" stroke="#00a88488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          points="36,298 60,288 84,292 108,276 132,282 156,266 180,272 204,258 228,264 252,252 276,260 300,248 324,256 348,240 372,244">
          <animate attributeName="stroke-dasharray" values="0 800;600 800" dur="3s" fill="freeze" />
        </polyline>

        {/* Live feed */}
        <rect x="16" y="324" width="368" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
        <circle cx="30" cy="338" r="3" fill="#28c840">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="40" y="335" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="system-ui" fontWeight="500">LATEST ACTIVITY</text>
        <text x="40" y="352" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="system-ui">Sarah K. → Qualified → Score 9.2 → Meeting booked</text>
      </svg>
    </div>
  );
}

const serviceKeys = ["websites", "aiAgents", "automations"] as const;
const serviceDemos = [WebsiteDemo, AgentDemo, AutomationDemo];
const serviceHrefs = ["/work", "/demo/ai-agent", "/work"];

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
            <div key={key} style={{ flex: 1, display: "flex" }}>
              <div
                className="mobile-tap"
                style={{ ...s.card, cursor: "pointer", display: "flex", flexDirection: "column" }}
                onClick={() => router.push(`/${locale}${href}`)}
              >
                <div style={s.demoArea}>
                  <Demo />
                </div>
                <div style={s.cardContent}>
                  <h3 style={s.cardTitle}>
                    {tServices(`${key}.title`)}
                    {key === "aiAgents" && (
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
  @keyframes storeScroll {
    0%, 8% { transform: translateY(0); }
    30%, 38% { transform: translateY(-180px); }
    60%, 68% { transform: translateY(-380px); }
    90%, 100% { transform: translateY(0); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const demo: Record<string, React.CSSProperties> = {
  browserWrap: {
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  browserBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  dot: { width: 8, height: 8, borderRadius: "50%" },
  urlBar: {
    flex: 1,
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 5,
    padding: "4px 10px",
    textAlign: "center",
  },
  chatWrap: {
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#0a0a0a",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  autoWrap: {
    borderRadius: 10,
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
    alignItems: "stretch",
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
    flex: 1,
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
