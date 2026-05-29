import { assignImpostorSecrets } from "./engine";
import { ImpostorPlayView } from "./components/ImpostorPlayView";
import { ImpostorResolveView } from "./components/ImpostorResolveView";
import { ImpostorSetupView } from "./components/ImpostorSetupView";

export { renderImpostorRevealSecret } from "./components/ImpostorResolveView";

export const impostorDefinition = {
  id: "impostor",
  nameKey: "games.impostor.name",
  minPlayers: 3,
  maxPlayers: 20,
  phases: ["reveal", "play", "resolve"] as const,
  SetupView: ImpostorSetupView,
  assignSecrets: assignImpostorSecrets,
  PlayView: ImpostorPlayView,
  ResolveView: ImpostorResolveView,
  rulesKeyPrefix: "impostor.rules",
  rulesRoleKeys: ["civilian", "impostor", "spy"] as const,
  rulesStepCount: 5,
};
