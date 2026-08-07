"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface ProjectVisual {
  id: number;
  slug: string;
  category: string;
  metricValues: string[];
  color: string;
}

const projects: ProjectVisual[] = [
  { id: 1, slug: "saas-analytics-dashboard", category: "websites", metricValues: ["2,847", "94.2%"], color: "#3178C6" },
  { id: 2, slug: "ai-customer-support-agent", category: "ai", metricValues: ["85%", "10K+"], color: "#00a884" },
  { id: 3, slug: "e-commerce-platform", category: "websites", metricValues: ["+140%", "1.2s"], color: "#FFD43B" },
  { id: 4, slug: "lead-generation-workflow", category: "automations", metricValues: ["3x", "20hrs/wk"], color: "#FF4A00" },
  { id: 5, slug: "restaurant-ordering-system", category: "websites", metricValues: ["500+", "99.9%"], color: "#E44D26" },
  { id: 6, slug: "document-processing-pipeline", category: "ai", metricValues: ["98%", "5,000+"], color: "#8B5CF6" },
];

const filterKeys = ["all", "websites", "ai", "automations"] as const;
const filterTranslationKeys = ["filterAll", "filterWebsites", "filterAI", "filterAutomations"] as const;

function DashboardMockup({ color }: { color: string }) {
  const bars = [32, 52, 40, 68, 48, 58, 74, 42, 62, 55];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="54" height="220" fill="rgba(255,255,255,0.03)" />
      <rect x="12" y="14" width="30" height="5" rx="2.5" fill={`${color}55`} />
      {[30, 42, 54, 66, 78].map((y, i) => (
        <rect key={i} x="14" y={y} width="26" height="3" rx="1.5" fill={i === 0 ? `${color}40` : "rgba(255,255,255,0.06)"} />
      ))}
      <rect x="54" y="0" width="346" height="24" fill="rgba(255,255,255,0.02)" />
      <rect x="66" y="8" width="50" height="7" rx="3" fill="rgba(255,255,255,0.08)" />
      <circle cx="370" cy="12" r="5" fill="rgba(255,255,255,0.06)" />
      <circle cx="356" cy="12" r="5" fill="rgba(255,255,255,0.04)" />
      {[
        { x: 66, label: "REVENUE", value: "$48.2K", vc: color },
        { x: 170, label: "USERS", value: "2,847", vc: "rgba(255,255,255,0.85)" },
        { x: 274, label: "GROWTH", value: "+24.5%", vc: "#28c840" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="34" width="96" height="42" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <text x={c.x + 10} y="50" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="system-ui" letterSpacing="0.5">{c.label}</text>
          <text x={c.x + 10} y="66" fill={c.vc} fontSize="14" fontWeight="700" fontFamily="system-ui">{c.value}</text>
          <text x={c.x + 68} y="50" fill="#28c840" fontSize="5" fontFamily="system-ui">
            {i === 0 ? "↑ 12%" : i === 1 ? "↑ 8%" : ""}
          </text>
        </g>
      ))}
      <rect x="66" y="86" width="200" height="128" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <text x="76" y="100" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui" letterSpacing="0.5">WEEKLY OVERVIEW</text>
      {[115, 135, 155, 175, 195].map((y, i) => (
        <line key={i} x1="76" y1={y} x2="256" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={82 + i * 17} width="10" rx="1.5" fill={`${color}${i % 2 === 0 ? "55" : "33"}`}>
          <animate attributeName="height" values={`0;${h};${h * 0.88};${h}`} dur="3.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
          <animate attributeName="y" values={`208;${208 - h};${208 - h * 0.88};${208 - h}`} dur="3.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
        </rect>
      ))}
      <polyline fill="none" stroke={`${color}88`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        points="82,190 99,175 116,182 133,160 150,168 167,148 184,155 201,138 218,145 235,128 252,135">
        <animate attributeName="stroke-dasharray" values="0 500;300 500" dur="2s" fill="freeze" />
      </polyline>
      <rect x="276" y="86" width="88" height="128" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <text x="286" y="100" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui" letterSpacing="0.5">TOP PAGES</text>
      {[112, 132, 152, 172, 192].map((y, i) => (
        <g key={i}>
          <rect x="286" y={y} width={52 - i * 7} height="4" rx="2" fill={`${color}${55 - i * 8}`}>
            <animate attributeName="width" values={`0;${52 - i * 7}`} dur="1.2s" begin={`${0.4 + i * 0.15}s`} fill="freeze" />
          </rect>
          <rect x="286" y={y + 7} width="42" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
        </g>
      ))}
    </svg>
  );
}

function ChatMockup({ color }: { color: string }) {
  const msgs = [
    { align: "end", bg: "#005c4b", text: "Hi, I need help with my order", w: 160, delay: 0 },
    { align: "start", bg: "#1f2c34", text: "Of course! Let me look that up for you. What's your order number?", w: 190, delay: 1.2 },
    { align: "end", bg: "#005c4b", text: "It's #4829", w: 80, delay: 2.8 },
    { align: "start", bg: "#1f2c34", text: "Found it! Your order shipped today and arrives Thursday.", w: 200, delay: 4 },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="400" height="32" fill="rgba(255,255,255,0.03)" />
      <circle cx="24" cy="16" r="10" fill={`${color}33`} />
      <text x="24" y="19" fill={color} fontSize="9" fontFamily="system-ui" textAnchor="middle" fontWeight="700">AI</text>
      <text x="40" y="14" fill="rgba(255,255,255,0.8)" fontSize="8" fontWeight="600" fontFamily="system-ui">CODET AI Agent</text>
      <circle cx="40" cy="22" r="2" fill={color} />
      <text x="46" y="24" fill={color} fontSize="6" fontFamily="system-ui">online</text>
      <rect x="0" y="32" width="400" height="0.5" fill="rgba(255,255,255,0.06)" />
      {msgs.map((m, i) => {
        const y = 46 + i * 42;
        const x = m.align === "end" ? 400 - m.w - 16 : 16;
        return (
          <g key={i}>
            <rect x={x} y={y} width={m.w} height="30" rx="8" fill={m.bg} opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="8s" begin={`${m.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.85;0.92;1" />
            </rect>
            <text x={x + 8} y={y + 13} fill="rgba(255,255,255,0.85)" fontSize="6.5" fontFamily="system-ui" opacity="0">
              {m.text.length > 38 ? m.text.slice(0, 38) + "..." : m.text}
              <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="8s" begin={`${m.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.85;0.92;1" />
            </text>
            {m.text.length > 38 && (
              <text x={x + 8} y={y + 23} fill="rgba(255,255,255,0.85)" fontSize="6.5" fontFamily="system-ui" opacity="0">
                {m.text.slice(38)}
                <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="8s" begin={`${m.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.85;0.92;1" />
              </text>
            )}
            {m.align === "end" && (
              <g opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="8s" begin={`${m.delay + 0.3}s`} repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.85;0.92;1" />
                <path d={`M${x + m.w - 18},${y + 24} l2,2 4,-4`} stroke="#53bdeb" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d={`M${x + m.w - 15},${y + 24} l2,2 4,-4`} stroke="#53bdeb" strokeWidth="1" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        );
      })}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" dur="8s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.12;0.15;1" />
        <circle cx="28" cy="218" r="2.5" fill={`${color}88`}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="38" y="220" fill={color} fontSize="6" fontFamily="system-ui" fontWeight="600">Resolved in 47 seconds</text>
        <path d="M34,214 l2,3 5,-5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 12;12 12" dur="0.4s" begin="5.8s" fill="freeze" repeatCount="indefinite" />
        </path>
      </g>
      <rect y="210" width="400" height="0.5" fill="rgba(255,255,255,0.04)" />
      <rect x="12" y="215" width="340" height="0.5" rx="0.25" fill="rgba(255,255,255,0.03)" />
    </svg>
  );
}

function EcommerceMockup({ color }: { color: string }) {
  const products = [
    { x: 12, name: "Wireless Earbuds", price: "$79.99", rating: "4.8" },
    { x: 140, name: "Smart Watch", price: "$199.00", rating: "4.9" },
    { x: 268, name: "USB-C Hub", price: "$45.50", rating: "4.7" },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="400" height="28" fill="rgba(255,255,255,0.03)" />
      <rect x="12" y="7" width="140" height="14" rx="7" fill="rgba(255,255,255,0.04)" />
      <text x="22" y="17" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui">Search products...</text>
      <circle cx="142" cy="14" r="4" fill="rgba(255,255,255,0.08)" />
      <g>
        <rect x="358" y="6" width="30" height="16" rx="8" fill={`${color}22`} stroke={`${color}44`} strokeWidth="0.5" />
        <text x="366" y="17" fill={color} fontSize="7" fontFamily="system-ui">🛒</text>
        <circle cx="383" cy="9" r="5" fill={color}>
          <animate attributeName="r" values="0;5;5;5" dur="6s" begin="3s" repeatCount="indefinite" keyTimes="0;0.05;0.8;1" />
        </circle>
        <text x="383" y="12" fill="#000" fontSize="5" fontFamily="system-ui" textAnchor="middle" fontWeight="700">
          3
          <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin="3s" repeatCount="indefinite" keyTimes="0;0.05;0.8;1" />
        </text>
      </g>
      {products.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="38" width="120" height="174" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${i * 0.15}s`} fill="freeze" />
          </rect>
          <rect x={p.x + 6} y="44" width="108" height="80" rx="4" fill={`${color}${12 - i * 2}`}>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </rect>
          <rect x={p.x + 36} y="72" width="48" height="24" rx="4" fill="rgba(255,255,255,0.06)" />
          <text x={p.x + 60} y="88" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="system-ui" textAnchor="middle">📦</text>
          <text x={p.x + 12} y="138" fill="rgba(255,255,255,0.8)" fontSize="7" fontWeight="600" fontFamily="system-ui">{p.name}</text>
          <text x={p.x + 12} y="150" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="system-ui">★ {p.rating} · Free shipping</text>
          <text x={p.x + 12} y="166" fill={color} fontSize="10" fontWeight="700" fontFamily="system-ui">{p.price}</text>
          <rect x={p.x + 12} y="176" width="96" height="22" rx="6" fill={`${color}22`} stroke={`${color}55`} strokeWidth="0.5">
            <animate attributeName="fill" values={`${color}22;${color}44;${color}22`} dur="3s" begin={`${1 + i * 1.5}s`} repeatCount="indefinite" />
          </rect>
          <text x={p.x + 60} y="190" fill={color} fontSize="6.5" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Add to Cart</text>
        </g>
      ))}
    </svg>
  );
}

function WorkflowMockup({ color }: { color: string }) {
  const nodes = [
    { x: 40, label: "New Lead", icon: "👤", status: color },
    { x: 140, label: "Qualify", icon: "🔍", status: "#FFD43B" },
    { x: 240, label: "Score", icon: "📊", status: color },
    { x: 340, label: "Convert", icon: "✅", status: "#28c840" },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <text x="200" y="18" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" textAnchor="middle" letterSpacing="1">AUTOMATION PIPELINE</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={nodes[i].x + 28} y1="80" x2={nodes[i + 1].x - 8} y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle r="3" fill={color}>
            <animateMotion dur="1.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M${nodes[i].x + 28},80 L${nodes[i + 1].x - 8},80`} />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
          </circle>
          <circle r="2" fill={`${color}88`}>
            <animateMotion dur="1.5s" begin={`${i * 0.6 + 0.4}s`} repeatCount="indefinite" path={`M${nodes[i].x + 28},80 L${nodes[i + 1].x - 8},80`} />
            <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin={`${i * 0.6 + 0.4}s`} repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
          </circle>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 18} y="56" width="56" height="48" rx="8" fill="rgba(255,255,255,0.03)" stroke={`${n.status}44`} strokeWidth="1">
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </rect>
          <text x={n.x + 10} y="78" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="system-ui" textAnchor="middle">{n.icon}</text>
          <text x={n.x + 10} y="96" fill="rgba(255,255,255,0.5)" fontSize="5.5" fontFamily="system-ui" textAnchor="middle" fontWeight="500">{n.label}</text>
          <circle cx={n.x + 30} cy="62" r="3" fill={n.status}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <rect x="20" y="125" width="360" height="0.5" fill="rgba(255,255,255,0.04)" />
      {[
        { label: "Leads Today", value: "47", change: "+12" },
        { label: "Qualified", value: "31", change: "66%" },
        { label: "Avg Score", value: "8.4", change: "+0.3" },
        { label: "Converted", value: "18", change: "58%" },
      ].map((m, i) => (
        <g key={i}>
          <rect x={20 + i * 95} y="136" width="82" height="38" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <text x={30 + i * 95} y="150" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">{m.label}</text>
          <text x={30 + i * 95} y="166" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="700" fontFamily="system-ui">{m.value}</text>
          <text x={72 + i * 95} y="166" fill="#28c840" fontSize="5.5" fontFamily="system-ui">{m.change}</text>
        </g>
      ))}
      <rect x="20" y="186" width="360" height="24" rx="4" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      <text x="32" y="201" fill="rgba(255,255,255,0.2)" fontSize="5.5" fontFamily="system-ui">Latest: Sarah K. → Qualified → Score 9.2 → Meeting scheduled</text>
      <circle cx="26" cy="198" r="2.5" fill="#28c840">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RestaurantMockup({ color }: { color: string }) {
  const items = [
    { y: 38, name: "Margherita Pizza", price: "KD 3.500", icon: "🍕", time: "15 min" },
    { y: 82, name: "Grilled Chicken", price: "KD 4.250", icon: "🍗", time: "20 min" },
    { y: 126, name: "Caesar Salad", price: "KD 2.750", icon: "🥗", time: "8 min" },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="400" height="30" fill="rgba(255,255,255,0.03)" />
      <text x="16" y="20" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="700" fontFamily="system-ui">Menu</text>
      <rect x="52" y="9" width="60" height="12" rx="6" fill={`${color}22`} />
      <text x="62" y="18" fill={color} fontSize="5.5" fontFamily="system-ui" fontWeight="500">Popular 🔥</text>
      <rect x="118" y="9" width="50" height="12" rx="6" fill="rgba(255,255,255,0.04)" />
      <text x="128" y="18" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="system-ui">Combos</text>
      <rect x="310" y="7" width="78" height="16" rx="8" fill={`${color}22`} stroke={`${color}44`} strokeWidth="0.5" />
      <text x="324" y="18" fill={color} fontSize="6" fontFamily="system-ui" fontWeight="600">Order #247</text>
      {items.map((item, i) => (
        <g key={i}>
          <rect x="12" y={item.y} width="230" height="38" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${i * 0.2}s`} fill="freeze" />
          </rect>
          <rect x="18" y={item.y + 5} width="28" height="28" rx="6" fill={`${color}15`} />
          <text x="32" y={item.y + 25} fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="system-ui" textAnchor="middle">{item.icon}</text>
          <text x="54" y={item.y + 17} fill="rgba(255,255,255,0.8)" fontSize="7" fontWeight="600" fontFamily="system-ui">{item.name}</text>
          <text x="54" y={item.y + 28} fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="system-ui">⏱ {item.time} · ★ 4.8</text>
          <text x="192" y={item.y + 22} fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui">{item.price}</text>
          <circle cx="230" cy={item.y + 19} r="8" fill={`${color}33`} stroke={`${color}66`} strokeWidth="0.5">
            <animate attributeName="fill" values={`${color}33;${color}55;${color}33`} dur="3s" begin={`${2 + i * 1.2}s`} repeatCount="indefinite" />
          </circle>
          <text x="230" y={item.y + 22} fill={color} fontSize="8" fontFamily="system-ui" textAnchor="middle">+</text>
        </g>
      ))}
      <rect x="254" y="38" width="136" height="172" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <text x="266" y="54" fill="rgba(255,255,255,0.5)" fontSize="6" fontWeight="600" fontFamily="system-ui" letterSpacing="0.3">YOUR ORDER</text>
      {["Margherita Pizza", "Grilled Chicken"].map((name, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin={`${2.5 + i * 1.5}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;1" />
          <text x="266" y={72 + i * 18} fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="system-ui">{name}</text>
          <text x="378" y={72 + i * 18} fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="system-ui" textAnchor="end">{i === 0 ? "KD 3.500" : "KD 4.250"}</text>
        </g>
      ))}
      <line x1="266" y1="115" x2="378" y2="115" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </line>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.2s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
        <text x="266" y="130" fill="rgba(255,255,255,0.8)" fontSize="7" fontWeight="700" fontFamily="system-ui">Total</text>
        <text x="378" y="130" fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui" textAnchor="end">KD 7.750</text>
      </g>
      <rect x="264" y="150" width="116" height="24" rx="6" fill={`${color}33`} stroke={`${color}55`} strokeWidth="0.5" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </rect>
      <text x="322" y="165" fill={color} fontSize="6.5" fontWeight="600" fontFamily="system-ui" textAnchor="middle" opacity="0">
        Place Order →
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </text>
      <rect x="264" y="182" width="116" height="22" rx="4" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      <circle cx="274" cy="193" r="3" fill="#28c840">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="282" y="196" fill="rgba(255,255,255,0.35)" fontSize="5" fontFamily="system-ui">Delivery in 25-30 min</text>
    </svg>
  );
}

function DocProcessMockup({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <text x="200" y="16" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" textAnchor="middle" letterSpacing="0.5">DOCUMENT INTELLIGENCE</text>
      <rect x="16" y="28" width="140" height="180" rx="4" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <text x="30" y="44" fill="rgba(255,255,255,0.15)" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">INPUT DOCUMENT</text>
      {[55, 63, 71, 79, 87, 95, 103, 111, 119, 127, 135, 143, 151, 159, 167, 175, 183].map((y, i) => (
        <rect key={i} x="28" y={y} width={80 + (i % 3) * 15 - (i % 5) * 8} height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
      ))}
      <rect x="28" y="28" width="116" height="180" rx="0" fill="none">
        <clipPath id="scanClip"><rect x="28" y="28" width="116" height="180" /></clipPath>
      </rect>
      <line x1="24" y1="50" x2="148" y2="50" stroke={`${color}66`} strokeWidth="1.5">
        <animate attributeName="y1" values="50;200;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="50;200;50" dur="4s" repeatCount="indefinite" />
      </line>
      <rect x="24" y="50" width="124" height="8" fill={`${color}11`}>
        <animate attributeName="y" values="50;200;50" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="170" y="40" fill="rgba(255,255,255,0.08)" fontSize="18" fontFamily="system-ui">→</text>
      <rect x="200" y="28" width="184" height="80" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <text x="212" y="44" fill="rgba(255,255,255,0.15)" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">EXTRACTED DATA</text>
      {[
        { label: "Invoice #", value: "INV-2024-0847", delay: 0.5 },
        { label: "Amount", value: "$12,450.00", delay: 1.2 },
        { label: "Vendor", value: "Acme Corp Ltd.", delay: 1.9 },
        { label: "Due Date", value: "Aug 15, 2024", delay: 2.6 },
      ].map((f, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;1;0" dur="5s" begin={`${f.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;0.75;0.9;1" />
          <text x="212" y={58 + i * 14} fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="system-ui">{f.label}</text>
          <text x="260" y={58 + i * 14} fill="rgba(255,255,255,0.8)" fontSize="6" fontWeight="600" fontFamily="system-ui">{f.value}</text>
        </g>
      ))}
      <rect x="200" y="118" width="184" height="36" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <text x="212" y="132" fill="rgba(255,255,255,0.15)" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">CLASSIFICATION</text>
      {[
        { label: "Invoice", x: 212, c: color },
        { label: "Finance", x: 260, c: "#FFD43B" },
        { label: "Priority", x: 306, c: "#FF4A00" },
      ].map((tag, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;1;0" dur="5s" begin={`${3.2 + i * 0.4}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;0.75;0.9;1" />
          <rect x={tag.x} y="138" width="38" height="12" rx="6" fill={`${tag.c}22`} stroke={`${tag.c}44`} strokeWidth="0.5" />
          <text x={tag.x + 19} y="147" fill={tag.c} fontSize="5" fontFamily="system-ui" textAnchor="middle" fontWeight="500">{tag.label}</text>
        </g>
      ))}
      <rect x="200" y="164" width="184" height="44" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <text x="212" y="178" fill="rgba(255,255,255,0.15)" fontSize="5" fontFamily="system-ui" letterSpacing="0.3">CONFIDENCE</text>
      <rect x="212" y="186" width="140" height="6" rx="3" fill="rgba(255,255,255,0.04)" />
      <rect x="212" y="186" width="0" height="6" rx="3" fill={color}>
        <animate attributeName="width" values="0;133;133;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.3;0.85;1" />
      </rect>
      <text x="360" y="192" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui" opacity="0">
        98.2%
        <animate attributeName="opacity" values="0;0;1;1;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.35;0.85;1" />
      </text>
      <text x="212" y="202" fill="rgba(255,255,255,0.2)" fontSize="4.5" fontFamily="system-ui">Processing 847 of 1,200 documents</text>
    </svg>
  );
}

function ProjectMockup({ id, color }: { id: number; color: string }) {
  switch (id) {
    case 1: return <DashboardMockup color={color} />;
    case 2: return <ChatMockup color={color} />;
    case 3: return <EcommerceMockup color={color} />;
    case 4: return <WorkflowMockup color={color} />;
    case 5: return <RestaurantMockup color={color} />;
    case 6: return <DocProcessMockup color={color} />;
    default: return null;
  }
}

function ProjectCard({ project }: { project: ProjectVisual }) {
  const tp = useTranslations("work.projects");
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = hovered ? (mouse.y - 0.5) * -8 : 0;
  const rotateY = hovered ? (mouse.x - 0.5) * 8 : 0;

  return (
    <div
      ref={cardRef}
      style={{
        ...s.card,
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hovered ? 1.02 : 1})`,
        borderColor: hovered ? `${project.color}33` : "rgba(255,255,255,0.06)",
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.color}11` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
    >
      <div style={s.mockup}>
        <div style={s.mockupBar}>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
          </div>
        </div>
        <div style={{ ...s.mockupBody, opacity: hovered ? 1 : 0.7, transition: "opacity 0.4s ease" }}>
          <ProjectMockup id={project.id} color={project.color} />
        </div>
      </div>

      <div style={s.cardContent}>
        <span style={{ ...s.typeBadge, color: project.color, borderColor: `${project.color}33` }}>{tp(`${project.id}.category`)}</span>
        <h3 style={s.cardTitle}>{tp(`${project.id}.title`)}</h3>
        <p style={s.cardDesc}>{tp(`${project.id}.description`)}</p>
        <div style={s.metricsRow}>
          {project.metricValues.map((value, i) => (
            <div key={i} style={s.metric}>
              <span style={{ ...s.metricValue, color: project.color }}>{value}</span>
              <span style={s.metricLabel}>{tp(`${project.id}.metrics.${i + 1}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  const t = useTranslations("work.portfolio");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ ...s.section, padding: isMobile ? "60px 20px" : "100px 40px" }}>
      <style>{css}</style>

      <div style={s.header}>
        <span style={s.eyebrow}>{t("eyebrow")}</span>
        <h2 style={s.h2}>{t("heading")}</h2>
      </div>

      <div style={s.filters}>
        {filterKeys.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            style={{
              ...s.filterBtn,
              background: activeFilter === key ? "rgba(0,168,132,0.15)" : "transparent",
              color: activeFilter === key ? "#00a884" : "rgba(255,255,255,0.35)",
              borderColor: activeFilter === key ? "rgba(0,168,132,0.3)" : "rgba(255,255,255,0.08)",
            }}
          >
            {t(filterTranslationKeys[i])}
          </button>
        ))}
      </div>

      <div style={{ ...s.grid, gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
        {filtered.map((project, i) => (
          <div key={project.id} style={{ animation: `fadeSlideIn 0.4s ease-out ${i * 0.08}s both` }}>
            <Link href={`/work/${project.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const css = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: "100px 40px",
    background: "#050505",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
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
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 48,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "10px 18px",
    borderRadius: 20,
    border: "1px solid",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  card: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.35s ease",
    willChange: "transform",
  },
  mockup: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    background: "rgba(0,0,0,0.3)",
  },
  mockupBar: {
    padding: "8px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  mockupBody: {
    padding: "8px",
    minHeight: 110,
  },
  cardContent: {
    padding: "20px",
  },
  typeBadge: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    padding: "3px 10px",
    borderRadius: 20,
    border: "1px solid",
    display: "inline-block",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#e9edef",
    margin: "0 0 8px",
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 16px",
  },
  metricsRow: {
    display: "flex",
    gap: 24,
    borderTop: "1px solid rgba(255,255,255,0.04)",
    paddingTop: 14,
  },
  metric: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
  },
  metricLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
};
