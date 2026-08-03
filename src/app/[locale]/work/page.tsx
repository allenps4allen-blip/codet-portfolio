"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function WorkPage() {
  const t = useTranslations("work");

  return (
    <>
      {/* Header — Dot matrix + aurora */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 200, height: 200, background: "rgba(120, 70, 255, 0.1)", top: "20px", right: "-40px" }} />
        <div className="aurora-blob" style={{ width: 160, height: 160, background: "rgba(0, 190, 220, 0.08)", bottom: "0", left: "-20px", animationDelay: "-6s" }} />
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

      {/* Portfolio Grid */}
      <PortfolioGrid />

      <div className="section-divider mx-6 sm:mx-12" />

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn scale>
            <div className="glass-card mx-auto max-w-xl rounded-2xl px-8 py-12 sm:rounded-3xl sm:px-12 sm:py-16">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                {t("cta.heading")}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-foreground/70">
                {t("cta.subtext")}
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t("cta.button")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
