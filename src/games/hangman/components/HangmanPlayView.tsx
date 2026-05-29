"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { GamePlayProps } from "@/core/game-shell";
import { useGameShell } from "@/core/game-shell";
import { cn } from "@/lib/utils";

import { getDisplayWord, guessLetter } from "../engine";
import {
  getHangmanState,
  HANGMAN_STATE_KEY,
  type HangmanGameState,
} from "../types";
import { HangmanFigure } from "./HangmanFigure";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

export function HangmanPlayView({ session, onComplete }: GamePlayProps) {
  const t = useTranslations("hangman.play");
  const { send } = useGameShell();
  const initialState = getHangmanState(session.secrets);
  const [state, setState] = useState<HangmanGameState | null>(initialState);

  const handleGuess = useCallback(
    (letter: string) => {
      setState((current) => {
        if (!current || current.status !== "playing") {
          return current;
        }

        const { state: nextState, result } = guessLetter(current, letter);
        if (result === "duplicate") {
          return current;
        }

        send({
          type: "PATCH_SECRETS",
          secrets: { [HANGMAN_STATE_KEY]: nextState },
        });

        if (result === "won" || result === "lost") {
          onComplete();
        }

        return nextState;
      });
    },
    [onComplete, send],
  );

  useEffect(() => {
    if (!state || state.status !== "playing") {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      const letter = event.key.toLowerCase();
      if (!/^[a-z]$/.test(letter)) {
        return;
      }

      event.preventDefault();
      handleGuess(letter);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleGuess, state?.status]);

  if (!state) {
    return null;
  }

  const remainingGuesses = state.config.maxWrongGuesses - state.wrongCount;

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">{t("instructions")}</p>
        <p className="text-muted-foreground text-sm">
          {t("wrongGuesses", {
            wrong: state.wrongCount,
            max: state.config.maxWrongGuesses,
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          {t("remainingGuesses", { count: remainingGuesses })}
        </p>
      </div>

      <HangmanFigure
        wrongCount={state.wrongCount}
        maxWrongGuesses={state.config.maxWrongGuesses}
      />

      <p className="text-center font-mono text-3xl font-bold tracking-widest uppercase">
        {getDisplayWord(state.word, state.guessedLetters)}
      </p>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
        {LETTERS.map((letter) => {
          const isGuessed = state.guessedLetters.includes(letter);
          return (
            <button
              key={letter}
              type="button"
              disabled={isGuessed || state.status !== "playing"}
              onClick={() => handleGuess(letter)}
              className={cn(
                "rounded-lg border py-2 text-sm font-semibold uppercase transition-colors",
                isGuessed
                  ? "text-muted-foreground bg-muted"
                  : "hover:bg-primary/10 hover:border-primary",
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
