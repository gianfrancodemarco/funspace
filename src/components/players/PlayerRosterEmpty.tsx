"use client";

import { useTranslations } from "next-intl";

export function PlayerRosterEmpty() {
  const t = useTranslations("players");

  return (
    <div className="rounded-2xl border border-dashed border-primary/20 bg-muted/30 px-6 py-10 text-center">
      <h2 className="text-lg font-semibold">{t("emptyTitle")}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {t("emptyDescription")}
      </p>
    </div>
  );
}
