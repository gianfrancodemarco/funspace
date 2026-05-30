"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GamePlayProps } from "@/core/game-shell";
import { useGameShell } from "@/core/game-shell";
import { cn } from "@/lib/utils";

import {
  advancePrompt,
  choosePromptType,
  endSession,
  getCurrentPrompt,
  isTypeAvailable,
  selectPlayer,
} from "../engine";
import type { PromptType } from "../types";
import {
  getTruthOrDareState,
  TRUTH_OR_DARE_STATE_KEY,
  type TruthOrDareGameState,
} from "../types";

export function TruthOrDarePlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("truthOrDare.play");
  const { send } = useGameShell();
  const initialState = getTruthOrDareState(session.secrets);
  const [state, setState] = useState<TruthOrDareGameState | null>(initialState);

  const patchState = useCallback(
    (nextState: TruthOrDareGameState, complete = false) => {
      send({
        type: "PATCH_SECRETS",
        secrets: { [TRUTH_OR_DARE_STATE_KEY]: nextState },
      });
      if (complete) {
        onComplete();
      }
    },
    [onComplete, send],
  );

  const handleChooseType = useCallback(
    (type: PromptType) => {
      setState((current) => {
        if (!current) {
          return current;
        }
        const nextState = choosePromptType(current, type);
        patchState(nextState);
        return nextState;
      });
    },
    [patchState],
  );

  const handleSelectPlayer = useCallback(
    (playerId: string) => {
      setState((current) => {
        if (!current) {
          return current;
        }
        const nextPlayerId =
          current.selectedPlayerId === playerId ? undefined : playerId;
        const nextState = selectPlayer(current, nextPlayerId);
        patchState(nextState);
        return nextState;
      });
    },
    [patchState],
  );

  const handleNext = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const { state: nextState, result } = advancePrompt(current);
      patchState(nextState, result === "complete");
      return nextState;
    });
  }, [patchState]);

  const handleSkip = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const { state: nextState, result } = advancePrompt(current, {
        skipped: true,
      });
      patchState(nextState, result === "complete");
      return nextState;
    });
  }, [patchState]);

  const handleEndSession = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const nextState = endSession(current);
      patchState(nextState, true);
      return nextState;
    });
  }, [patchState]);

  if (!state || state.status === "complete") {
    return null;
  }

  const prompt = getCurrentPrompt(state);
  const isChoosing =
    state.turnPhase === "choosing" && state.config.promptMode === "both";

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center text-sm">
        {t("progress", {
          truths: state.truthsPlayed,
          dares: state.daresPlayed,
        })}
      </p>

      {state.config.showPlayerPicker && (
        <section className="space-y-2">
          <p className="text-muted-foreground text-center text-sm">
            {t("playerPickerLabel")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {session.players.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => handleSelectPlayer(player.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  state.selectedPlayerId === player.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "hover:bg-muted/50",
                )}
              >
                {player.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {isChoosing ? (
        <div className="space-y-4">
          <p className="text-center text-lg font-medium">{t("choosePrompt")}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={() => handleChooseType("truth")}
              disabled={!isTypeAvailable(state, "truth")}
            >
              {t("truth")}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleChooseType("dare")}
              disabled={!isTypeAvailable(state, "dare")}
            >
              {t("dare")}
            </Button>
          </div>
        </div>
      ) : (
        <>
          {state.currentType && (
            <p className="text-primary text-center text-sm font-semibold tracking-wide uppercase">
              {t(`typeBadge.${state.currentType}`)}
            </p>
          )}

          <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
            <p className="text-xl leading-relaxed font-medium sm:text-2xl">
              {prompt}
            </p>
          </div>

          <p className="text-muted-foreground text-center text-sm">
            {t("instructions")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={handleNext}>
              {t("next")}
            </Button>
            <Button size="lg" variant="outline" onClick={handleSkip}>
              {t("skip")}
            </Button>
          </div>
        </>
      )}

      <div className="text-center">
        <Button variant="ghost" onClick={handleEndSession}>
          {t("endSession")}
        </Button>
      </div>
    </div>
  );
}
