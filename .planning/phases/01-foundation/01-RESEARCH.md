# Phase 1: Foundation - Research

**Researched:** 2026-01-16
**Domain:** CSS Architecture, Accessibility (Focus Indicators, Reduced Motion), Tailwind CSS
**Confidence:** HIGH

## Summary

This phase establishes the foundational CSS architecture for accessible, extensible color tokens and core accessibility improvements. The research covers four distinct requirements:

1. **H1 Font Size Fix (A11Y-01):** Browsers are removing implicit h1 sizing in sectioning elements. Requires explicit CSS.
2. **Focus Indicators (A11Y-02):** Dark backgrounds hide default focus rings. Requires two-color/double-layered focus indicators.
3. **Reduced Motion (A11Y-04):** Must respect prefers-reduced-motion at both CSS and Framer Motion levels.
4. **Color Token Architecture (COLOR-02):** Current flat token structure should be refactored to three-layer architecture (primitive -> semantic -> utility).

The existing codebase already has partial implementations (CSS custom properties, some focus states on inputs), but lacks systematic coverage. The foundation phase should establish patterns that all subsequent phases follow.

**Primary recommendation:** Implement three-layer color tokens in globals.css, add global focus-visible styles with double-layered outlines, add prefers-reduced-motion CSS media query, and add explicit h1 sizing.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | ^3.4.1 | Utility-first styling | Already in stack; ring-* and focus-visible: utilities for focus indicators |
| CSS Custom Properties | native | Design tokens | Already in stack; zero runtime cost, cascade-based theming |
| Framer Motion | ^12.25.0 | Animation library | Already in stack; provides useReducedMotion hook |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| N/A | - | - | No additional libraries needed for foundation work |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Custom Properties | CSS-in-JS tokens | Runtime cost, already have working CSS setup |
| Tailwind ring-* | Custom outline styles | Tailwind provides well-tested focus utilities |

**Installation:**
```bash
# No new dependencies required - all tools already in stack
```

## Architecture Patterns

### Recommended CSS Structure in globals.css

```
globals.css
  |
  +-- @tailwind directives
  |
  +-- :root {
  |     /* 1. Primitive tokens (--color-*) */
  |     /* 2. Semantic tokens (--surface-*, --text-*, --accent-*) */
  |     /* 3. Utility tokens (--focus-*, --transition-*) */
  |   }
  |
  +-- /* H1 explicit sizing (fix A11Y-01) */
  +-- :where(h1) { ... }
  |
  +-- /* Global focus indicators (fix A11Y-02) */
  +-- :focus-visible { ... }
  |
  +-- /* Reduced motion support (fix A11Y-04) */
  +-- @media (prefers-reduced-motion: reduce) { ... }
  |
  +-- body { base styles using semantic tokens }
  |
  +-- @layer utilities { existing marquee, etc. }
  |
  +-- Component-specific styles (.mdx-content, etc.)
```

### Pattern 1: Three-Layer Color Tokens

**What:** Separate raw color values (primitive) from meaning (semantic) from usage (Tailwind utilities)
**When to use:** Always - this is the foundation pattern for all color usage

**Layer 1 - Primitive (raw values):**
```css
/* Source: Design Systems best practices */
:root {
  /* Neutral scale */
  --color-neutral-950: #0a0a0f;
  --color-neutral-900: #0a0e27;  /* current --background-start */
  --color-neutral-800: #0f172a;  /* current --background-end */
  --color-neutral-700: #1e293b;  /* current --card-bg */
  --color-neutral-100: #f1f5f9;  /* current --text-primary */
  --color-neutral-300: #cbd5e1;  /* current --text-secondary */

  /* Primary scale */
  --color-primary-500: #3b82f6;  /* current --primary-start */
  --color-violet-500: #8b5cf6;   /* current --primary-end */
  --color-cyan-500: #06b6d4;     /* current --secondary */
  --color-emerald-500: #10b981;  /* current --success */
}
```

**Layer 2 - Semantic (purpose-based):**
```css
:root {
  /* Surfaces */
  --surface-base: var(--color-neutral-900);
  --surface-raised: var(--color-neutral-700);

  /* Text */
  --text-primary: var(--color-neutral-100);
  --text-secondary: var(--color-neutral-300);

  /* Accents */
  --accent-primary: var(--color-primary-500);
  --accent-secondary: var(--color-violet-500);

  /* Gradients */
  --gradient-primary-from: var(--color-primary-500);
  --gradient-primary-to: var(--color-violet-500);
}
```

**Layer 3 - Tailwind Extension (in tailwind.config.ts):**
```typescript
// Source: Tailwind CSS best practices
colors: {
  surface: {
    base: "var(--surface-base)",
    raised: "var(--surface-raised)",
  },
  content: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
  },
  accent: {
    primary: "var(--accent-primary)",
    secondary: "var(--accent-secondary)",
  },
}
```

### Pattern 2: Two-Color Focus Indicators

**What:** Double-layered focus ring that works on both light and dark backgrounds
**When to use:** Global default for all focusable elements

```css
/* Source: W3C WCAG Technique C40 */
:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5);
}
```

For interactive elements on dark backgrounds, using white inner ring + dark outer shadow ensures visibility.

### Pattern 3: Reduced Motion with Framer Motion

**What:** Respect user preference at both CSS and JS levels
**When to use:** All animated components

```tsx
// Source: Motion.dev official docs
import { useReducedMotion } from "framer-motion";

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      ...
    </motion.div>
  );
}
```

### Anti-Patterns to Avoid

- **Hardcoded colors in components:** Use `bg-[#1e293b]` bypasses token system. Use semantic tokens instead.
- **Using primitives directly:** `var(--color-neutral-900)` skips semantic layer. Use `var(--surface-base)` instead.
- **outline: none without replacement:** Removes accessibility. Always provide visible alternative.
- **box-shadow alone for focus:** Fails in Windows High Contrast Mode. Combine with outline.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Focus indicators | Custom JS focus tracking | CSS :focus-visible + ring utilities | Browser handles keyboard vs mouse detection |
| Reduced motion detection | Custom window.matchMedia | useReducedMotion from framer-motion | Hook updates on preference change |
| Color contrast calculation | Manual math | WebAIM Contrast Checker | Already verified accurate |
| Focus visibility on dark bg | Single-color outline | W3C C40 two-color technique | Works on any background |

**Key insight:** Browser and library APIs already handle the edge cases. The job is to wire them up correctly, not reinvent detection logic.

## Common Pitfalls

### Pitfall 1: Relying on box-shadow Only for Focus Indicators

**What goes wrong:** Windows High Contrast Mode suppresses box-shadow, making focus invisible to users who need it most.
**Why it happens:** box-shadow looks better than outline, so developers use it exclusively.
**How to avoid:** Always combine box-shadow with outline. Use `outline: 2px transparent solid` at minimum for WHCM compatibility.
**Warning signs:** Focus works in normal mode but disappears in High Contrast Mode testing.

### Pitfall 2: Removing All Animation with prefers-reduced-motion

**What goes wrong:** Setting `animation: none` and `transition: none` removes ALL visual feedback, including important state changes.
**Why it happens:** Developers interpret "reduced motion" as "no motion."
**How to avoid:** Replace motion-based animations with opacity/color changes. Keep instant transitions for state feedback.
**Warning signs:** Users with reduced motion preference get no visual feedback on button clicks, hover states.

### Pitfall 3: Inconsistent Token Usage During Migration

**What goes wrong:** Some components use new semantic tokens, others use old flat tokens, creating maintenance nightmare.
**Why it happens:** Gradual migration without clear boundaries.
**How to avoid:** Foundation phase establishes tokens; keep old tokens working during migration; update components in subsequent phases; remove old tokens only after full migration.
**Warning signs:** Mixed usage of `--card-bg` and `--surface-raised` in same codebase.

### Pitfall 4: H1 Sizing Only in Specific Selectors

**What goes wrong:** H1s outside those selectors still lack explicit sizing.
**Why it happens:** Developer fixes specific Lighthouse-flagged instances instead of global rule.
**How to avoid:** Use `:where(h1)` with zero specificity as global baseline; component styles override as needed.
**Warning signs:** Lighthouse warning clears, but new H1s added later trigger it again.

### Pitfall 5: Focus Ring Covered by Adjacent Elements

**What goes wrong:** Focus outline or ring gets clipped by z-index or overflow of parent/sibling elements.
**Why it happens:** outline-offset pushes indicator outside element bounds.
**How to avoid:** Ensure outline-offset is accounted for in layout; use z-index on focused element if needed.
**Warning signs:** Focus ring appears cut off or partially visible.

## Code Examples

Verified patterns from official sources:

### H1 Explicit Sizing (Fix A11Y-01)

```css
/* Source: MDN Blog - H1 element styles */
/* Use :where() for zero specificity - won't override component-specific h1 styles */
:where(h1) {
  font-size: 2em;
  margin-block: 0.67em;
}
```

### Two-Color Focus Indicator (Fix A11Y-02)

```css
/* Source: W3C WCAG Technique C40 */
/* Global focus indicator that works on any background */
:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5);
}

/* Remove default outline since we're providing custom */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Reduced Motion CSS (Fix A11Y-04)

```css
/* Source: W3C WCAG Technique C39 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Framer Motion with Reduced Motion

```tsx
// Source: motion.dev/docs/react-use-reduced-motion
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

### Primitive Color Tokens

```css
/* Source: Design system best practices */
:root {
  /* =========================
     LAYER 1: PRIMITIVE TOKENS
     Raw color values - never use directly in components
     ========================= */

  /* Neutral scale */
  --color-neutral-950: #0a0a0f;
  --color-neutral-900: #0a0e27;
  --color-neutral-800: #0f172a;
  --color-neutral-700: #1e293b;
  --color-neutral-400: #94a3b8;
  --color-neutral-300: #cbd5e1;
  --color-neutral-100: #f1f5f9;

  /* Primary scale */
  --color-primary-600: #2563eb;
  --color-primary-500: #3b82f6;
  --color-primary-400: #60a5fa;

  /* Violet scale */
  --color-violet-500: #8b5cf6;
  --color-violet-400: #a78bfa;

  /* Accent colors */
  --color-cyan-500: #06b6d4;
  --color-emerald-500: #10b981;
  --color-rose-500: #f43f5e;
}
```

### Semantic Color Tokens

```css
:root {
  /* =========================
     LAYER 2: SEMANTIC TOKENS
     Purpose-based mappings - use in components
     ========================= */

  /* Surfaces */
  --surface-base: var(--color-neutral-900);
  --surface-elevated: var(--color-neutral-800);
  --surface-raised: var(--color-neutral-700);

  /* Text */
  --text-primary: var(--color-neutral-100);
  --text-secondary: var(--color-neutral-300);
  --text-muted: var(--color-neutral-400);

  /* Accents */
  --accent-primary: var(--color-primary-500);
  --accent-secondary: var(--color-violet-500);
  --accent-tertiary: var(--color-cyan-500);

  /* Status */
  --status-success: var(--color-emerald-500);
  --status-error: var(--color-rose-500);

  /* Gradients */
  --gradient-primary-from: var(--color-primary-500);
  --gradient-primary-to: var(--color-violet-500);
  --gradient-surface-from: var(--color-neutral-900);
  --gradient-surface-to: var(--color-neutral-800);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.2);

  /* Focus (used by accessibility features) */
  --focus-ring-color: #ffffff;
  --focus-ring-offset: 2px;
  --focus-ring-width: 2px;
  --focus-shadow-color: rgba(0, 0, 0, 0.5);
}
```

### Tailwind Config Extension

```typescript
// Source: tailwind.config.ts extension for Layer 3
import type { Config } from "tailwindcss";

export default {
  // ... existing content array
  theme: {
    extend: {
      colors: {
        // NEW: Semantic surface colors
        surface: {
          base: "var(--surface-base)",
          elevated: "var(--surface-elevated)",
          raised: "var(--surface-raised)",
        },
        // NEW: Semantic content colors
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        // NEW: Semantic accent colors
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
        },
        // NEW: Status colors
        status: {
          success: "var(--status-success)",
          error: "var(--status-error)",
        },

        // KEEP: Legacy tokens during migration
        "background-start": "var(--background-start)",
        "background-end": "var(--background-end)",
        "primary-start": "var(--primary-start)",
        "primary-end": "var(--primary-end)",
        secondary: "var(--secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "card-bg": "var(--card-bg)",
        success: "var(--success)",
      },
      backgroundImage: {
        // Keep existing
        "gradient-bg": "linear-gradient(to bottom right, var(--gradient-surface-from), var(--gradient-surface-to))",
        "gradient-primary": "linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))",
      },
      // ... existing fontFamily
    },
  },
  plugins: [],
} satisfies Config;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| H1 auto-sizing in sections | Explicit h1 font-size required | 2024-2025 | Must add CSS or Lighthouse warns |
| Single-color focus outline | Two-color focus indicator (C40) | WCAG 2.2 | Works on all backgrounds |
| animation: none for reduced motion | Opacity-only fallback | 2025 | Preserves state feedback |
| Flat CSS variables | Three-layer token architecture | 2024-2026 | Better theming, maintenance |

**Deprecated/outdated:**
- Relying on browser default H1 sizing in sectioning elements - being removed
- Using outline: none with only box-shadow - fails High Contrast Mode
- Single-color focus rings on dark backgrounds - poor contrast

## Open Questions

Things that couldn't be fully resolved:

1. **Tailwind opacity modifier with CSS variables**
   - What we know: Tailwind 3.4+ supports `bg-surface-base/50` syntax with CSS variables if formatted correctly
   - What's unclear: Whether the current variable format works with opacity modifiers
   - Recommendation: Test in implementation; may need to define rgba-based variables for opacity variants

2. **Exact contrast ratio of current gradient text**
   - What we know: Gradient text uses #3b82f6 to #8b5cf6
   - What's unclear: Contrast ratio at each gradient position
   - Recommendation: Verify with WebAIM; gradient text is large (headings), so 3:1 minimum applies

## Sources

### Primary (HIGH confidence)
- [MDN Blog: H1 Element Style Changes](https://developer.mozilla.org/en-US/blog/h1-element-styles/) - H1 sizing fix
- [W3C WCAG Technique C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40) - Two-color focus indicators
- [W3C WCAG Technique C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) - prefers-reduced-motion
- [Motion.dev: useReducedMotion](https://motion.dev/docs/react-use-reduced-motion) - Framer Motion accessibility
- [Tailwind CSS: Hover, Focus States](https://tailwindcss.com/docs/hover-focus-and-other-states) - focus-visible utilities
- [Tailwind CSS: Ring Offset](https://v3.tailwindcss.com/docs/ring-offset-width) - Focus ring utilities

### Secondary (MEDIUM confidence)
- [Sara Soueidan: Focus Indicators Guide](https://www.sarasoueidan.com/blog/focus-indicators/) - Implementation patterns
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) - Best practices
- [Penpot: Design Tokens and CSS Variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - Token architecture

### Existing Project Research (HIGH confidence)
- `.planning/research/ARCHITECTURE.md` - Color token three-layer pattern
- `.planning/research/STACK.md` - Framer Motion reduced motion patterns
- `.planning/research/PITFALLS.md` - Focus indicator and H1 issues already documented

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Already using Tailwind, Framer Motion; no new dependencies
- Architecture: HIGH - Pattern well-documented in existing research and official sources
- Pitfalls: HIGH - W3C techniques and MDN explicitly document these issues

**Research date:** 2026-01-16
**Valid until:** 2026-03-16 (stable technologies, 60 days)
