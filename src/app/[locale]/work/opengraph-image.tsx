import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — Our Work";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "أعمالنا" : "Our Work",
    isAr
      ? "مجموعة مختارة من المشاريع التي أنجزناها"
      : "A selection of projects we've delivered",
    locale
  );
}
