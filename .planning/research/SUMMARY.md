# Research Summary: Dark Portfolio Visual Refresh

**Project:** Portfolio Visual Refresh (dark/moody aesthetic)
**Synthesized:** 2026-01-16
**Research Dimensions:** Stack, Features, Architecture, Pitfalls

---

## Executive Summary

Building a professional dark-themed developer portfolio requires restraint, not excess. The research converges on a clear principle: hiring managers spend under 60 seconds reviewing portfolios, scanning for red flags before evaluating content. A dark aesthetic succeeds when it creates a distinctive first impression while never interfering with content consumption. The existing stack (Next.js 15, Tailwind 3.4.1, Framer Motion) is well-suited for this refresh with zero technology changes required.

The recommended approach is a three-layer color token system (primitives, semantics, Tailwind utilities) that separates raw color values from their purposes. This architecture enables the visual refresh to proceed incrementally without breaking existing components. The current blue-purple gradient is acceptable but could be simplified to a single cyan/teal accent for greater sophistication. The existing dark navy background (`#0a0e27`) is already correctly not pure black.

The primary risks are accessibility-related: invisible focus indicators on dark backgrounds, oversaturated accent colors failing WCAG contrast ratios, and the existing Lighthouse H1UserAgentFontSizeInSection warning. All are straightforward to fix. The aesthetic risk is pushing "moody" into "too edgy for enterprise audiences" - research strongly recommends subtracting visual effects rather than adding them.

---

## Key Findings

### From STACK.md (CSS Techniques)

| Technology | Rationale |
|------------|-----------|
| **OKLCH color space** | Perceptually uniform colors for generating hover states and glow effects (92%+ browser support) |
| **Multi-layer box shadows** | Creates depth and glow effects on dark backgrounds; single shadows look flat |
| **Glassmorphism (backdrop-blur)** | Semi-transparent backgrounds create visual hierarchy without harsh borders |
| **CSS `color-mix()`** | Generate hover/glow variants dynamically from semantic tokens |
| **prefers-reduced-motion** | Critical accessibility requirement; 70+ million people have vestibular disorders |

**Critical version note:** Current palette contrast is already good. `#3b82f6` (blue) is 4.7:1 against background (passes AA). `#8b5cf6` (purple) is 4.2:1 (borderline for small text). Prefer blue for small text usage.

### From FEATURES.md (Visual Patterns)

**Table Stakes (must have):**
- Dark gray backgrounds, not pure black (already correct)
- WCAG 4.5:1 contrast ratios for text
- Off-white text, not pure white (already correct at `#f1f5f9`)
- 16-18px minimum body text with 1.5x line height
- Consistent visual language across all pages

**Differentiators (should have):**
- Single bold accent color instead of gradient (consider cyan/teal family)
- Subtle hover micro-interactions (transforms, color shifts)
- Depth through color lightness (brighter = closer to user)
- Code-inspired aesthetic with monospace accents (JetBrains Mono already in stack)
- Animated section reveals on scroll (Framer Motion ready)

**Anti-Features (explicitly avoid):**
- Heavy animations on every element
- Custom cursor replacement
- Parallax scrolling
- Rainbow gradients or neon overload
- Decorative elements that overshadow content

**Key insight:** "The portfolio should showcase work, not be the work."

### From ARCHITECTURE.md (Color System Structure)

**Recommended: Three-layer token architecture**

```
Layer 1: Primitives (--color-neutral-900, --color-primary-500)
    |
    v
Layer 2: Semantics (--surface-raised, --text-primary, --accent-primary)
    |
    v
Layer 3: Tailwind (bg-surface-raised, text-content-primary)
```

**Current state:** Partial two-layer system with primitives and semantics conflated. Migration path is incremental and non-breaking.

**Key architectural decisions:**
- Surfaces: `base`, `raised`, `overlay`, `sunken` for depth hierarchy
- Text: `primary`, `secondary`, `muted`, `inverse`
- Accents: `primary`, `secondary`, `tertiary`, plus status colors
- Shadows: Use colored glows instead of traditional dark shadows (traditional shadows don't work on dark backgrounds)

### From PITFALLS.md (Implementation Risks)

**Critical pitfalls (project-blockers):**

| Pitfall | Impact | Prevention |
|---------|--------|------------|
| **Pure black background** | Eye strain, halation effect, 50% of users affected | Use dark gray; current `#0a0e27` is already correct |
| **Oversaturated accents** | Fails WCAG, signals "gaming/entertainment" | Desaturate by 20-30%, test all combinations |
| **Invisible focus indicators** | Breaks keyboard navigation, ADA liability | Double-layered focus outlines (light + dark) |
| **H1 explicit font-size** | Lighthouse warning already present | Add `h1 { font-size: 2em; }` to globals.css |

**Moderate pitfalls:**
- Pure white text (`#fff`) causes eye fatigue (current `#f1f5f9` is already correct)
- "Too edgy" aesthetic alienates enterprise hiring managers
- Links indistinguishable from text on dark backgrounds
- Performance-heavy animations (implement `prefers-reduced-motion`)

**Minor pitfalls:**
- Light scrollbars clashing with dark theme
- Default selection highlight mismatch
- Project screenshots with white backgrounds looking jarring

---

## Implications for Roadmap

Based on combined research, the visual refresh should proceed in dependency order with accessibility and foundation work first.

### Suggested Phase Structure

**Phase 1: Foundation (Color System + Critical Fixes)**

| Aspect | Details |
|--------|---------|
| Rationale | Architecture must be in place before component updates; H1 fix is already flagged |
| Delivers | Three-layer token system, H1 fix, focus indicator fix, prefers-reduced-motion |
| Features from FEATURES.md | Consistent visual language, proper contrast ratios |
| Pitfalls to avoid | #4 (H1 sizing), #3 (invisible focus), #8 (animation performance) |
| Research needed | None - patterns well-documented |

**Phase 2: Surface Styling (Backgrounds + Cards)**

| Aspect | Details |
|--------|---------|
| Rationale | Background and surface colors must be set before accent colors make sense |
| Delivers | Updated background gradient, card surfaces with depth hierarchy, glassmorphism effects |
| Features from FEATURES.md | Dark gray backgrounds, depth through color lightness |
| Pitfalls to avoid | #1 (pure black), #5 (pure white text), #9 (image treatment) |
| Research needed | None - current backgrounds already appropriate |

**Phase 3: Accent Colors + Interactive States**

| Aspect | Details |
|--------|---------|
| Rationale | With surfaces set, accent colors can be tuned for contrast |
| Delivers | Refined accent color (possibly single cyan instead of gradient), hover states, glow effects |
| Features from FEATURES.md | Single bold accent, subtle hover micro-interactions |
| Pitfalls to avoid | #2 (oversaturation), #7 (link distinction) |
| Research needed | Color testing - may need iterations for contrast compliance |

**Phase 4: Typography + Detail Polish**

| Aspect | Details |
|--------|---------|
| Rationale | Final polish layer after major colors are set |
| Delivers | Typography audit, scrollbar styling, selection highlight, gradient text refinement |
| Features from FEATURES.md | Code-inspired aesthetic, proper line height |
| Pitfalls to avoid | #10 (scrollbars), #11 (selection highlight) |
| Research needed | None |

**Phase 5: Motion + Scroll Effects**

| Aspect | Details |
|--------|---------|
| Rationale | Animation is polish, not foundation; add last to avoid over-engineering |
| Delivers | Scroll-triggered section reveals, refined page transitions |
| Features from FEATURES.md | Animated section reveals, smooth page transitions |
| Pitfalls to avoid | #8 (performance), #6 (too edgy aesthetic) |
| Research needed | Consider `/gsd:research-phase` for animation patterns if uncertain |

### Research Flags

| Phase | Research Needed? | Rationale |
|-------|------------------|-----------|
| Phase 1 (Foundation) | No | WCAG standards and token architecture well-documented |
| Phase 2 (Surfaces) | No | Current colors already appropriate; incremental refinement |
| Phase 3 (Accents) | Maybe | May need iteration for contrast; consider color testing tools |
| Phase 4 (Typography) | No | Standard CSS patterns |
| Phase 5 (Motion) | Optional | Framer Motion already in stack; research only if adding new patterns |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official Tailwind docs, MDN, established CSS patterns |
| Features | HIGH | Multiple hiring manager surveys, consistent recommendations across sources |
| Architecture | HIGH | Design token patterns well-established; Tailwind docs verified |
| Pitfalls | HIGH | WCAG standards, accessibility experts, consistent warnings across sources |

**Overall confidence: HIGH**

### Gaps Identified

1. **Accent color decision:** Research supports both keeping gradient and simplifying to single color. Decision should be made during Phase 3 based on visual testing.

2. **Light/dark toggle:** FEATURES.md identifies this as high-value but deferred. Not in scope for this refresh but worth noting for v2.

3. **Project screenshot treatment:** Need to audit existing images during Phase 2 to determine if CSS treatment (borders, shadows) is needed.

4. **Exact token values:** ARCHITECTURE.md provides recommended structure but final color values should be validated with contrast checkers during implementation.

---

## Sources (Aggregated)

### Official Documentation
- Tailwind CSS: Dark Mode, Box Shadow, Backdrop Blur
- MDN: prefers-reduced-motion, color-mix(), H1 element styles
- WCAG 2.1: Contrast requirements, Focus Visible

### Design Authority
- Google Material Design: Dark theme guidelines
- Smashing Magazine: Inclusive Dark Mode
- NN/g: Dark Mode user research
- Sara Soueidan: Focus indicators

### Portfolio-Specific
- Profy.dev: 60+ hiring manager portfolio survey
- Brittany Chiang portfolio: Gold standard reference
- Multiple "developer portfolio mistakes" articles

### Technical References
- Lighthouse Issue #16404 (H1 sizing)
- Tailwind GitHub discussions (dark mode shadows)

---

## Recommendation

Proceed with the five-phase approach. The visual refresh is well-scoped: style-only changes with existing stack, clear accessibility requirements, and consistent expert guidance. The main risk is scope creep into "too edgy" territory - the research strongly recommends restraint.

**Single most important principle:** Every visual effect should have a purpose. If you cannot articulate why it helps the hiring manager understand the work, remove it.
