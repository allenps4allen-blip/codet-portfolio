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
      {/* Hero — Dot matrix + Aurora blobs */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 300, height: 300, background: "rgba(120, 70, 255, 0.14)", top: "-60px", left: "-40px" }} />
        <div className="aurora-blob" style={{ width: 250, height: 250, background: "rgba(0, 190, 220, 0.1)", bottom: "-40px", right: "-20px", animationDelay: "-5s" }} />
        <div className="aurora-blob" style={{ width: 150, height: 150, background: "rgba(255, 80, 180, 0.08)", top: "40%", left: "60%", animationDelay: "-9s" }} />
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
                className="glass-card inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-white/[0.12] sm:text-base"
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

      <div className="section-divider mx-6 sm:mx-12" />

      {/* What We Do — Dot matrix + center glow */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(100, 140, 255, 0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("whatWeDo")}
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-3">
            {services.map(({ key, icon }, i) => (
              <FadeIn key={key} delay={i * 0.12} scale>
                <div className="glass-card group rounded-xl p-4 transition-all hover:bg-white/[0.08] sm:rounded-2xl sm:p-8">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-foreground/80 sm:mb-6 sm:h-12 sm:w-12 sm:rounded-xl" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                    {icon}
                  </div>
                  <h3 className="text-sm font-semibold sm:text-lg">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:mt-3 sm:text-sm">
                    {t(`services.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* How We Work — Topographic contours */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <ellipse cx="600" cy="200" rx="150" ry="70" stroke="rgba(255,255,255,0.045)" strokeWidth="0.8" />
          <ellipse cx="600" cy="200" rx="260" ry="120" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          <ellipse cx="600" cy="200" rx="400" ry="170" stroke="rgba(255,255,255,0.025)" strokeWidth="0.8" />
          <ellipse cx="600" cy="200" rx="560" ry="230" stroke="rgba(255,255,255,0.018)" strokeWidth="0.8" />
          <ellipse cx="560" cy="185" rx="100" ry="45" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          <ellipse cx="660" cy="220" rx="80" ry="35" stroke="rgba(255,255,255,0.028)" strokeWidth="0.8" />
        </svg>
        <div className="pointer-events-none absolute left-[40%] top-[30%] h-[150px] w-[200px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.025), transparent)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("process.title")}
            </h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-8 lg:grid-cols-4">
            {(["1", "2", "3", "4"] as const).map((step, i) => (
              <FadeIn key={step} delay={i * 0.1} scale>
                <div className="glass-card group rounded-xl p-4 text-center transition-all hover:bg-white/[0.08] sm:rounded-2xl sm:p-8">
                  <span className="mx-auto mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-bold text-foreground/70 sm:mb-4 sm:h-10 sm:w-10 sm:text-sm" style={{ border: "0.5px solid rgba(255,255,255,0.12)" }}>
                    {step}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold sm:mt-4 sm:text-lg">
                    {t(`process.steps.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:mt-3 sm:text-sm">
                    {t(`process.steps.${step}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* Portfolio Preview — Dot matrix + film grain accents */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-[250px] w-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(140, 60, 255, 0.06), transparent)", filter: "blur(20px)" }} />
        <div className="pointer-events-none absolute -left-5 bottom-0 h-[200px] w-[200px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0, 180, 200, 0.05), transparent)", filter: "blur(20px)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("portfolio.title")}
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <ScrollReveal>
              <Link href="/work" className="group block overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                <div className="relative aspect-[16/10] bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent">
                  <div className="dot-matrix absolute inset-0 opacity-60" style={{ backgroundSize: "18px 18px" }} />
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" aria-hidden="true">
                    <ProjectIllustration index={0} />
                  </div>
                  <div className="glass-project-bar absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                      {t("portfolio.project1.category")}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-foreground sm:text-xl">
                      {t("portfolio.project1.title")}
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/work" className="group block overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                <div className="relative aspect-[16/10] bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent">
                  <div className="dot-matrix absolute inset-0 opacity-60" style={{ backgroundSize: "18px 18px" }} />
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1" aria-hidden="true">
                    <ProjectIllustration index={1} />
                  </div>
                  <div className="glass-project-bar absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                      {t("portfolio.project2.category")}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-foreground sm:text-xl">
                      {t("portfolio.project2.title")}
                    </h3>
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

      <div className="section-divider mx-6 sm:mx-12" />

      {/* CTA Section — Dot matrix + Constellation */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="100" cy="80" r="1.8" fill="rgba(255,255,255,0.1)" />
          <circle cx="280" cy="120" r="1.5" fill="rgba(255,255,255,0.08)" />
          <circle cx="500" cy="60" r="2" fill="rgba(255,255,255,0.1)" />
          <circle cx="700" cy="100" r="1.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="900" cy="70" r="1.8" fill="rgba(255,255,255,0.09)" />
          <circle cx="1100" cy="110" r="1.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="200" cy="280" r="1.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="450" cy="320" r="1.8" fill="rgba(255,255,255,0.09)" />
          <circle cx="650" cy="300" r="2" fill="rgba(255,255,255,0.1)" />
          <circle cx="850" cy="340" r="1.5" fill="rgba(255,255,255,0.08)" />
          <circle cx="1050" cy="310" r="1.8" fill="rgba(255,255,255,0.07)" />
          <line x1="100" y1="80" x2="280" y2="120" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          <line x1="280" y1="120" x2="500" y2="60" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="500" y1="60" x2="700" y2="100" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          <line x1="700" y1="100" x2="900" y2="70" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="900" y1="70" x2="1100" y2="110" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="200" y1="280" x2="450" y2="320" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="450" y1="320" x2="650" y2="300" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          <line x1="650" y1="300" x2="850" y2="340" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="280" y1="120" x2="200" y2="280" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          <line x1="500" y1="60" x2="450" y2="320" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          <line x1="700" y1="100" x2="650" y2="300" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="900" y1="70" x2="850" y2="340" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
        </svg>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn scale>
            <div className="glass-card mx-auto max-w-xl rounded-2xl px-8 py-12 sm:rounded-3xl sm:px-12 sm:py-16">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t("ctaSection.heading")}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-foreground/70 sm:text-lg">
                {t("ctaSection.subtext")}
              </p>
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
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
