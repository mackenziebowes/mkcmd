# mkcmd

A remote node executable for scaffolding other remote node executables with sensible defaults.

## Features

- **Interactive Project Setup** - Prompts for project name, target directory, and description using `@clack/prompts`
- **Full CLI Scaffold** - Generates a complete CLI project structure with configuration files
- **Core Utilities Included** - Ships with `file-builder.ts` and `file-utils.ts` for dynamic code generation
- **TypeScript & Bun** - Pre-configured TypeScript settings and Bun runtime support
- **Dynamic Core Copying** - Automatically copies all core CLI files to your new project

## What Gets Scaffolding

When you run `mkcmd init`, it creates:

```
project-name/
├── src/
│   ├── core/
│   │   ├── cli.ts          # CLI framework with command registration
│   │   ├── log.ts          # Logging helpers (single/multi info/warn/err, title)
│   │   ├── file-builder.ts # Indentation-aware file builder
│   │   └── file-utils.ts   # Path caching and file writing utilities
│   ├── commands/
│   │   └── index.ts        # Command registration hook
│   └── config.ts           # Project configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### For Development

```bash
bun install
```

### From npm (after publishing)

```bash
npm install -g mkcmd
# or
bun install -g mkcmd
```

## Usage

### Development

```bash
# Show help
bun run src/index.ts --help

# Show version
bun run src/index.ts --version

# Initialize a new CLI project
bun run src/index.ts init
```

### Using Built Distribution

```bash
# Build for Bun runtime
bun run build
bun dist/index.js --help

# Build standalone executable
bun run build:exe
./dist/mkcmd --help
```

### After Installation (from npm)

```bash
mkcmd --help
mkcmd init
```

The `init` command will prompt you for:
- Project name
- Target directory (defaults to `./<project-name>`)
- Project description

## Building for npm

To build and prepare for publishing:

```bash
# Build the bundled JS file (requires Bun runtime)
bun run build

# Build standalone executable (works without Bun)
bun run build:exe

# Publish to npm
npm publish
```

**Note**: The default build (`bun run build`) produces a bundled JS file that requires Bun to run. The standalone executable (`bun run build:exe`) works independently but is platform-specific.

## Development

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

See [AGENTS.md](./AGENTS.md) for development guidelines and [RETRO.md](./RETRO.md) for session retrospective.
