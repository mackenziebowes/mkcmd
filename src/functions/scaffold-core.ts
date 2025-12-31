import { join, dirname } from "node:path";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { cwd } from "node:process";
import { core } from "../data/core";

const currentDir = join(cwd());

export async function scaffoldCore(targetDir: string) {
  const combinedPath = join(currentDir, targetDir);
  console.dir(combinedPath);
  for (const file of core) {
    const relativePath = file.location.replace(/^\.\//, "");
    const parentDir = join(combinedPath, dirname(relativePath));
    console.dir({ parentDir });
    if (!existsSync(parentDir)) {
      mkdir(parentDir, { recursive: true });
    }
    writeFile(join(combinedPath, relativePath), file.content(), "utf8");
  }
}
