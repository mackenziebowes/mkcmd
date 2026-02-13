# HTML Consumer Skill Design

## Overview

A skill that autonomously consumes HTML/CSS designs and extracts ShadCN themes and React components for use in Next.js applications.

## Requirements Summary

- **Trigger:** Consume HTML designs - extracts both theme AND components
- **Workflow:** Fully autonomous - no step-by-step confirmation
- **Theme output:** `app/client/app/globals.css`
- **Component output:** `components/themed/`
- **Color mapping:** Heuristic-based (most prominent → primary, etc.)
- **Color format:** Preserve original format (hex, rgb, oklch, lab) - no conversion
- **Dark mode:** Light theme only, skip dark mode generation
- **Fonts:** Full integration with `next/font/google`
- **Component identification:** Semantic sections (nav, hero, card, footer, button, terminal)

## Skill Structure

```
html-consumer/
├── SKILL.md                    # ~150 lines, core workflow
└── references/
    └── extraction-patterns.md  # ~200 lines, concrete examples
```

### SKILL.md Contents

**YAML Frontmatter:**
```yaml
---
name: html-consumer
description: |
  Consumes HTML/CSS designs and extracts ShadCN themes and React components. 
  Use when the user wants to convert HTML mockups, design files, or styled 
  HTML pages into their Next.js app. Triggers: "convert this HTML", 
  "extract theme from", "turn this design into components", "consume this 
  HTML file", or when provided with an HTML file path to process.
---
```

**Body Contents:**
- High-level workflow (parse → extract theme → identify components → generate)
- File locations (globals.css path, components/themed/ path)
- Font integration steps
- Key behaviors summary

### references/extraction-patterns.md Contents

- CSS var → ShadCN var mapping heuristics with examples
- Component identification patterns (what classes/structures indicate nav, hero, card, etc.)
- CSS → Tailwind conversion examples
- Common HTML structure patterns

## Workflow

```
1. PARSE HTML
   - Read the provided HTML file
   - Extract <style> contents
   - Identify CSS custom properties (:root vars)
   - Note font imports

2. EXTRACT THEME
   - Map colors to ShadCN variables using heuristics:
     * Most prominent color → --primary
     * Secondary prominent → --secondary
     * Background color → --background, --card, --popover
     * Text color → --foreground
     * Accent/highlight colors → --accent
     * Border colors → --border, --input
   - Preserve original color format (hex, rgb, oklch, lab, etc.) - no conversion
   - Extract border-radius → --radius
   - Extract fonts → --font-sans, --font-mono, --font-serif

3. INTEGRATE FONTS
   - Add next/font/google imports to layout.tsx
   - Update CSS variables for font families

4. IDENTIFY COMPONENTS
   - Scan for semantic sections: nav, hero, card, terminal, footer, button
   - Extract relevant CSS classes for each

5. GENERATE OUTPUT
   - Update globals.css with new theme (light mode only)
   - Create React components in components/themed/
   - Convert CSS to Tailwind classes
```

## Color Mapping Heuristics

| Source Pattern | ShadCN Variable |
|----------------|-----------------|
| Body/page background | --background |
| Card/container backgrounds | --card, --popover |
| Main text color | --foreground |
| Primary CTA/headline color | --primary |
| Secondary UI elements | --secondary |
| Accent/highlight colors | --accent |
| Subdued text | --muted-foreground |
| Border colors | --border, --input |

## Component Identification Patterns

| Section | Detection Patterns |
|---------|-------------------|
| Nav | `<nav>`, `.nav-`, logo + links structure |
| Hero | Large headline + CTA + description, first content section |
| Card | `.card`, `.spec-card`, bordered containers with title + content |
| Terminal | `.terminal`, code-style containers, monospace elements |
| Footer | `<footer>`, bottom section with links/copyright |
| Button | `.btn-`, `<button>`, CTA elements |

## CSS to Tailwind Conversion Examples

| CSS | Tailwind |
|-----|----------|
| `padding: 20px` | `p-5` |
| `margin: 10px 0` | `my-2.5` |
| `border: 1px solid var(--color)` | `border border-(--color)` |
| `display: flex; gap: 20px` | `flex gap-5` |
| `grid-template-columns: repeat(3, 1fr)` | `grid grid-cols-3` |
| `border-radius: 8px` | `rounded-lg` |

## Output Locations

- Theme: `app/client/app/globals.css` (updates `:root` and `.light` sections)
- Components: `components/themed/<component-name>.tsx`
- Fonts: `app/client/app/layout.tsx` (add imports and CSS variable assignments)

## Example Usage

User: "Convert the variant/blue-concept-landing.html into my app"

Agent would:
1. Parse blue-concept-landing.html
2. Extract: `--blueprint-bg` → `--background`, `--chalk-white` → `--foreground`, etc.
3. Identify: nav, hero, terminal-section, specs-section (cards), footer
4. Generate: Updated globals.css + 5 component files in components/themed/
