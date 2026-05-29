"use client";

import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import { GameRulesPanel } from "@/components/game-rules/GameRulesPanel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { GameRulesMeta } from "@/core/game-shell";

type GameRulesTriggerProps = GameRulesMeta;

export function GameRulesTrigger({
  rulesKeyPrefix,
  rulesRoleKeys,
  rulesStepCount,
}: GameRulesTriggerProps) {
  const tChrome = useTranslations("gameRules");
  const tRules = useTranslations(rulesKeyPrefix);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          <BookOpen className="size-4" aria-hidden />
          {tChrome("openRules")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tRules("title")}</DialogTitle>
        </DialogHeader>
        <GameRulesPanel
          rulesKeyPrefix={rulesKeyPrefix}
          roleKeys={rulesRoleKeys}
          stepCount={rulesStepCount}
        />
      </DialogContent>
    </Dialog>
  );
}
