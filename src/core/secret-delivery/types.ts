import type { ComponentType, ReactNode } from "react";

import type { GameSession } from "@/core/game-shell";

export type RevealLoopProps = {
  session: GameSession;
  renderSecret: (playerId: string) => ReactNode;
  onComplete: () => void;
};

export type SecretDeliveryProvider = {
  mode: "single-device";
  RevealLoop: ComponentType<RevealLoopProps>;
};
