"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { GameEndAnimation } from "@/components/game-end";
import type { GameResolveProps } from "@/core/game-shell";

import { getNeverHaveIEverState, getPromptsShown } from "../types";

export function NeverHaveIEverResolveView({
  session,
  onRematch,
  onExit,
}: GameResolveProps) {
  const t = useTranslations("neverHaveIEver.resolve");
  const state = getNeverHaveIEverState(session.secrets);

  if (!state) {
    return null;
  }

  const promptsPlayed = getPromptsShown(state);

  return (
    <div className="space-y-6">
      <GameEndAnimation variant="win">
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">{t("complete")}</p>
          <p className="text-muted-foreground">
            {t("promptsPlayed", { count: promptsPlayed })}
          </p>
        </div>
      </GameEndAnimation>

      <ul className="space-y-2">
        {session.players.map((player) => (
          <li
            key={player.id}
            className="rounded-xl border px-4 py-3 font-medium"
          >
            {player.name}
          </li>
        ))}
      </ul>

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
