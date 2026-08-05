"use client";

import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";

const projects: Record<string, { key: string; color: string; challenge: { en: string; ar: string }; solution: { en: string; ar: string }; results: { en: string; ar: string }; techStack: string[] }> = {
  "saas-analytics-dashboard": {
    key: "1", color: "#6366f1",
    challenge: {
      en: "The client needed a real-time analytics platform for their fintech product but lacked the engineering capacity to build one from scratch. Existing solutions were too generic and didn't fit their compliance requirements.",
      ar: "احتاج العميل إلى منصة تحليلات في الوقت الحقيقي لمنتجهم المالي لكن لم يكن لديهم القدرة الهندسية لبنائها من الصفر."
    },
    solution: {
      en: "We built a full-stack analytics dashboard with real-time data visualization, role-based user management, and automated PDF reporting. The system processes thousands of transactions per second with sub-200ms response times.",
      ar: "بنينا لوحة تحليلات متكاملة مع تصور بيانات في الوقت الحقيقي وإدارة مستخدمين وتقارير PDF آلية."
    },
    results: {
      en: "40% reduction in time-to-insight for the analytics team. 99.9% uptime over 6 months. The platform now serves 500+ daily active users and processes 2M+ events daily.",
      ar: "انخفاض بنسبة ٤٠٪ في وقت الحصول على الرؤى. وقت تشغيل ٩٩.٩٪ على مدى ٦ أشهر."
    },
    techStack: ["Next.js", "PostgreSQL", "Redis", "Chart.js", "Vercel"],
  },
  "ai-customer-support-agent": {
    key: "2", color: "#8b5cf6",
    challenge: {
      en: "A retail company was drowning in 200+ daily customer support tickets across WhatsApp and their website. Response times averaged 3 hours, and customer satisfaction was dropping.",
      ar: "كانت شركة تجزئة تغرق في أكثر من ٢٠٠ تذكرة دعم يومية. كان متوسط وقت الاستجابة ٣ ساعات."
    },
    solution: {
      en: "We built a multilingual AI agent trained on 10,000+ historical support tickets, deployed across WhatsApp and web chat. The agent handles booking, order tracking, FAQs, and escalates complex issues to human agents automatically.",
      ar: "بنينا وكيل ذكاء اصطناعي متعدد اللغات مدرب على أكثر من ١٠٬٠٠٠ تذكرة دعم سابقة."
    },
    results: {
      en: "85% of inquiries resolved without human intervention. Average response time dropped from 3 hours to under 5 seconds. Customer satisfaction improved by 32%.",
      ar: "تم حل ٨٥٪ من الاستفسارات بدون تدخل بشري. انخفض متوسط وقت الاستجابة من ٣ ساعات إلى أقل من ٥ ثوانٍ."
    },
    techStack: ["GPT-4", "WhatsApp API", "Node.js", "Redis", "n8n"],
  },
  "e-commerce-platform": {
    key: "3", color: "#00a884",
    challenge: {
      en: "A growing retail brand needed a high-conversion online store with a custom product configurator. Their previous platform was slow, had poor mobile UX, and couldn't handle traffic spikes during sales.",
      ar: "احتاجت علامة تجارية متنامية إلى متجر إلكتروني عالي التحويل مع أداة تخصيص المنتجات."
    },
    solution: {
      en: "We designed and built a blazing-fast e-commerce platform with a custom 3D product configurator, integrated payment gateway, and automated inventory management synced with their physical stores.",
      ar: "صممنا وبنينا منصة تجارة إلكترونية فائقة السرعة مع أداة تخصيص منتجات ثلاثية الأبعاد."
    },
    results: {
      en: "4.2% conversion rate (up from 1.8%). Page load time under 1.5 seconds. 60% increase in average order value through the configurator upsells.",
      ar: "معدل تحويل ٤.٢٪ (ارتفاعاً من ١.٨٪). وقت تحميل الصفحة أقل من ١.٥ ثانية."
    },
    techStack: ["Next.js", "Stripe", "Three.js", "Sanity CMS", "Vercel"],
  },
  "lead-generation-workflow": {
    key: "4", color: "#f59e0b",
    challenge: {
      en: "A B2B services company was manually prospecting on LinkedIn, entering leads into spreadsheets, and sending follow-up emails one at a time. The process consumed 15+ hours per week.",
      ar: "كانت شركة خدمات B2B تبحث يدوياً عن عملاء محتملين على LinkedIn. كانت العملية تستهلك أكثر من ١٥ ساعة أسبوعياً."
    },
    solution: {
      en: "We built an end-to-end automation connecting LinkedIn prospecting, CRM enrichment, and personalized email sequences. The system automatically qualifies leads, scores them, and routes hot prospects to the sales team.",
      ar: "بنينا أتمتة شاملة تربط البحث على LinkedIn وإثراء CRM وتسلسلات البريد الإلكتروني المخصصة."
    },
    results: {
      en: "3x increase in qualified leads per month. 12 hours saved per week. 28% email open rate on automated sequences (vs 12% industry average).",
      ar: "زيادة ٣ أضعاف في العملاء المؤهلين شهرياً. توفير ١٢ ساعة أسبوعياً."
    },
    techStack: ["n8n", "LinkedIn API", "HubSpot", "Resend", "Google Sheets"],
  },
  "restaurant-ordering-system": {
    key: "5", color: "#ec4899",
    challenge: {
      en: "A restaurant chain with 5 locations needed a unified ordering system that connected online orders, kitchen displays, delivery tracking, and POS — their existing patchwork of tools was causing order errors.",
      ar: "احتاجت سلسلة مطاعم بخمسة فروع إلى نظام طلبات موحد يربط الطلبات الإلكترونية وشاشات المطبخ."
    },
    solution: {
      en: "We built a multi-tenant ordering platform with real-time kitchen display system, driver tracking with live maps, automated receipt generation, and POS integration for walk-in orders.",
      ar: "بنينا منصة طلبات متعددة المستأجرين مع نظام عرض مطبخ في الوقت الحقيقي وتتبع السائقين."
    },
    results: {
      en: "500+ orders processed daily across all locations. 99.7% uptime. Order errors reduced by 80%. Average order processing time dropped from 4 minutes to 45 seconds.",
      ar: "أكثر من ٥٠٠ طلب يومياً عبر جميع المواقع. وقت تشغيل ٩٩.٧٪. انخفاض أخطاء الطلبات بنسبة ٨٠٪."
    },
    techStack: ["Next.js", "Socket.io", "PostgreSQL", "Google Maps API", "Thermal Printer API"],
  },
  "document-processing-pipeline": {
    key: "6", color: "#06b6d4",
    challenge: {
      en: "An accounting firm was manually extracting data from 5,000+ invoices per month — a tedious process involving multiple data entry clerks and frequent errors that caused reconciliation nightmares.",
      ar: "كانت شركة محاسبة تستخرج يدوياً بيانات من أكثر من ٥٬٠٠٠ فاتورة شهرياً."
    },
    solution: {
      en: "We built an AI-powered document processing pipeline using OCR and LLMs to automatically extract, classify, and validate invoice data. The system handles multiple formats, flags anomalies, and exports directly to their accounting software.",
      ar: "بنينا خط أنابيب معالجة مستندات مدعوم بالذكاء الاصطناعي لاستخراج وتصنيف والتحقق من بيانات الفواتير تلقائياً."
    },
    results: {
      en: "98% extraction accuracy. Processing time reduced from 3 days to 2 hours for monthly batch. 2 data entry positions redeployed to higher-value audit work.",
      ar: "دقة استخراج ٩٨٪. انخفض وقت المعالجة من ٣ أيام إلى ساعتين للدفعة الشهرية."
    },
    techStack: ["Python", "Tesseract OCR", "GPT-4", "FastAPI", "PostgreSQL"],
  },
};

const slugs = Object.keys(projects);

export default function CaseStudyPage() {
  const params = useParams();
  const t = useTranslations("work");
  const locale = useLocale();
  const slug = params.slug as string;
  const project = projects[slug];

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-2xl font-bold text-foreground/80">Project not found</h1>
        <Link href="/work" className="text-sm text-foreground/50 hover:text-foreground transition-colors">&larr; Back to Work</Link>
      </div>
    );
  }

  const title = t(`projects.${project.key}.title`);
  const category = t(`projects.${project.key}.category`);
  const description = t(`projects.${project.key}.description`);
  const challenge = locale === "ar" ? project.challenge.ar : project.challenge.en;
  const solution = locale === "ar" ? project.solution.ar : project.solution.en;
  const results = locale === "ar" ? project.results.ar : project.results.en;

  const currentIndex = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const nextKey = projects[nextSlug].key;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="dot-matrix absolute inset-0" />
        <div className="aurora-blob" style={{ width: 300, height: 300, background: `${project.color}15`, top: "20px", right: "-60px" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeIn>
            <Link href="/work" className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/40 transition-colors hover:text-foreground/70">&larr; {t("heading")}</Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${project.color}20`, color: project.color }}>
              {category}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 max-w-2xl text-lg text-foreground/50">{description}</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-6 sm:mx-12" />

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <FadeIn>
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/40">
                <span className="inline-block h-px w-6" style={{ background: project.color }} />
                {locale === "ar" ? "التحدي" : "Challenge"}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/60">{challenge}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/40">
                <span className="inline-block h-px w-6" style={{ background: project.color }} />
                {locale === "ar" ? "الحل" : "Solution"}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/60">{solution}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground/40">
                <span className="inline-block h-px w-6" style={{ background: project.color }} />
                {locale === "ar" ? "النتائج" : "Results"}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/60">{results}</p>
            </div>
          </FadeIn>
        </div>

        {/* Tech stack */}
        <FadeIn delay={0.3}>
          <div className="mt-16 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/30">
              {locale === "ar" ? "التقنيات المستخدمة" : "Tech Stack"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-foreground/50">{tech}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA + Next project */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          <FadeIn>
            <Link href="/onboarding" className="glass-card flex items-center justify-between rounded-xl border border-white/[0.06] p-6 transition-all hover:border-white/[0.12]">
              <div>
                <p className="text-sm font-semibold text-foreground">{locale === "ar" ? "مشروع مشابه؟" : "Similar project?"}</p>
                <p className="mt-1 text-xs text-foreground/35">{locale === "ar" ? "ابدأ مشروعك" : "Start your project"}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/25"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href={`/work/${nextSlug}`} className="glass-card flex items-center justify-between rounded-xl border border-white/[0.06] p-6 transition-all hover:border-white/[0.12]">
              <div>
                <p className="text-xs text-foreground/25">{locale === "ar" ? "المشروع التالي" : "Next project"}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{t(`projects.${nextKey}.title`)}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/25"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
