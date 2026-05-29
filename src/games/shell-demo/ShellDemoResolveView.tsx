"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GameResolveProps } from "@/core/game-shell";

export function ShellDemoResolveView({ onRematch, onExit }: GameResolveProps) {
  const t = useTranslations("gameShell.shellDemo");

  return (
    <div className="space-y-6 text-center">
      <p className="text-2xl font-bold">{t("completeTitle")}</p>
      <p className="text-muted-foreground">{t("completeMessage")}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={onRematch}>
          {t("rematch")}
        </Button>
        <Button size="lg" variant="outline" onClick={onExit}>
          {t("exit")}
        </Button>
      </div>
    </div>
  );
}
