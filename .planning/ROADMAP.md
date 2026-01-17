# Roadmap

**Project:** Portfolio Visual Refresh
**Created:** 2026-01-16
**Phases:** 5

## Overview

This roadmap delivers a dark/moody visual refresh of the portfolio site in five phases, ordered by dependency. Foundation work (accessibility fixes, color token architecture) comes first because all subsequent styling depends on it. Surface styling establishes depth hierarchy before accent colors are refined. Typography polish and motion effects come last as finishing layers.

## Phases

### Phase 1: Foundation

**Goal:** Establish accessible, extensible color architecture that enables consistent styling across all components.

**Depends on:** Nothing (first phase)

**Requirements:** A11Y-01, A11Y-02, A11Y-04, COLOR-02

**Success Criteria:**
1. Lighthouse no longer flags H1UserAgentFontSizeInSection warning
2. User can navigate entire site using keyboard with visible focus indicators on every interactive element
3. Animations respect user's prefers-reduced-motion setting (no motion when disabled)
4. Color tokens follow three-layer architecture (primitive, semantic, utility) in globals.css and tailwind.config.ts

**Plans:** (created by /gsd:plan-phase)

---

### Phase 2: Surface Styling

**Goal:** Create visual depth hierarchy through background, card, and glassmorphism refinements.

**Depends on:** Phase 1 (requires token architecture)

**Requirements:** COLOR-04, COMP-01, COMP-02

**Success Criteria:**
1. Cards have visible depth differentiation from page background through shadows/elevation
2. Hovering over cards produces noticeable visual feedback (shadow, elevation, or border change)
3. Glassmorphism effects (backdrop-blur, transparency) are consistent across all card-like components
4. Visual hierarchy is clear: background < sunken < base < raised < overlay

**Plans:** (created by /gsd:plan-phase)

---

### Phase 3: Accent Colors

**Goal:** Refine accent color palette with cohesive hover states and glow effects.

**Depends on:** Phase 2 (requires surface hierarchy to test accent contrast)

**Requirements:** COLOR-01, COLOR-03, COMP-03

**Success Criteria:**
1. New accent palette replaces blue-purple gradient with cohesive dark/moody scheme
2. Interactive elements (buttons, links) have colored glow effects on hover/focus
3. All buttons have distinct visual states: default, hover, active, focus
4. Links are visually distinguishable from surrounding text

**Plans:** (created by /gsd:plan-phase)

---

### Phase 4: Typography + Polish

**Goal:** Ensure all text meets accessibility standards and detail elements match dark theme.

**Depends on:** Phase 3 (requires final accent colors for contrast testing)

**Requirements:** A11Y-03, COMP-04

**Success Criteria:**
1. All text elements pass WCAG 4.5:1 contrast ratio (verifiable with contrast checker)
2. Scrollbar styling matches dark theme (not default browser light scrollbar)
3. Text selection highlight uses theme-appropriate colors

**Plans:** (created by /gsd:plan-phase)

---

### Phase 5: Motion + Scroll

**Goal:** Add subtle animations that enhance user experience without overwhelming.

**Depends on:** Phase 4 (polish layer after all styling complete)

**Requirements:** INT-01, INT-02, INT-03

**Success Criteria:**
1. Clicking anywhere on a project card navigates to that project's detail page
2. Sections fade/slide into view when scrolling down the page
3. Page transitions feel smoother and more refined than current implementation
4. Animations are subtle and professional (not flashy or distracting)

**Plans:** (created by /gsd:plan-phase)

---

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1 - Foundation | Not started | -- |
| 2 - Surface Styling | Not started | -- |
| 3 - Accent Colors | Not started | -- |
| 4 - Typography + Polish | Not started | -- |
| 5 - Motion + Scroll | Not started | -- |

---

*Roadmap for milestone: v1.0 Visual Refresh*
