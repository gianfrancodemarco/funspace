import { assignHangmanSecrets } from "./engine";
import { HangmanPlayView } from "./components/HangmanPlayView";
import { HangmanResolveView } from "./components/HangmanResolveView";
import { HangmanSetupView } from "./components/HangmanSetupView";

export const hangmanDefinition = {
  id: "hangman",
  nameKey: "games.hangman.name",
  minPlayers: 2,
  maxPlayers: 8,
  phases: ["play", "resolve"] as const,
  SetupView: HangmanSetupView,
  assignSecrets: assignHangmanSecrets,
  PlayView: HangmanPlayView,
  ResolveView: HangmanResolveView,
  rulesKeyPrefix: "hangman.rules",
  rulesRoleKeys: ["group", "phone"] as const,
  rulesStepCount: 4,
};
