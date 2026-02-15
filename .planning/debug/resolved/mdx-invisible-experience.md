---
status: resolved
trigger: "animation-invisible-experience"
created: 2026-02-14T00:00:00Z
updated: 2026-02-14T00:02:00Z
---

## Current Focus

hypothesis: CONFIRMED AND FIXED - Removing `once: true` from viewport props caused animations to revert to hidden state.
test: Restored `once: true` to all viewport props. Build passes. Section files match committed state.
expecting: Elements stay visible permanently after first animation trigger.
next_action: Archive session.

## Symptoms

expected: Experience section should always display visible content -- job experience cards with text, dates, company names, fully visible on page load.
actual: Intermittently, the Experience section elements are present in DOM but invisible (opacity:0 or similar CSS state). Only the Experience section is affected, not other sections.
errors: No browser console errors, no terminal errors.
reproduction: Navigate to the page. Sometimes elements are invisible on load. Refresh usually fixes it.
started: After updating next-mdx-remote from 5.0.0 to 6.0.0, but was actually an animation/observer timing issue.

## Eliminated

## Evidence

- timestamp: 2026-02-14T00:00:30Z
  checked: git diff on all modified section files
  found: The ONLY change across ExperienceTimeline, FeaturedProjects, QuickTimeline, SkillsMatrix, StatsBar is the removal of `once: true` from every `viewport` prop. Footer has an unrelated content removal.
  implication: This is a systematic change that removed the "stay visible" behavior from all scroll-triggered animations.

- timestamp: 2026-02-14T00:00:40Z
  checked: Framer Motion `whileInView` behavior with and without `once: true`
  found: Without `once: true`, elements revert to their `initial` state ("hidden" = opacity:0) when they leave the viewport. With `once: true`, they stay in the "visible" state permanently after first trigger.
  implication: Scrolling past any section and back would cause it to be invisible until re-entering the viewport threshold again.

- timestamp: 2026-02-14T00:00:50Z
  checked: Page layout - ExperienceTimeline is the FIRST component on /experience page (no Hero above it)
  found: ExperienceTimeline renders at the very top of the page. The header has `viewport={{ amount: 0.5 }}` requiring 50% visibility. The timeline container has `amount: 0.2`.
  implication: On initial load, the element is already in the viewport. Hydration timing or slight scroll position can cause the observer to not fire consistently. Without `once: true`, any viewport exit (even momentary during hydration) reverts to opacity:0.

- timestamp: 2026-02-14T00:00:55Z
  checked: Why only Experience is affected intermittently while other sections work
  found: Home page sections (StatsBar, FeaturedProjects, QuickTimeline) are below a Hero component, so they are always scrolled INTO view from below (observer fires reliably). ExperienceTimeline on /experience has no Hero above it, so it starts already in the viewport at mount time - a problematic case for IntersectionObserver without `once: true`.
  implication: The bug is most visible on ExperienceTimeline but could theoretically affect any section when scrolled back to after leaving viewport.

- timestamp: 2026-02-14T00:01:30Z
  checked: Fix verification - restored `once: true` to all 9 viewport props across 5 files
  found: After restoring `once: true`, `git diff` on all section files shows zero changes (files match their committed state exactly). Build compiles with zero errors.
  implication: Fix is correct and complete.

## Resolution

root_cause: The `once: true` option was removed from all `viewport` props on `motion.div` elements using `whileInView`. Without `once: true`, framer-motion reverts elements to their `initial="hidden"` state (opacity: 0) whenever they leave the viewport. ExperienceTimeline is most affected because it's the first component on /experience (already in viewport at mount), making the IntersectionObserver trigger unreliable during hydration. Other sections work because they are below the fold and get consistently scrolled into view.
fix: Restored `once: true` to all viewport props in ExperienceTimeline.tsx, FeaturedProjects.tsx, QuickTimeline.tsx, SkillsMatrix.tsx, and StatsBar.tsx. This ensures animations trigger once and then stay visible permanently.
verification: All 5 section files now match their committed state (git diff shows no changes). Next.js build compiles successfully with zero errors.
files_changed: [ExperienceTimeline.tsx, FeaturedProjects.tsx, QuickTimeline.tsx, SkillsMatrix.tsx, StatsBar.tsx]
