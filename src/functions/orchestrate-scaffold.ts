import { promptProjectDetails, ProjectPrompts } from "./prompt-project";
import { scaffoldProject } from "./scaffold-project";
import { scaffoldCore } from "./scaffold-core";
import log from "../core/log";
import { config } from "../config";

export async function orchestrateScaffold() {
  const prompts = await promptProjectDetails();

  await scaffoldProject(prompts);
  log.single.info("Project", "Project files created");

  await scaffoldCore(prompts.targetDir);
  log.single.info("Core", "Core files copied");

  log.multi.info([
    { t: "Success", m: "Project scaffolded successfully!" },
    { t: "Location", m: prompts.targetDir },
    { t: "Next", m: `cd ${prompts.targetDir} && bun install` },
  ]);
}
