"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GamePlayProps } from "@/core/game-shell";
import { getPlayerName, useGameShell } from "@/core/game-shell";

import { eliminatePlayer } from "../engine";
import {
  getImpostorState,
  IMPOSTOR_STATE_KEY,
  type ImpostorGameState,
} from "../types";

export function ImpostorPlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("impostor.play");
  const { send } = useGameShell();
  const initialState = getImpostorState(session.secrets);
  const [state, setState] = useState<ImpostorGameState | null>(initialState);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [step, setStep] = useState<"playing" | "confirm">("playing");

  if (!state) {
    return null;
  }

  function handleEliminateClick(playerId: string) {
    setSelectedPlayerId(playerId);
    setStep("confirm");
  }

  function handleConfirmElimination() {
    if (!selectedPlayerId || !state) {
      return;
    }

    const nextState = eliminatePlayer(state, selectedPlayerId);
    setState(nextState);
    send({
      type: "PATCH_SECRETS",
      secrets: { [IMPOSTOR_STATE_KEY]: nextState },
    });
    setSelectedPlayerId(null);
    setStep("playing");

    if (nextState.winner) {
      onComplete();
    }
  }

  if (step === "confirm" && selectedPlayerId) {
    return (
      <div className="space-y-6 text-center">
        <p className="text-xl font-semibold">
          {t("confirmElimination", {
            name: getPlayerName(session, selectedPlayerId),
          })}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={handleConfirmElimination}>
            {t("confirmButton")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setSelectedPlayerId(null);
              setStep("playing");
            }}
          >
            {t("cancelButton")}
          </Button>
        </div>
      </div>
    );
  }

  const startingPlayerId = session.shuffledOrder[0];
  const startingPlayerName = getPlayerName(session, startingPlayerId);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">{t("instructions")}</p>
        <p className="text-sm font-medium">
          {t("startsFirst", { name: startingPlayerName })}
        </p>
        <p className="text-muted-foreground text-sm">
          {t("aliveCount", { count: state.alivePlayerIds.length })}
        </p>
      </div>

      <ul className="space-y-2">
        {state.alivePlayerIds.map((playerId) => (
          <li key={playerId}>
            <button
              type="button"
              onClick={() => handleEliminateClick(playerId)}
              className="hover:bg-muted/50 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors"
            >
              <span className="font-medium">{getPlayerName(session, playerId)}</span>
              <span className="text-muted-foreground text-sm">{t("eliminate")}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
