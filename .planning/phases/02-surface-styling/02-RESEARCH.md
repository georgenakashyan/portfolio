# Phase 2: Surface Styling - Research

**Researched:** 2026-01-16
**Domain:** CSS depth hierarchy, glassmorphism, dark theme shadows
**Confidence:** HIGH

## Summary

Phase 2 focuses on creating visual depth hierarchy through surface colors, shadows, and glassmorphism refinements. The codebase analysis reveals a portfolio site with existing card components, badge components, and various card-like surfaces that use inconsistent styling patterns. The current implementation uses `bg-card-bg/40` with `backdrop-blur-lg` as the primary glassmorphism approach, but shadows are minimal and the elevation hierarchy is unclear.

For dark themes, the established best practice is to use **lighter surface colors** rather than shadows alone to indicate elevation. Shadows on dark backgrounds are less visible, so depth comes from surface lightness differences. The site should implement a 4-level elevation system (sunken, base, raised, overlay) using semantic surface tokens already partially established in Phase 1.

**Primary recommendation:** Extend the existing token system with shadow tokens and update the Card component to use semantic surface/shadow combinations rather than hardcoded values.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 3.x | Utility-first styling | Already in project |
| CSS Variables | Native | Design tokens | Phase 1 foundation |

### Supporting (No New Dependencies)
No additional libraries needed. This phase uses native CSS features (box-shadow, backdrop-filter) already supported.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom shadow tokens | Tailwind shadow plugin | Custom tokens provide more control for dark theme; Tailwind shadows designed for light themes |
| backdrop-filter | Pre-blurred images | Performance on low-end devices, but loses dynamic blur |

## Codebase Analysis

### Card-Like Components Identified

**1. Card.tsx (UI Component)**
Location: `app/components/ui/Card.tsx`
- Three variants: `default`, `hover`, `flat`
- Current styles:
  - `default`: `bg-card-bg/40 backdrop-blur-lg border border-white/10`
  - `hover`: Same + `hover:bg-card-bg/60 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-start/20`
  - `flat`: `bg-card-bg border border-white/5`
- **Issue:** Uses legacy `card-bg` token, inconsistent with Phase 1 semantic tokens

**2. Badge.tsx (UI Component)**
Location: `app/components/ui/Badge.tsx`
- Four variants: `default`, `primary`, `secondary`, `success`
- Uses glassmorphism on default variant: `bg-card-bg/60 backdrop-blur-sm`
- **Issue:** Also uses legacy `card-bg` token

**3. Experience.tsx (Component)**
Location: `app/components/Experience.tsx`
- Inline card styling: `border border-background rounded-3xl hover:bg-opacity-5 hover:bg-slate-200`
- **Issue:** Uses undefined `border-background` class, likely broken; doesn't use Card component

**4. Inline Card Styling (contact/page.tsx)**
Location: `app/contact/page.tsx` (lines 94, 110)
- Two inline glassmorphism divs: `bg-card-bg/40 backdrop-blur-lg border border-white/10 rounded-3xl`
- **Issue:** Should use Card component for consistency

**5. MDX Components**
Location: `mdx-components.tsx`
- `code`: `bg-card-bg/60 border border-white/10`
- `pre`: `bg-card-bg/60 backdrop-blur-sm border border-white/10`
- `blockquote`: `bg-card-bg/40 backdrop-blur-sm`
- **Issue:** Inconsistent with Card component patterns

**6. Layout Components**
- Navbar: `bg-card-bg/70 backdrop-blur-md shadow-lg`
- Footer: `bg-card-bg/30 backdrop-blur-sm`
- Mobile menu overlay: `bg-black/50 backdrop-blur-sm`

**7. Form Components**
- Input/Textarea: Hardcoded `bg-[#1a2332]` - not using tokens at all
- **Issue:** Should use surface tokens

### Current Token System (from Phase 1)

**Surfaces (globals.css):**
```css
--surface-base: var(--color-neutral-900);     /* #0a0e27 */
--surface-elevated: var(--color-neutral-800); /* #0f172a */
--surface-raised: var(--color-neutral-700);   /* #1e293b */
```

**Legacy (still in use):**
```css
--card-bg: #1e293b; /* Same as neutral-700 */
```

**Current Tailwind (tailwind.config.ts):**
```typescript
surface: {
  base: "var(--surface-base)",
  elevated: "var(--surface-elevated)",
  raised: "var(--surface-raised)",
}
```

### Glassmorphism Patterns Found

| Location | Background | Blur | Border | Shadow |
|----------|------------|------|--------|--------|
| Card default | card-bg/40 | lg | white/10 | none |
| Card hover | card-bg/60 | lg | white/10 | xl primary/20 |
| Badge default | card-bg/60 | sm | white/10 | none |
| Navbar | card-bg/70 | md | secondary/10 | lg |
| Footer | card-bg/30 | sm | secondary/10 | none |
| Contact inline | card-bg/40 | lg | white/10 | none |

**Inconsistencies:**
- Blur values: sm, md, lg (should standardize)
- Border colors: white/10 vs secondary/10
- Background opacity: 30%, 40%, 60%, 70% (no clear hierarchy)

## Architecture Patterns

### Recommended Elevation System

Based on Atlassian Design System and dark theme best practices:

```
Level       Surface Lightness    Use Case                      Shadow
--------    -----------------    --------                      ------
sunken      darkest              background wells, columns     none (inset optional)
base        default              page background               none
raised      lighter              cards, interactive elements   subtle
overlay     lightest             modals, dropdowns, tooltips   prominent
```

### Recommended Token Extensions

Add to `globals.css`:
```css
/* Surface extensions */
--surface-sunken: var(--color-neutral-950);   /* #0a0a0f - darkest */
--surface-overlay: color-mix(in srgb, var(--surface-raised) 100%, white 5%);

/* Shadow tokens (dark theme optimized) */
--shadow-color: 220deg 40% 2%;
--shadow-raised:
  0px 1px 2px hsl(var(--shadow-color) / 0.3),
  0px 2px 4px hsl(var(--shadow-color) / 0.3);
--shadow-overlay:
  0px 4px 8px hsl(var(--shadow-color) / 0.4),
  0px 8px 16px hsl(var(--shadow-color) / 0.3);
```

### Card Component Refactor Pattern

```typescript
const variantClasses = {
  // Sunken - for background wells
  sunken: "bg-surface-sunken",

  // Default - standard card with glassmorphism
  default: "bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised",

  // Hover - interactive card with lift effect
  hover: "bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised
          hover:bg-surface-elevated/60 hover:-translate-y-1 hover:shadow-overlay
          hover:border-border-strong transition-all duration-300 cursor-pointer",

  // Flat - no glassmorphism
  flat: "bg-surface-raised border border-border-subtle",

  // Overlay - modals, dropdowns
  overlay: "bg-surface-overlay/95 backdrop-blur-xl border border-border-strong shadow-overlay",
};
```

### Anti-Patterns to Avoid

- **Hardcoded colors:** `bg-[#1a2332]` instead of tokens
- **Legacy tokens:** `card-bg` instead of `surface-*`
- **Inconsistent opacity:** Random 30/40/60/70% without hierarchy
- **Pure black shadows:** Use hsl with theme-aware color
- **Heavy blur everywhere:** Reserve `blur-xl` for overlays

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shadow values | Custom shadow strings | Token system | Consistency, maintainability |
| Glassmorphism styles | Inline Tailwind | Card variants | Reusability |
| Depth hierarchy | Ad-hoc opacity values | Semantic tokens | Clear visual language |

**Key insight:** The current codebase has inconsistent depth cues because developers made ad-hoc decisions. A token system removes that decision-making.

## Common Pitfalls

### Pitfall 1: Shadows on Dark Backgrounds
**What goes wrong:** Using light-mode shadow values (grays, blacks) that become invisible or look muddy
**Why it happens:** Copy-pasting shadow values without considering background
**How to avoid:** Use darker, more saturated shadow colors; rely more on surface lightness for elevation
**Warning signs:** Shadows only visible on hover, no depth perception

### Pitfall 2: Glassmorphism Performance
**What goes wrong:** Page lag, especially on mobile
**Why it happens:** backdrop-filter is expensive; too many elements use it
**How to avoid:** Limit blur-lg elements to 2-3 per viewport; use blur-sm for smaller elements
**Warning signs:** Mobile performance issues, battery drain

### Pitfall 3: Contrast Loss with Blur
**What goes wrong:** Text becomes unreadable over blurred backgrounds
**Why it happens:** Blur reduces contrast, especially on busy backgrounds
**How to avoid:** Increase background opacity (40%+), use text shadows, ensure 4.5:1 contrast
**Warning signs:** WCAG contrast failures, readability complaints

### Pitfall 4: Inconsistent Border Colors
**What goes wrong:** Cards look different from each other despite same "style"
**Why it happens:** Mixing `border-white/10` with `border-text-secondary/10`
**How to avoid:** Use semantic border tokens exclusively
**Warning signs:** Visual inconsistency across components

### Pitfall 5: Breaking Existing Components
**What goes wrong:** Updating tokens breaks components that rely on legacy values
**Why it happens:** Removing legacy tokens before migration complete
**How to avoid:** Keep legacy tokens, add new semantic tokens, migrate incrementally
**Warning signs:** Colors disappearing after token changes

## Code Examples

### Shadow Token Definition (CSS Variables)
```css
/* Source: Josh Comeau shadow layering technique */
:root {
  --shadow-color: 220deg 40% 2%;

  --shadow-raised:
    0px 1px 2px hsl(var(--shadow-color) / 0.3),
    0px 2px 4px hsl(var(--shadow-color) / 0.3);

  --shadow-overlay:
    0px 2px 4px hsl(var(--shadow-color) / 0.4),
    0px 4px 8px hsl(var(--shadow-color) / 0.3),
    0px 8px 16px hsl(var(--shadow-color) / 0.2);
}
```

### Tailwind Config Shadow Extension
```typescript
// tailwind.config.ts
boxShadow: {
  raised: "var(--shadow-raised)",
  overlay: "var(--shadow-overlay)",
}
```

### Card Hover State Pattern
```typescript
// Semantic hover feedback
const hoverClasses = `
  hover:bg-surface-elevated/60    // Subtle background change
  hover:-translate-y-1            // Slight lift (reduced from -2)
  hover:shadow-overlay            // Shadow increase
  hover:border-border-strong      // Border emphasis
  transition-all duration-300
`;
```

### Glassmorphism Consistency Pattern
```css
/* Standard glassmorphism recipe */
.glass-card {
  background: hsl(var(--surface-elevated) / 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border-default));
  box-shadow: var(--shadow-raised);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pure black shadows | HSL shadows with theme hue | 2023+ | Better dark theme integration |
| Single shadow layer | Multi-layer shadows | Always valid | More realistic depth |
| Heavy blur everywhere | Strategic blur (2-3 elements) | 2024+ | Performance improvement |
| opacity/10 borders | 5%/10%/20% hierarchy | Design systems maturity | Clearer visual language |

**Deprecated/outdated:**
- `filter: drop-shadow()` for boxes (use `box-shadow`)
- High blur values (20px+) without performance testing

## Files to Modify

### Primary Changes

| File | Change Type | Description |
|------|-------------|-------------|
| `app/globals.css` | Extend | Add shadow tokens, surface-sunken, surface-overlay |
| `tailwind.config.ts` | Extend | Add shadow utilities, surface-sunken, surface-overlay |
| `app/components/ui/Card.tsx` | Refactor | Use semantic tokens, add variants |
| `app/components/ui/Badge.tsx` | Refactor | Use semantic tokens |

### Secondary Changes (Component Migration)

| File | Change Type | Description |
|------|-------------|-------------|
| `app/components/Experience.tsx` | Refactor | Fix broken styling, use Card component |
| `app/contact/page.tsx` | Refactor | Replace inline styles with Card component |
| `app/components/ui/Input.tsx` | Refactor | Replace hardcoded bg with surface token |
| `app/components/ui/Textarea.tsx` | Refactor | Replace hardcoded bg with surface token |
| `mdx-components.tsx` | Refactor | Use semantic tokens for code/pre/blockquote |
| `app/components/layout/Navbar.tsx` | Refactor | Use semantic surface/shadow tokens |
| `app/components/layout/Footer.tsx` | Refactor | Use semantic surface tokens |

### Files That Should NOT Change
- `app/components/sections/*.tsx` - These use Card component; will inherit changes
- Legacy token definitions - Keep for backward compatibility

## Open Questions

1. **Mobile performance testing**
   - What we know: backdrop-filter can cause performance issues
   - What's unclear: Current site's mobile performance baseline
   - Recommendation: Test before/after on low-end device; consider reducing blur on mobile

2. **Hover lift amount**
   - What we know: Current uses `-translate-y-2` (8px)
   - What's unclear: Whether this feels too aggressive
   - Recommendation: Try `-translate-y-1` (4px) for subtler feel, test with stakeholder

3. **Input/Textarea styling**
   - What we know: Uses hardcoded `#1a2332`
   - What's unclear: Whether these should use glassmorphism or remain solid
   - Recommendation: Use solid `surface-raised` for form inputs (better contrast for text entry)

## Sources

### Primary (HIGH confidence)
- [Josh Comeau: Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/) - Shadow layering technique, dark theme color recommendations
- [Atlassian Design System: Elevation](https://atlassian.design/foundations/elevation/) - 4-level elevation hierarchy, token naming

### Secondary (MEDIUM confidence)
- [Netguru: Dark Mode UI Tips 2025](https://www.netguru.com/blog/tips-dark-mode-ui) - Surface lightness for elevation
- [UX Pilot: Glassmorphism Best Practices](https://uxpilot.ai/blogs/glassmorphism-ui) - Blur values, performance tips
- [Tailwind CSS: Dark Mode Docs](https://tailwindcss.com/docs/dark-mode) - Native dark mode support

### Tertiary (LOW confidence)
- [Tailwind Shadow Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/3177) - Community patterns for dark mode shadows

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing tools, well-documented patterns
- Architecture: HIGH - Based on established design systems (Atlassian, Material)
- Pitfalls: HIGH - Based on documented issues and codebase analysis
- Code examples: MEDIUM - Adapted from sources, needs validation in this codebase

**Research date:** 2026-01-16
**Valid until:** 2026-02-16 (30 days - stable CSS patterns)
