"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import "./game-end-animation.css";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type GameEndVariant = "win" | "loss";

type GameEndAnimationProps = {
  variant: GameEndVariant;
  children: ReactNode;
};

const CONFETTI_COUNT = 10;

const confettiColors = [
  "bg-primary",
  "bg-accent",
  "bg-secondary",
  "bg-primary/80",
  "bg-accent/80",
] as const;

function ConfettiBurst() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: CONFETTI_COUNT }, (_, index) => {
        const left = 8 + ((index * 9) % 84);
        const delay = (index % 5) * 0.05;
        const color = confettiColors[index % confettiColors.length];

        return (
          <span
            key={index}
            className={cn(
              "game-end-confetti absolute top-0 size-2 rounded-sm",
              color,
            )}
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function GameEndAnimation({ variant, children }: GameEndAnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      data-end-variant={variant}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      {variant === "win" && animate && <ConfettiBurst />}

      <div
        className={cn(
          "relative px-2 py-4",
          animate && variant === "win" && "game-end-animate-win",
          animate && variant === "loss" && "game-end-animate-loss",
        )}
      >
        {animate && variant === "win" && (
          <div
            className="bg-primary/20 pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-2xl"
            aria-hidden
          />
        )}
        {animate && variant === "loss" && (
          <div
            className="bg-muted/50 pointer-events-none absolute inset-0 -z-10 rounded-2xl"
            aria-hidden
          />
        )}
        {children}
      </div>
    </div>
  );
}
