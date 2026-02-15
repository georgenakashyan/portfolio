---
phase: 05
plan: 02
subsystem: animation
tags: [framer-motion, scroll-reveal, whileInView, stagger, reduced-motion]

dependency-graph:
  requires:
    - 05-01 (animation variants foundation)
  provides:
    - Scroll-triggered section reveals for all major homepage sections
    - Staggered animations for grids and lists
    - Full reduced motion support
  affects: []

tech-stack:
  added: []
  patterns:
    - "whileInView with viewport={{ once: true }} for scroll triggers"
    - "staggerContainerVariants + staggerItemVariants for grid/list animations"
    - "useReducedMotion hook for accessibility"
    - "amount threshold tuning (0.1-0.5) based on element size"

key-files:
  created: []
  modified:
    - app/components/sections/StatsBar.tsx
    - app/components/sections/FeaturedProjects.tsx
    - app/components/sections/QuickTimeline.tsx
    - app/components/sections/SkillsMatrix.tsx
    - app/components/sections/ExperienceTimeline.tsx

decisions:
  - id: "viewport-once"
    choice: "Use viewport={{ once: true }} on all animations"
    rationale: "Animations play only on first view, not every scroll pass"
  - id: "amount-tuning"
    choice: "0.5 for headers, 0.1-0.2 for grids"
    rationale: "Small headers need more in view, large grids should trigger earlier"
  - id: "skip-skill-badges"
    choice: "Don't animate individual skill badges"
    rationale: "Too many items would create slow, overwhelming animation"

metrics:
  duration: "~2 min"
  completed: "2026-01-17"
---

# Phase 05 Plan 02: Section Scroll Reveals Summary

**One-liner:** Scroll-triggered reveal animations for all 5 major sections using whileInView, staggered children, and full reduced motion support.

## What Was Built

### StatsBar Section

Added scroll-triggered stagger animation to stats grid:

```tsx
<motion.div
  className='grid grid-cols-2 lg:grid-cols-4 gap-6'
  variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {stats.map((stat) => (
    <motion.div
      key={stat.label}
      variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
    >
      <Card>...</Card>
    </motion.div>
  ))}
</motion.div>
```

### FeaturedProjects Section

Added two animation groups:
1. Section header with fadeUpVariants
2. Project cards grid with staggerContainerVariants

```tsx
// Header
<motion.div
  className="mb-12 text-center"
  variants={shouldReduceMotion ? reducedFadeVariants : fadeUpVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
>

// Grid
<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
```

### QuickTimeline Section

- Header: fadeUpVariants with amount: 0.5
- Timeline cards grid: staggerContainerVariants with amount: 0.1
- Each experience card wrapped in motion.div preserving timeline dot structure

### SkillsMatrix Section

- Header: fadeUpVariants with amount: 0.5
- Category groups: staggerContainerVariants with amount: 0.1
- Individual skill badges NOT animated (too many items)

### ExperienceTimeline Section

- Header: fadeUpVariants with amount: 0.5
- Timeline entries: staggerContainerVariants with amount: 0.2
- Each entry wrapped in motion.div preserving timeline dot structure

## Animation Behavior

| Section | Header Animation | Content Animation | Viewport Amount |
|---------|-----------------|-------------------|-----------------|
| StatsBar | (none) | stagger grid | 0.2 |
| FeaturedProjects | fadeUp | stagger grid | 0.5 / 0.1 |
| QuickTimeline | fadeUp | stagger grid | 0.5 / 0.1 |
| SkillsMatrix | fadeUp | stagger categories | 0.5 / 0.1 |
| ExperienceTimeline | fadeUp | stagger entries | 0.5 / 0.2 |

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 9443a12 | feat | Add scroll reveal to StatsBar and FeaturedProjects |
| 65f5293 | feat | Add scroll reveal to QuickTimeline, SkillsMatrix, ExperienceTimeline |

## Decisions Made

1. **Viewport Once**
   - All animations use `viewport={{ once: true }}`
   - Prevents animations replaying on every scroll pass
   - Better UX - content stays visible after first reveal

2. **Amount Thresholds**
   - Headers use 0.5 (need 50% visible to trigger)
   - Large grids use 0.1 (trigger early for better timing)
   - Timeline entries use 0.2 (medium threshold)

3. **Skip Individual Skill Badges**
   - Categories animate as groups, not individual badges
   - Too many items would create slow, overwhelming cascade
   - Better UX with category-level stagger

## Deviations from Plan

None - plan executed exactly as written.

## Files Modified

| File | Changes |
|------|---------|
| app/components/sections/StatsBar.tsx | +45 lines (motion imports, useReducedMotion, wrapper divs) |
| app/components/sections/FeaturedProjects.tsx | +45 lines (motion imports, useReducedMotion, 2 animation groups) |
| app/components/sections/QuickTimeline.tsx | +29 lines (motion imports, useReducedMotion, header + grid animation) |
| app/components/sections/SkillsMatrix.tsx | +29 lines (motion imports, useReducedMotion, header + categories animation) |
| app/components/sections/ExperienceTimeline.tsx | +35 lines (motion imports, useReducedMotion, header + entries animation) |

## Requirements Fulfilled

From plan success criteria:
- [x] All 5 section files import and use variants from animation/variants.ts
- [x] All sections use whileInView with viewport={{ once: true }}
- [x] Headers use fadeUpVariants, grids/lists use staggerContainerVariants + staggerItemVariants
- [x] All sections respect useReducedMotion with reduced variants
- [x] Build completes without errors
- [x] INT-02 requirement satisfied (sections fade/slide into view on scroll)

## Verification Results

```
grep -r "whileInView" app/components/sections/
# Found in all 5 section files (9 total usages)

grep -r "useReducedMotion" app/components/sections/
# Found in all 5 section files (import + hook call)

grep -r "animation/variants" app/components/sections/
# Found in all 5 section files

npm run build
# Successful - no errors
```

## Phase Completion Status

Phase 05 (Motion + Scroll) is now complete:
- [x] 05-01: Animation Foundation + Page Transition Fix
- [x] 05-02: Section Scroll Reveals

All major sections have scroll-triggered reveal animations with staggered children and reduced motion support.
