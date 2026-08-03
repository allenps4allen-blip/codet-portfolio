import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo" });

  const title = t("heading");
  const description = t("subtitle");

  return {
    title,
    description,
    openGraph: {
      title: `CODET — ${title}`,
      description,
      locale: locale === "ar" ? "ar_KW" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `CODET — ${title}`,
      description,
    },
  };
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
