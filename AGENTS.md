# AGENTS.md

This document describes what an autonomous agent (or future contributor) needs to know to work effectively in this repository.

Only facts observed in the repository are documented. If something is not listed, it was not found in the codebase.

---

## Project type

This is a monorepo with two packages:
- **cli/** - The mkcmd CLI tool (TypeScript/Bun)
- **app/** - Web app documenting this project (to be added)

- Language: TypeScript (TS config present)
- Runtime: Bun (README and shebang in src/index.ts)
- Package manager / runner: bun (README instructs `bun install` and `bun run index.ts`)

Files of interest: cli/package.json, cli/tsconfig.json, cli/src/ (source root).

---

## How to run (observed)

From the repository root:
- Install all dependencies: `bun install`
- Run the CLI: `bun run --cwd cli index.ts` or `cd cli && bun run index.ts`

From cli/ directory:
- Install dependencies: `bun install`
- Run the CLI: `bun run index.ts`

Notes:
- The main entrypoint is `cli/src/index.ts`. It has a bun shebang: `#!/usr/bin/env bun`.
- Running the binary/TS file starts the CLI which expects a command name as first argument.

---

## Command-line behaviour (observed in src/core/cli.ts)

- The CLI entrypoint loads registered commands via `registerCommands()` (called from `src/index.ts`).
- CLI invocation expects a command name as first arg (otherwise logs an error and returns).
- Supported global flags (handled in code):
  - `-h`, `--help` — prints About, Commands (from registered commands), and More Info text.
  - `-v`, `--version` — resolves and imports `../../package.json` and prints package name and version.
- Command registration API is `registerCommand(cmd: Command)` where Command has the shape:
  - name: string
  - description: string
  - instructions: string
  - run: (args: string[]) => Promise<void> | void

- `src/commands/index.ts` currently exports `registerCommands()` but is empty (no commands registered yet).

---

## Project structure (observed)

- cli/
  - src/
    - index.ts         — program entry (calls registerCommands() and runCLI())
    - config.ts        — small config object (about_text, more_info_text)
    - core/
      - cli.ts         — CLI framework, Command type, registerCommand, runCLI
      - log.ts         — logging helpers (single/multi info/warn/err, title with figlet)
    - commands/
      - index.ts       — expected place to register project commands
    - functions/       — scaffold and orchestration functions
    - data/            — data modules (core, init, etc.)
  - package.json       — CLI package config with dependencies and scripts
  - tsconfig.json      — strict TypeScript settings (noEmit, ESNext, bundler resolution)
  - README.md          — install/run instructions (bun install, bun run index.ts)
  - CHANGELOG.md       — version history
  - .npmignore         — files to exclude from npm package

Root:
- package.json         — monorepo workspace config
- AGENTS.md            — this file

---

## Dependencies (observed in cli/package.json)

- runtime dependencies:
  - @clack/prompts
  - figlet
  - @types/figlet (type definitions)
- devDependencies:
  - @types/bun
  - typescript ^5

Scripts:
- `bun run build` - builds to dist/index.js
- `bun run build:exe` - builds standalone executable

---

## Logging conventions (observed in src/core/log.ts)

- There are `single` and `multi` logging helpers for info, warn, err.
- `log.title(title, subtitle?)` clears console and prints a figlet banner followed by a subtitle.
- Messages are logged with simple console methods and bracketed labels.

---

## How to add a command (observed pattern)

- Create a module that calls `registerCommand({ name, description, instructions, run })` where `run` accepts remaining CLI args array.
- Ensure `registerCommands()` in `src/commands/index.ts` imports and registers all commands (this function is called once from `src/index.ts`).
- Use the logging helpers in `src/core/log.ts` to print messages consistently.

Example (based on code patterns):
- A command module can look like:
  - import { registerCommand } from "../core/cli"
  - registerCommand({ name: "foo", description: "...", instructions: "...", run: async (args)=>{ /* ... */ } })

(Do not assume any command scaffolding exists beyond the registration API above.)

---

## TypeScript & build notes (observed)

- tsconfig.json sets `noEmit: true` and `moduleResolution: "bundler"`.
- The project appears intended to be executed directly with Bun (TypeScript support at runtime), not compiled to JS beforehand.
- `package.json` includes `module: "index.ts"` which points to the TypeScript module directly.

---

## Tests, lint, CI (observed)

- No test suites, test runner, linter scripts or CI configuration files were found in this snapshot.
- If tests or CI are added later, update this file with commands and patterns.

---

## Gotchas / non-obvious items (observed)

- Running with Node (without Bun) may not work since README and scripts rely on Bun and package.json references a TypeScript module directly.
- `runCLI` imports `../../package.json` when responding to `-v/--version`. That path is a relative import resolved from `src/core/cli.ts` at runtime; when running with Bun from `src/index.ts` this resolves to the CLI package's package.json (cli/package.json).
- `registerCommands()` is currently empty — the repository includes the hook but no commands. Agents adding commands must ensure that `cli/src/commands/index.ts` registers them so they are available from CLI.
- There are no unit tests; run manual verification by invoking `bun run --cwd cli index.ts <command>`.

---

## Recommended agent checklist (based only on observed files)

- Read `cli/src/core/cli.ts` and `cli/src/core/log.ts` before modifying CLI behaviour.
- When adding commands, implement and call `registerCommand(...)` and update `cli/src/commands/index.ts` to import/register them.
- Run `bun install` and `bun run index.ts` locally to verify runtime behaviour (README).
- Do not assume npm/Node scripts exist — package.json has no scripts defined.
- If adding build steps or tests, add explicit scripts to package.json and document them here.

---

## Files to inspect when working on this repo

- cli/src/index.ts
- cli/src/core/cli.ts
- cli/src/core/log.ts
- cli/src/commands/index.ts
- cli/package.json
- cli/tsconfig.json
- cli/CHANGELOG.md
- cli/README.md

---

## Documentation conventions

- **CHANGELOG.md** - Maintained in place, newest versions at top. Use [Keep a Changelog](https://keepachangelog.com) format. Update `[Unreleased]` section with changes, then create new version entry when releasing.
- **AGENTS.md** - This file. Update when discovering new commands, patterns, or conventions.
- **.npmignore** - Excludes source files and documentation from npm package. When adding new files to be excluded, update this file.

### Semver versioning (observed)

- Major (X.0.0): Breaking changes
- Minor (0.X.0): New features, backward compatible
- Patch (0.0.X): Bug fixes, backward compatible

### npm publishing workflow

```bash
# 1. Update cli/CHANGELOG.md - move [Unreleased] items to new version
# 2. Update cli/package.json version (follow semver)
# 3. push to github
# 4. cd cli && npm publish
```

The `prepack` script runs automatically during `npm publish`, so `bun run build` is not strictly required but recommended to verify the build before publishing.

---

If you need further details, run a repository search for the specific symbol/file before making changes and update AGENTS.md with any new conventions you discover.
