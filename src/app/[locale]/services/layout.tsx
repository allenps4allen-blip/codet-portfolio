import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subheading"),
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const services = [
    {
      "@type": "Service",
      name: t("website.title"),
      description: t("website.description"),
      provider: { "@type": "Organization", name: "CODET" },
      areaServed: "KW",
      offers: {
        "@type": "Offer",
        price: "79",
        priceCurrency: "KWD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "KWD",
          unitText: "setup",
        },
      },
    },
    {
      "@type": "Service",
      name: t("aiAgents.title"),
      description: t("aiAgents.description"),
      provider: { "@type": "Organization", name: "CODET" },
      areaServed: "KW",
      offers: {
        "@type": "Offer",
        price: "49",
        priceCurrency: "KWD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "49",
          priceCurrency: "KWD",
          unitText: "month",
          referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
        },
      },
    },
    {
      "@type": "Service",
      name: t("automations.title"),
      description: t("automations.description"),
      provider: { "@type": "Organization", name: "CODET" },
      areaServed: "KW",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: service,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
