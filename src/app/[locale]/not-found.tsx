"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="dot-matrix absolute inset-0" />
      <div className="aurora-blob" style={{ width: 220, height: 220, background: "rgba(120, 70, 255, 0.08)", top: "20%", left: "-40px" }} />
      <div className="aurora-blob" style={{ width: 180, height: 180, background: "rgba(0, 168, 132, 0.06)", bottom: "10%", right: "-20px", animationDelay: "-6s" }} />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-8xl font-bold sm:text-9xl"
          style={{ color: "rgba(0, 168, 132, 0.15)" }}
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-2xl font-bold sm:text-3xl"
        >
          {isArabic ? "الصفحة غير موجودة" : "Page not found"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-foreground/60"
        >
          {isArabic
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you’re looking for doesn’t exist or has been moved."}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {isArabic ? "الرئيسية" : "Go home"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
