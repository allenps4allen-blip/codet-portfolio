"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: string;
  role: { en: string; ar: string };
  rating: number;
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        if (d.testimonials && d.testimonials.length > 0) {
          setTestimonials(d.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  // Hardcoded fallback from translations when Redis is empty
  const fallbackKeys = [1, 2, 3] as const;
  const useFallback = testimonials.length === 0;
  const count = useFallback ? fallbackKeys.length : testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "#050505" }}>
      <div className="dot-matrix absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[400px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse, rgba(0, 168, 132, 0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <FadeIn>
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-foreground/50">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-16 flex flex-col items-center">
          <div className="relative w-full" style={{ minHeight: 200 }}>
            {Array.from({ length: count }).map((_, idx) => {
              let quote: string, name: string, role: string, rating: number;

              if (useFallback) {
                const key = fallbackKeys[idx];
                quote = t(`items.${key}.quote`);
                name = t(`items.${key}.name`);
                role = t(`items.${key}.role`);
                rating = parseInt(t(`items.${key}.rating`));
              } else {
                const item = testimonials[idx];
                quote = locale === "ar" && item.quote.ar ? item.quote.ar : item.quote.en;
                name = item.name;
                role = locale === "ar" && item.role.ar ? item.role.ar : item.role.en;
                rating = item.rating;
              }

              return (
                <div
                  key={idx}
                  style={{
                    position: idx === active ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: idx === active ? 1 : 0,
                    transform: idx === active ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: idx === active ? "auto" : "none",
                  }}
                >
                  <div className="glass-card rounded-2xl px-8 py-8 text-center sm:px-12">
                    <div className="flex justify-center gap-1 mb-5">
                      {Array.from({ length: rating }).map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#00a884">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-base leading-relaxed text-foreground/80 sm:text-lg" style={{ fontStyle: "italic" }}>
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-foreground">{name}</p>
                      <p className="mt-1 text-xs text-foreground/40">{role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-2">
            {Array.from({ length: count }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className="transition-all duration-300"
                aria-label={`Testimonial ${idx + 1}`}
                style={{
                  width: idx === active ? 24 : 8, height: 8, borderRadius: 4,
                  border: "none", cursor: "pointer",
                  background: idx === active ? "#00a884" : "rgba(255,255,255,0.15)",
                  padding: "18px 0", backgroundClip: "content-box",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
