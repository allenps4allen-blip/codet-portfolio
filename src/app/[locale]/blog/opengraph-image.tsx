import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — Blog";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "المدونة" : "Blog",
    isAr
      ? "رؤى وأدلة ودراسات حالة حول الذكاء الاصطناعي وتطوير المواقع"
      : "Insights, guides, and case studies on AI and web development",
    locale
  );
}
