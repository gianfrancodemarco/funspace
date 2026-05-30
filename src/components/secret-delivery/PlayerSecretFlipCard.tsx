"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerSecretFlipCardProps = {
  playerName: string;
  secret: ReactNode;
  onDone: () => void;
  doneLabel: string;
  handoffLabel?: string;
  progress?: { current: number; total: number };
};

export function PlayerSecretFlipCard({
  playerName,
  secret,
  onDone,
  doneLabel,
  handoffLabel,
  progress,
}: PlayerSecretFlipCardProps) {
  const t = useTranslations("gameShell.reveal");
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {progress && (
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
          {t("progress", progress)}
        </p>
      )}

      <div className="space-y-1">
        <p className="text-2xl font-bold">{playerName}</p>
        {!isRevealed && (
          <p className="text-muted-foreground text-sm">
            {handoffLabel ?? t("handoff", { name: playerName })}
          </p>
        )}
      </div>

      <div className="w-full max-w-sm [perspective:1000px]">
        <div
          className={cn(
            "relative min-h-52 w-full transition-transform duration-500 [transform-style:preserve-3d]",
            isRevealed && "[transform:rotateY(180deg)]",
          )}
        >
          <div
            aria-hidden={isRevealed}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border bg-muted/40 p-8 shadow-sm [backface-visibility:hidden]"
          >
            <span className="text-muted-foreground text-5xl font-bold">?</span>
            <p className="text-muted-foreground text-sm">{t("cardBackHint")}</p>
          </div>

          <div
            aria-hidden={!isRevealed}
            className="absolute inset-0 flex items-center justify-center rounded-2xl border bg-card p-8 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            {secret}
          </div>
        </div>
      </div>

      {!isRevealed ? (
        <Button size="lg" onClick={() => setIsRevealed(true)}>
          {t("revealButton")}
        </Button>
      ) : (
        <Button size="lg" onClick={onDone}>
          {doneLabel}
        </Button>
      )}
    </div>
  );
}
