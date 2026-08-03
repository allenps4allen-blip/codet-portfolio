"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const serviceKeys = ["website", "aiAgents", "automations"] as const;

const serviceIcons = {
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
    </svg>
  ),
  aiAgents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  automations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
};

const accentColors: Record<string, string> = {
  website: "rgba(120, 70, 255, 0.15)",
  aiAgents: "rgba(0, 168, 132, 0.15)",
  automations: "rgba(255, 74, 0, 0.15)",
};

const accentBorders: Record<string, string> = {
  website: "rgba(120, 70, 255, 0.3)",
  aiAgents: "rgba(0, 168, 132, 0.3)",
  automations: "rgba(255, 74, 0, 0.3)",
};

const featureCount = [1, 2, 3, 4, 5] as const;

const whatsappMessages: Record<string, string> = {
  website: "Hi%2C%20I%27m%20interested%20in%20website%20development.%20Can%20we%20discuss%20my%20project%3F",
  aiAgents: "Hi%2C%20I%27m%20interested%20in%20an%20AI%20agent%20for%20my%20business.%20Can%20we%20schedule%20a%20consultation%3F",
  automations: "Hi%2C%20I%27m%20interested%20in%20workflow%20automation.%20Can%20we%20discuss%20my%20needs%3F",
};
const faqKeys = [1, 2, 3, 4, 5, 6] as const;

export default function ServicesPage() {
  const t = useTranslations("services");
  const [expandedCard, setExpandedCard] = useState<string | null>("aiAgents");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Header — Dot matrix + aurora */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 220, height: 220, background: "rgba(120, 70, 255, 0.12)", top: "-20px", left: "-40px" }} />
        <div className="aurora-blob" style={{ width: 180, height: 180, background: "rgba(0, 190, 220, 0.08)", bottom: "0", right: "-20px", animationDelay: "-6s" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70"
          >
            {t("subheading")}
          </motion.p>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* Interactive Pricing Cards */}
      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(100, 140, 255, 0.05) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl space-y-4 px-6 pt-16">
          {serviceKeys.map((key, idx) => {
            const isExpanded = expandedCard === key;
            const hasPrice = t(`${key}.price`) !== "";
            const isPopular = key === "aiAgents";

            return (
              <FadeIn key={key} delay={idx * 0.1}>
                <div
                  className="glass-card overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => setExpandedCard(isExpanded ? null : key)}
                  style={{
                    border: `1px solid ${isExpanded ? accentBorders[key] : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isExpanded ? `0 0 30px ${accentColors[key]}` : "none",
                    transition: "all 0.4s ease",
                  }}
                >
                  {/* Collapsed header — always visible */}
                  <div className="flex items-center gap-4 p-6 sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-foreground/80 flex-shrink-0" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                      {serviceIcons[key]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold sm:text-xl truncate">
                          {t(`${key}.title`)}
                        </h2>
                        {isPopular && (
                          <span className="flex-shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/25">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-foreground/50 truncate">
                        {isExpanded ? "" : t(`${key}.description`).slice(0, 80) + "…"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {hasPrice ? (
                        <span className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm font-semibold" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                          {t(`${key}.price`)} <span className="text-xs text-foreground/50">{t(`${key}.priceLabel`)}</span>
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-foreground/50">
                          {t("customPricing")}
                        </span>
                      )}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5 text-foreground/30 transition-transform duration-300"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div
                    style={{
                      maxHeight: isExpanded ? 600 : 0,
                      opacity: isExpanded ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                    }}
                  >
                    <div className="border-t border-white/[0.06] px-6 pb-8 pt-6 sm:px-8">
                      <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                        {t(`${key}.description`)}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {featureCount.map((num) => (
                          <li key={num} className="flex items-start gap-3">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-5 w-5 flex-shrink-0 text-foreground/40" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span className="text-sm text-foreground/70">
                              {t(`${key}.features.${num}`)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <a
                          href={`https://wa.me/96566565517?text=${whatsappMessages[key]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                          {t("cta")}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Pricing note */}
      <section className="relative overflow-hidden pb-16 sm:pb-20">
        <div className="dot-matrix absolute inset-0" />
        <FadeIn scale>
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <div className="glass-card rounded-xl px-8 py-6">
              <p className="text-sm text-foreground/60">
                {t("pricingNote")}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* Comparison Table */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              {t("compare.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-12 overflow-x-auto rounded-2xl" style={{ WebkitOverflowScrolling: "touch" }}>
              <table className="w-full border-collapse text-sm" style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    <th className="p-4 text-start text-xs font-semibold uppercase tracking-wider text-foreground/40" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>&nbsp;</th>
                    {serviceKeys.map((key) => (
                      <th key={key} className="p-4 text-center font-semibold" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-foreground/80">{serviceIcons[key]}</span>
                          <span>{t(`${key}.title`)}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 text-foreground/50 font-medium" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{t("compare.price")}</td>
                    {serviceKeys.map((key) => (
                      <td key={key} className="p-4 text-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {t(`${key}.price`) ? (
                          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm font-semibold" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                            {t(`${key}.price`)}
                          </span>
                        ) : (
                          <span className="text-foreground/40">{t("customPricing")}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground/50 font-medium" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{t("compare.timeline")}</td>
                    {serviceKeys.map((key) => (
                      <td key={key} className="p-4 text-center text-foreground/70" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {t(`compare.${key}.timeline`)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground/50 font-medium">{t("compare.bestFor")}</td>
                    {serviceKeys.map((key) => (
                      <td key={key} className="p-4 text-center text-foreground/60 text-xs leading-relaxed">
                        {t(`compare.${key}.bestFor`)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* FAQ */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              {t("faq.title")}
            </h2>
          </FadeIn>
          <div className="mt-12 space-y-3">
            {faqKeys.map((num, idx) => {
              const isOpen = openFaq === num;
              return (
                <FadeIn key={num} delay={idx * 0.06}>
                  <div
                    className="glass-card overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      border: `1px solid ${isOpen ? "rgba(0, 168, 132, 0.25)" : "rgba(255,255,255,0.08)"}`,
                    }}
                    onClick={() => setOpenFaq(isOpen ? null : num)}
                  >
                    <div className="flex items-center justify-between gap-4 p-5">
                      <h3 className="text-sm font-semibold sm:text-base">
                        {t(`faq.items.${num}.q`)}
                      </h3>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5 flex-shrink-0 text-foreground/30 transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                    <div
                      style={{
                        maxHeight: isOpen ? 300 : 0,
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                      }}
                    >
                      <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-foreground/60">
                          {t(`faq.items.${num}.a`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
