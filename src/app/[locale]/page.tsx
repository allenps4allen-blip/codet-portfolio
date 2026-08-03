"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import ParallaxHero from "@/components/ParallaxHero";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectIllustration from "@/components/ProjectIllustration";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProcessPipeline from "@/components/ProcessPipeline";
import ROICalculator from "@/components/ROICalculator";
import StatsAndCTA from "@/components/StatsAndCTA";
import LogoMarquee from "@/components/LogoMarquee";
import Testimonials from "@/components/Testimonials";

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

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Services — Interactive demos */}
      <ServicesShowcase />

      {/* Process — Scroll-triggered timeline */}
      <ProcessPipeline />

      {/* ROI Calculator — Interactive sliders */}
      <ROICalculator />

      {/* Portfolio Preview */}
      <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "#050505" }}>
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
              <Link href="/work" className="glass-card group block overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]">
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    {t("portfolio.project1.category")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-foreground sm:text-xl">
                    {t("portfolio.project1.title")}
                  </h3>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent">
                  <div className="dot-matrix absolute inset-0 opacity-60" style={{ backgroundSize: "18px 18px" }} />
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110" aria-hidden="true">
                    <ProjectIllustration index={0} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/work" className="glass-card group block overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]">
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    {t("portfolio.project2.category")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-foreground sm:text-xl">
                    {t("portfolio.project2.title")}
                  </h3>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent">
                  <div className="dot-matrix absolute inset-0 opacity-60" style={{ backgroundSize: "18px 18px" }} />
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110" aria-hidden="true">
                    <ProjectIllustration index={1} />
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

      {/* Testimonials */}
      <Testimonials />

      {/* Stats + CTA */}
      <StatsAndCTA />
    </>
  );
}
