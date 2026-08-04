import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("title"),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const sections = [1, 2, 3, 4, 5, 6, 7] as const;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20 pt-32 sm:pt-40">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-10 text-sm text-foreground/50">{t("lastUpdated")}</p>
      <p className="mb-8 leading-relaxed text-foreground/70">{t("intro")}</p>

      {sections.map((n) => (
        <section key={n} className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            {t(`section${n}Title`)}
          </h2>
          <p className="leading-relaxed text-foreground/70">
            {t(`section${n}Text`)}
          </p>
          {n === 3 && (
            <ul className="mt-3 list-disc space-y-1 ps-6 text-foreground/70">
              <li>{t("service1")}</li>
              <li>{t("service2")}</li>
              <li>{t("service3")}</li>
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
