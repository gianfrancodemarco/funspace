"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { getPlayerName } from "@/core/game-shell";
import type { RevealLoopProps } from "@/core/secret-delivery";

import { PlayerSecretFlipCard } from "./PlayerSecretFlipCard";

export function SingleDeviceRevealLoop({
  session,
  renderSecret,
  onComplete,
}: RevealLoopProps) {
  const t = useTranslations("gameShell.reveal");
  const [playerIndex, setPlayerIndex] = useState(0);

  const currentPlayerId = session.shuffledOrder[playerIndex];
  const currentPlayerName = getPlayerName(session, currentPlayerId);
  const isLastPlayer = playerIndex === session.shuffledOrder.length - 1;

  function handleDone() {
    if (isLastPlayer) {
      onComplete();
      return;
    }

    setPlayerIndex((index) => index + 1);
  }

  return (
    <PlayerSecretFlipCard
      key={currentPlayerId}
      playerName={currentPlayerName}
      secret={renderSecret(currentPlayerId)}
      onDone={handleDone}
      doneLabel={isLastPlayer ? t("finish") : t("confirm")}
      progress={{
        current: playerIndex + 1,
        total: session.shuffledOrder.length,
      }}
    />
  );
}
