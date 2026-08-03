import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — AI Agent Demo";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "شاهد وكيل الذكاء الاصطناعي أثناء العمل" : "See the AI agent in action",
    isAr
      ? "معاينة محاكاة — سيتم تدريب وكيلك خصيصاً على بيانات عملك"
      : "A simulated preview — your agent will be custom-trained on your data",
    locale
  );
}
