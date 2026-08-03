import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LiveAIWidget from "@/components/LiveAIWidget";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");

  return {
    title: {
      default: `${title} — ${description}`,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL("https://www.codet-kw.com"),
    themeColor: "#0a0a0a",
    openGraph: {
      title,
      description,
      siteName: title,
      locale: locale === "ar" ? "ar_KW" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      viewportFit: "cover",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "CODET",
    description: isArabic
      ? "نرقمن أعمالك — مواقع إلكترونية، وكلاء ذكاء اصطناعي، أتمتة، وسير عمل."
      : "We digitalize your business — websites, AI agents, automations, and workflows.",
    url: "https://www.codet-kw.com",
    telephone: "+96566565517",
    email: "codet.kuwait@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuwait City",
      addressCountry: "KW",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 29.3759, longitude: 47.9774 },
      geoRadius: "500000",
    },
    serviceType: ["Web Development", "AI Agents", "Chatbots", "Workflow Automation"],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: ["https://instagram.com/codet.kw"],
  };

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${notoSansArabic.variable} ${
          isArabic ? "font-arabic" : "font-sans"
        } antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="skip-to-content"
          >
            {isArabic ? "تخطي إلى المحتوى" : "Skip to content"}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <LiveAIWidget />
          <BackToTop />
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
