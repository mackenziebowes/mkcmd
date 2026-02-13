import { text, intro, outro } from "@clack/prompts";

export interface ProjectPrompts {
  projectName: string;
  targetDir: string;
  description: string;
}

export async function promptProjectDetails(): Promise<ProjectPrompts> {
  intro("mkcmd - Scaffold a new CLI project");

  const projectName = (await text({
    message: "What is your project name?",
    placeholder: "my-cli",
  })) as string;

  const targetDir = (await text({
    message: "Where should the project be created?",
    placeholder: "./my-cli",
    initialValue: `./${projectName}`,
  })) as string;

  const description = (await text({
    message: "What does this project do?",
    placeholder: "A CLI tool that does amazing things",
  })) as string;

  outro("Project details collected!");

  return { projectName, targetDir, description };
}
