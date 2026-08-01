"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

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

      {/* Form + Info */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              {submitted ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{t("form.success")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder={t("form.namePlaceholder")}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-medium">
                      {t("form.service")}
                    </label>
                    <select
                      id="service"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                    >
                      <option value="" disabled className="bg-background">—</option>
                      <option value="website" className="bg-background">{t("form.serviceOptions.website")}</option>
                      <option value="ai" className="bg-background">{t("form.serviceOptions.ai")}</option>
                      <option value="automation" className="bg-background">{t("form.serviceOptions.automation")}</option>
                      <option value="other" className="bg-background">{t("form.serviceOptions.other")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/30 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    {t("form.submit")}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </form>
              )}
            </FadeIn>

            {/* Info sidebar */}
            <FadeIn delay={0.2} className="space-y-8 lg:col-span-2">
              {/* Contact details */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  {t("info.title")}
                </h3>
                <ul className="space-y-5">
                  <li>
                    <p className="text-xs uppercase tracking-wider text-foreground/40">{t("info.emailLabel")}</p>
                    <a href={`mailto:${tFooter("email")}`} className="mt-1 block text-sm text-foreground/80 hover:text-foreground transition-colors">
                      {tFooter("email")}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-foreground/40">{t("info.phoneLabel")}</p>
                    <a href={`tel:${tFooter("phone")}`} className="mt-1 block text-sm text-foreground/80 hover:text-foreground transition-colors" dir="ltr">
                      {tFooter("phone")}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-foreground/40">{t("info.locationLabel")}</p>
                    <p className="mt-1 text-sm text-foreground/80">{tFooter("location")}</p>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-foreground/40">{t("info.hoursLabel")}</p>
                    <p className="mt-1 text-sm text-foreground/80">{t("info.hours")}</p>
                  </li>
                </ul>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  {t("whatsapp.title")}
                </h3>
                <p className="mb-6 text-sm text-foreground/60">
                  {t("whatsapp.description")}
                </p>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("whatsapp.button")}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
