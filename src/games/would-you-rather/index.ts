import { assignWouldYouRatherSecrets } from "./engine";
import { WouldYouRatherPlayView } from "./components/WouldYouRatherPlayView";
import { WouldYouRatherResolveView } from "./components/WouldYouRatherResolveView";
import { WouldYouRatherSetupView } from "./components/WouldYouRatherSetupView";

export const wouldYouRatherDefinition = {
  id: "would-you-rather",
  nameKey: "games.wouldYouRather.name",
  minPlayers: 3,
  maxPlayers: 20,
  phases: ["play", "resolve"] as const,
  SetupView: WouldYouRatherSetupView,
  assignSecrets: assignWouldYouRatherSecrets,
  PlayView: WouldYouRatherPlayView,
  ResolveView: WouldYouRatherResolveView,
  rulesKeyPrefix: "wouldYouRather.rules",
  rulesRoleKeys: ["group", "reader"] as const,
  rulesStepCount: 4,
};
