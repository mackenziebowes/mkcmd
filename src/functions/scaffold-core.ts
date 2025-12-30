import { join } from "node:path";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { writeFileTuple } from "../core/helpers/file-utils";

const currentDir = join(fileURLToPath(import.meta.url), "../..");
const sourceCoreDir = join(currentDir, "src", "core");

export async function scaffoldCore(targetDir: string) {
  const files = await readdir(sourceCoreDir);

  for (const file of files) {
    if (file.endsWith(".ts")) {
      const content = await Bun.file(join(sourceCoreDir, file)).text();
      await writeFileTuple([targetDir, `src/core/${file}`, content]);
    }
  }
}
