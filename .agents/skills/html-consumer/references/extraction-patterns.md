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
| `border: 1px solid var(--color)` | `border border-[var(--color)]` |
| `border-bottom: 2px solid var(--x)` | `border-b-2 border-[var(--x)]` |
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
| `color: var(--chalk-white)` | `text-[var(--chalk-white)]` |
| `background: var(--blueprint-bg)` | `bg-[var(--blueprint-bg)]` |

## Handling CSS Variables in Components

When converting CSS to Tailwind, preserve CSS variable references:

```tsx
// Instead of hardcoding colors:
<div className="bg-[#1c3b72] text-[#e6f1ff]">

// Use the CSS variables from globals.css:
<div className="bg-[var(--background)] text-[var(--foreground)]">
```

For custom variables that don't map to ShadCN, add them to globals.css first.
