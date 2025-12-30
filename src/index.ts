#!/usr/bin/env bun
import { runCLI } from "./core/cli";
import { registerCommands } from "./commands";

async function main() {
  registerCommands();
  runCLI();
}

main();
