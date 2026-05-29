import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { games } from "@/catalog/games";
import { GameCard } from "@/components/catalog/GameCard";
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
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: `/${locale}`,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8">
      <section className="space-y-3 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("home.heroTitle")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("home.heroTagline")}</p>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("home.gamesHeading")}
          </h2>
          <p className="text-muted-foreground">{t("home.gamesSubheading")}</p>
        </div>
        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <li key={game.id}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
