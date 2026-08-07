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
      <rect width="54" height="220" fill="rgba(255,255,255,0.04)" />
      <rect x="12" y="14" width="30" height="6" rx="3" fill={`${color}66`} />
      {[30, 43, 56, 69, 82].map((y, i) => (
        <rect key={i} x="14" y={y} width="26" height="4" rx="2" fill={i === 0 ? `${color}55` : "rgba(255,255,255,0.08)"} />
      ))}
      <rect x="54" y="0" width="346" height="26" fill="rgba(255,255,255,0.025)" />
      <rect x="66" y="7" width="60" height="10" rx="4" fill="rgba(255,255,255,0.1)" />
      <circle cx="370" cy="13" r="6" fill="rgba(255,255,255,0.07)" />
      <circle cx="354" cy="13" r="6" fill="rgba(255,255,255,0.05)" />
      {[
        { x: 66, label: "REVENUE", value: "$48.2K", vc: color },
        { x: 170, label: "USERS", value: "2,847", vc: "rgba(255,255,255,0.9)" },
        { x: 274, label: "GROWTH", value: "+24.5%", vc: "#28c840" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y="34" width="96" height="44" rx="5" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <text x={c.x + 10} y="51" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="system-ui" letterSpacing="0.5" fontWeight="500">{c.label}</text>
          <text x={c.x + 10} y="69" fill={c.vc} fontSize="16" fontWeight="700" fontFamily="system-ui">{c.value}</text>
          <text x={c.x + 70} y="51" fill="#28c840" fontSize="6" fontFamily="system-ui" fontWeight="500">
            {i === 0 ? "↑ 12%" : i === 1 ? "↑ 8%" : ""}
          </text>
        </g>
      ))}
      <rect x="66" y="86" width="200" height="128" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
      <text x="76" y="101" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="system-ui" letterSpacing="0.5" fontWeight="500">WEEKLY OVERVIEW</text>
      {[115, 135, 155, 175, 195].map((y, i) => (
        <line key={i} x1="76" y1={y} x2="256" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={82 + i * 17} width="11" rx="2" fill={`${color}${i % 2 === 0 ? "66" : "40"}`}>
          <animate attributeName="height" values={`0;${h};${h * 0.88};${h}`} dur="3.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
          <animate attributeName="y" values={`208;${208 - h};${208 - h * 0.88};${208 - h}`} dur="3.5s" begin={`${i * 0.12}s`} repeatCount="indefinite" keyTimes="0;0.35;0.65;1" />
        </rect>
      ))}
      <polyline fill="none" stroke={`${color}99`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points="82,190 99,175 116,182 133,160 150,168 167,148 184,155 201,138 218,145 235,128 252,135">
        <animate attributeName="stroke-dasharray" values="0 500;300 500" dur="2s" fill="freeze" />
      </polyline>
      <rect x="276" y="86" width="88" height="128" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
      <text x="286" y="101" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="system-ui" letterSpacing="0.5" fontWeight="500">TOP PAGES</text>
      {[112, 132, 152, 172, 192].map((y, i) => (
        <g key={i}>
          <rect x="286" y={y} width={55 - i * 7} height="5" rx="2.5" fill={`${color}${66 - i * 10}`}>
            <animate attributeName="width" values={`0;${55 - i * 7}`} dur="1.2s" begin={`${0.4 + i * 0.15}s`} fill="freeze" />
          </rect>
          <rect x="286" y={y + 8} width="44" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
        </g>
      ))}
    </svg>
  );
}

function ChatMockup({ color }: { color: string }) {
  const msgs = [
    { align: "end", bg: "#005c4b", text: "Hi, I need help with my order", w: 170, delay: 0 },
    { align: "start", bg: "#1f2c34", text: "Of course! Let me look that up.", text2: "What's your order number?", w: 200, delay: 1.2 },
    { align: "end", bg: "#005c4b", text: "It's #4829", w: 90, delay: 2.8 },
    { align: "start", bg: "#1f2c34", text: "Found it! Your order shipped", text2: "today and arrives Thursday.", w: 210, delay: 4 },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="400" height="34" fill="rgba(255,255,255,0.035)" />
      <circle cx="24" cy="17" r="11" fill={`${color}40`} />
      <text x="24" y="21" fill={color} fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="700">AI</text>
      <text x="42" y="15" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="600" fontFamily="system-ui">CODET AI Agent</text>
      <circle cx="42" cy="24" r="2.5" fill={color} />
      <text x="49" y="27" fill={color} fontSize="7" fontFamily="system-ui" fontWeight="500">online</text>
      <rect x="0" y="34" width="400" height="0.8" fill="rgba(255,255,255,0.07)" />
      {msgs.map((m, i) => {
        const y = 48 + i * 42;
        const x = m.align === "end" ? 400 - m.w - 16 : 16;
        const h = m.text2 ? 36 : 28;
        return (
          <g key={i} opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="8s" begin={`${m.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.06;0.7;0.85;0.92;1" />
            <rect x={x} y={y} width={m.w} height={h} rx="10" fill={m.bg} />
            <text x={x + 10} y={y + 15} fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="system-ui">{m.text}</text>
            {m.text2 && <text x={x + 10} y={y + 28} fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="system-ui">{m.text2}</text>}
            {m.align === "end" && (
              <g>
                <path d={`M${x + m.w - 20},${y + h - 8} l2,2 4,-4`} stroke="#53bdeb" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d={`M${x + m.w - 17},${y + h - 8} l2,2 4,-4`} stroke="#53bdeb" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        );
      })}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" dur="8s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.04;0.12;0.15;1" />
        <circle cx="30" cy="218" r="3" fill={`${color}99`}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        </circle>
        <text x="40" y="221" fill={color} fontSize="7" fontFamily="system-ui" fontWeight="600">Resolved in 47 seconds</text>
        <path d="M36,213 l2.5,3 5.5,-5.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <rect y="210" width="400" height="0.5" fill="rgba(255,255,255,0.05)" />
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
      <rect width="400" height="30" fill="rgba(255,255,255,0.035)" />
      <rect x="12" y="7" width="150" height="16" rx="8" fill="rgba(255,255,255,0.05)" />
      <text x="24" y="19" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="system-ui">Search products...</text>
      <circle cx="150" cy="15" r="5" fill="rgba(255,255,255,0.1)" />
      <g>
        <rect x="354" y="5" width="34" height="20" rx="10" fill={`${color}28`} stroke={`${color}55`} strokeWidth="0.8" />
        <text x="364" y="19" fill={color} fontSize="9" fontFamily="system-ui">🛒</text>
        <circle cx="383" cy="10" r="6" fill={color}>
          <animate attributeName="r" values="0;6;6;6" dur="6s" begin="3s" repeatCount="indefinite" keyTimes="0;0.05;0.8;1" />
        </circle>
        <text x="383" y="13" fill="#000" fontSize="6" fontFamily="system-ui" textAnchor="middle" fontWeight="700">
          3
          <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin="3s" repeatCount="indefinite" keyTimes="0;0.05;0.8;1" />
        </text>
      </g>
      {products.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="40" width="120" height="172" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8">
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin={`${i * 0.15}s`} fill="freeze" />
          </rect>
          <rect x={p.x + 6} y="46" width="108" height="78" rx="5" fill={`${color}15`}>
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </rect>
          <rect x={p.x + 34} y="72" width="52" height="26" rx="5" fill="rgba(255,255,255,0.07)" />
          <text x={p.x + 60} y="90" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="system-ui" textAnchor="middle">📦</text>
          <text x={p.x + 12} y="140" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600" fontFamily="system-ui">{p.name}</text>
          <text x={p.x + 12} y="152" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="system-ui">★ {p.rating} · Free shipping</text>
          <text x={p.x + 12} y="170" fill={color} fontSize="12" fontWeight="700" fontFamily="system-ui">{p.price}</text>
          <rect x={p.x + 10} y="180" width="100" height="24" rx="7" fill={`${color}28`} stroke={`${color}55`} strokeWidth="0.8">
            <animate attributeName="fill" values={`${color}28;${color}50;${color}28`} dur="3s" begin={`${1 + i * 1.5}s`} repeatCount="indefinite" />
          </rect>
          <text x={p.x + 60} y="196" fill={color} fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="middle">Add to Cart</text>
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
      <text x="200" y="19" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="system-ui" textAnchor="middle" letterSpacing="1" fontWeight="500">AUTOMATION PIPELINE</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={nodes[i].x + 28} y1="80" x2={nodes[i + 1].x - 8} y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5 4" />
          <circle r="3.5" fill={color}>
            <animateMotion dur="1.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M${nodes[i].x + 28},80 L${nodes[i + 1].x - 8},80`} />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
          </circle>
          <circle r="2.5" fill={`${color}88`}>
            <animateMotion dur="1.5s" begin={`${i * 0.6 + 0.4}s`} repeatCount="indefinite" path={`M${nodes[i].x + 28},80 L${nodes[i + 1].x - 8},80`} />
            <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.5s" begin={`${i * 0.6 + 0.4}s`} repeatCount="indefinite" keyTimes="0;0.1;0.8;1" />
          </circle>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x - 18} y="56" width="58" height="50" rx="9" fill="rgba(255,255,255,0.035)" stroke={`${n.status}55`} strokeWidth="1.2">
            <animate attributeName="stroke-opacity" values="0.35;0.75;0.35" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </rect>
          <text x={n.x + 11} y="80" fill="rgba(255,255,255,0.75)" fontSize="16" fontFamily="system-ui" textAnchor="middle">{n.icon}</text>
          <text x={n.x + 11} y="98" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontFamily="system-ui" textAnchor="middle" fontWeight="600">{n.label}</text>
          <circle cx={n.x + 32} cy="62" r="3.5" fill={n.status}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <rect x="20" y="125" width="360" height="0.8" fill="rgba(255,255,255,0.05)" />
      {[
        { label: "Leads Today", value: "47", change: "+12" },
        { label: "Qualified", value: "31", change: "66%" },
        { label: "Avg Score", value: "8.4", change: "+0.3" },
        { label: "Converted", value: "18", change: "58%" },
      ].map((m, i) => (
        <g key={i}>
          <rect x={20 + i * 95} y="136" width="84" height="40" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
          <text x={30 + i * 95} y="151" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="system-ui" letterSpacing="0.3" fontWeight="500">{m.label}</text>
          <text x={30 + i * 95} y="168" fill="rgba(255,255,255,0.85)" fontSize="14" fontWeight="700" fontFamily="system-ui">{m.value}</text>
          <text x={74 + i * 95} y="168" fill="#28c840" fontSize="6.5" fontFamily="system-ui" fontWeight="500">{m.change}</text>
        </g>
      ))}
      <rect x="20" y="188" width="360" height="26" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
      <text x="34" y="204" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontFamily="system-ui">Latest: Sarah K. → Qualified → Score 9.2 → Meeting scheduled</text>
      <circle cx="27" cy="201" r="3" fill="#28c840">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RestaurantMockup({ color }: { color: string }) {
  const items = [
    { y: 40, name: "Margherita Pizza", price: "KD 3.500", icon: "🍕", time: "15 min" },
    { y: 86, name: "Grilled Chicken", price: "KD 4.250", icon: "🍗", time: "20 min" },
    { y: 132, name: "Caesar Salad", price: "KD 2.750", icon: "🥗", time: "8 min" },
  ];
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <rect width="400" height="32" fill="rgba(255,255,255,0.035)" />
      <text x="16" y="22" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="700" fontFamily="system-ui">Menu</text>
      <rect x="56" y="9" width="65" height="14" rx="7" fill={`${color}28`} />
      <text x="67" y="20" fill={color} fontSize="6.5" fontFamily="system-ui" fontWeight="600">Popular 🔥</text>
      <rect x="128" y="9" width="55" height="14" rx="7" fill="rgba(255,255,255,0.05)" />
      <text x="139" y="20" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="system-ui">Combos</text>
      <rect x="306" y="7" width="82" height="18" rx="9" fill={`${color}28`} stroke={`${color}50`} strokeWidth="0.8" />
      <text x="320" y="20" fill={color} fontSize="7" fontFamily="system-ui" fontWeight="600">Order #247</text>
      {items.map((item, i) => (
        <g key={i}>
          <rect x="12" y={item.y} width="232" height="40" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8">
            <animate attributeName="opacity" values="0;1" dur="0.4s" begin={`${i * 0.2}s`} fill="freeze" />
          </rect>
          <rect x="18" y={item.y + 5} width="30" height="30" rx="7" fill={`${color}1a`} />
          <text x="33" y={item.y + 27} fill="rgba(255,255,255,0.75)" fontSize="16" fontFamily="system-ui" textAnchor="middle">{item.icon}</text>
          <text x="56" y={item.y + 18} fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600" fontFamily="system-ui">{item.name}</text>
          <text x="56" y={item.y + 30} fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="system-ui">⏱ {item.time} · ★ 4.8</text>
          <text x="192" y={item.y + 24} fill={color} fontSize="9" fontWeight="700" fontFamily="system-ui">{item.price}</text>
          <circle cx="232" cy={item.y + 20} r="9" fill={`${color}38`} stroke={`${color}66`} strokeWidth="0.8">
            <animate attributeName="fill" values={`${color}38;${color}60;${color}38`} dur="3s" begin={`${2 + i * 1.2}s`} repeatCount="indefinite" />
          </circle>
          <text x="232" y={item.y + 24} fill={color} fontSize="10" fontFamily="system-ui" textAnchor="middle" fontWeight="500">+</text>
        </g>
      ))}
      <rect x="256" y="40" width="134" height="170" rx="7" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <text x="268" y="57" fill="rgba(255,255,255,0.55)" fontSize="7" fontWeight="600" fontFamily="system-ui" letterSpacing="0.3">YOUR ORDER</text>
      {["Margherita Pizza", "Grilled Chicken"].map((name, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin={`${2.5 + i * 1.5}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;1" />
          <text x="268" y={76 + i * 20} fill="rgba(255,255,255,0.65)" fontSize="7" fontFamily="system-ui">{name}</text>
          <text x="378" y={76 + i * 20} fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="system-ui" textAnchor="end">{i === 0 ? "KD 3.500" : "KD 4.250"}</text>
        </g>
      ))}
      <line x1="268" y1="122" x2="378" y2="122" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </line>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.2s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
        <text x="268" y="138" fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="700" fontFamily="system-ui">Total</text>
        <text x="378" y="138" fill={color} fontSize="10" fontWeight="700" fontFamily="system-ui" textAnchor="end">KD 7.750</text>
      </g>
      <rect x="266" y="152" width="114" height="26" rx="7" fill={`${color}38`} stroke={`${color}60`} strokeWidth="0.8" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </rect>
      <text x="323" y="169" fill={color} fontSize="7.5" fontWeight="600" fontFamily="system-ui" textAnchor="middle" opacity="0">
        Place Order →
        <animate attributeName="opacity" values="0;0;1;1" dur="6s" begin="5.5s" repeatCount="indefinite" keyTimes="0;0.01;0.06;1" />
      </text>
      <rect x="266" y="186" width="114" height="24" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
      <circle cx="277" cy="198" r="3.5" fill="#28c840">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="286" y="201" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="system-ui">Delivery in 25-30 min</text>
    </svg>
  );
}

function DocProcessMockup({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 400 220" width="100%" style={{ display: "block" }}>
      <text x="200" y="17" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="system-ui" textAnchor="middle" letterSpacing="0.5" fontWeight="500">DOCUMENT INTELLIGENCE</text>
      <rect x="16" y="28" width="142" height="182" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <text x="30" y="45" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" letterSpacing="0.3" fontWeight="500">INPUT DOCUMENT</text>
      {[56, 65, 74, 83, 92, 101, 110, 119, 128, 137, 146, 155, 164, 173, 182, 191].map((y, i) => (
        <rect key={i} x="28" y={y} width={85 + (i % 3) * 14 - (i % 5) * 9} height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      ))}
      <line x1="24" y1="50" x2="150" y2="50" stroke={`${color}77`} strokeWidth="2">
        <animate attributeName="y1" values="50;205;50" dur="4s" repeatCount="indefinite" />
        <animate attributeName="y2" values="50;205;50" dur="4s" repeatCount="indefinite" />
      </line>
      <rect x="24" y="50" width="126" height="10" fill={`${color}18`}>
        <animate attributeName="y" values="50;205;50" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="172" y="120" fill="rgba(255,255,255,0.12)" fontSize="22" fontFamily="system-ui">→</text>
      <rect x="200" y="28" width="184" height="84" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <text x="212" y="45" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" letterSpacing="0.3" fontWeight="500">EXTRACTED DATA</text>
      {[
        { label: "Invoice #", value: "INV-2024-0847", delay: 0.5 },
        { label: "Amount", value: "$12,450.00", delay: 1.2 },
        { label: "Vendor", value: "Acme Corp Ltd.", delay: 1.9 },
        { label: "Due Date", value: "Aug 15, 2024", delay: 2.6 },
      ].map((f, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;1;0" dur="5s" begin={`${f.delay}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;0.75;0.9;1" />
          <text x="212" y={60 + i * 15} fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="system-ui" fontWeight="500">{f.label}</text>
          <text x="265" y={60 + i * 15} fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="system-ui">{f.value}</text>
        </g>
      ))}
      <rect x="200" y="122" width="184" height="38" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <text x="212" y="137" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" letterSpacing="0.3" fontWeight="500">CLASSIFICATION</text>
      {[
        { label: "Invoice", x: 212, c: color },
        { label: "Finance", x: 262, c: "#FFD43B" },
        { label: "Priority", x: 310, c: "#FF4A00" },
      ].map((tag, i) => (
        <g key={i} opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;1;0" dur="5s" begin={`${3.2 + i * 0.4}s`} repeatCount="indefinite" keyTimes="0;0.01;0.08;0.75;0.9;1" />
          <rect x={tag.x} y="143" width="40" height="14" rx="7" fill={`${tag.c}28`} stroke={`${tag.c}50`} strokeWidth="0.8" />
          <text x={tag.x + 20} y="153" fill={tag.c} fontSize="6" fontFamily="system-ui" textAnchor="middle" fontWeight="600">{tag.label}</text>
        </g>
      ))}
      <rect x="200" y="170" width="184" height="40" rx="5" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <text x="212" y="185" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="system-ui" letterSpacing="0.3" fontWeight="500">CONFIDENCE</text>
      <rect x="212" y="193" width="140" height="7" rx="3.5" fill="rgba(255,255,255,0.05)" />
      <rect x="212" y="193" width="0" height="7" rx="3.5" fill={color}>
        <animate attributeName="width" values="0;133;133;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.3;0.85;1" />
      </rect>
      <text x="360" y="199" fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui" opacity="0">
        98.2%
        <animate attributeName="opacity" values="0;0;1;1;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.35;0.85;1" />
      </text>
      <text x="212" y="208" fill="rgba(255,255,255,0.25)" fontSize="5.5" fontFamily="system-ui">Processing 847 of 1,200 documents</text>
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
    padding: "4px 8px 8px",
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
