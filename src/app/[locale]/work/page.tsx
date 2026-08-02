"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectIllustration from "@/components/ProjectIllustration";

const projectIds = ["1", "2", "3", "4", "5", "6"] as const;

const gradients = [
  "from-purple-500/20 via-blue-500/10 to-transparent",
  "from-cyan-500/20 via-emerald-500/10 to-transparent",
  "from-orange-500/20 via-rose-500/10 to-transparent",
  "from-indigo-500/20 via-violet-500/10 to-transparent",
  "from-amber-500/20 via-yellow-500/10 to-transparent",
  "from-teal-500/20 via-sky-500/10 to-transparent",
];

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

      {/* Projects Grid — Dot matrix + film grain accents */}
      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="pointer-events-none absolute -right-10 top-20 h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(140, 60, 255, 0.05), transparent)", filter: "blur(20px)" }} />
        <div className="pointer-events-none absolute -left-10 bottom-40 h-[250px] w-[250px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0, 180, 200, 0.04), transparent)", filter: "blur(20px)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16">
          <div className="grid gap-8 sm:grid-cols-2">
            {projectIds.map((id, i) => (
              <ScrollReveal key={id}>
                <div className="glass-card group overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]">
                  <div className="p-5 sm:p-6">
                    <span className="mb-2 inline-block rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium" style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
                      {t(`projects.${id}.category`)}
                    </span>
                    <h2 className="text-lg font-semibold sm:text-xl">
                      {t(`projects.${id}.title`)}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-foreground/50">
                      {t(`projects.${id}.description`)}
                    </p>
                  </div>
                  <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradients[i]}`}>
                    <div className="dot-matrix absolute inset-0 opacity-50" style={{ backgroundSize: "18px 18px" }} />
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110" aria-hidden="true">
                      <ProjectIllustration index={i} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* CTA — Constellation + dot matrix */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="dot-matrix absolute inset-0" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="150" cy="80" r="1.8" fill="rgba(255,255,255,0.1)" />
          <circle cx="400" cy="120" r="1.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="650" cy="60" r="2" fill="rgba(255,255,255,0.09)" />
          <circle cx="900" cy="100" r="1.5" fill="rgba(255,255,255,0.08)" />
          <circle cx="300" cy="300" r="1.8" fill="rgba(255,255,255,0.08)" />
          <circle cx="600" cy="320" r="1.5" fill="rgba(255,255,255,0.07)" />
          <circle cx="850" cy="280" r="2" fill="rgba(255,255,255,0.09)" />
          <line x1="150" y1="80" x2="400" y2="120" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="400" y1="120" x2="650" y2="60" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          <line x1="650" y1="60" x2="900" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="300" y1="300" x2="600" y2="320" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          <line x1="600" y1="320" x2="850" y2="280" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          <line x1="400" y1="120" x2="300" y2="300" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
          <line x1="650" y1="60" x2="600" y2="320" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
        </svg>
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
