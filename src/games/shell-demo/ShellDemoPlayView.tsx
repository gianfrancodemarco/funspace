"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GamePlayProps } from "@/core/game-shell";

export function ShellDemoPlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("gameShell.shellDemo");

  return (
    <div className="space-y-6 text-center">
      <p className="text-muted-foreground text-lg">{t("playMessage")}</p>
      <p className="text-sm">
        {t("playerCount", { count: session.players.length })}
      </p>
      <Button size="lg" onClick={onComplete}>
        {t("finishPlay")}
      </Button>
    </div>
  );
}
