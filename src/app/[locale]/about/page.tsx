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
    locale,
  });
}

const featureColors = ["bg-primary", "bg-accent", "bg-violet-400"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const features = [
    t("about.features.catalog"),
    t("about.features.singlePhone"),
    t("about.features.noSignup"),
  ];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
      <section className="rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-background space-y-4 px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          {t("about.title")}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          {t("about.description")}
        </p>
      </section>

      <section className="space-y-4 sm:space-y-5">
        <h2 className="text-xl font-bold sm:text-2xl">
          {t("about.features.title")}
        </h2>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={feature}
              className="text-muted-foreground flex items-start gap-3 text-base leading-relaxed"
            >
              <span
                className={`mt-2 size-2 shrink-0 rounded-full ${featureColors[index]}`}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
