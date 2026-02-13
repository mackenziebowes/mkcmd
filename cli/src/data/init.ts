import { FileBuilder } from "../core/helpers/file-builder";

export const commands_init = () => {
  const file = new FileBuilder();
  file.addLine(`import { registerCommand } from "../core/cli";`, 0);
  file.addEmptyLine();
  file.addLine(`export function registerCommands() {}`, 0);
  return file.build();
};

export const config_init = (about: string) => {
  const file = new FileBuilder();
  file.addLine(`import { join } from "node:path";`);
  file.addEmptyLine();
  file.addLine(`export interface WatchConfig {`);
  file.addLine(`name: string;`, 1);
  file.addLine(`type: "dir" | "file";`, 1);
  file.addLine(`sourcePath: string;`, 1);
  file.addLine(`outputPath: string;`, 1);
  file.addLine(`}`);
  file.addEmptyLine();
  file.addLine(`type Config = {`);
  file.addLine(`about_text: string;`, 1);
  file.addLine(`more_info_text: string;`, 1);
  file.addLine(`watchConfigs: WatchConfig[];`, 1);
  file.addLine(`}`);
  file.addLine(`export const config: Config = {`, 0);
  file.addLine(`about_text:`, 2);
  file.addLine(`"${about}",`, 1);
  file.addLine(`more_info_text:`, 2);
  file.addLine(
    `"See https://github.com/mackenziebowes/mkcmd for more details.",`,
    1,
  );
  file.addLine(`watchConfigs: [`, 1);
  file.addLine(`{`, 2);
  file.addLine(`name: "core",`, 3);
  file.addLine(`type: "dir",`, 3);
  file.addLine(`sourcePath: join(".", "src", "core"),`, 3);
  file.addLine(`outputPath: join(".", "src", "data", "core.ts"),`, 3);
  file.addLine(`},`, 2);
  file.addLine(`],`, 1);
  file.addLine(`};`, 0);
  return file.build();
};

export const package_init = (name: string) => {
  const file = new FileBuilder();
  file.addLine(`{`, 0);
  file.addLine(`"name": "${name}",`, 1);
  file.addLine(`"module": "index.ts",`, 1);
  file.addLine(`"type": "module",`, 1);
  file.addLine(`"private": true,`, 1);
  file.addLine(`"bin": {`, 1);
  file.addLine(`"${name.split(" ").join("")}": "./src/index.ts"`, 2);
  file.addLine(`},`, 1);
  file.addLine(`"devDependencies": {`, 1);
  file.addLine(`"@types/bun": "latest"`, 2);
  file.addLine(`},`, 1);
  file.addLine(`"peerDependencies": {`, 1);
  file.addLine(`"typescript": "^5"`, 2);
  file.addLine(`},`, 1);
  file.addLine(`"dependencies": {`, 1);
  file.addLine(`"@clack/prompts": "^0.11.0",`, 2);
  file.addLine(`"@types/figlet": "^1.7.0",`, 2);
  file.addLine(`"figlet": "^1.9.4"`, 2);
  file.addLine(`}`, 1);
  file.addLine(`}`, 0);
  return file.build();
};

export const readme_init = (name: string) => {
  const file = new FileBuilder();
  file.addLine(`# ${name}`);
  file.addEmptyLine();
  file.addLine(`To install dependencies:`);
  file.addEmptyLine();
  file.addLine("```bash");
  file.addLine("bun install");
  file.addLine("```");
  file.addEmptyLine();
  file.addLine("To run:");
  file.addLine("```bash");
  file.addLine("bun run index.ts");
  file.addLine("```");
  file.addLine(
    "This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.",
  );
  return file.build();
};

export const tsconfig_init = () => {
  const file = new FileBuilder();
  file.addLine(`{`, 0);
  file.addLine(`"compilerOptions": {`, 1);
  file.addEmptyLine();
  file.addLine(`// Environment setup & latest features`, 1);
  file.addLine(`"lib": ["ESNext"],`, 1);
  file.addLine(`"target": "ESNext",`, 1);
  file.addLine(`"module": "ESNext",`, 1);
  file.addLine(`"moduleDetection": "force",`, 1);
  file.addLine(`"jsx": "react-jsx",`, 1);
  file.addLine(`"allowJs": true,`, 1);
  file.addEmptyLine();
  file.addLine(`// Bundler mode`, 1);
  file.addLine(`"moduleResolution": "bundler",`, 1);
  file.addLine(`"allowImportingTsExtensions": true,`, 1);
  file.addLine(`"verbatimModuleSyntax": true,`, 1);
  file.addLine(`"noEmit": true,`, 1);
  file.addEmptyLine();
  file.addLine(`// Best practices`, 1);
  file.addLine(`"strict": true,`, 1);
  file.addLine(`"skipLibCheck": true,`, 1);
  file.addLine(`"noFallthroughCasesInSwitch": true,`, 1);
  file.addLine(`"noUncheckedIndexedAccess": true,`, 1);
  file.addEmptyLine();
  file.addLine(`// Some stricter flags (disabled by default)`, 1);
  file.addLine(`"noUnusedLocals": false,`, 1);
  file.addLine(`"noUnusedParameters": false,`, 1);
  file.addLine(`"noPropertyAccessFromIndexSignature": false`, 1);
  file.addLine(`}`, 1);
  file.addLine(`}`, 0);
  return file.build();
};
