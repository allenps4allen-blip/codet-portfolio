"use client";

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 560 320" fill="none" className="h-full w-full">
      {/* Sidebar */}
      <rect x="20" y="16" width="72" height="288" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
      <rect x="32" y="32" width="48" height="8" rx="4" fill="#a78bfa" fillOpacity="0.5" />
      {[56, 74, 92, 110, 128].map((y, i) => (
        <g key={i}>
          <rect x="32" y={y} width="14" height="6" rx="3" fill={i === 0 ? "#a78bfa" : "white"} fillOpacity={i === 0 ? 0.4 : 0.08} />
          <rect x="50" y={y} width="30" height="6" rx="3" fill="white" fillOpacity={i === 0 ? 0.2 : 0.06} />
        </g>
      ))}

      {/* Top bar */}
      <rect x="104" y="16" width="436" height="36" rx="10" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" />
      <rect x="120" y="28" width="80" height="10" rx="5" fill="white" fillOpacity="0.08" />
      <circle cx="500" cy="34" r="8" fill="white" fillOpacity="0.06" />
      <circle cx="520" cy="34" r="8" fill="#a78bfa" fillOpacity="0.2" />

      {/* Stat cards */}
      {[
        { x: 112, label: "REVENUE", value: "$48.2K", accent: "#a78bfa", change: "↑ 12%" },
        { x: 252, label: "USERS", value: "2,847", accent: "white", change: "↑ 8%" },
        { x: 392, label: "GROWTH", value: "+24.5%", accent: "#22c55e", change: "" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="64" width="128" height="60" rx="8" fill="white" fillOpacity="0.035" stroke="white" strokeOpacity="0.07">
            <animate attributeName="stroke-opacity" values="0.07;0.14;0.07" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </rect>
          <text x={c.x + 14} y="84" fill="white" fillOpacity="0.3" fontSize="7" fontFamily="system-ui" letterSpacing="0.8" fontWeight="500">{c.label}</text>
          <text x={c.x + 14} y="112" fill={c.accent} fillOpacity="0.85" fontSize="22" fontWeight="700" fontFamily="system-ui">{c.value}</text>
          {c.change && <text x={c.x + 100} y="84" fill="#22c55e" fillOpacity="0.7" fontSize="7" fontFamily="system-ui" fontWeight="600">{c.change}</text>}
        </g>
      ))}

      {/* Chart area */}
      <rect x="112" y="136" width="264" height="168" rx="8" fill="white" fillOpacity="0.025" stroke="white" strokeOpacity="0.06" />
      <text x="126" y="156" fill="white" fillOpacity="0.25" fontSize="7" fontFamily="system-ui" letterSpacing="0.5" fontWeight="500">WEEKLY OVERVIEW</text>
      {[168, 188, 208, 228, 248, 268, 288].map((y, i) => (
        <line key={i} x1="126" y1={y} x2="364" y2={y} stroke="white" strokeOpacity="0.025" strokeWidth="0.5" />
      ))}

      {/* Animated bars */}
      {[30, 50, 38, 70, 46, 58, 76, 42, 64, 52, 44, 60].map((h, i) => (
        <rect key={i} x={130 + i * 19} rx="2.5" fill="#a78bfa" fillOpacity={0.25 + (i % 2) * 0.15} width="12">
          <animate attributeName="height" values={`0;${h};${h * 0.85};${h}`} dur="3.5s" begin={`${i * 0.1}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
          <animate attributeName="y" values={`296;${296 - h};${296 - h * 0.85};${296 - h}`} dur="3.5s" begin={`${i * 0.1}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
        </rect>
      ))}

      {/* Animated line chart overlay */}
      <polyline fill="none" stroke="#a78bfa" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points="136,280 155,264 174,272 193,248 212,258 231,238 250,246 269,228 288,236 307,218 326,226 345,212">
        <animate attributeName="stroke-dasharray" values="0 600;400 600" dur="2.5s" fill="freeze" />
      </polyline>
      <circle cx="345" cy="212" r="3" fill="#a78bfa" fillOpacity="0" stroke="#a78bfa" strokeOpacity="0" strokeWidth="1.5">
        <animate attributeName="fill-opacity" values="0;0;0.6" dur="2.5s" fill="freeze" keyTimes="0;0.9;1" />
        <animate attributeName="stroke-opacity" values="0;0;0.3" dur="2.5s" fill="freeze" keyTimes="0;0.9;1" />
        <animate attributeName="r" values="0;0;5" dur="2.5s" fill="freeze" keyTimes="0;0.9;1" />
      </circle>

      {/* Right panel: Top pages */}
      <rect x="392" y="136" width="128" height="168" rx="8" fill="white" fillOpacity="0.025" stroke="white" strokeOpacity="0.06" />
      <text x="406" y="156" fill="white" fillOpacity="0.25" fontSize="7" fontFamily="system-ui" letterSpacing="0.5" fontWeight="500">TOP PAGES</text>
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <rect x="406" y={170 + i * 28} width={0} height="6" rx="3" fill="#a78bfa" fillOpacity={0.45 - i * 0.07}>
            <animate attributeName="width" values={`0;${80 - i * 12}`} dur="1s" begin={`${0.5 + i * 0.15}s`} fill="freeze" />
          </rect>
          <rect x="406" y={180 + i * 28} width="60" height="4" rx="2" fill="white" fillOpacity="0.04" />
        </g>
      ))}
    </svg>
  );
}

function ChatbotIllustration() {
  return (
    <svg viewBox="0 0 560 320" fill="none" className="h-full w-full">
      {/* Chat container */}
      <rect x="60" y="12" width="440" height="296" rx="16" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />

      {/* Chat header */}
      <rect x="60" y="12" width="440" height="48" rx="16" fill="white" fillOpacity="0.03" />
      <circle cx="92" cy="36" r="14" fill="#06b6d4" fillOpacity="0.25" stroke="#06b6d4" strokeOpacity="0.3" />
      <text x="92" y="41" fill="#06b6d4" fillOpacity="0.9" fontSize="12" fontFamily="system-ui" textAnchor="middle" fontWeight="700">AI</text>
      <text x="114" y="32" fill="white" fillOpacity="0.7" fontSize="11" fontWeight="600" fontFamily="system-ui">CODET Agent</text>
      <circle cx="114" cy="44" r="2.5" fill="#22c55e" fillOpacity="0.9" />
      <text x="122" y="47" fill="#22c55e" fillOpacity="0.7" fontSize="7" fontFamily="system-ui" fontWeight="500">online</text>

      {/* Typing indicator dots */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" dur="8s" begin="0.4s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.08;0.1;1" />
        <circle cx="88" cy="82" r="3" fill="white" fillOpacity="0.3">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="98" cy="82" r="3" fill="white" fillOpacity="0.3">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="108" cy="82" r="3" fill="white" fillOpacity="0.3">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1s" begin="0.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* User message 1 */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="300" y="72" width="188" height="36" rx="14" fill="#06b6d4" fillOpacity="0.18" stroke="#06b6d4" strokeOpacity="0.2" />
        <text x="316" y="95" fill="white" fillOpacity="0.75" fontSize="10" fontFamily="system-ui">How can I help you today?</text>
      </g>

      {/* Bot message 1 */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" begin="1.2s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="80" y="120" width="280" height="52" rx="14" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.08" />
        <text x="96" y="143" fill="white" fillOpacity="0.6" fontSize="10" fontFamily="system-ui">I tracked your order #4829 —</text>
        <text x="96" y="161" fill="white" fillOpacity="0.6" fontSize="10" fontFamily="system-ui">it shipped today and arrives Thursday!</text>
      </g>

      {/* User message 2 */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" begin="2.8s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="340" y="186" width="148" height="36" rx="14" fill="#06b6d4" fillOpacity="0.18" stroke="#06b6d4" strokeOpacity="0.2" />
        <text x="356" y="209" fill="white" fillOpacity="0.75" fontSize="10" fontFamily="system-ui">Perfect, thanks!</text>
      </g>

      {/* Bot confirmation */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" begin="4s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="80" y="236" width="240" height="36" rx="14" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.08" />
        <text x="96" y="259" fill="white" fillOpacity="0.6" fontSize="10" fontFamily="system-ui">✅ Anything else I can help with?</text>
      </g>

      {/* Resolved badge */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="8s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.15;0.22" />
        <rect x="200" y="280" width="160" height="20" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeOpacity="0.2" />
        <text x="280" y="294" fill="#22c55e" fillOpacity="0.8" fontSize="8" fontFamily="system-ui" textAnchor="middle" fontWeight="600">✓ Resolved in 47 seconds</text>
      </g>
    </svg>
  );
}

const illustrations = [DashboardIllustration, ChatbotIllustration];

export default function ProjectIllustration({ index }: { index: number }) {
  const Illustration = illustrations[index] || DashboardIllustration;
  return <Illustration />;
}
