import { assignNeverHaveIEverSecrets } from "./engine";
import { NeverHaveIEverPlayView } from "./components/NeverHaveIEverPlayView";
import { NeverHaveIEverResolveView } from "./components/NeverHaveIEverResolveView";
import { NeverHaveIEverSetupView } from "./components/NeverHaveIEverSetupView";

export const neverHaveIEverDefinition = {
  id: "never-have-i-ever",
  nameKey: "games.neverHaveIEver.name",
  minPlayers: 3,
  maxPlayers: 20,
  phases: ["play", "resolve"] as const,
  SetupView: NeverHaveIEverSetupView,
  assignSecrets: assignNeverHaveIEverSecrets,
  PlayView: NeverHaveIEverPlayView,
  ResolveView: NeverHaveIEverResolveView,
  rulesKeyPrefix: "neverHaveIEver.rules",
  rulesRoleKeys: ["group", "reader"] as const,
  rulesStepCount: 4,
};
