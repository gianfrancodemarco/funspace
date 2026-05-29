import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PlayerRosterPanel } from "@/components/players/PlayerRosterPanel";
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
    title: `${t("playersTitle")} | FunSpace`,
    description: t("playersDescription"),
    path: `/${locale}/players`,
    locale,
  });
}

export default async function PlayersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PlayerRosterPanel />;
}
