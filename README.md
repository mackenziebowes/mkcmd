# mkcmd

A CLI tool for scaffolding new CLI projects with sensible defaults. Create command-line tools with TypeScript, Bun runtime, and a solid core structure out of the box.

## Features

- **Interactive Setup** - Prompts for project name, location, and description
- **Complete CLI Framework** - Generates a working CLI with command registration, logging, and helpers
- **TypeScript + Bun** - Pre-configured with TypeScript and Bun runtime support
- **Core Utilities** - Includes `FileBuilder` for dynamic code generation and file utilities
- **Extensible** - Easy to add your own commands

> [!WARNING]
> While you can *run* the program in without Bun, the source code itself **depends on Bun** for development and building

## Run remotely

```bash
npx @mbsi/mkcmd init
# or
bun @mbsi/mkcmd init
```

## Installation

```bash
npm install -g @mbsi/mkcmd
# or
bun install -g @mbsi/mkcmd
```

## Quick Start

```bash
mkcmd init
```

The `init` command will prompt you for:
- Project name
- Target directory (defaults to `./<project-name>`)
- Project description

## What Gets Scaffolding

After running `mkcmd init`, you'll have a complete CLI project:

```
my-cli/
├── src/
│   ├── core/
│   │   ├── cli.ts              # CLI framework with command registration
│   │   ├── log.ts              # Logging helpers (single/multi info/warn/err, title)
│   │   └── helpers/
│   │       ├── file-builder.ts # Indentation-aware file builder
│   │       ├── file-utils.ts   # Path and file writing utilities
│   │       └── stringifier.ts  # Dynamic template code generation
│   ├── commands/
│   │   └── index.ts            # Command registration hook
│   └── config.ts               # Project configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### Running Your New CLI

```bash
cd my-cli
bun install
bun run src/index.ts --help
```

### Adding Commands

Commands are registered in `src/commands/index.ts`. Here's the pattern:

```typescript
import { registerCommand } from "../core/cli";

registerCommand({
  name: "greet",
  description: "Say hello",
  instructions: "Pass a name to greet",
  run: async (args: string[]) => {
    const name = args[0] || "world";
    console.log(`Hello, ${name}!`);
  }
});
```

Then run:

```bash
bun run src/index.ts greet
bun run src/index.ts greet Alice
```

### Using the File Builder

The included `FileBuilder` helps generate code files dynamically:

```typescript
import { FileBuilder } from "./core/helpers/file-builder";

const fb = new FileBuilder();
fb.addLine("export function hello() {");
fb.addLine('  console.log("Hello!");', 1);
fb.addLine("}");
const code = fb.build();
```

## CLI Flags

After installation, `mkcmd` supports:

```bash
mkcmd --help      # Show help
mkcmd --version   # Show version
```

## Requirements

- Bun runtime (for running the generated project)
- Node.js 16+ (for installation via npm)

## License

See LICENSE file for details.

---

**Version:** See `npm info @mbsi/mkcmd version`, `npx @mbsi/mkcmd --version`, or run `mkcmd --version` after installation.
