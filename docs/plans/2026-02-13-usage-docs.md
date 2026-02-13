# Usage Documentation Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a `/docs/usage` page documenting the mkcmd CLI for users with quick reference style.

**Architecture:** Single Next.js page using Blueprint-themed components. Terminal-first layout showing command flow, prompts reference table, and output file tree.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Blueprint-themed components

---

### Task 1: Create Docs Directory Structure

**Files:**
- Create: `app/client/app/docs/usage/page.tsx`

**Step 1: Create the docs/usage directory**

Run: `mkdir -p app/client/app/docs/usage`

**Step 2: Create empty page file**

Create `app/client/app/docs/usage/page.tsx` with minimal structure:

```tsx
export default function UsagePage() {
  return (
    <div>
      <h1>CLI Usage</h1>
    </div>
  );
}
```

**Step 3: Verify page loads**

Run: `cd app/client && bun run dev`
Visit: `http://localhost:3000/docs/usage`
Expected: Page renders with "CLI Usage" heading

**Step 4: Commit**

```bash
git add app/client/app/docs/usage/page.tsx
git commit -m "docs: add skeleton usage page"
```

---

### Task 2: Add BlueprintExplorerLayout with Sidebar

**Files:**
- Modify: `app/client/app/docs/usage/page.tsx`

**Step 1: Import and wrap with BlueprintExplorerLayout**

```tsx
import {
  BlueprintContainer,
  BlueprintExplorerLayout,
  BlueprintSidebar,
  BlueprintSidebarList,
  BlueprintSidebarItem,
  BlueprintNav,
  BlueprintFooter,
} from "@/components/themed";

const sidebarItems = [
  { label: "Usage", href: "/docs/usage" },
];

export default function UsagePage() {
  return (
    <BlueprintContainer>
      <BlueprintNav
        brand="MKCMD"
        subtitle="CLI Documentation"
        metadata={[
          { label: "VERSION", value: "1.0.0" },
          { label: "STATUS", value: "ACTIVE" },
        ]}
      />
      
      <BlueprintExplorerLayout
        sidebar={
          <BlueprintSidebar title="Documentation">
            <BlueprintSidebarList>
              {sidebarItems.map((item) => (
                <BlueprintSidebarItem
                  key={item.href}
                  href={item.href}
                  active={item.href === "/docs/usage"}
                >
                  {item.label}
                </BlueprintSidebarItem>
              ))}
            </BlueprintSidebarList>
          </BlueprintSidebar>
        }
      >
        <h1>CLI Usage</h1>
      </BlueprintExplorerLayout>

      <BlueprintFooter
        project="MKCMD"
        revision="REV-01"
        copyright="2026"
      />
    </BlueprintContainer>
  );
}
```

**Step 2: Verify layout renders**

Visit: `http://localhost:3000/docs/usage`
Expected: Page shows sidebar with "Usage" item active, main content area with heading

**Step 3: Commit**

```bash
git add app/client/app/docs/usage/page.tsx
git commit -m "docs: add explorer layout with sidebar"
```

---

### Task 3: Add Doc Header and Terminal Section

**Files:**
- Modify: `app/client/app/docs/usage/page.tsx`

**Step 1: Add imports and Doc Header**

Add imports:
```tsx
import {
  BlueprintContainer,
  BlueprintExplorerLayout,
  BlueprintSidebar,
  BlueprintSidebarList,
  BlueprintSidebarItem,
  BlueprintNav,
  BlueprintFooter,
  BlueprintDocHeader,
  BlueprintTerminal,
} from "@/components/themed";
```

Replace `<h1>CLI Usage</h1>` with:

```tsx
<div className="mb-12">
  <BlueprintDocHeader
    title="CLI Usage"
    status="ACTIVE"
    metadata={[
      { label: "PACKAGE", value: "@mbsi/mkcmd" },
      { label: "COMMAND", value: "init" },
    ]}
  />
</div>

<section className="mb-16">
  <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
    Quick Start
  </h2>
  <BlueprintTerminal
    commands={["bunx @mbsi/mkcmd init"]}
    output={[
      "? Project name: my-cli",
      "? Target directory: ./my-cli",
      "? Description: A new CLI tool",
      "✓ Project scaffolded successfully!",
    ]}
  />
</section>
```

**Step 2: Verify terminal renders**

Visit: `http://localhost:3000/docs/usage`
Expected: Doc header with "CLI Usage" title, terminal showing `bunx @mbsi/mkcmd init` with animated output

**Step 3: Commit**

```bash
git add app/client/app/docs/usage/page.tsx
git commit -m "docs: add doc header and terminal section"
```

---

### Task 4: Add Prompts Reference Table

**Files:**
- Modify: `app/client/app/docs/usage/page.tsx`

**Step 1: Add BlueprintArgTable import and section**

Add `BlueprintArgTable` to imports.

Add after terminal section:

```tsx
<section className="mb-16">
  <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
    Prompts Reference
  </h2>
  <BlueprintArgTable
    headers={["Prompt", "Type", "Description"]}
    rows={[
      ["Project name", "text", "Name for the new CLI (used in package.json)"],
      ["Target directory", "text", "Where to scaffold (default: ./&lt;project-name&gt;)"],
      ["Description", "text", "Short description for package.json and README"],
    ]}
  />
  <div className="mt-6 text-sm text-(--ink-secondary)">
    <p>
      <strong>Global flags:</strong> <code className="bg-(--paper) px-1">-h, --help</code> shows help, <code className="bg-(--paper) px-1">-v, --version</code> prints version.
    </p>
  </div>
</section>
```

**Step 2: Verify table renders**

Visit: `http://localhost:3000/docs/usage`
Expected: Arg table with 3 rows showing prompts, types, descriptions. Global flags note below.

**Step 3: Commit**

```bash
git add app/client/app/docs/usage/page.tsx
git commit -m "docs: add prompts reference table"
```

---

### Task 5: Add Output Files Section

**Files:**
- Modify: `app/client/app/docs/usage/page.tsx`

**Step 1: Add BlueprintCodeBlock import and section**

Add `BlueprintCodeBlock` to imports.

Add after prompts section:

```tsx
<section className="mb-16">
  <h2 className="text-lg uppercase font-normal border-b-2 border-(--ink-primary) pb-2 mb-6">
    Output Files
  </h2>
  <BlueprintCodeBlock
    label="Scaffolded Project Structure"
    code={`my-cli/
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
└── README.md`}
  />
  <div className="mt-6 text-sm text-(--ink-secondary)">
    <p>
      Create <code className="bg-(--paper) px-1">src/index.ts</code> as your entry point, then run with <code className="bg-(--paper) px-1">bun run src/index.ts &lt;command&gt;</code>
    </p>
  </div>
</section>
```

**Step 2: Verify file tree renders**

Visit: `http://localhost:3000/docs/usage`
Expected: Code block showing file tree structure. Note below about entry point.

**Step 3: Commit**

```bash
git add app/client/app/docs/usage/page.tsx
git commit -m "docs: add output files section"
```

---

### Task 6: Final Verification and Cleanup

**Step 1: Run dev server and verify full page**

Run: `cd app/client && bun run dev`
Visit: `http://localhost:3000/docs/usage`

Verify:
- Sidebar shows "Usage" as active
- Doc header with "CLI Usage" and status pill
- Terminal animates with `bunx @mbsi/mkcmd init`
- Arg table shows 3 prompts
- File tree shows correct structure
- Footer renders at bottom

**Step 2: Check for TypeScript errors**

Run: `cd app/client && bun run typecheck` (or equivalent)
Expected: No errors

**Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "docs: finalize usage page"
```

---

## Summary

6 tasks, ~30 minutes total. Creates a complete `/docs/usage` page with:
- Blueprint-themed layout with sidebar navigation
- Animated terminal showing CLI flow
- Prompts reference table
- Output file tree
- Quick reference notes throughout
