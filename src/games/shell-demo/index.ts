import { shellDemoGame } from "./game";
import { ShellDemoPlayView } from "./ShellDemoPlayView";
import { ShellDemoResolveView } from "./ShellDemoResolveView";

export { assignShellDemoSecrets } from "./game";

export const shellDemoDefinition = {
  ...shellDemoGame,
  phases: [...shellDemoGame.phases],
  PlayView: ShellDemoPlayView,
  ResolveView: ShellDemoResolveView,
};
