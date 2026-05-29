import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return createPageMetadata({
    title: `${t("aboutTitle")} | FunSpace`,
    description: t("aboutDescription"),
    path: `/${locale}/about`,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{t("about.title")}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("about.description")}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("about.features.title")}</h2>
        <ul className="text-muted-foreground list-disc space-y-2 pl-5">
          <li>{t("about.features.catalog")}</li>
          <li>{t("about.features.singlePhone")}</li>
          <li>{t("about.features.noSignup")}</li>
        </ul>
      </section>
    </main>
  );
}
