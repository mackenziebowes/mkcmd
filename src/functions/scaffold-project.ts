import { type ProjectPrompts } from "./prompt-project";
import { writeFileTuple } from "../core/helpers/file-utils";
import {
  commands_init,
  config_init,
  package_init,
  readme_init,
  tsconfig_init,
} from "../data/init";

export async function scaffoldProject(prompts: ProjectPrompts) {
  const { projectName, targetDir, description } = prompts;

  await writeFileTuple([targetDir, "src/commands/index.ts", commands_init()]);
  await writeFileTuple([targetDir, "src/config.ts", config_init(description)]);
  await writeFileTuple([targetDir, "package.json", package_init(projectName)]);
  await writeFileTuple([targetDir, "README.md", readme_init(projectName)]);
  await writeFileTuple([targetDir, "tsconfig.json", tsconfig_init()]);
}
