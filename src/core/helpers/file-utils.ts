import { mkdir, realpath } from "node:fs/promises";
import { join } from "node:path";

const pathCache = new Map<string, string>();

export async function getRealPath(dir: string): Promise<string> {
  if (!pathCache.has(dir)) {
    const real = await realpath(dir);
    pathCache.set(dir, real);
  }
  return pathCache.get(dir)!;
}

export async function writeFileTuple([targetDir, relativePath, content]: [string, string, string]): Promise<void> {
  const realDir = await getRealPath(targetDir);
  const fullPath = join(realDir, relativePath);
  await mkdir(join(fullPath, ".."), { recursive: true });
  await Bun.write(fullPath, content);
}
