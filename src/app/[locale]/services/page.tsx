"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const serviceKeys = ["website", "aiAgents", "automations"] as const;

const serviceIcons = {
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
    </svg>
  ),
  aiAgents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  automations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-10 w-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
};

const featureCount = [1, 2, 3, 4, 5] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {t("heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70"
          >
            {t("subheading")}
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-6 space-y-16 lg:space-y-24">
          {serviceKeys.map((key) => {
            const hasPrice = t(`${key}.price`) !== "";
            return (
              <FadeIn key={key} delay={0}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-12">
                  <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                    {/* Left: info */}
                    <div className="flex-1 space-y-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-foreground/80">
                        {serviceIcons[key]}
                      </div>
                      <h2 className="text-2xl font-bold sm:text-3xl">
                        {t(`${key}.title`)}
                      </h2>
                      <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                        {t(`${key}.description`)}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 pt-2">
                        {hasPrice ? (
                          <>
                            <span className="text-xs uppercase tracking-wider text-foreground/50">
                              {t("startingFrom")}
                            </span>
                            <span className="text-3xl font-bold">
                              {t(`${key}.price`)}
                            </span>
                            <span className="text-sm text-foreground/50">
                              {t(`${key}.priceLabel`)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-semibold text-foreground/70">
                            {t("customPricing")}
                          </span>
                        )}
                      </div>

                      <a
                        href="https://wa.me/971501234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                      >
                        {t("cta")}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>

                    {/* Right: features */}
                    <div className="flex-1 lg:pt-14">
                      <ul className="space-y-4">
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
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Pricing note */}
      <section className="pb-24 sm:pb-32">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-8 py-6">
              <p className="text-sm text-foreground/60">
                {t("pricingNote")}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
