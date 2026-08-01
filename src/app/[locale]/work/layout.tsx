import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return {
    title: t("title"),
    description: t("subheading"),
    alternates: { canonical: `/${locale}/work` },
  };
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
