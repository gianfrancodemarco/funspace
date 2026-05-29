"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GameResolveProps } from "@/core/game-shell";

import { getHangmanState } from "../types";

export function HangmanResolveView({
  session,
  onRematch,
  onExit,
}: GameResolveProps) {
  const t = useTranslations("hangman.resolve");
  const state = getHangmanState(session.secrets);

  if (!state) {
    return null;
  }

  const outcomeKey = state.status === "won" ? "won" : "lost";

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-2xl font-bold">{t(outcomeKey)}</p>
        <p className="text-muted-foreground">
          {t("wordReveal", { word: state.word })}
        </p>
      </div>

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
