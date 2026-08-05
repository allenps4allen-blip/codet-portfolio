import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "ابدأ مشروعك" : "Start Your Project",
    description: isAr
      ? "أخبرنا عن مشروعك واحصل على عرض مخصص خلال ٢٤ ساعة"
      : "Tell us about your project and get a tailored proposal within 24 hours",
    alternates: { canonical: `/${locale}/onboarding` },
  };
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
