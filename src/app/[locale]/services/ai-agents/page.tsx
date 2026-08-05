"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "Multi-Channel", desc: "Deploy across WhatsApp, web chat, Telegram, and Instagram from one agent." },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", title: "Custom Trained", desc: "Trained on your business data for accurate, on-brand responses every time." },
  { icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129", title: "Bilingual", desc: "Native English and Arabic support, including Kuwaiti dialect." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Analytics Built In", desc: "Track conversations, intents, resolution rates, and customer satisfaction." },
];

export default function AIAgentsLandingPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 300, height: 300, background: "rgba(139, 92, 246, 0.1)", top: "20px", left: "-60px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              AI Agents
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <motion.h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("aiAgents.title")}
            </motion.h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60">{t("aiAgents.description")}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/demo" className="rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                Try Live Demo
              </Link>
              <Link href="/onboarding" className="rounded-full border border-white/[0.1] px-8 py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
                Start Your Project
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-xs text-foreground/25">{t("startingFrom")} {t("aiAgents.price")} {t("aiAgents.priceLabel")}</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <FadeIn><h2 className="mb-12 text-center text-2xl font-bold text-foreground">Your 24/7 Digital Employee</h2></FadeIn>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div className="glass-card rounded-xl border border-white/[0.06] p-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d={f.icon} /></svg>
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
            <h2 className="text-xl font-bold text-foreground">See it in action</h2>
            <p className="mt-2 text-sm text-foreground/40">Try our live AI agent demo, then let us build one for your business.</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/demo" className="rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                Try Demo
              </Link>
              <Link href="/onboarding" className="rounded-full border border-white/[0.1] px-6 py-3 text-sm text-foreground/60 hover:text-foreground transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
