"use client";

import { EliminationPlayView } from "@/components/game-shell/EliminationPlayView";
import type { GamePlayProps } from "@/core/game-shell";

import { eliminatePlayer } from "../engine";
import { renderQuestionImpostorRevealSecret } from "./QuestionImpostorResolveView";
import {
  getQuestionImpostorState,
  QUESTION_IMPOSTOR_STATE_KEY,
} from "../types";

export function QuestionImpostorPlayView({
  session,
  onComplete,
}: GamePlayProps) {
  const state = getQuestionImpostorState(session.secrets);

  if (!state) {
    return null;
  }

  return (
    <EliminationPlayView
      session={session}
      onComplete={onComplete}
      state={state}
      stateKey={QUESTION_IMPOSTOR_STATE_KEY}
      playNamespace="questionImpostor.play"
      eliminatePlayer={eliminatePlayer}
      renderRevealSecret={renderQuestionImpostorRevealSecret}
    />
  );
}
