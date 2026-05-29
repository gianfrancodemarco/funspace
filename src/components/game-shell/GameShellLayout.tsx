"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { ShellPhase } from "@/core/game-shell";
import { cn } from "@/lib/utils";

type GameShellLayoutProps = {
  title: string;
  phase?: ShellPhase | "setup";
  children: React.ReactNode;
};

const phaseOrder: Array<ShellPhase | "setup"> = [
  "setup",
  "reveal",
  "play",
  "resolve",
];

export function GameShellLayout({
  title,
  phase,
  children,
}: GameShellLayoutProps) {
  const t = useTranslations("gameShell");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <header className="space-y-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t("backToHome")}
        </Link>
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {phase && (
            <ol
              aria-label={t("phaseIndicator")}
              className="flex flex-wrap items-center gap-2 text-xs font-medium sm:text-sm"
            >
              {phaseOrder.map((step, index) => {
                const isActive = step === phase;
                const isPast =
                  phaseOrder.indexOf(phase) > phaseOrder.indexOf(step);

                return (
                  <li key={step} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1",
                        isActive && "bg-primary text-primary-foreground",
                        !isActive &&
                          isPast &&
                          "bg-primary/15 text-primary",
                        !isActive &&
                          !isPast &&
                          "bg-muted text-muted-foreground",
                      )}
                    >
                      {t(`phases.${step}`)}
                    </span>
                    {index < phaseOrder.length - 1 && (
                      <span className="text-muted-foreground" aria-hidden>
                        ·
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
