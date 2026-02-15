---
phase: 02-surface-styling
plan: 02
subsystem: components
tags: [card, semantic-tokens, elevation, glassmorphism]

dependency-graph:
  requires: [02-01]
  provides: [card-elevation-pattern]
  affects: [02-03, 02-04]

tech-stack:
  added: []
  patterns: [semantic-token-components, hover-lift-elevation]

key-files:
  created: []
  modified:
    - app/components/ui/Card.tsx

decisions:
  - id: subtle-hover-lift
    choice: "translate-y-1 instead of translate-y-2"
    reason: "Subtler lift per research recommendation, more professional feel"
  - id: shadow-on-default
    choice: "shadow-raised on all card variants"
    reason: "Ensures cards always have visible depth against page background"

metrics:
  duration: ~2 min
  completed: 2026-01-16
---

# Phase 02 Plan 02: Card Component Semantic Token Refactor Summary

**One-liner:** Card component migrated from legacy tokens (card-bg, white/10) to semantic elevation tokens (surface-elevated, border-border, shadow-raised/overlay).

## What Changed

### app/components/ui/Card.tsx

Updated variantClasses to use semantic tokens:

**Default variant:**
- `bg-card-bg/40` -> `bg-surface-elevated/40`
- `border-white/10` -> `border-border`
- Added `shadow-raised` for visible depth

**Hover variant:**
- Same base as default
- `hover:shadow-xl hover:shadow-primary-start/20` -> `hover:shadow-overlay`
- `hover:-translate-y-2` -> `hover:-translate-y-1` (subtler lift)
- Added `hover:border-border-strong` for border emphasis

**Flat variant:**
- `bg-card-bg` -> `bg-surface-raised`
- `border-white/5` -> `border-border-subtle`

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 374ac82 | feat | update Card component to use semantic tokens |

## Verification Results

- No legacy tokens in Card.tsx (card-bg, white/10, white/5): 0 matches
- Semantic tokens present (surface-elevated, border-border, shadow-raised, shadow-overlay): 6 occurrences
- TypeScript passes: `npx tsc --noEmit` clean
- Visual: Cards display with visible depth and responsive hover states

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hover lift amount | translate-y-1 (was -2) | Subtler, more professional per research |
| Default shadow | shadow-raised on all variants | Ensures depth visibility against background |
| Border on hover | border-border-strong | Provides additional hover feedback |

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

**Ready for:** 02-03-PLAN.md (Button component refactor)

**Dependencies delivered:**
- Card component demonstrates semantic token usage pattern
- Hover elevation pattern (shadow-raised -> shadow-overlay) established
- Other components can follow same migration approach

**No blockers identified.**
