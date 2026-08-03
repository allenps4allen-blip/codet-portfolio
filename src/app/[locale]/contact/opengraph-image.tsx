import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — Contact";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "تواصل معنا" : "Get in Touch",
    isAr
      ? "لديك مشروع في ذهنك؟ نحب أن نسمع عنه"
      : "Have a project in mind? We'd love to hear about it",
    locale
  );
}
