"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Lightning Fast", desc: "Sub-second load times with modern frameworks and edge deployment." },
  { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Responsive Design", desc: "Pixel-perfect on every device — desktop, tablet, and mobile." },
  { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "SEO Optimized", desc: "Built-in SEO, structured data, and performance tuning for top rankings." },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Conversion Focused", desc: "Every element designed to turn visitors into customers." },
];

export default function WebsitesLandingPage() {
  const t = useTranslations("services");

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 300, height: 300, background: "rgba(0, 168, 132, 0.1)", top: "20px", right: "-60px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              Web Development
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <motion.h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("website.title")}
            </motion.h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60">{t("website.description")}</p>
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
          <FadeIn delay={0.2}>
            <p className="mt-4 text-xs text-foreground/25">{t("startingFrom")} {t("website.price")} {t("website.priceLabel")}</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <FadeIn><h2 className="mb-12 text-center text-2xl font-bold text-foreground">Why Choose CODET for Your Website</h2></FadeIn>
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((f, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div className="glass-card rounded-xl border border-white/[0.06] p-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a884" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d={f.icon} /></svg>
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
            <h2 className="text-xl font-bold text-foreground">Ready to launch your website?</h2>
            <p className="mt-2 text-sm text-foreground/40">Free consultation. No commitments.</p>
            <Link href="/onboarding" className="mt-6 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
              Get Started
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
