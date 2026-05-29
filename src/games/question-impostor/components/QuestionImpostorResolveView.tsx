"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { GameEndAnimation } from "@/components/game-end";
import type { GameResolveProps } from "@/core/game-shell";

import type { AnswerType, QuestionImpostorRole } from "../types";
import { getQuestionImpostorState } from "../types";

function roleLabelKey(role: QuestionImpostorRole): "civilian" | "impostor" {
  return role;
}

export function QuestionImpostorResolveView({
  session,
  onRematch,
  onExit,
}: GameResolveProps) {
  const t = useTranslations("questionImpostor.resolve");
  const tRoles = useTranslations("questionImpostor.roles");
  const tAnswerTypes = useTranslations("questionImpostor.answerTypes");
  const [showAnswers, setShowAnswers] = useState(false);
  const state = getQuestionImpostorState(session.secrets);

  if (!state) {
    return null;
  }

  const winnerKey =
    state.winner === "impostors" ? "impostorsWin" : "civiliansWin";
  const hasReferenceAnswers =
    Boolean(state.pair.crewAnswer) || Boolean(state.pair.impostorAnswer);

  return (
    <div className="space-y-6">
      <GameEndAnimation variant="win">
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">{t(winnerKey)}</p>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p>
              <span className="font-medium">{t("crewQuestionLabel")}: </span>
              {state.pair.crewQuestion}
            </p>
            <p>
              <span className="font-medium">{t("impostorQuestionLabel")}: </span>
              {state.pair.impostorQuestion}
            </p>
          </div>
        </div>
      </GameEndAnimation>

      {hasReferenceAnswers && (
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setShowAnswers((current) => !current)}
          >
            {showAnswers ? t("hideReferenceAnswers") : t("showReferenceAnswers")}
          </Button>
          {showAnswers && (
            <div className="bg-muted/50 space-y-2 rounded-xl border px-4 py-3 text-sm">
              {state.pair.crewAnswer && (
                <p>
                  <span className="font-medium">{t("crewAnswerLabel")}: </span>
                  {state.pair.crewAnswer}
                </p>
              )}
              {state.pair.impostorAnswer && (
                <p>
                  <span className="font-medium">
                    {t("impostorAnswerLabel")}:{" "}
                  </span>
                  {state.pair.impostorAnswer}
                </p>
              )}
              <p className="text-muted-foreground">
                {tAnswerTypes(state.pair.answerType as AnswerType)}
              </p>
            </div>
          )}
        </div>
      )}

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
                  {wasEliminated
                    ? ` · ${t("eliminated")}`
                    : ` · ${t("survived")}`}
                </p>
              </div>
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

export function renderQuestionImpostorRevealSecret(
  session: GameResolveProps["session"],
  playerId: string,
  t: (key: string, values?: Record<string, string>) => string,
): ReactNode {
  const state = getQuestionImpostorState(session.secrets);
  if (!state) {
    return null;
  }

  const role = state.roles[playerId];
  const answerHint = t(
    `questionImpostor.answerTypes.${state.pair.answerType}`,
  );
  const question =
    role === "impostor"
      ? state.pair.impostorQuestion
      : state.pair.crewQuestion;
  const labelKey =
    role === "impostor"
      ? "questionImpostor.reveal.impostorLabel"
      : "questionImpostor.reveal.crewLabel";

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">{t(labelKey)}</p>
      <p className="text-2xl font-bold leading-snug">{question}</p>
      <p className="text-muted-foreground text-sm">{answerHint}</p>
    </div>
  );
}
