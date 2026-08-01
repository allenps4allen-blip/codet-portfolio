"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function toggleLocale() {
    const nextLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={locale === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      className="relative flex h-8 items-center rounded-full border border-white/20 bg-white/5 px-1 text-xs font-medium tracking-wide transition-colors duration-300 hover:border-white/40"
    >
      <span
        className={`relative z-10 px-2 py-1 transition-colors duration-300 ${
          locale === "en" ? "text-background" : "text-foreground/60"
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 px-2 py-1 transition-colors duration-300 ${
          locale === "ar" ? "text-background" : "text-foreground/60"
        }`}
      >
        AR
      </span>
      <span
        className="absolute top-1 h-6 w-9 rounded-full bg-foreground transition-all duration-300"
        style={{
          insetInlineStart: locale === "ar" ? "calc(100% - 2.5rem)" : "0.25rem",
        }}
      />
    </button>
  );
}
