"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GamePlayProps } from "@/core/game-shell";
import { useGameShell } from "@/core/game-shell";
import { cn } from "@/lib/utils";

import {
  advanceDilemma,
  endSession,
  getCurrentDilemma,
} from "../engine";
import {
  getDilemmasShown,
  getWouldYouRatherState,
  WOULD_YOU_RATHER_STATE_KEY,
  type WouldYouRatherGameState,
} from "../types";

export function WouldYouRatherPlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("wouldYouRather.play");
  const { send } = useGameShell();
  const initialState = getWouldYouRatherState(session.secrets);
  const [state, setState] = useState<WouldYouRatherGameState | null>(initialState);

  const handleChooseOption = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const { state: nextState, result } = advanceDilemma(current);
      send({
        type: "PATCH_SECRETS",
        secrets: { [WOULD_YOU_RATHER_STATE_KEY]: nextState },
      });

      if (result === "complete") {
        onComplete();
      }

      return nextState;
    });
  }, [onComplete, send]);

  const handleEndSession = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const nextState = endSession(current);
      send({
        type: "PATCH_SECRETS",
        secrets: { [WOULD_YOU_RATHER_STATE_KEY]: nextState },
      });
      onComplete();
      return nextState;
    });
  }, [onComplete, send]);

  if (!state) {
    return null;
  }

  const dilemma = getCurrentDilemma(state);

  if (!dilemma || state.status === "complete") {
    return null;
  }

  const dilemmasShown = getDilemmasShown(state);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center text-sm">
        {t("progress", {
          current: dilemmasShown,
          total: state.deck.length,
        })}
      </p>

      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold sm:text-xl">{t("title")}</p>

        <button
          type="button"
          onClick={handleChooseOption}
          aria-label={t("chooseOption", { option: dilemma.optionA })}
          className={cn(
            "w-full rounded-2xl border bg-card p-5 text-left shadow-sm transition-colors",
            "hover:border-primary hover:bg-primary/5 active:scale-[0.99]",
          )}
        >
          <p className="text-lg leading-relaxed font-medium sm:text-xl">
            {dilemma.optionA}
          </p>
        </button>

        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
          {t("or")}
        </p>

        <button
          type="button"
          onClick={handleChooseOption}
          aria-label={t("chooseOption", { option: dilemma.optionB })}
          className={cn(
            "w-full rounded-2xl border bg-card p-5 text-left shadow-sm transition-colors",
            "hover:border-primary hover:bg-primary/5 active:scale-[0.99]",
          )}
        >
          <p className="text-lg leading-relaxed font-medium sm:text-xl">
            {dilemma.optionB}
          </p>
        </button>
      </div>

      <p className="text-muted-foreground text-center text-sm">{t("instructions")}</p>

      <div className="text-center">
        <Button variant="ghost" onClick={handleEndSession}>
          {t("endSession")}
        </Button>
      </div>
    </div>
  );
}
