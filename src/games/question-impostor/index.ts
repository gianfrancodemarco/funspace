import { assignQuestionImpostorSecrets } from "./engine";
import { QuestionImpostorPlayView } from "./components/QuestionImpostorPlayView";
import { QuestionImpostorResolveView } from "./components/QuestionImpostorResolveView";
import { QuestionImpostorSetupView } from "./components/QuestionImpostorSetupView";

export { renderQuestionImpostorRevealSecret } from "./components/QuestionImpostorResolveView";

export const questionImpostorDefinition = {
  id: "question-impostor",
  nameKey: "games.questionImpostor.name",
  minPlayers: 3,
  maxPlayers: 20,
  phases: ["reveal", "play", "resolve"] as const,
  SetupView: QuestionImpostorSetupView,
  assignSecrets: assignQuestionImpostorSecrets,
  PlayView: QuestionImpostorPlayView,
  ResolveView: QuestionImpostorResolveView,
  rulesKeyPrefix: "questionImpostor.rules",
  rulesRoleKeys: ["civilian", "impostor"] as const,
  rulesStepCount: 5,
};
