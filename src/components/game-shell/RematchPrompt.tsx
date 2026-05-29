"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type RematchPromptProps = {
  onRematch: () => void;
  onExit: () => void;
};

export function RematchPrompt({ onRematch, onExit }: RematchPromptProps) {
  const t = useTranslations("gameShell.rematch");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button size="lg" onClick={onRematch}>
        {t("playAgain")}
      </Button>
      <Button size="lg" variant="outline" onClick={onExit}>
        {t("exit")}
      </Button>
    </div>
  );
}
