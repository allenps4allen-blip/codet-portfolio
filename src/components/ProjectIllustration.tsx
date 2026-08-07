"use client";

function DashboardIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1" />
      <rect x="40" y="30" width="320" height="36" rx="12" fill="white" fillOpacity="0.03" />
      <circle cx="62" cy="48" r="6" fill="#a78bfa" fillOpacity="0.6" />
      <circle cx="80" cy="48" r="6" fill="white" fillOpacity="0.15" />
      <circle cx="98" cy="48" r="6" fill="white" fillOpacity="0.15" />

      {/* Stat cards */}
      <rect x="56" y="80" width="92" height="50" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
      <text x="66" y="94" fill="white" fillOpacity="0.25" fontSize="6" fontFamily="system-ui" letterSpacing="0.5">REVENUE</text>
      <text x="66" y="118" fill="#a78bfa" fillOpacity="0.8" fontSize="18" fontWeight="700" fontFamily="system-ui">$48.2K</text>
      <text x="120" y="94" fill="#22c55e" fillOpacity="0.7" fontSize="6" fontFamily="system-ui">↑ 12%</text>

      <rect x="158" y="80" width="92" height="50" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
      <text x="168" y="94" fill="white" fillOpacity="0.25" fontSize="6" fontFamily="system-ui" letterSpacing="0.5">USERS</text>
      <text x="168" y="118" fill="white" fillOpacity="0.7" fontSize="18" fontWeight="700" fontFamily="system-ui">2,847</text>
      <text x="222" y="94" fill="#22c55e" fillOpacity="0.7" fontSize="6" fontFamily="system-ui">↑ 8%</text>

      <rect x="260" y="80" width="92" height="50" rx="6" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
      <text x="270" y="94" fill="white" fillOpacity="0.25" fontSize="6" fontFamily="system-ui" letterSpacing="0.5">SCORE</text>
      <text x="270" y="118" fill="#22c55e" fillOpacity="0.8" fontSize="18" fontWeight="700" fontFamily="system-ui">94.2%</text>

      {/* Animated bar chart */}
      <rect x="56" y="140" width="196" height="62" rx="6" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const h = [22, 36, 28, 44, 32, 40, 48, 30][i];
        return (
          <rect key={i} x={70 + i * 22} rx="2" fill="#a78bfa" fillOpacity={0.3 + (i % 2) * 0.15}>
            <animate attributeName="height" values={`0;${h};${h * 0.85};${h}`} dur="3s" begin={`${i * 0.1}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
            <animate attributeName="y" values={`196;${196 - h};${196 - h * 0.85};${196 - h}`} dur="3s" begin={`${i * 0.1}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
          </rect>
        );
      })}

      {/* Top pages */}
      <rect x="262" y="140" width="90" height="62" rx="6" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.06" />
      <text x="272" y="154" fill="white" fillOpacity="0.2" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">TOP PAGES</text>
      {[0, 1, 2].map(i => (
        <rect key={i} x="272" y={162 + i * 12} width={0} height="4" rx="2" fill="#a78bfa" fillOpacity={0.4 - i * 0.08}>
          <animate attributeName="width" values={`0;${60 - i * 12}`} dur="1s" begin={`${0.5 + i * 0.2}s`} fill="freeze" />
        </rect>
      ))}
    </svg>
  );
}

function ChatbotIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" className="h-full w-full">
      {/* Chat container */}
      <rect x="80" y="20" width="240" height="200" rx="16" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />

      {/* Chat header */}
      <rect x="80" y="20" width="240" height="36" rx="16" fill="white" fillOpacity="0.03" />
      <circle cx="104" cy="38" r="10" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeOpacity="0.3" />
      <text x="104" y="42" fill="#06b6d4" fillOpacity="0.8" fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">AI</text>
      <text x="120" y="35" fill="white" fillOpacity="0.6" fontSize="8" fontWeight="600" fontFamily="system-ui">CODET Agent</text>
      <circle cx="120" cy="44" r="2" fill="#22c55e" fillOpacity="0.8" />
      <text x="126" y="46" fill="#22c55e" fillOpacity="0.6" fontSize="6" fontFamily="system-ui">online</text>

      {/* Messages with animation */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="180" y="66" width="130" height="28" rx="12" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeOpacity="0.2" />
        <text x="192" y="84" fill="white" fillOpacity="0.7" fontSize="7.5" fontFamily="system-ui">How can I help?</text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" begin="1.2s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="100" y="104" width="180" height="38" rx="12" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" />
        <text x="112" y="120" fill="white" fillOpacity="0.5" fontSize="7.5" fontFamily="system-ui">I tracked your order —</text>
        <text x="112" y="134" fill="white" fillOpacity="0.5" fontSize="7.5" fontFamily="system-ui">it arrives Thursday!</text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;1;0" dur="8s" begin="2.8s" repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.88;1" />
        <rect x="200" y="152" width="110" height="28" rx="12" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeOpacity="0.2" />
        <text x="212" y="170" fill="white" fillOpacity="0.7" fontSize="7.5" fontFamily="system-ui">Perfect, thanks!</text>
      </g>

      {/* Resolved badge */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="8s" begin="4.5s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.15;0.22" />
        <text x="200" y="198" fill="#22c55e" fillOpacity="0.7" fontSize="7" fontFamily="system-ui" textAnchor="middle" fontWeight="600">✓ Resolved in 47s</text>
      </g>

      {/* Input bar */}
      <rect x="100" y="204" width="200" height="10" rx="5" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.08" />
    </svg>
  );
}

const illustrations = [DashboardIllustration, ChatbotIllustration];

export default function ProjectIllustration({ index }: { index: number }) {
  const Illustration = illustrations[index] || DashboardIllustration;
  return <Illustration />;
}
