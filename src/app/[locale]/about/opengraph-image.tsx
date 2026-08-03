import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — About";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "عن CODET" : "About CODET",
    isAr
      ? "وكالة رقمية مقرها الخليج، نساعد الشركات على التحديث من خلال التقنية"
      : "A digital agency helping businesses modernize through technology",
    locale
  );
}
