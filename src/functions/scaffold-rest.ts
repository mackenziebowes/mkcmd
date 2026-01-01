import { join, dirname } from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { data } from "../data/";

export async function scaffoldRest(targetDir: string) {
  const combinedPath = join(cwd(), targetDir);
  if (!existsSync(combinedPath)) {
    await mkdir(combinedPath, { recursive: true });
  }
  for (const file of data) {
    const relativePath = file.location.replace(/^\.\//, "");
    const parentDir = join(combinedPath, dirname(relativePath));
    if (!existsSync(parentDir)) {
      await mkdir(parentDir, { recursive: true });
    }
    await writeFile(join(combinedPath, relativePath), file.content(), "utf8");
  }
}
