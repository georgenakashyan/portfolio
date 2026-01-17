# Phase 01 Plan 02: Accessibility Fixes Summary

**One-liner:** H1 sizing fix, two-color focus indicators, and reduced motion support across CSS and Framer Motion components

---

## What Was Delivered

### Artifacts Created/Modified

| Artifact | Type | Purpose |
|----------|------|---------|
| `app/globals.css` | modified | H1 sizing fix, global focus-visible styles, reduced motion media query |
| `app/components/layout/PageTransition.tsx` | modified | useReducedMotion integration for page transitions |
| `app/components/layout/Navbar.tsx` | modified | useReducedMotion integration for mobile menu animations |

### Key Capabilities Added

1. **H1 explicit sizing** - `:where(h1)` rule fixes Lighthouse H1UserAgentFontSizeInSection warning with zero-specificity selector
2. **Global focus indicators** - `:focus-visible` styles with two-color outline pattern (white outline + dark shadow) visible on any background
3. **Focus state cleanup** - `:focus:not(:focus-visible)` removes outline for mouse users while preserving keyboard focus
4. **CSS reduced motion** - `@media (prefers-reduced-motion: reduce)` disables all CSS animations/transitions when user prefers
5. **Page transition reduced motion** - `useReducedMotion` hook disables y-axis movement and sets duration to 0 for instant transitions
6. **Navbar reduced motion** - Hamburger icon, mobile menu slide, and overlay fade all respect reduced motion preference

### How It Works

```
User preference                    Implementation
prefers-reduced-motion: reduce --> CSS: animation-duration: 0.01ms, transition-duration: 0.01ms
                                   Framer Motion: useReducedMotion() -> shouldReduceMotion = true
                                   - y values set to 0 (no vertical movement)
                                   - duration set to 0 (instant)
                                   - x values for menu slide set to 0 (no horizontal movement)
```

Focus indicators use semantic tokens from Plan 01:
```
--focus-ring-width: 2px  -->  outline: 2px solid white
--focus-ring-offset: 2px -->  outline-offset: 2px
--focus-shadow-color     -->  box-shadow for dark backdrop
```

---

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Use `:where(h1)` for zero specificity | Allows component-specific h1 styles to easily override without specificity battles | Future components can style h1s naturally |
| Two-color focus ring (white + dark shadow) | Ensures visibility on both light and dark backgrounds per WCAG | Consistent accessibility across theme variations |
| Remove outline only for `:focus:not(:focus-visible)` | Maintains keyboard accessibility while improving mouse UX | Best of both worlds |
| Use 0.01ms instead of 0 for reduced motion | Some browsers interpret 0 as "no change" | More reliable cross-browser support |
| Keep opacity transitions in reduced motion | Instant state feedback still acceptable | Users see content appear/disappear clearly |

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Commits

| Hash | Type | Description |
|------|------|-------------|
| `3fe2db5` | feat | Add H1 sizing, focus indicators, and reduced motion CSS |
| `8423708` | feat | Add useReducedMotion to PageTransition |
| `b728e32` | feat | Add useReducedMotion to Navbar mobile menu |

---

## Next Phase Readiness

### Ready For

- Phase 2 (Component refinement): All base accessibility infrastructure in place
- Any future Framer Motion components: Pattern established for useReducedMotion integration
- Future keyboard navigation work: Focus indicators ready globally

### Blockers/Concerns

None identified.

### Dependencies Satisfied

- A11Y-01 (H1 sizing): Lighthouse warning resolved
- A11Y-02 (Focus indicators): Global visible focus rings for keyboard users
- A11Y-04 (Reduced motion): CSS and JS animations respect user preference
- Builds on Plan 01 focus tokens

---

## Metrics

- **Duration:** ~3 minutes
- **Tasks:** 3/3 complete
- **Files modified:** 3
- **Lines changed:** +65/-11
