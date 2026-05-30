"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { GameEndAnimation } from "@/components/game-end";
import type { GameResolveProps } from "@/core/game-shell";

import { getTruthOrDareState } from "../types";

export function TruthOrDareResolveView({
  session,
  onRematch,
  onExit,
}: GameResolveProps) {
  const t = useTranslations("truthOrDare.resolve");
  const state = getTruthOrDareState(session.secrets);

  if (!state) {
    return null;
  }

  return (
    <div className="space-y-6">
      <GameEndAnimation variant="win">
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">{t("complete")}</p>
          <p className="text-muted-foreground">
            {t("summary", {
              truths: state.truthsPlayed,
              dares: state.daresPlayed,
            })}
          </p>
        </div>
      </GameEndAnimation>

      <ul className="space-y-2">
        {session.players.map((player) => (
          <li
            key={player.id}
            className="flex items-center justify-between rounded-xl border px-4 py-3"
          >
            <span className="font-medium">{player.name}</span>
            <span className="text-muted-foreground text-sm">
              {t("skips", {
                count: state.skipCountsByPlayerId[player.id] ?? 0,
              })}
            </span>
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
