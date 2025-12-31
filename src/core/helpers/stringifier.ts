import { join } from "node:path";
import { readdir, writeFile } from "node:fs/promises";
import { FileBuilder } from "./file-builder";
import { statSync } from "node:fs";

const outExport: string[] = [];

async function generateTemplate(path: string) {
  if (path.endsWith(".ts")) {
    const content = await Bun.file(path).text();
    const fb = new FileBuilder();
    const snaked_title = path
      .split("/")
      .join("_")
      .split("-")
      .join("_")
      .split(".")[0];
    fb.addLine(`const ${snaked_title + "_init"} = () => {`);
    fb.addLine(`const fb = new FileBuilder();`, 1);
    const lines = content.split("\n");
    for (const line of lines) {
      const cleanLine = line.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
      fb.addLine(`fb.addLine("${cleanLine}")`, 1);
    }
    fb.addLine("return fb.build();", 1);
    fb.addLine("};");
    fb.addEmptyLine();
    fb.addLine(`export const ${snaked_title} = {`);
    fb.addLine(`location: "${path}",`, 1);
    fb.addLine(`content: ${snaked_title + "_init"}`, 1);
    fb.addLine(`};`);
    const out = fb.build();
    outExport.push(`${snaked_title}`);
    return out;
  }
  return "";
}

async function parseFolder(path: string, fb: FileBuilder) {
  const items = await readdir(path);
  for (const item of items) {
    const relPath = join(path, item);
    const itemStat = statSync(relPath);
    if (itemStat.isDirectory()) {
      await parseFolder(relPath, fb);
    }
    if (item.endsWith(".ts")) {
      fb.addLine(await generateTemplate(relPath));
      fb.addEmptyLine();
    }
  }
}

async function generateTemplates() {
  const sourceCoreDir = join(".", "src", "core");
  const fb = new FileBuilder();
  fb.addLine(`import { FileBuilder } from "../core/helpers/file-builder";`);
  fb.addEmptyLine();
  await parseFolder(sourceCoreDir, fb);
  fb.addLine(`const core = [${outExport.join(", ")}]`);
  fb.addLine(`export { core }`);
  const out = fb.build();
  await writeFile(join(".", "src", "data", "core.ts"), out, "utf8");
}

generateTemplates();
