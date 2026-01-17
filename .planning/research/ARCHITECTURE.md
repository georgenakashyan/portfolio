# Architecture Patterns: Color System for Dark Theme

**Domain:** Tailwind CSS + CSS Custom Properties color architecture
**Researched:** 2026-01-16
**Confidence:** HIGH (verified via official Tailwind docs and established design system patterns)

## Recommended Architecture: Three-Layer Token System

The most maintainable architecture for your color system uses three distinct layers of abstraction. This separates raw values from semantic meaning from component usage.

```
Layer 1: Primitive Tokens (raw color values)
    |
    v
Layer 2: Semantic Tokens (purpose-based mappings)
    |
    v
Layer 3: Tailwind Theme Extension (utilities available in classes)
```

### Why Three Layers?

| Layer | Purpose | Changes When |
|-------|---------|--------------|
| Primitive | Define the actual hex/oklch values | Rebrand, palette refresh |
| Semantic | Map primitives to purposes (background, text, accent) | Theme switching, A/B testing |
| Tailwind | Expose semantic tokens as utilities | Never (stable API) |

**Key benefit:** When refreshing your moody/dark palette, you only modify Layer 1. Layers 2 and 3 remain stable.

---

## Current State Analysis

Your existing setup has a **partial two-layer system**:

```css
/* globals.css - Layer 1+2 combined */
:root {
  --background-start: #0a0e27;  /* Primitive + semantic conflated */
  --primary-start: #3b82f6;
}
```

```typescript
/* tailwind.config.ts - Layer 3 */
colors: {
  "background-start": "var(--background-start)",
}
```

**Issues with current approach:**
1. Primitive and semantic layers are merged (can't swap palette easily)
2. No intermediate abstraction for component-level tokens
3. Gradient colors treated as primitives rather than semantic concepts

---

## Recommended Structure

### Layer 1: Primitive Tokens (globals.css)

Define your raw color palette. These are your actual color values with no semantic meaning.

```css
:root {
  /* =========================
     PRIMITIVE COLOR PALETTE
     These are raw values only. Never use directly in components.
     ========================= */

  /* Neutral scale - dark moody palette */
  --color-neutral-950: #0a0a0f;
  --color-neutral-900: #121218;
  --color-neutral-850: #1a1a23;
  --color-neutral-800: #24242e;
  --color-neutral-700: #36364a;
  --color-neutral-600: #4a4a66;
  --color-neutral-500: #6b6b8a;
  --color-neutral-400: #9090a8;
  --color-neutral-300: #b8b8cc;
  --color-neutral-200: #d4d4e0;
  --color-neutral-100: #ebebf0;
  --color-neutral-50: #f8f8fa;

  /* Primary accent scale - for gradients */
  --color-primary-700: #1d4ed8;
  --color-primary-600: #2563eb;
  --color-primary-500: #3b82f6;
  --color-primary-400: #60a5fa;
  --color-primary-300: #93c5fd;

  /* Secondary accent scale */
  --color-violet-700: #6d28d9;
  --color-violet-600: #7c3aed;
  --color-violet-500: #8b5cf6;
  --color-violet-400: #a78bfa;

  /* Accent colors */
  --color-cyan-500: #06b6d4;
  --color-cyan-400: #22d3ee;
  --color-emerald-500: #10b981;
  --color-rose-500: #f43f5e;
  --color-amber-500: #f59e0b;
}
```

### Layer 2: Semantic Tokens (globals.css, after primitives)

Map primitives to their purposes. This is where theming happens.

```css
:root {
  /* =========================
     SEMANTIC TOKENS - SURFACES
     ========================= */
  --surface-base: var(--color-neutral-950);
  --surface-raised: var(--color-neutral-900);
  --surface-overlay: var(--color-neutral-850);
  --surface-sunken: var(--color-neutral-950);

  /* =========================
     SEMANTIC TOKENS - TEXT
     ========================= */
  --text-primary: var(--color-neutral-100);
  --text-secondary: var(--color-neutral-400);
  --text-muted: var(--color-neutral-500);
  --text-inverse: var(--color-neutral-950);

  /* =========================
     SEMANTIC TOKENS - ACCENTS
     ========================= */
  --accent-primary: var(--color-primary-500);
  --accent-primary-hover: var(--color-primary-400);
  --accent-secondary: var(--color-violet-500);
  --accent-tertiary: var(--color-cyan-500);
  --accent-success: var(--color-emerald-500);
  --accent-warning: var(--color-amber-500);
  --accent-error: var(--color-rose-500);

  /* =========================
     SEMANTIC TOKENS - GRADIENTS
     (defined as endpoint pairs)
     ========================= */
  --gradient-primary-from: var(--color-primary-500);
  --gradient-primary-to: var(--color-violet-500);
  --gradient-surface-from: var(--color-neutral-950);
  --gradient-surface-to: var(--color-neutral-900);

  /* =========================
     SEMANTIC TOKENS - BORDERS
     ========================= */
  --border-subtle: var(--color-neutral-800);
  --border-default: var(--color-neutral-700);
  --border-strong: var(--color-neutral-600);
  --border-accent: var(--color-primary-500);

  /* =========================
     SEMANTIC TOKENS - SHADOWS
     (for dark themes, use subtle colored glows)
     ========================= */
  --shadow-color: var(--color-primary-500);
  --shadow-subtle: 0 2px 8px -2px rgba(0, 0, 0, 0.3);
  --shadow-elevated: 0 8px 24px -4px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px -5px var(--shadow-color);

  /* =========================
     SEMANTIC TOKENS - OVERLAYS
     ========================= */
  --overlay-light: rgba(255, 255, 255, 0.05);
  --overlay-medium: rgba(255, 255, 255, 0.10);
  --overlay-heavy: rgba(255, 255, 255, 0.15);
  --overlay-backdrop: rgba(10, 10, 15, 0.80);
}
```

### Layer 3: Tailwind Theme Extension (tailwind.config.ts)

Expose semantic tokens as Tailwind utilities. This is your stable API.

```typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
          sunken: "var(--surface-sunken)",
        },
        // Text colors
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
        },
        // Accent colors
        accent: {
          primary: "var(--accent-primary)",
          "primary-hover": "var(--accent-primary-hover)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
        },
        // Status colors
        status: {
          success: "var(--accent-success)",
          warning: "var(--accent-warning)",
          error: "var(--accent-error)",
        },
        // Border colors
        border: {
          subtle: "var(--border-subtle)",
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
          accent: "var(--border-accent)",
        },
      },
      backgroundImage: {
        // Gradient utilities
        "gradient-primary": "linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))",
        "gradient-surface": "linear-gradient(to bottom right, var(--gradient-surface-from), var(--gradient-surface-to))",
        "gradient-radial": "radial-gradient(circle at center, var(--gradient-primary-from), transparent)",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## Component Boundaries

### Where Colors Should Be Defined

| Location | What Goes There | Example |
|----------|-----------------|---------|
| `globals.css` `:root` | Primitive + Semantic tokens | `--color-primary-500`, `--accent-primary` |
| `tailwind.config.ts` | Token-to-utility mapping | `accent: { primary: "var(--accent-primary)" }` |
| Component files | Tailwind utility classes | `className="bg-surface-raised text-content-primary"` |

### What NOT to Do

```tsx
// BAD: Hardcoded colors bypass the token system
<div className="bg-[#1e293b] text-[#f1f5f9]">

// BAD: Using primitives directly (skips semantic layer)
<div style={{ background: 'var(--color-neutral-900)' }}>

// GOOD: Use semantic utilities
<div className="bg-surface-raised text-content-primary">
```

---

## Handling Gradients

Gradients require special handling because they aren't single color values.

### Define Gradient Endpoints as Semantic Tokens

```css
:root {
  --gradient-primary-from: var(--color-primary-500);
  --gradient-primary-to: var(--color-violet-500);
}
```

### Create Gradient Utilities in Tailwind

```typescript
backgroundImage: {
  "gradient-primary": "linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))",
  "gradient-primary-45": "linear-gradient(45deg, var(--gradient-primary-from), var(--gradient-primary-to))",
  "gradient-primary-radial": "radial-gradient(circle, var(--gradient-primary-from), var(--gradient-primary-to))",
}
```

### Usage

```tsx
// Gradient background
<div className="bg-gradient-primary" />

// Gradient text
<span className="bg-gradient-primary bg-clip-text text-transparent">
  Gradient Text
</span>
```

---

## Handling Shadows in Dark Themes

Dark themes require different shadow strategies than light themes.

### The Problem

Traditional drop shadows (dark shadow on light background) don't work on dark backgrounds. A shadow creates an area with *less* light - on a dark background, there's nowhere darker to go.

### Solution: Colored Glows

For dark themes, use subtle colored glows instead of traditional shadows:

```css
:root {
  /* Glow-based shadows for dark theme */
  --shadow-subtle: 0 2px 8px -2px rgba(0, 0, 0, 0.3);
  --shadow-elevated: 0 8px 24px -4px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px -5px var(--accent-primary);

  /* Inner shadows for depth (inset) */
  --shadow-inset: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
```

### Component Shadow Strategy

```tsx
// Card with subtle glow on hover
<div className="shadow-subtle hover:shadow-glow transition-shadow" />

// Elevated card with inset highlight
<div className="shadow-elevated [box-shadow:var(--shadow-elevated),var(--shadow-inset)]" />
```

---

## Handling Overlays

Overlays (glassmorphism, modals, tooltips) need opacity-based colors.

### Define Overlay Tokens

```css
:root {
  --overlay-light: rgba(255, 255, 255, 0.05);
  --overlay-medium: rgba(255, 255, 255, 0.10);
  --overlay-heavy: rgba(255, 255, 255, 0.15);
  --overlay-backdrop: rgba(10, 10, 15, 0.80);
}
```

### Expose via Tailwind

```typescript
colors: {
  overlay: {
    light: "var(--overlay-light)",
    medium: "var(--overlay-medium)",
    heavy: "var(--overlay-heavy)",
    backdrop: "var(--overlay-backdrop)",
  },
}
```

### Usage for Glassmorphism

```tsx
// Current Card.tsx pattern - keep but use semantic tokens
<div className="bg-overlay-medium backdrop-blur-lg border border-overlay-light">
```

---

## Migration Path from Current Colors

### Phase 1: Add Primitive Layer (Non-Breaking)

Add primitive tokens to `globals.css` without removing existing tokens:

```css
:root {
  /* NEW: Primitive palette */
  --color-neutral-950: #0a0a0f;
  /* ... */

  /* EXISTING: Keep working during migration */
  --background-start: #0a0e27;
  --primary-start: #3b82f6;
}
```

### Phase 2: Add Semantic Layer (Non-Breaking)

Add semantic tokens that reference primitives:

```css
:root {
  /* Semantic tokens using new primitives */
  --surface-base: var(--color-neutral-950);
  --text-primary: var(--color-neutral-100);

  /* Old tokens still work */
  --background-start: #0a0e27;
}
```

### Phase 3: Update Tailwind Config

Extend (don't replace) your Tailwind colors:

```typescript
colors: {
  // NEW semantic utilities
  surface: { base: "var(--surface-base)" },

  // OLD still works during migration
  "background-start": "var(--background-start)",
}
```

### Phase 4: Migrate Components Incrementally

Update components one at a time:

```tsx
// Before
<div className="bg-card-bg/40 text-text-primary">

// After
<div className="bg-surface-raised/40 text-content-primary">
```

### Phase 5: Remove Legacy Tokens

Once all components are migrated, remove old tokens from both `globals.css` and `tailwind.config.ts`.

---

## File Organization

```
globals.css
  |
  +-- @tailwind directives
  |
  +-- :root {
  |     /* 1. Primitive tokens (--color-*) */
  |     /* 2. Semantic tokens (--surface-*, --text-*, etc.) */
  |   }
  |
  +-- body { base styles using semantic tokens }
  |
  +-- @layer utilities { animations, custom utilities }
  |
  +-- Component-specific styles (.mdx-content, etc.)

tailwind.config.ts
  |
  +-- theme.extend.colors (semantic token mapping)
  +-- theme.extend.backgroundImage (gradient utilities)
  +-- theme.extend.boxShadow (shadow utilities)
```

---

## Naming Convention Summary

| Layer | Convention | Example |
|-------|------------|---------|
| Primitive | `--color-{scale}-{shade}` | `--color-neutral-900` |
| Semantic | `--{category}-{variant}` | `--surface-raised`, `--text-secondary` |
| Tailwind | `{category}-{variant}` | `bg-surface-raised`, `text-content-secondary` |

---

## Anti-Patterns to Avoid

### 1. Hardcoded Colors in Components

```tsx
// BAD
<div className="bg-[#1e293b]">

// GOOD
<div className="bg-surface-raised">
```

### 2. Using Primitives Directly

```tsx
// BAD - bypasses semantic layer
<div style={{ background: 'var(--color-neutral-900)' }}>

// GOOD - uses semantic token
<div className="bg-surface-raised">
```

### 3. Inline Overrides for Theme Colors

```tsx
// BAD - defeats token system
<div className="bg-surface-raised" style={{ backgroundColor: '#custom' }}>

// GOOD - add a semantic token if you need a new color
```

### 4. Mixing Tailwind Opacity with Custom Properties

```tsx
// CAUTION - Tailwind opacity modifiers may not work with CSS vars
<div className="bg-surface-raised/50">  // May not work as expected

// ALTERNATIVE - define opacity in the semantic token
/* globals.css */
--surface-raised-muted: rgba(18, 18, 24, 0.5);
```

**Note:** Tailwind v3.4+ supports opacity modifiers with CSS variables if you use the proper format. Test your specific setup.

---

## Implementation Order

Recommended order for the visual refresh:

1. **Define primitive palette** - Establish your dark/moody color values
2. **Create semantic mapping** - Map primitives to surface, text, accent, etc.
3. **Extend Tailwind config** - Wire semantic tokens to utilities
4. **Update globals.css body** - Apply new background, text defaults
5. **Migrate Card component** - Test surface tokens with glassmorphism
6. **Migrate Button component** - Test gradient and accent tokens
7. **Migrate Hero section** - Test gradient backgrounds and text
8. **Migrate remaining components** - Apply tokens systematically
9. **Remove legacy tokens** - Clean up old variables
10. **Document palette** - Create color documentation for future reference

---

## Sources

- [Tailwind CSS: Customizing Colors](https://tailwindcss.com/docs/customizing-colors) - Official documentation
- [Dark Mode with Design Tokens in Tailwind CSS](https://www.richinfante.com/2024/10/21/tailwind-dark-mode-design-tokens-themes-css) - Three-layer implementation pattern
- [How we're approaching theming with modern CSS](https://piccalil.li/blog/how-were-approaching-theming-with-modern-css/) - Progressive custom properties
- [The developer's guide to design tokens and CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - Token layer architecture
- [Tailwind CSS Best Practices 2025-2026](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns) - Design system patterns
- [GitHub Discussion: Shadows in dark mode](https://github.com/tailwindlabs/tailwindcss/discussions/3177) - Dark theme shadow strategies
