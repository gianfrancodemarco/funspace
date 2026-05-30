"use client";

import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import { GameRulesPanel } from "@/components/game-rules/GameRulesPanel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 border-b px-6 py-4 pr-12 text-left">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary size-5 shrink-0" aria-hidden />
            <DialogTitle>{tRules("title")}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <GameRulesPanel
            rulesKeyPrefix={rulesKeyPrefix}
            roleKeys={rulesRoleKeys}
            stepCount={rulesStepCount}
          />
        </div>
        <div className="shrink-0 border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              {tChrome("gotIt")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
