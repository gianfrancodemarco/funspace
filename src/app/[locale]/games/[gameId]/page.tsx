import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { GamePageClient } from "@/components/game-shell/GamePageClient";
import { routing } from "@/i18n/routing";
import { getAllRegisteredGameIds, getGameById } from "@/games/registry";
import { createPageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllRegisteredGameIds().map((gameId) => ({ locale, gameId })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; gameId: string }>;
}): Promise<Metadata> {
  const { locale, gameId } = await params;
  setRequestLocale(locale);

  const entry = getGameById(gameId);
  if (!entry) {
    return {};
  }

  const t = await getTranslations({ locale });
  const nameKey =
    entry.kind === "playable" ? entry.definition.nameKey : entry.nameKey;

  return createPageMetadata({
    title: `${t(nameKey)} | FunSpace`,
    description: t("metadata.defaultDescription"),
    path: `/${locale}/games/${gameId}`,
    locale,
  });
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ locale: string; gameId: string }>;
}) {
  const { locale, gameId } = await params;
  setRequestLocale(locale);

  const entry = getGameById(gameId);
  if (!entry) {
    notFound();
  }

  return <GamePageClient gameId={gameId} />;
}
