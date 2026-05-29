"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { GamePlayProps } from "@/core/game-shell";
import { useGameShell } from "@/core/game-shell";

import {
  advancePrompt,
  endSession,
  getCurrentPrompt,
} from "../engine";
import {
  getNeverHaveIEverState,
  getPromptsShown,
  NEVER_HAVE_I_EVER_STATE_KEY,
  type NeverHaveIEverGameState,
} from "../types";

export function NeverHaveIEverPlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("neverHaveIEver.play");
  const { send } = useGameShell();
  const initialState = getNeverHaveIEverState(session.secrets);
  const [state, setState] = useState<NeverHaveIEverGameState | null>(initialState);

  const handleNext = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const { state: nextState, result } = advancePrompt(current);
      send({
        type: "PATCH_SECRETS",
        secrets: { [NEVER_HAVE_I_EVER_STATE_KEY]: nextState },
      });

      if (result === "complete") {
        onComplete();
      }

      return nextState;
    });
  }, [onComplete, send]);

  const handleSkip = useCallback(() => {
    setState((current) => {
      if (!current || current.status !== "playing") {
        return current;
      }

      const { state: nextState, result } = advancePrompt(current, {
        skipped: true,
      });
      send({
        type: "PATCH_SECRETS",
        secrets: { [NEVER_HAVE_I_EVER_STATE_KEY]: nextState },
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
        secrets: { [NEVER_HAVE_I_EVER_STATE_KEY]: nextState },
      });
      onComplete();
      return nextState;
    });
  }, [onComplete, send]);

  if (!state) {
    return null;
  }

  const prompt = getCurrentPrompt(state);

  if (!prompt || state.status === "complete") {
    return null;
  }

  const promptsShown = getPromptsShown(state);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-center text-sm">
        {t("progress", {
          current: promptsShown,
          total: state.deck.length,
        })}
      </p>

      <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
        <p className="text-xl leading-relaxed font-medium sm:text-2xl">{prompt}</p>
      </div>

      <p className="text-muted-foreground text-center text-sm">{t("instructions")}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={handleNext}>
          {t("next")}
        </Button>
        <Button size="lg" variant="outline" onClick={handleSkip}>
          {t("skip")}
        </Button>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={handleEndSession}>
          {t("endSession")}
        </Button>
      </div>
    </div>
  );
}
