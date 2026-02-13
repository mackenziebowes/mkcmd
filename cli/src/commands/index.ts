import { registerCommand } from "../core/cli";
import { orchestrateScaffold } from "../functions/orchestrate-scaffold";

export function registerCommands() {
  registerCommand({
    name: "init",
    description: "Initialize a new CLI project",
    instructions: "You will be prompted for project details",
    run: async () => {
      await orchestrateScaffold();
    },
  });
}
