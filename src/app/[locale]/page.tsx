"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import ParallaxHero from "@/components/ParallaxHero";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectIllustration from "@/components/ProjectIllustration";

const services = [
  {
    key: "websites",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
      </svg>
    ),
  },
  {
    key: "aiAgents",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    key: "automations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
] as const;

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="hero-gradient noise absolute inset-0" />
        <ParallaxHero>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("heading")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-base text-foreground/70 sm:text-lg md:text-xl"
            >
              {t("subtext")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <a
                href="https://wa.me/96566565517"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:text-base"
              >
                {t("cta")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </ParallaxHero>
      </section>

      {/* What We Do */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("whatWeDo")}
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ key, icon }, i) => (
              <FadeIn key={key} delay={i * 0.12} scale>
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-foreground/80">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {t(`services.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("process.title")}
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(["1", "2", "3", "4"] as const).map((step, i) => (
              <FadeIn key={step} delay={i * 0.1} scale>
                <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-foreground/70">
                    {step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">
                    {t(`process.steps.${step}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {t(`process.steps.${step}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("portfolio.title")}
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <ScrollReveal>
              <Link href="/work" className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-white/[0.03]">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" aria-hidden="true">
                    <ProjectIllustration index={0} />
                  </div>
                  <div className="relative flex h-full items-end p-8 sm:p-12">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/50">
                        {t("portfolio.project1.category")}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-foreground sm:text-2xl">
                        {t("portfolio.project1.title")}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/work" className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-white/[0.03]">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" aria-hidden="true">
                    <ProjectIllustration index={1} />
                  </div>
                  <div className="relative flex h-full items-end p-8 sm:p-12">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/50">
                        {t("portfolio.project2.category")}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-foreground sm:text-2xl">
                        {t("portfolio.project2.title")}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
          <FadeIn delay={0.2} className="mt-10 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {t("portfolio.viewAll")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="hero-gradient noise absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn scale>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("ctaSection.heading")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
              {t("ctaSection.subtext")}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <a
                href="https://wa.me/96566565517"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:text-base"
              >
                {t("ctaSection.button")}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
