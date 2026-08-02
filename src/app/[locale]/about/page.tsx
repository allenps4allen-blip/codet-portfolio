"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const valueIds = ["1", "2", "3", "4"] as const;

const valueIcons = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652 9.027 9.027 0 0 1-1.652 1.306m2.958-2.958a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m0 0-3.448-4.138m0 0a9.028 9.028 0 0 0-1.652 1.306A9.028 9.028 0 0 0 4.33 7.288m0 0 4.138 3.448M4.33 7.288A9.014 9.014 0 0 0 4.33 16.712m4.138-5.976a3.765 3.765 0 0 0 0 2.528m0 0c.181.506.475.982.88 1.388a3.736 3.736 0 0 0 1.388.88m-2.268-2.268L4.33 16.712m0 0a9.027 9.027 0 0 0 1.306 1.652 9.028 9.028 0 0 0 1.652 1.306m0 0-1.18 1.18m0 0-.38.38" />
  </svg>,
];

export default function AboutPage() {
  const t = useTranslations("about");

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

      {/* Stats */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {(["projects", "clients", "countries"] as const).map((key, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl font-bold sm:text-3xl md:text-5xl">
                    {t(`stats.${key}`)}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-wider text-foreground/50 sm:text-xs md:text-sm">
                    {t(`stats.${key}Label`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("story.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              {t("story.p1")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {t("story.p2")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
              {t("values.title")}
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {valueIds.map((id, i) => (
              <FadeIn key={id} delay={i * 0.1} scale>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-foreground/80">
                    {valueIcons[i]}
                  </div>
                  <h3 className="text-lg font-semibold">
                    {t(`values.${id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {t(`values.${id}.description`)}
                  </p>
                </div>
              </FadeIn>
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
          <FadeIn delay={0.2}>
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
