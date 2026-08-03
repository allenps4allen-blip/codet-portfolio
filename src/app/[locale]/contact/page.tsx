"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Header — Dot matrix */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 180, height: 180, background: "rgba(120, 70, 255, 0.1)", top: "30px", right: "-30px" }} />
        <div className="aurora-blob" style={{ width: 150, height: 150, background: "rgba(0, 190, 220, 0.08)", bottom: "-20px", left: "-20px", animationDelay: "-5s" }} />
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

      {/* Form + Info — Dot matrix */}
      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <div className="dot-matrix absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(100, 140, 255, 0.05) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              {submitted ? (
                <div className="glass-card flex min-h-[400px] items-center justify-center rounded-2xl p-8">
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
                <form onSubmit={handleSubmit} className="glass-card space-y-6 rounded-2xl p-6 sm:p-8">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder={t("form.namePlaceholder")}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-medium">
                      {t("form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                    >
                      <option value="" disabled className="bg-background">—</option>
                      <option value="website" className="bg-background">{t("form.serviceOptions.website")}</option>
                      <option value="ai" className="bg-background">{t("form.serviceOptions.ai")}</option>
                      <option value="automation" className="bg-background">{t("form.serviceOptions.automation")}</option>
                      <option value="other" className="bg-background">{t("form.serviceOptions.other")}</option>
                    </select>
                  </div>

                  {/* Conditional follow-up fields */}
                  {selectedService === "website" && (
                    <div className="overflow-hidden transition-all duration-300" style={{ animation: "slideDown 0.3s ease-out" }}>
                      <style>{`@keyframes slideDown { from { opacity: 0; max-height: 0; transform: translateY(-8px); } to { opacity: 1; max-height: 100px; transform: translateY(0); } }`}</style>
                      <p className="mb-3 text-sm font-medium">Do you have existing branding?</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground/70">
                          <input type="radio" name="branding" value="yes" className="accent-emerald-500" />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground/70">
                          <input type="radio" name="branding" value="no" className="accent-emerald-500" />
                          No
                        </label>
                      </div>
                    </div>
                  )}

                  {selectedService === "ai" && (
                    <div className="overflow-hidden transition-all duration-300" style={{ animation: "slideDown 0.3s ease-out" }}>
                      <style>{`@keyframes slideDown { from { opacity: 0; max-height: 0; transform: translateY(-8px); } to { opacity: 1; max-height: 200px; transform: translateY(0); } }`}</style>
                      <p className="mb-3 text-sm font-medium">Which channels do you need?</p>
                      <div className="flex flex-wrap gap-4">
                        {["Website", "WhatsApp", "Telegram", "Instagram"].map((ch) => (
                          <label key={ch} className="flex items-center gap-2 cursor-pointer text-sm text-foreground/70">
                            <input type="checkbox" name="channels" value={ch.toLowerCase()} className="accent-emerald-500 rounded" />
                            {ch}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedService === "automation" && (
                    <div className="overflow-hidden transition-all duration-300" style={{ animation: "slideDown 0.3s ease-out" }}>
                      <style>{`@keyframes slideDown { from { opacity: 0; max-height: 0; transform: translateY(-8px); } to { opacity: 1; max-height: 100px; transform: translateY(0); } }`}</style>
                      <div>
                        <label htmlFor="tools" className="mb-2 block text-sm font-medium">
                          Which tools do you currently use?
                        </label>
                        <input
                          type="text"
                          id="tools"
                          name="tools"
                          placeholder="e.g., Zapier, Slack, Google Sheets…"
                          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-white/20 focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{t("form.error")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {sending ? t("form.sending") : t("form.submit")}
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
              <div className="glass-card rounded-2xl p-8">
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
              <div className="glass-card rounded-2xl p-8">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  {t("whatsapp.title")}
                </h3>
                <p className="mb-6 text-sm text-foreground/60">
                  {t("whatsapp.description")}
                </p>
                <a
                  href="https://wa.me/96566565517"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
