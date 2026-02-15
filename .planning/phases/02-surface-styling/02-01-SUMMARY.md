---
phase: 02-surface-styling
plan: 01
subsystem: design-tokens
tags: [css, tailwind, elevation, shadows]

dependency-graph:
  requires: [01-foundation]
  provides: [shadow-tokens, surface-elevation-tokens]
  affects: [02-02, 02-03, 02-04]

tech-stack:
  added: []
  patterns: [multi-layer-shadows, 4-level-elevation]

key-files:
  created: []
  modified:
    - app/globals.css
    - tailwind.config.ts

decisions:
  - id: shadow-hue
    choice: "220deg hue for shadow-color"
    reason: "Matches theme blue undertone for cohesive dark palette"
  - id: multi-layer-shadows
    choice: "2-3 layer shadows for raised/overlay"
    reason: "Josh Comeau technique for realistic depth perception"
  - id: overlay-color
    choice: "#243548 for surface-overlay"
    reason: "Slightly lighter than raised (#1e293b) for modal/dropdown prominence"

metrics:
  duration: ~3 min
  completed: 2026-01-16
---

# Phase 02 Plan 01: Shadow and Surface Elevation Tokens Summary

**One-liner:** 4-level elevation system tokens (sunken/base/raised/overlay) with multi-layer shadows using 220deg blue-tinted shadow color.

## What Changed

### globals.css

Added to LAYER 2: SEMANTIC TOKENS:

**Surface extensions:**
- `--surface-sunken: var(--color-neutral-950)` - darkest level for inset/well areas
- `--surface-overlay: #243548` - lighter than raised for modals/dropdowns

**Shadow tokens:**
- `--shadow-color: 220deg 40% 2%` - HSL base color matching theme blue
- `--shadow-raised` - dual-layer shadow for cards/buttons
- `--shadow-overlay` - triple-layer shadow for modals/popovers

### tailwind.config.ts

Extended theme with:
- `surface.sunken` and `surface.overlay` color utilities
- `boxShadow.raised` and `boxShadow.overlay` utilities

## Commits

| Hash | Type | Description |
|------|------|-------------|
| b4fa093 | feat | add shadow and surface elevation tokens |
| 86896c8 | feat | add Tailwind utilities for elevation tokens |

## Verification Results

- 4 new tokens in globals.css: surface-sunken, surface-overlay, shadow-raised, shadow-overlay
- Tailwind config has surface.sunken, surface.overlay, boxShadow.raised, boxShadow.overlay
- TypeScript passes: `npx tsc --noEmit` clean
- Build passes: `npm run build` succeeds

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Shadow hue | 220deg | Matches theme blue undertone for cohesive appearance |
| Shadow layers | 2-3 layers | Josh Comeau technique creates realistic depth |
| Overlay brightness | #243548 | Slightly lighter than raised for proper hierarchy |
| Sunken source | neutral-950 | Darkest primitive for maximum depth perception |

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

**Ready for:** 02-02-PLAN.md (Card component refactor)

**Dependencies delivered:**
- Shadow tokens ready for Card hover effects
- Surface tokens ready for elevation hierarchy
- Tailwind utilities enable className-based styling

**No blockers identified.**
