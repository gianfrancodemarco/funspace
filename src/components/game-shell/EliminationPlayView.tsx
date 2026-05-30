"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { PlayerSecretFlipCard } from "@/components/secret-delivery/PlayerSecretFlipCard";
import type { GamePlayProps } from "@/core/game-shell";
import { getPlayerName, useGameShell } from "@/core/game-shell";

type EliminationGameState = {
  alivePlayerIds: string[];
  winner?: unknown;
};

type EliminationPlayViewProps<TState extends EliminationGameState> = {
  session: GamePlayProps["session"];
  onComplete: GamePlayProps["onComplete"];
  state: TState;
  stateKey: string;
  playNamespace: "impostor.play" | "questionImpostor.play";
  eliminatePlayer: (state: TState, playerId: string) => TState;
  renderRevealSecret: (
    session: GamePlayProps["session"],
    playerId: string,
    t: (key: string, values?: Record<string, string>) => string,
  ) => ReactNode;
};

type PlayStep = "playing" | "confirm" | "checkRole";

export function EliminationPlayView<TState extends EliminationGameState>({
  session,
  onComplete,
  state: initialState,
  stateKey,
  playNamespace,
  eliminatePlayer,
  renderRevealSecret,
}: EliminationPlayViewProps<TState>) {
  const t = useTranslations(playNamespace);
  const tRoot = useTranslations();
  const { send } = useGameShell();
  const [state, setState] = useState(initialState);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [step, setStep] = useState<PlayStep>("playing");

  function handleEliminateClick(playerId: string) {
    setSelectedPlayerId(playerId);
    setStep("confirm");
  }

  function handleCheckRoleClick(playerId: string) {
    setSelectedPlayerId(playerId);
    setStep("checkRole");
  }

  function handleConfirmElimination() {
    if (!selectedPlayerId) {
      return;
    }

    const nextState = eliminatePlayer(state, selectedPlayerId);
    setState(nextState);
    send({
      type: "PATCH_SECRETS",
      secrets: { [stateKey]: nextState },
    });
    setSelectedPlayerId(null);
    setStep("playing");

    if (nextState.winner) {
      onComplete();
    }
  }

  if (step === "checkRole" && selectedPlayerId) {
    return (
      <PlayerSecretFlipCard
        key={selectedPlayerId}
        playerName={getPlayerName(session, selectedPlayerId)}
        secret={renderRevealSecret(session, selectedPlayerId, tRoot)}
        onDone={() => {
          setSelectedPlayerId(null);
          setStep("playing");
        }}
        doneLabel={t("backToGame")}
        handoffLabel={t("checkRoleHandoff", {
          name: getPlayerName(session, selectedPlayerId),
        })}
      />
    );
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
          <Button size="lg" variant="destructive" onClick={handleConfirmElimination}>
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
          <li
            key={playerId}
            className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
          >
            <span className="font-medium">{getPlayerName(session, playerId)}</span>
            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleCheckRoleClick(playerId)}
              >
                {t("checkRole")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => handleEliminateClick(playerId)}
              >
                {t("eliminate")}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
