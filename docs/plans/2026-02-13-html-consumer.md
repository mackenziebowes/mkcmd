# HTML Consumer Skill Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a skill that autonomously consumes HTML/CSS designs and extracts ShadCN themes and React components.

**Architecture:** Reference-based skill with SKILL.md containing workflow instructions and references/extraction-patterns.md containing concrete mapping examples. No scripts or templates - relies on Claude's interpretation of patterns.

**Tech Stack:** Markdown skill files following skill-creator conventions

---

## Task 1: Initialize Skill Structure

**Files:**
- Create: `.agents/skills/html-consumer/SKILL.md`
- Create: `.agents/skills/html-consumer/references/extraction-patterns.md`

**Step 1: Create skill directory**

Run: `mkdir -p .agents/skills/html-consumer/references`
Expected: Directory created

**Step 2: Create SKILL.md with frontmatter**

Create `.agents/skills/html-consumer/SKILL.md`:

```markdown
---
name: html-consumer
description: |
  Consumes HTML/CSS designs and extracts ShadCN themes and React components. 
  Use when the user wants to convert HTML mockups, design files, or styled 
  HTML pages into their Next.js app. Triggers: "convert this HTML", 
  "extract theme from", "turn this design into components", "consume this 
  HTML file", or when provided with an HTML file path to process.
---

# HTML Consumer

Autonomously consume HTML/CSS designs and extract ShadCN themes and React components.

## Output Locations

- **Theme:** `app/client/app/globals.css`
- **Components:** `components/themed/`
- **Fonts:** `app/client/app/layout.tsx`

## Workflow

Execute these steps in order:

### 1. Parse HTML

Read the HTML file and extract:
- `<style>` contents
- CSS custom properties (`:root` vars)
- Font imports (Google Fonts, etc.)

### 2. Extract Theme

Map CSS variables to ShadCN theme variables using heuristics (see references/extraction-patterns.md).

**Key rules:**
- Preserve original color format (hex, rgb, oklch, lab) - DO NOT convert
- Update only `:root` and `.light` sections in globals.css
- Skip dark mode generation

### 3. Integrate Fonts

For Google Fonts:
1. Add import in `app/client/app/layout.tsx` using `next/font/google`
2. Update CSS variables (`--font-sans`, `--font-mono`, `--font-serif`)

Example:
```tsx
import { JetBrains_Mono, Oswald } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-head" });
```

### 4. Identify Components

Scan HTML for semantic sections (see references/extraction-patterns.md for detection patterns):
- Nav
- Hero
- Card
- Terminal
- Footer
- Button

### 5. Generate Output

1. Update `app/client/app/globals.css` with extracted theme
2. Create React components in `components/themed/`
3. Convert CSS to Tailwind classes

## Key Behaviors

- Fully autonomous - no step-by-step user confirmation
- Light theme only
- Preserve original color formats
- Use heuristic mapping for colors
- Semantic component identification
```

**Step 3: Commit**

```bash
git add .agents/skills/html-consumer/SKILL.md
git commit -m "feat(skills): add html-consumer SKILL.md"
```

---

## Task 2: Create Extraction Patterns Reference

**Files:**
- Create: `.agents/skills/html-consumer/references/extraction-patterns.md`

**Step 1: Create the reference document**

Create `.agents/skills/html-consumer/references/extraction-patterns.md`:

```markdown
# Extraction Patterns

Concrete patterns for mapping HTML/CSS to ShadCN themes and React components.

## Color Mapping Heuristics

### Identifying Theme Colors

| Source Pattern | ShadCN Variable | How to Identify |
|----------------|-----------------|-----------------|
| Body background | `--background` | `body { background-color: }` or main container bg |
| Card/container bg | `--card`, `--popover` | Secondary background colors, slightly different from main |
| Main text | `--foreground` | `body { color: }` or primary text color |
| Primary CTA/brand | `--primary` | Most prominent accent color, CTAs, brand elements |
| Secondary UI | `--secondary` | Less prominent accent, supporting elements |
| Highlight/hover | `--accent` | Hover states, highlights, callouts |
| Subdued text | `--muted-foreground` | Dimmed text, secondary descriptions |
| Subtle backgrounds | `--muted` | Disabled backgrounds, subtle sections |
| Borders | `--border` | `border:` colors on containers |
| Inputs | `--input` | Form input backgrounds/borders |
| Focus rings | `--ring` | Focus state colors |

### Example Mappings

From `variant/blue-concept-landing.html`:
```
--blueprint-bg: #1c3b72     → --background
--chalk-white: #e6f1ff      → --foreground  
--chalk-dim: rgba(...0.6)   → --muted-foreground
--accent-yellow: #f0e68c    → --accent
--grid-line: rgba(...0.1)   → --border
```

From `variant/white-concept-landing.html`:
```
--paper: #fcfcfc           → --background
--ink-primary: #3d5afe     → --primary
--ink-secondary: #8c9eff   → --secondary
--grid-line: #e0e6ff       → --border
```

## Component Identification Patterns

### Nav

**HTML patterns:**
- `<nav>` element
- Classes containing: `nav`, `navbar`, `header`
- Structure: logo + navigation links side by side

**CSS patterns:**
- `display: flex; justify-content: space-between`
- Fixed/sticky positioning
- Horizontal link list

**Example from variants:**
```html
<nav>
  <div class="logo">MKCMD_CLI</div>
  <div class="nav-links">
    <div class="nav-item">01_INSTALL</div>
  </div>
</nav>
```

### Hero

**HTML patterns:**
- Large headline (h1)
- Description paragraph
- CTA button
- Often first content section after nav

**CSS patterns:**
- Large font sizes (2rem+)
- Two-column grid layout common
- Prominent positioning

**Example from variants:**
```html
<section class="hero">
  <div class="hero-content">
    <h1>Blueprint Your<br>AI Infrastructure</h1>
    <p class="hero-desc">...</p>
    <button class="btn-construct">...</button>
  </div>
</section>
```

### Card

**HTML patterns:**
- `<div>` with card-related class
- Title + description structure
- Often in grid layouts (3-column common)

**CSS patterns:**
- Bordered container
- Padding for content
- Hover effects common

**Classes to look for:** `.card`, `.spec-card`, `.feature-node`, `.node`

### Terminal

**HTML patterns:**
- Monospace font
- Command-like content
- Window chrome (dots, header bar)

**CSS patterns:**
- Dark or distinct background
- `font-family: monospace`
- Code-like coloring (`.command`, `.arg`, `.flag`)

**Classes to look for:** `.terminal`, `.terminal-section`, `.terminal-body`

### Footer

**HTML patterns:**
- `<footer>` element
- Copyright text
- Link grids
- Bottom of page

**CSS patterns:**
- Border-top separator
- Grid layout for links
- Smaller font sizes

### Button

**HTML patterns:**
- `<button>` or `<a>` elements
- CTA styling

**CSS patterns:**
- Padding + border
- Hover transitions
- Often uppercase text

**Classes to look for:** `.btn-`, `.button`, CTA elements

## CSS to Tailwind Conversions

### Spacing

| CSS | Tailwind |
|-----|----------|
| `padding: 4px` | `p-1` |
| `padding: 8px` | `p-2` |
| `padding: 20px` | `p-5` |
| `padding: 30px` | `p-7.5` or `p-[30px]` |
| `margin: 10px 0` | `my-2.5` |
| `gap: 20px` | `gap-5` |
| `gap: 40px` | `gap-10` |

### Layout

| CSS | Tailwind |
|-----|----------|
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `grid-template-columns: repeat(3, 1fr)` | `grid grid-cols-3` |
| `justify-content: space-between` | `justify-between` |
| `align-items: center` | `items-center` |

### Borders

| CSS | Tailwind |
|-----|----------|
| `border: 1px solid var(--color)` | `border border-(--color)` |
| `border-bottom: 2px solid var(--x)` | `border-b-2 border-(--x)` |
| `border-radius: 8px` | `rounded-lg` |

### Typography

| CSS | Tailwind |
|-----|----------|
| `font-size: 0.9rem` | `text-sm` |
| `font-size: 1.2rem` | `text-xl` |
| `font-weight: 300` | `font-light` |
| `text-transform: uppercase` | `uppercase` |
| `letter-spacing: 2px` | `tracking-wider` |

### Colors with CSS Variables

| CSS | Tailwind |
|-----|----------|
| `color: var(--chalk-white)` | `text-(--chalk-white)` |
| `background: var(--blueprint-bg)` | `bg-(--blueprint-bg)` |

## Handling CSS Variables in Components

When converting CSS to Tailwind, preserve CSS variable references:

```tsx
// Instead of hardcoding colors:
<div className="bg-[#1c3b72] text-[#e6f1ff]">

// Use the CSS variables from globals.css:
<div className="bg-(--background) text-(--foreground)">
```

For custom variables that don't map to ShadCN, add them to globals.css first.
```

**Step 2: Commit**

```bash
git add .agents/skills/html-consumer/references/extraction-patterns.md
git commit -m "feat(skills): add html-consumer extraction patterns reference"
```

---

## Task 3: Create components/themed Directory

**Files:**
- Create: `app/client/components/themed/.gitkeep`

**Step 1: Create the directory**

Run: `mkdir -p app/client/components/themed`

**Step 2: Add .gitkeep**

```bash
touch app/client/components/themed/.gitkeep
```

**Step 3: Commit**

```bash
git add app/client/components/themed/.gitkeep
git commit -m "feat: create components/themed directory for html-consumer output"
```

---

## Task 4: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

**Step 1: Add skill documentation**

Add to `AGENTS.md` in the appropriate section:

```markdown
## Agent Skills

Skills are located in `.agents/skills/`. Each skill has a SKILL.md with instructions.

### html-consumer

Consumes HTML/CSS designs and extracts ShadCN themes and React components.

**Triggers:** "convert this HTML", "extract theme from", "turn this design into components"

**Output:**
- Theme: `app/client/app/globals.css`
- Components: `app/client/components/themed/`
```

**Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs: document html-consumer skill in AGENTS.md"
```

---

## Task 5: Package the Skill

**Files:**
- Package: `.agents/skills/html-consumer/` → `html-consumer.skill`

**Step 1: Run the packaging script**

Run: `python .agents/skills/skill-creator/scripts/package_skill.py .agents/skills/html-consumer`

Expected: Creates `html-consumer.skill` file

**Step 2: Verify package contents**

Run: `unzip -l html-consumer.skill`

Expected: Lists SKILL.md and references/extraction-patterns.md

---

## Execution Summary

After completion:
1. Skill is available at `.agents/skills/html-consumer/`
2. Package file `html-consumer.skill` can be distributed
3. Components output directory ready at `app/client/components/themed/`
4. AGENTS.md documents the new skill
