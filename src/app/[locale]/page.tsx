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
    locale,
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
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 sm:gap-12 sm:px-6 sm:py-10">
      <section className="rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-background px-6 py-10 text-center sm:px-10 sm:py-12 sm:text-left">
        <h1 className="bg-gradient-to-r from-primary via-violet-500 to-accent bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          {t("home.heroTitle")}
        </h1>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg">
          {t("home.heroTagline")}
        </p>
      </section>

      <section className="space-y-5 sm:space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("home.gamesHeading")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("home.gamesSubheading")}
          </p>
        </div>
        <ul className="grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
