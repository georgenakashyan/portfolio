---
phase: 02-surface-styling
plan: 04
subsystem: components
tags: [experience, input, textarea, semantic-tokens, form-elements]

dependency-graph:
  requires: [02-02]
  provides: [semantic-secondary-components, form-token-pattern]
  affects: []

tech-stack:
  added: []
  patterns: [semantic-token-components, form-input-styling, autofill-hack-pattern]

key-files:
  created: []
  modified:
    - app/components/Experience.tsx
    - app/components/ui/Input.tsx
    - app/components/ui/Textarea.tsx

decisions:
  - id: autofill-hack-color
    choice: "HSL literal for WebkitBoxShadow, CSS var for text"
    reason: "WebkitBoxShadow autofill hack requires literal color; text can use CSS variable"
  - id: form-depth-level
    choice: "surface-raised for form inputs"
    reason: "Form inputs sit on cards (elevated), so raised creates correct depth hierarchy"

metrics:
  duration: ~3 min
  completed: 2026-01-16
---

# Phase 02 Plan 04: Secondary Component Semantic Token Migration Summary

**One-liner:** Experience, Input, and Textarea components migrated from broken/hardcoded colors to semantic tokens (surface-raised, content-*, border-border, accent-primary) for consistent depth hierarchy.

## What Changed

### app/components/Experience.tsx

Fixed broken styling and migrated to semantic tokens:

- `border-background` (undefined) -> `border-border`
- `hover:bg-opacity-5 hover:bg-slate-200` (wrong for dark theme) -> `hover:bg-surface-elevated/10`
- `text-text_secondary` (underscore typo) -> `text-content-secondary`
- `transition` -> `transition-colors duration-200` (explicit transition target)

### app/components/ui/Input.tsx

Replaced hardcoded colors with semantic tokens:

- `bg-[#1a2332]` -> `bg-surface-raised`
- `text-white` -> `text-content-primary`
- `placeholder:text-slate-400` -> `placeholder:text-content-muted`
- `border-white/10` -> `border-border`
- `border-primary-start` -> `border-accent-primary`
- WebkitTextFillColor: `#ffffff` -> `var(--text-primary)`
- WebkitBoxShadow: `#1a2332` -> `hsl(217 33% 17%)` (surface-raised equivalent)

### app/components/ui/Textarea.tsx

Applied identical changes as Input.tsx for form consistency:

- Same background, text, placeholder, border token updates
- Same autofill hack pattern with CSS variable for text color

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 7b3b80e | feat | fix Experience component to use semantic tokens |
| 0573404 | feat | update Input component to use semantic tokens |
| ad5f864 | feat | update Textarea component to match Input styling |

## Verification Results

- Experience.tsx: No broken classes (border-background, text_secondary, bg-slate-200)
- Input.tsx: No hardcoded colors (bg-[#1a2332], text-white, text-slate-400, border-white/10)
- Textarea.tsx: Matches Input.tsx token usage exactly
- TypeScript passes: `npx tsc --noEmit` clean
- All components use semantic tokens: surface-*, content-*, border-*, accent-*

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Autofill hack | HSL literal for shadow, CSS var for text | WebkitBoxShadow requires literal; text can reference variable |
| Form depth level | surface-raised | Forms on cards need raised level for proper hierarchy |

## Deviations from Plan

None - plan executed exactly as written.

## Phase 02 Completion

**Status:** Phase 02 (Surface Styling) is now complete.

**Plans completed:**
- 02-01: Shadow system and surface tokens
- 02-02: Card component semantic token refactor
- 02-03: Badge semantic token refactor
- 02-04: Secondary component migration (this plan)

**Dependencies delivered:**
- Complete semantic token system established
- All major components (Card, Badge, Experience, Input, Textarea) use semantic tokens
- Consistent depth hierarchy across the application
- Form elements have proper styling with autofill compatibility

**Ready for:** Phase 03 (next phase in roadmap)

**No blockers identified.**
