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
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
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

      {/* Projects Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            {projectIds.map((id, i) => (
              <ScrollReveal key={id}>
                <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20">
                  <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradients[i]}`}>
                    <div className="absolute inset-0" aria-hidden="true">
                      <ProjectIllustration index={i} />
                    </div>
                    <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
                      <span className="inline-block self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                        {t(`projects.${id}.category`)}
                      </span>
                      <div>
                        <h2 className="text-xl font-semibold sm:text-2xl">
                          {t(`projects.${id}.title`)}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                          {t(`projects.${id}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="hero-gradient noise absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn scale>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t("cta.heading")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-foreground/70">
              {t("cta.subtext")}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
