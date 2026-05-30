import { assignTruthOrDareSecrets } from "./engine";
import { TruthOrDarePlayView } from "./components/TruthOrDarePlayView";
import { TruthOrDareResolveView } from "./components/TruthOrDareResolveView";
import { TruthOrDareSetupView } from "./components/TruthOrDareSetupView";

export const truthOrDareDefinition = {
  id: "truth-or-dare",
  nameKey: "games.truthOrDare.name",
  minPlayers: 3,
  maxPlayers: 20,
  phases: ["play", "resolve"] as const,
  SetupView: TruthOrDareSetupView,
  assignSecrets: assignTruthOrDareSecrets,
  PlayView: TruthOrDarePlayView,
  ResolveView: TruthOrDareResolveView,
  rulesKeyPrefix: "truthOrDare.rules",
  rulesRoleKeys: ["group", "player"] as const,
  rulesStepCount: 5,
};
