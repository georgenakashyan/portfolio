---
phase: 03
plan: 01
subsystem: design-tokens
tags: [glow-effects, links, accessibility, css-custom-properties]

dependency-graph:
  requires:
    - 01-01 (design tokens foundation)
    - 02-01 (surface and shadow tokens)
  provides:
    - Glow CSS custom properties
    - Glow Tailwind utilities
    - Accessible inline link styles
  affects:
    - 03-02 (button styling migration)
    - 03-03 (card glow effects)

tech-stack:
  added: []
  patterns:
    - "40% opacity baseline for glow effects"
    - "Pre-composed shadow tokens for consistency"
    - "CSS-only link accessibility (no JS)"

key-files:
  created: []
  modified:
    - app/globals.css
    - tailwind.config.ts

decisions:
  - id: "glow-opacity-baseline"
    choice: "40% opacity for base glow colors"
    rationale: "Professional appearance without gaming aesthetic"
  - id: "semantic-link-tokens"
    choice: "Use --accent-primary/secondary for links"
    rationale: "Consistency with design token system"
  - id: "nav-link-exclusion"
    choice: "Exclude nav links from underline styles"
    rationale: "Positioned context provides sufficient distinction"

metrics:
  duration: "~2 min"
  completed: "2026-01-17"
---

# Phase 03 Plan 01: Glow Tokens and Link Styles Summary

**One-liner:** Glow effect tokens at 40% opacity baseline with accessible underlined inline links using semantic color tokens.

## What Was Built

### Glow Token System

Added comprehensive glow tokens to `globals.css`:

```css
/* Base glow colors */
--glow-primary: rgba(59, 130, 246, 0.4);   /* blue */
--glow-secondary: rgba(139, 92, 246, 0.4); /* violet */
--glow-tertiary: rgba(6, 182, 212, 0.4);   /* cyan */

/* Intensity variants */
--glow-primary-subtle: rgba(59, 130, 246, 0.2);
--glow-primary-strong: rgba(59, 130, 246, 0.5);

/* Pre-composed shadows */
--shadow-glow-sm: 0 0 8px var(--glow-primary);
--shadow-glow-md: 0 0 15px var(--glow-primary);
--shadow-glow-lg: 0 0 20px ... 0 0 40px (two-layer);
--shadow-glow-card: var(--shadow-overlay), 0 0 20px ...;
```

### Tailwind Glow Utilities

Extended `tailwind.config.ts` boxShadow with:
- `shadow-glow-sm/md/lg` - size variants
- `shadow-glow-card` - depth + subtle glow combined
- `shadow-glow-primary/secondary/tertiary` - color-specific glows

Usage: `hover:shadow-glow-primary`, `hover:shadow-glow-card`

### Link Accessibility

1. **MDX Content Links** - Updated to use semantic tokens:
   - `color: var(--accent-primary)` (was `--primary-start`)
   - Added `text-decoration-thickness: 1px`
   - Added `text-underline-offset: 3px`
   - Changed transitions to 150ms (was 200ms)

2. **Inline Links** - New rule for unstyled links:
   - Selector: `a[href]:not([class]):not(nav a)`
   - Matches MDX link styling for consistency
   - Excludes navigation (context provides distinction)

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 7ba5f08 | feat | Add glow tokens and update mdx link styles |
| 5b13c29 | feat | Add glow shadow utilities to Tailwind config |
| 825d23c | feat | Add inline link base styles for accessibility |

## Decisions Made

1. **40% Opacity Baseline for Glows**
   - Rationale: Research showed >60% looks "gaming", not professional
   - 20% for subtle variant, 50% for strong (CTA emphasis)

2. **Semantic Tokens for Links**
   - Changed from `--primary-start/end` to `--accent-primary/secondary`
   - Aligns with design token system established in Phase 01

3. **Navigation Link Exclusion**
   - Selector uses `:not(nav a)` to exclude navigation
   - Navigation links have sufficient distinction from position/context
   - Per research: only inline body links require underlines

4. **150ms Transition Timing**
   - Research recommended against 300ms (feels sluggish)
   - 150ms provides snappy feedback without being jarring

## Deviations from Plan

None - plan executed exactly as written.

## Files Modified

| File | Changes |
|------|---------|
| app/globals.css | +47 lines (glow tokens, link styles) |
| tailwind.config.ts | +11 lines (glow utilities) |

## Next Phase Readiness

**Ready for 03-02:** Button styling migration can now use:
- `hover:shadow-glow-primary` for primary buttons
- `hover:shadow-glow-tertiary` for secondary buttons
- `active:shadow-glow-sm` for pressed states

**Dependencies satisfied:**
- Glow tokens exist and are tested via build
- Tailwind utilities available for component use
- Link accessibility patterns established for reference
