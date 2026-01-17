---
phase: 03
plan: 02
subsystem: ui-components
tags: [button, card, badge, glow-effects, interactive-states, transitions]

dependency-graph:
  requires:
    - 03-01 (glow tokens and Tailwind utilities)
  provides:
    - Button with hover glow and active press states
    - Card with glow variant
    - Badge with consistent 30% glow opacity
  affects:
    - 03-03 (component integration testing)

tech-stack:
  added: []
  patterns:
    - "Array-based Tailwind class composition for readability"
    - "Distinct hover/active/disabled states"
    - "150-200ms transition timing for snappy feedback"

key-files:
  created: []
  modified:
    - app/components/ui/Button.tsx
    - app/components/ui/Card.tsx
    - app/components/ui/Badge.tsx

decisions:
  - id: "button-scale-values"
    choice: "1.02 hover, 0.98 active (not 1.05)"
    rationale: "Subtle, professional effect - 1.05 feels too bouncy"
  - id: "transition-timing"
    choice: "150ms for buttons/badges, 200ms for cards"
    rationale: "Snappy feedback without jarring; cards slightly slower for depth"
  - id: "disabled-state-prevention"
    choice: "Explicit disabled:hover:* and disabled:active:* overrides"
    rationale: "Prevents any visual feedback on disabled buttons"

metrics:
  duration: "~2 min"
  completed: "2026-01-17"
---

# Phase 03 Plan 02: Interactive State Styling Summary

**One-liner:** Button/Card/Badge components refactored with glow hover effects, press states, and consistent 150-200ms transitions.

## What Was Built

### Button Component Refactor

Updated `Button.tsx` with semantic tokens and distinct states:

```typescript
const variantClasses = {
  primary: [
    "bg-gradient-primary text-content-primary font-bold",
    "hover:shadow-glow-primary hover:scale-[1.02]",
    "active:scale-[0.98] active:brightness-90 active:shadow-glow-sm",
    "transition-all duration-150",
    "disabled:hover:shadow-none disabled:hover:scale-100...",
  ].join(" "),
  // ...similar for secondary
};
```

Key changes:
- Hover: glow effect + subtle scale up (1.02)
- Active: scale down (0.98) + brightness reduction (90%)
- Disabled: prevents all hover/active effects
- Transition: 150ms (was 300ms)
- Tokens: `text-content-primary`, `accent-tertiary` (semantic)

### Card Glow Variant

Added new `glow` variant to `Card.tsx`:

```typescript
glow:
  "bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised " +
  "hover:bg-surface-elevated/60 hover:-translate-y-1 hover:shadow-glow-card " +
  "hover:border-border-strong transition-all duration-200 cursor-pointer",
```

Key changes:
- New "glow" variant with `shadow-glow-card` on hover
- Updated CardProps interface
- Transition reduced from 300ms to 200ms

### Badge Glow Standardization

Updated all Badge variants with consistent 30% glow opacity:

```typescript
secondary:
  "... hover:shadow-md hover:shadow-accent-tertiary/30 transition-all duration-150",
success:
  "... hover:shadow-md hover:shadow-status-success/30 transition-all duration-150",
```

Key changes:
- Secondary and success now have matching glow on hover
- All variants use 30% opacity (consistent with primary)
- Transition standardized to 150ms

## Commits

| Hash | Type | Description |
|------|------|-------------|
| aae2c3c | feat | Refactor Button with glow and active state |
| 0158d20 | feat | Add glow variant to Card component |
| d9bfe28 | feat | Standardize Badge glow opacity to 30% |

## Decisions Made

1. **Subtle Scale Values (1.02/0.98)**
   - 1.05 felt too "bouncy" and gaming-oriented
   - 1.02 provides visible feedback while staying professional

2. **Transition Timing Split**
   - 150ms for Button/Badge (immediate feedback expected)
   - 200ms for Card (larger element, depth transition benefits from slightly slower)

3. **Array-based Class Composition**
   - Used arrays with `.join(" ")` for Button classes
   - Improves readability for complex multi-state styling
   - Each array element represents a logical group (base, hover, active, etc.)

4. **Explicit Disabled Overrides**
   - Added `disabled:hover:shadow-none disabled:hover:scale-100` etc.
   - More explicit than relying on CSS cascade
   - Ensures no visual feedback escapes on disabled buttons

## Deviations from Plan

None - plan executed exactly as written.

## Files Modified

| File | Changes |
|------|---------|
| app/components/ui/Button.tsx | +26/-5 lines (state classes, semantic tokens) |
| app/components/ui/Card.tsx | +10/-5 lines (glow variant, faster transition) |
| app/components/ui/Badge.tsx | +9/-8 lines (consistent glow, faster transition) |

## Next Phase Readiness

**Ready for 03-03:** All interactive components now use:
- Glow tokens from 03-01
- Consistent transition timing (150-200ms)
- Proper disabled state handling

**Verification passed:**
- `npm run build` successful
- All components type-check correctly
- Glow utilities resolve properly
