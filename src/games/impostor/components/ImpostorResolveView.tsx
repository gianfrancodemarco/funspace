"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { GameEndAnimation } from "@/components/game-end";
import type { GameResolveProps } from "@/core/game-shell";

import { getImpostorState, type ImpostorRole } from "../types";

function roleLabelKey(role: ImpostorRole): "civilian" | "impostor" | "spy" {
  return role;
}

export function ImpostorResolveView({
  session,
  onRematch,
  onExit,
}: GameResolveProps) {
  const t = useTranslations("impostor.resolve");
  const tRoles = useTranslations("impostor.roles");
  const state = getImpostorState(session.secrets);

  if (!state) {
    return null;
  }

  const winnerKey =
    state.winner === "impostors" ? "impostorsWin" : "civiliansWin";

  return (
    <div className="space-y-6">
      <GameEndAnimation variant="win">
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">{t(winnerKey)}</p>
          <p className="text-muted-foreground">
            {t("words", {
              crew: state.wordPair.crewWord,
              spy: state.wordPair.spyWord,
            })}
          </p>
        </div>
      </GameEndAnimation>

      <ul className="space-y-2">
        {session.players.map((player) => {
          const role = state.roles[player.id];
          const wasEliminated = state.eliminatedPlayerIds.includes(player.id);

          return (
            <li
              key={player.id}
              className="flex items-center justify-between rounded-xl border px-4 py-3"
            >
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-muted-foreground text-sm">
                  {tRoles(roleLabelKey(role))}
                  {wasEliminated ? ` · ${t("eliminated")}` : ` · ${t("survived")}`}
                </p>
              </div>
              {role === "civilian" && (
                <span className="text-sm font-medium">{state.wordPair.crewWord}</span>
              )}
              {role === "spy" && (
                <span className="text-sm font-medium">{state.wordPair.spyWord}</span>
              )}
            </li>
          );
        })}
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

export function renderImpostorRevealSecret(
  session: GameResolveProps["session"],
  playerId: string,
  t: (key: string, values?: Record<string, string>) => string,
): ReactNode {
  const state = getImpostorState(session.secrets);
  if (!state) {
    return null;
  }

  const role = state.roles[playerId];
  if (role === "impostor") {
    return (
      <div className="space-y-2">
        <p className="text-xl font-bold">{t("impostor.reveal.impostorTitle")}</p>
        <p className="text-muted-foreground">{t("impostor.reveal.impostorMessage")}</p>
      </div>
    );
  }

  if (role === "spy") {
    return (
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">{t("impostor.reveal.spyLabel")}</p>
        <p className="text-3xl font-bold">{state.wordPair.spyWord}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">{t("impostor.reveal.crewLabel")}</p>
      <p className="text-3xl font-bold">{state.wordPair.crewWord}</p>
    </div>
  );
}
