import { generateOGImage, size, contentType } from "@/lib/og-image";

export { size, contentType };
export const runtime = "edge";
export const alt = "CODET — We digitalize your business";

export default async function Image({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return generateOGImage(
    isAr ? "نرقمن أعمالك" : "We digitalize your business",
    isAr
      ? "مواقع إلكترونية، وكلاء ذكاء اصطناعي، أتمتة، وسير عمل"
      : "Websites, AI agents, automations, and workflows",
    locale
  );
}
