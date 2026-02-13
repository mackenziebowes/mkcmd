# AGENTS.md

This document describes what an autonomous agent (or future contributor) needs to know to work effectively in the app folder.

---

## Project type

Full-stack web application with:
- **client/** - Next.js 16 frontend (React 19, Tailwind CSS 4, ShadCN UI)
- **server/** - Hono backend API (Bun runtime)
- **client-meta/** - Documentation for ShadCN and theme utilities
- **client-utility/** - Theme installation utilities (TweakCN)

Runtime: Bun
Package manager: bun

---

## How to run

### Prerequisites
Set environment variables before running:
- Client: `NEXT_PUBLIC_ENVIRONMENT=LOCAL` (or `PRODUCTION`)
- Server: `ENVIRONMENT=LOCAL` (or `PRODUCTION`)

### From repository root (monorepo)
```bash
bun install                                    # Install all dependencies
bun run --cwd app/client dev                   # Start Next.js dev server (port 3000)
bun run --cwd app/server dev                   # Start Hono API server (port 3050)
```

### From app/ subdirectories
```bash
cd app/client && bun run dev                   # Next.js on port 3000
cd app/server && bun run dev                   # Hono API on port 3050
```

Both servers must run simultaneously for full functionality. The client fetches from the server at `http://localhost:3050`.

---

## Project structure

```
app/
├── index.ts              # Placeholder (bun init boilerplate)
├── package.json          # Minimal package config
├── tsconfig.json         # Root TS config (ESNext, strict)
├── bun.lock              # Lockfile (consider removing in monorepo)
│
├── client/               # Next.js frontend
│   ├── app/
│   │   ├── _components/  # Server-only components (ServerCheck)
│   │   ├── globals.css   # Tailwind CSS + theme variables
│   │   ├── layout.tsx    # Root layout with Geist fonts
│   │   └── page.tsx      # Home page
│   ├── components/ui/    # ShadCN UI components (40+ pre-installed)
│   ├── hooks/            # Custom React hooks
│   ├── lib/
│   │   ├── api.ts        # API fetcher using config
│   │   ├── config.ts     # Environment-based config (LOCAL/PRODUCTION)
│   │   ├── utils.ts      # Utility functions (cn helper)
│   │   └── zustand/      # Zustand stores (example included)
│   ├── components.json   # ShadCN configuration
│   ├── next.config.ts    # Next.js config
│   ├── package.json      # Dependencies: React 19, Next 16, ShadCN, TanStack Query, Zustand
│   └── tsconfig.json     # TS config with @/* path alias
│
├── server/               # Hono API backend
│   ├── src/
│   │   ├── index.ts      # Entry point, exports Bun server
│   │   ├── root.ts       # Hono app with CORS, error handling, routes
│   │   └── config/
│   │       └── environment.ts  # Environment config (LOCAL/PRODUCTION)
│   ├── package.json      # Dependencies: Hono
│   └── tsconfig.json     # TS config with hono/jsx
│
├── client-meta/          # Documentation
│   ├── shadcn.md         # ShadCN component install command reference
│   └── tweakcn.md        # TweakCN theme documentation
│
└── client-utility/       # Utilities
    └── styling/
        └── tweakcn.ts    # TweakCN theme installation commands
```

---

## Dependencies

### client/package.json
**Runtime:**
- React 19.2.3, Next.js 16.1.6
- ShadCN UI (via radix-ui, @base-ui/react)
- TanStack Query v5
- Zustand v5 (state management)
- Tailwind CSS 4
- Lucide icons, date-fns, zod, sonner

**Dev:**
- TypeScript 5, ESLint 9
- Tailwind CLI, ShadCN CLI

**Scripts:**
- `bun run dev` - Next.js dev server (port 3000)
- `bun run build` - Production build
- `bun run start` - Production server (port 3000)
- `bun run lint` - ESLint

### server/package.json
**Runtime:**
- Hono 4.11.9

**Scripts:**
- `bun run dev` - Hono server with hot reload (port 3050)

---

## Configuration

### Environment variables

**client/lib/config.ts:**
- `NEXT_PUBLIC_ENVIRONMENT=LOCAL` → API at `http://localhost:3050`
- `NEXT_PUBLIC_ENVIRONMENT=PRODUCTION` → API URL empty (configure for deployment)

**server/src/config/environment.ts:**
- `ENVIRONMENT=LOCAL` → CORS allows `http://localhost:3000`
- `ENVIRONMENT=PRODUCTION` → CORS allows all origins

### ShadCN (client/components.json)
- Style: new-york
- RSC: enabled
- Icon library: lucide
- Path alias: `@/*` maps to `./`

---

## UI Components (ShadCN)

40+ components pre-installed in `client/components/ui/`. See `client-meta/shadcn.md` for the install command used.

To add more:
```bash
cd app/client && bunx --bun shadcn@latest add <component-name>
```

---

## Theming (TweakCN)

Default theme: **Graphite**

To change themes, run any command from `client-utility/styling/tweakcn.ts` in the client directory:
```bash
cd app/client && bunx shadcn@latest add https://tweakcn.com/r/themes/<theme-name>.json
```

See `client-meta/tweakcn.md` for details.

---

## API Pattern

**client/lib/api.ts:**
```typescript
const data = await getAPI({ route: "/" });
```

Currently supports `resource: "main"` (default) pointing to the Hono server. Extend for additional resources.

---

## State Management (Zustand)

Example store at `client/lib/zustand/example_store.ts` with example component at `client/lib/zustand/example_component.tsx`.

---

## Tests, lint, CI

- Lint: `bun run --cwd app/client lint`
- No test suites or CI configuration found

---

## Gotchas

- Both client and server must run for ServerCheck component to work
- `NEXT_PUBLIC_ENVIRONMENT` must be set for client to know API URL
- `ENVIRONMENT` must be set for server CORS configuration
- Multiple bun.lock files exist (app/, app/client/, app/server/) - in monorepo context, these may need consolidation
- Server uses Hono's JSX import source (`hono/jsx`) for potential server-side JSX

---

## Files to inspect when working on this app

- app/client/app/layout.tsx
- app/client/app/page.tsx
- app/client/lib/api.ts
- app/client/lib/config.ts
- app/server/src/root.ts
- app/server/src/config/environment.ts
- app/client/components.json
- app/client/package.json
- app/server/package.json

---

Update this file when discovering new patterns, adding features, or changing configuration.
