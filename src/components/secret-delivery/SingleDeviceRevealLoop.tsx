"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { getPlayerName } from "@/core/game-shell";
import type { RevealLoopProps } from "@/core/secret-delivery";

type RevealStep = "handoff" | "ready" | "revealed" | "cover";

export function SingleDeviceRevealLoop({
  session,
  renderSecret,
  onComplete,
}: RevealLoopProps) {
  const t = useTranslations("gameShell.reveal");
  const [playerIndex, setPlayerIndex] = useState(0);
  const [step, setStep] = useState<RevealStep>("handoff");

  const currentPlayerId = session.shuffledOrder[playerIndex];
  const currentPlayerName = getPlayerName(session, currentPlayerId);
  const isLastPlayer = playerIndex === session.shuffledOrder.length - 1;

  function advancePlayer() {
    if (isLastPlayer) {
      onComplete();
      return;
    }

    setPlayerIndex((index) => index + 1);
    setStep("handoff");
  }

  if (step === "handoff") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
          {t("progress", {
            current: playerIndex + 1,
            total: session.shuffledOrder.length,
          })}
        </p>
        <p className="text-2xl font-bold">{t("handoff", { name: currentPlayerName })}</p>
        <Button size="lg" onClick={() => setStep("ready")}>
          {t("ready")}
        </Button>
      </div>
    );
  }

  if (step === "ready") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-xl font-semibold">
          {t("tapToReveal", { name: currentPlayerName })}
        </p>
        <Button size="lg" onClick={() => setStep("revealed")}>
          {t("revealButton")}
        </Button>
      </div>
    );
  }

  if (step === "revealed") {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="bg-card w-full rounded-2xl border p-8 shadow-sm">
          {renderSecret(currentPlayerId)}
        </div>
        <Button size="lg" onClick={() => setStep("cover")}>
          {t("confirm")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="bg-muted/80 flex min-h-40 w-full items-center justify-center rounded-2xl border border-dashed p-8 backdrop-blur-sm">
        <p className="text-muted-foreground text-lg font-medium">{t("cover")}</p>
      </div>
      <Button size="lg" onClick={advancePlayer}>
        {isLastPlayer ? t("finish") : t("nextPlayer")}
      </Button>
    </div>
  );
}
