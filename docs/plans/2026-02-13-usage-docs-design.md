# Usage Documentation Page Design

## Overview

Create a `/docs/usage` page in the web app to document the mkcmd CLI for users. Quick reference style: show what to type, what prompts appear, and what files get created.

## Audience

CLI users — people running `bunx @mbsi/mkcmd init` to scaffold new CLI projects.

## Page Structure

**URL:** `/docs/usage`
**File:** `app/client/app/docs/usage/page.tsx`

Uses `BlueprintExplorerLayout` with sidebar navigation for future extensibility.

## Components

| Component | Purpose |
|-----------|---------|
| `BlueprintExplorerLayout` | Two-column layout (sidebar + content) |
| `BlueprintSidebar` | Navigation sidebar |
| `BlueprintSidebarList` | Renders sidebar items |
| `BlueprintDocHeader` | Page title "CLI Usage" with status pill "ACTIVE" |
| `BlueprintTerminal` | Animated command flow |
| `BlueprintArgTable` | Prompts reference table |
| `BlueprintCodeBlock` | Output file tree |

## Sections

### 1. Doc Header

```
BlueprintDocHeader
- title: "CLI Usage"
- status: "ACTIVE"
```

### 2. Terminal Section

Animated `BlueprintTerminal` showing:

```
$ bunx @mbsi/mkcmd init
? Project name: my-cli
? Target directory: ./my-cli
? Description: A new CLI tool
✓ Project scaffolded successfully!
```

### 3. Prompts Reference

`BlueprintArgTable` with:

| Prompt | Type | Description |
|--------|------|-------------|
| Project name | text | Name for the new CLI (used in package.json) |
| Target directory | text | Where to scaffold (default: `./<project-name>`) |
| Description | text | Short description for package.json and README |

Brief note about global flags: `-h/--help` and `-v/--version`.

### 4. Output Files

`BlueprintCodeBlock` showing scaffolded structure:

```
my-cli/
├── src/
│   ├── config.ts
│   ├── core/
│   │   ├── cli.ts
│   │   ├── log.ts
│   │   └── helpers/
│   │       ├── file-builder.ts
│   │       ├── stringifier.ts
│   │       └── file-utils.ts
│   └── commands/
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

Note: "Create `src/index.ts` as your entry point, then run with `bun run src/index.ts <command>`"

## Sidebar

Single item "Usage" active. Structure allows adding more docs pages later (e.g., "Getting Started", "API Reference").
