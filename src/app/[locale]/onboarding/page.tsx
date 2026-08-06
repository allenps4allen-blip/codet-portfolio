"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const SERVICES = ["Website Development", "AI Agents & Chatbots", "Automations & Workflows", "Full Package"];
const BUDGETS = ["Under 100 KD", "100–300 KD", "300–500 KD", "500+ KD", "Not sure yet"];
const TIMELINES = ["ASAP", "1–2 weeks", "1 month", "2–3 months", "No rush"];

const text = {
  en: {
    title: "Start Your Project",
    subtitle: "Tell us about your business and goals. We'll get back to you within 24 hours with a tailored proposal.",
    step1: "About You", step2: "Your Project", step3: "Details",
    name: "Full Name", email: "Email", company: "Company / Brand",
    service: "What do you need?", budget: "Budget range", timeline: "Ideal timeline",
    branding: "Do you have existing branding?", yes: "Yes", no: "No, I need branding too",
    channels: "Where should it work?", website: "Website", whatsapp: "WhatsApp", telegram: "Telegram", instagram: "Instagram",
    description: "Tell us more about your project",
    descPlaceholder: "What problem are you solving? What does success look like? Any examples or references?",
    next: "Next", back: "Back", submit: "Submit",
    success: "We got it! We'll reach out within 24 hours.",
    error: "Something went wrong. Try again or WhatsApp us directly.",
  },
  ar: {
    title: "ابدأ مشروعك",
    subtitle: "أخبرنا عن عملك وأهدافك. سنرد عليك خلال ٢٤ ساعة بعرض مخصص.",
    step1: "عنك", step2: "مشروعك", step3: "التفاصيل",
    name: "الاسم الكامل", email: "البريد الإلكتروني", company: "الشركة / العلامة التجارية",
    service: "ماذا تحتاج؟", budget: "الميزانية", timeline: "الجدول الزمني المثالي",
    branding: "هل لديك هوية بصرية؟", yes: "نعم", no: "لا، أحتاج هوية بصرية أيضاً",
    channels: "أين يجب أن يعمل؟", website: "موقع إلكتروني", whatsapp: "واتساب", telegram: "تلغرام", instagram: "إنستغرام",
    description: "أخبرنا المزيد عن مشروعك",
    descPlaceholder: "ما المشكلة التي تحلها؟ كيف يبدو النجاح بالنسبة لك؟",
    next: "التالي", back: "رجوع", submit: "إرسال",
    success: "استلمنا طلبك! سنتواصل معك خلال ٢٤ ساعة.",
    error: "حدث خطأ. حاول مرة أخرى أو تواصل معنا عبر واتساب.",
  },
};

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} type="button" className={`rounded-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
      selected ? "bg-foreground text-background" : "border border-white/10 text-foreground/50 hover:text-foreground/80 hover:border-white/20"
    }`}>
      {label}
    </button>
  );
}

export default function OnboardingPage() {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const t = locale === "ar" ? text.ar : text.en;
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [branding, setBranding] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const toggleChannel = (ch: string) => setChannels((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]);

  const canNext = step === 0 ? name && email : step === 1 ? !!service : true;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, service, budget, timeline, branding, channels: channels.join(", "), description }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const steps = [t.step1, t.step2, t.step3];

  if (status === "success") {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <FadeIn>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t.success}</h2>
            <Link href="/" className="mt-6 inline-block text-sm text-foreground/40 hover:text-foreground/70 transition-colors">
              &larr; {tNav("home")}
            </Link>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12">
        <div className="dot-matrix absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <h1 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-sm text-foreground/50">{t.subtitle}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 pb-24">
        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i <= step ? "bg-foreground text-background" : "border border-white/10 text-foreground/25"
              }`}>
                {i + 1}
              </div>
              <span className={`hidden text-xs sm:inline ${i <= step ? "text-foreground/60" : "text-foreground/20"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-px w-8 ${i < step ? "bg-foreground/30" : "bg-white/[0.06]"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/40">{t.name} *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/20 focus:border-white/[0.15]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/40">{t.email} *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/20 focus:border-white/[0.15]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/40">{t.company}</label>
                  <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/20 focus:border-white/[0.15]" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-xs font-medium text-foreground/40">{t.service} *</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => <Chip key={s} label={s} selected={service === s} onClick={() => setService(s)} />)}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium text-foreground/40">{t.budget}</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => <Chip key={b} label={b} selected={budget === b} onClick={() => setBudget(b)} />)}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium text-foreground/40">{t.timeline}</label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map((tl) => <Chip key={tl} label={tl} selected={timeline === tl} onClick={() => setTimeline(tl)} />)}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-xs font-medium text-foreground/40">{t.branding}</label>
                  <div className="flex gap-2">
                    <Chip label={t.yes} selected={branding === "yes"} onClick={() => setBranding("yes")} />
                    <Chip label={t.no} selected={branding === "no"} onClick={() => setBranding("no")} />
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium text-foreground/40">{t.channels}</label>
                  <div className="flex flex-wrap gap-2">
                    {[{ key: "Website", label: t.website }, { key: "WhatsApp", label: t.whatsapp }, { key: "Telegram", label: t.telegram }, { key: "Instagram", label: t.instagram }].map((ch) => (
                      <Chip key={ch.key} label={ch.label} selected={channels.includes(ch.key)} onClick={() => toggleChannel(ch.key)} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/40">{t.description}</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t.descPlaceholder} rows={5}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/20 focus:border-white/[0.15] resize-none" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="rounded-lg border border-white/[0.08] px-6 py-3 text-sm text-foreground/50 transition-colors hover:text-foreground/80">
              {t.back}
            </button>
          ) : <div />}

          {step < 2 ? (
            <button onClick={() => canNext && setStep(step + 1)} disabled={!canNext}
              className="rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-30">
              {t.next}
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={status === "loading"}
              className="rounded-lg bg-foreground px-8 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50">
              {status === "loading" ? "..." : t.submit}
            </button>
          )}
        </div>

        {status === "error" && <p className="mt-4 text-center text-xs text-red-400">{t.error}</p>}
      </section>
    </>
  );
}
