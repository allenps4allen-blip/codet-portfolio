"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "End-to-End Automation", desc: "Connect your entire workflow — from lead capture to invoicing." },
  { icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z", title: "Tool Integration", desc: "Zapier, Make, Google Sheets, CRMs, payment gateways — we connect them all." },
  { icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Automated Reporting", desc: "Daily, weekly, or monthly reports generated and delivered automatically." },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Save Hours Daily", desc: "Eliminate repetitive tasks so your team can focus on high-value work." },
];

export default function AutomationsLandingPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 300, height: 300, background: "rgba(245, 158, 11, 0.1)", top: "20px", right: "-60px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              Automations
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <motion.h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("automations.title")}
            </motion.h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60">{t("automations.description")}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/onboarding" className="rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                Start Your Project
              </Link>
              <Link href="/contact" className="rounded-full border border-white/[0.1] px-8 py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                Book Free Consultation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <FadeIn><h2 className="mb-12 text-center text-2xl font-bold text-foreground">Stop Working Harder, Start Working Smarter</h2></FadeIn>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div className="glass-card rounded-xl border border-white/[0.06] p-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d={f.icon} /></svg>
                <h3 className="mb-2 text-base font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/50">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <FadeIn>
          <div className="glass-card rounded-2xl border border-white/[0.06] px-8 py-12">
            <h2 className="text-xl font-bold text-foreground">Ready to automate?</h2>
            <p className="mt-2 text-sm text-foreground/40">Tell us what&apos;s slowing you down. We&apos;ll build the automation.</p>
            <Link href="/onboarding" className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
              Get Started
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
