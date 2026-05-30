"use client";

import { EliminationPlayView } from "@/components/game-shell/EliminationPlayView";
import type { GamePlayProps } from "@/core/game-shell";

import { eliminatePlayer } from "../engine";
import { renderImpostorRevealSecret } from "./ImpostorResolveView";
import { getImpostorState, IMPOSTOR_STATE_KEY } from "../types";

export function ImpostorPlayView({ session, onComplete }: GamePlayProps) {
  const state = getImpostorState(session.secrets);

  if (!state) {
    return null;
  }

  return (
    <EliminationPlayView
      session={session}
      onComplete={onComplete}
      state={state}
      stateKey={IMPOSTOR_STATE_KEY}
      playNamespace="impostor.play"
      eliminatePlayer={eliminatePlayer}
      renderRevealSecret={renderImpostorRevealSecret}
    />
  );
}
