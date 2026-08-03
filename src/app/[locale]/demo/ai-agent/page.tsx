"use client";

import HeroScrollDemo from "@/components/HeroScrollDemo";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const features = [
  "Custom-trained on your business data",
  "Multi-channel: WhatsApp, web, Telegram",
  "Lead qualification & CRM integration",
  "Multilingual support (English & Arabic)",
  "Analytics dashboard & conversation logs",
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function AIAgentDemoPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#050505", minHeight: "100vh", animation: "fadeIn 0.3s ease-out" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .demo-back-btn {
          position: fixed;
          top: 80px;
          left: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.2s ease;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        @media (max-width: 768px) {
          .demo-back-btn {
            top: 12px;
            left: 12px;
            padding: 6px 12px;
            font-size: 11px;
            border-radius: 8px;
          }
          .pricing-section { padding: 60px 20px 80px !important; }
          .pricing-card { padding: 28px 22px !important; }
          .pricing-header { flex-direction: column !important; gap: 24px !important; }
          .pricing-price { font-size: 40px !important; }
        }
      `}} />
      <button className="demo-back-btn" onClick={() => router.back()}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Back
      </button>
      <HeroScrollDemo />

      {/* Pricing Section */}
      <div className="pricing-section" style={p.section}>
        <AnimatedSection>
          <div style={p.eyebrowWrap}>
            <span style={p.eyebrow}>Pricing</span>
          </div>
          <h2 style={p.h2}>AI Agent for your business</h2>
          <p style={p.subtitle}>
            Deploy an intelligent assistant that works 24/7 — no holidays, no wait times.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="pricing-card" style={p.card}>
            <div className="pricing-header" style={p.cardHeader}>
              <div>
                <h3 style={p.cardTitle}>AI Agent</h3>
                <p style={p.cardDesc}>
                  Custom-trained on your business data, deployed across WhatsApp, web, and Telegram.
                </p>
              </div>
              <div style={p.priceBlock}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span className="pricing-price" style={p.price}>49</span>
                  <span style={p.currency}>KD</span>
                </div>
                <span style={p.priceLabel}>per month</span>
              </div>
            </div>

            <div style={p.divider} />

            <div style={p.featuresList}>
              {features.map((f, i) => (
                <div key={i} style={p.featureRow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="12" cy="12" r="10" fill="rgba(0,168,132,0.12)" />
                    <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="#00a884" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={p.featureText}>{f}</span>
                </div>
              ))}
            </div>

            <div style={p.divider} />

            <div style={p.ctaRow}>
              <a href="https://wa.me/96566565517" style={p.ctaButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Get Started
              </a>
              <span style={p.ctaNote}>Free setup consultation included</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p style={p.note}>
            Pricing may vary based on complexity. Book a free consultation for an accurate quote.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}

const p: Record<string, React.CSSProperties> = {
  section: {
    padding: "80px 40px 120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  eyebrowWrap: {
    textAlign: "center",
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: "#00a884",
  },
  h2: {
    fontSize: 32,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.35)",
    marginTop: 10,
    textAlign: "center",
    maxWidth: 440,
  },
  card: {
    marginTop: 40,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "36px 36px",
    maxWidth: 560,
    width: "100%",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#e9edef",
    margin: 0,
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.4)",
    margin: "8px 0 0",
    maxWidth: 280,
  },
  priceBlock: {
    textAlign: "right",
    flexShrink: 0,
  },
  price: {
    fontSize: 48,
    fontWeight: 700,
    color: "#00a884",
    letterSpacing: -2,
    lineHeight: 1,
  },
  currency: {
    fontSize: 18,
    fontWeight: 600,
    color: "#00a884",
    opacity: 0.7,
  },
  priceLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    display: "block",
    marginTop: 2,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    margin: "24px 0",
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  featureRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.5,
  },
  ctaRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: "14px 28px",
    background: "#00a884",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  ctaNote: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    fontWeight: 500,
  },
  note: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
    textAlign: "center",
    marginTop: 24,
    maxWidth: 400,
  },
};
