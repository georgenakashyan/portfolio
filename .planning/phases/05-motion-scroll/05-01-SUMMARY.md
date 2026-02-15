---
phase: 05
plan: 01
subsystem: animation
tags: [framer-motion, page-transition, variants, hydration, reduced-motion]

dependency-graph:
  requires:
    - 01-01 (design tokens - 0.01ms reduced motion decision)
  provides:
    - Centralized animation variants for scroll reveals
    - Fixed page transition (no hydration replay)
    - FrozenRouter pattern for App Router
  affects:
    - 05-02 (scroll animations will use variants)

tech-stack:
  added: []
  patterns:
    - "Centralized Variants file for consistent animations"
    - "FrozenRouter pattern for Next.js App Router transitions"
    - "useSelectedLayoutSegment for stable animation keys"
    - "usePreviousValue hook for segment change detection"

key-files:
  created:
    - app/components/animation/variants.ts
  modified:
    - app/components/layout/PageTransition.tsx

decisions:
  - id: "centralized-variants"
    choice: "Create separate variants.ts file"
    rationale: "Single source of truth for animation timing; no 'use client' needed for pure data"
  - id: "frozenrouter-pattern"
    choice: "Implement FrozenRouter from imcorfitz.com"
    rationale: "Tested pattern for preventing hydration animation replay in App Router"
  - id: "segment-key"
    choice: "Use useSelectedLayoutSegment instead of usePathname"
    rationale: "More stable key that doesn't change on hash navigation"

metrics:
  duration: "~3 min"
  completed: "2026-01-17"
---

# Phase 05 Plan 01: Animation Foundation + Page Transition Fix Summary

**One-liner:** Centralized Framer Motion variants with 8 exports and FrozenRouter-based page transition fix eliminating hydration animation replay.

## What Was Built

### Centralized Animation Variants

Created `app/components/animation/variants.ts` with typed Framer Motion variants:

```typescript
// Section reveal variants
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Stagger variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Reduced motion equivalents (all 4 types)
// Use 0.01ms duration per Phase 1 decision
```

All 8 exports:
1. `fadeUpVariants` - Standard section reveal
2. `staggerContainerVariants` - Container for staggered children
3. `staggerItemVariants` - Individual staggered item
4. `reducedFadeVariants` - Reduced motion section reveal
5. `reducedContainerVariants` - Reduced motion container
6. `reducedItemVariants` - Reduced motion item
7. `pageTransitionVariants` - Page transition
8. `reducedPageTransitionVariants` - Reduced motion page transition

### PageTransition Hydration Fix

Refactored `PageTransition.tsx` to fix animation replay on hydration:

```typescript
// Key changes:
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();
  useEffect(() => {
    prevValue.current = value;
    return () => { prevValue.current = undefined; };
  });
  return prevValue.current;
}

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
  const changed = segment !== prevSegment &&
                  segment !== undefined &&
                  prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
```

Key improvements:
- `useSelectedLayoutSegment` instead of `usePathname` for stable keys
- `FrozenRouter` freezes context during exit animations
- `usePreviousValue` hook detects actual segment changes
- Imports variants from centralized file

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 59764fb | feat | Add centralized animation variants |
| 8af97ac | fix | Fix page transition hydration bug with FrozenRouter |

## Decisions Made

1. **Centralized Variants File**
   - Separate file without "use client" directive
   - Pure data file that can be imported anywhere
   - Single source of truth for animation timing

2. **FrozenRouter Pattern**
   - Uses internal Next.js API (LayoutRouterContext)
   - Tested pattern from imcorfitz.com
   - Documented fragility in research

3. **useSelectedLayoutSegment Key**
   - More stable than usePathname
   - Doesn't re-trigger on hash navigation
   - Works correctly with App Router

## Deviations from Plan

None - plan executed exactly as written.

## Files Created/Modified

| File | Changes |
|------|---------|
| app/components/animation/variants.ts | +109 lines (8 variant exports, typed, documented) |
| app/components/layout/PageTransition.tsx | +64/-13 lines (FrozenRouter, usePreviousValue, variant imports) |

## Pending Todo Resolved

**From STATE.md:**
> Fix page transition animation repeating on hydration (plays twice on page load)

**Resolution:** FrozenRouter pattern with useSelectedLayoutSegment prevents hydration-triggered re-animation.

## Requirements Fulfilled

From plan success criteria:
- [x] app/components/animation/variants.ts exists with 8 exported variant objects
- [x] PageTransition uses useSelectedLayoutSegment instead of usePathname
- [x] FrozenRouter component implemented and wrapping children
- [x] Page transitions play exactly once per navigation (no hydration replay)
- [x] Reduced motion respected with 0.01ms duration

## Next Phase Readiness

**Ready for 05-02:** Animation foundation complete, variants available for scroll reveal implementation.

**Verification passed:**
- `npm run build` successful (no TypeScript errors)
- All 8 variants exported and typed
- FrozenRouter pattern implemented per research
- Reduced motion uses 0.01ms (not 0) per Phase 1 decision
