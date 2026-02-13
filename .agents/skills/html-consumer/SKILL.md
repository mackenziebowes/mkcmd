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
