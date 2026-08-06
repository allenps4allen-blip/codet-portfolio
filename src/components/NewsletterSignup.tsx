"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const text = {
  en: { heading: "Stay in the loop", sub: "Get notified when we publish new insights on AI, automation, and web development.", placeholder: "your@email.com", button: "Subscribe", success: "You're in! We'll notify you of new posts.", error: "Something went wrong. Try again." },
  ar: { heading: "ابقَ على اطلاع", sub: "احصل على إشعار عند نشر مقالات جديدة حول الذكاء الاصطناعي والأتمتة وتطوير المواقع.", placeholder: "بريدك@الإلكتروني.com", button: "اشترك", success: "تم! سنعلمك بالمقالات الجديدة.", error: "حدث خطأ. حاول مرة أخرى." },
};

export default function NewsletterSignup() {
  const locale = useLocale();
  const t = locale === "ar" ? text.ar : text.en;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="glass-card rounded-2xl border border-white/[0.06] p-6 text-center sm:p-12">
        <h3 className="text-lg font-semibold text-foreground sm:text-xl">{t.heading}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground/40">{t.sub}</p>

        {status === "success" ? (
          <p className="mt-6 text-sm font-medium text-green-400">{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:mx-auto sm:max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              required
              className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/25 focus:border-white/[0.15]"
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="whitespace-nowrap rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "..." : t.button}
            </button>
          </form>
        )}
        {status === "error" && <p className="mt-3 text-xs text-red-400">{t.error}</p>}
      </div>
    </section>
  );
}
