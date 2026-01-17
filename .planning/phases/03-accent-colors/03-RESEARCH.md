# Phase 3: Accent Colors - Research

**Researched:** 2026-01-16
**Domain:** Accent color palettes, glow effects, button/link micro-interactions for dark themes
**Confidence:** HIGH

## Summary

Phase 3 addresses three interconnected requirements: refining the accent color palette (COLOR-01), adding colored glow effects on interactive elements (COLOR-03), and improving button/link micro-interactions (COMP-03). The research reveals that the current blue-purple gradient (`#3b82f6` to `#8b5cf6`) is already well-suited for a professional dark theme but lacks the cohesive system of hover states and glow effects that would make it feel distinctive.

The codebase already has glow effects scattered inconsistently (e.g., `hover:shadow-lg hover:shadow-primary-start/50` on buttons). Phase 3 should standardize these into a token-based system with CSS custom properties for glow colors and intensities. The key insight from research is that **glow effects work best on dark backgrounds** and should be subtle (40% opacity baseline) to avoid appearing garish or "gaming-like."

For button states, research strongly recommends distinguishing hover, focus, and active states visually. The current Button component conflates hover and active states and lacks a distinct pressed state. Links currently rely on color alone without underlines in body text, which may fail WCAG requirements.

**Primary recommendation:** Extend the token system with `--glow-*` custom properties, create standardized button state classes, and ensure links have either underlines or 3:1 contrast ratio against surrounding text.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 3.x | Utility-first styling | Already in stack; ring-*, shadow-* utilities |
| CSS Custom Properties | native | Design tokens | Phase 1-2 established pattern |

### Supporting (No New Dependencies)
No additional libraries needed. Glow effects use native `box-shadow`, state handling uses CSS pseudo-classes.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| box-shadow glow | filter: drop-shadow() | box-shadow more performant, drop-shadow for irregular shapes |
| CSS :active | JS onClick state | CSS is instant, JS requires state management |
| Custom glow tokens | Tailwind shadow-* only | Tokens provide consistency across components |

## Codebase Analysis

### Current Accent Color Usage

**Existing tokens (globals.css):**
```css
--accent-primary: var(--color-primary-500);    /* #3b82f6 - blue */
--accent-secondary: var(--color-violet-500);   /* #8b5cf6 - violet */
--accent-tertiary: var(--color-cyan-500);      /* #06b6d4 - cyan */
```

**Gradient (used for buttons, headings):**
```css
--gradient-primary-from: var(--color-primary-500);  /* #3b82f6 */
--gradient-primary-to: var(--color-violet-500);     /* #8b5cf6 */
```

### Current Glow Effect Patterns

| Component | Current Pattern | Issue |
|-----------|-----------------|-------|
| Button (primary) | `hover:shadow-lg hover:shadow-primary-start/50` | Uses legacy token |
| Button (secondary) | `hover:shadow-lg hover:shadow-secondary/50` | Uses legacy token |
| Badge (primary) | `hover:shadow-md hover:shadow-accent-primary/30` | Uses semantic token (good) |
| Timeline dots | `shadow-lg shadow-primary-start/50` | Persistent glow, not hover |
| Card | `hover:shadow-overlay` | No colored glow, depth shadow only |

**Inconsistencies:**
- Mix of legacy tokens (`primary-start`) and semantic tokens (`accent-primary`)
- Inconsistent shadow sizes (md vs lg)
- Inconsistent opacity values (30% vs 50%)

### Current Button States

**Button.tsx analysis:**
```typescript
// Primary variant:
"bg-gradient-primary text-text-primary font-bold hover:shadow-lg hover:shadow-primary-start/50 hover:scale-105 transition-all duration-300"

// Secondary variant:
"bg-transparent border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-text-primary hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 transition-all duration-300"
```

**Issues identified:**
1. No distinct `:active`/pressed state (only hover)
2. No `:focus-visible` styles (relies on global styles)
3. Uses legacy tokens (`primary-start`, `secondary`)
4. No disabled glow prevention (disabled buttons still show hover)

### Current Link States

**Navbar links:**
```typescript
"text-text-secondary hover:text-text-primary"  // No underline, color only
```

**MDX content links (globals.css):**
```css
.mdx-content a {
  color: var(--primary-start);
  text-decoration: underline;  /* Good - has underline */
  transition: color 0.2s;
}
```

**Inline links (various):**
```typescript
"text-primary-start hover:text-primary-end"  // No underline
```

## Architecture Patterns

### Recommended Glow Token System

Add to `globals.css`:
```css
:root {
  /* Glow colors - same as accent but for shadows */
  --glow-primary: rgba(59, 130, 246, 0.4);      /* blue at 40% */
  --glow-secondary: rgba(139, 92, 246, 0.4);    /* violet at 40% */
  --glow-tertiary: rgba(6, 182, 212, 0.4);      /* cyan at 40% */

  /* Glow intensity variants */
  --glow-primary-subtle: rgba(59, 130, 246, 0.2);
  --glow-primary-strong: rgba(59, 130, 246, 0.6);

  /* Glow shadow definitions */
  --shadow-glow-sm: 0 0 8px var(--glow-primary);
  --shadow-glow-md: 0 0 15px var(--glow-primary);
  --shadow-glow-lg: 0 0 25px var(--glow-primary), 0 0 50px var(--glow-primary-subtle);
}
```

### Recommended Tailwind Extension

Add to `tailwind.config.ts`:
```typescript
boxShadow: {
  // Existing
  raised: "var(--shadow-raised)",
  overlay: "var(--shadow-overlay)",
  // NEW: Glow effects
  "glow-sm": "var(--shadow-glow-sm)",
  "glow-md": "var(--shadow-glow-md)",
  "glow-lg": "var(--shadow-glow-lg)",
  // Colored glow variants
  "glow-primary": "0 0 15px var(--glow-primary)",
  "glow-secondary": "0 0 15px var(--glow-secondary)",
  "glow-tertiary": "0 0 15px var(--glow-tertiary)",
}
```

### Pattern 1: Button State Hierarchy

**What:** Distinct visual feedback for each interaction state
**When to use:** All button variants

```css
/* Hover: Subtle glow + slight scale */
.button:hover {
  box-shadow: var(--shadow-glow-md);
  transform: scale(1.02);
}

/* Active/Pressed: Reduced scale, intensified glow, darker background */
.button:active {
  box-shadow: var(--shadow-glow-sm);
  transform: scale(0.98);
  filter: brightness(0.9);
}

/* Focus-visible: Ring indicator (accessibility) */
.button:focus-visible {
  /* Uses global :focus-visible from Phase 1 */
}
```

**Tailwind implementation:**
```typescript
const primary = `
  bg-gradient-primary text-content-primary font-bold
  transition-all duration-200
  hover:shadow-glow-primary hover:scale-[1.02]
  active:scale-[0.98] active:brightness-90
`;
```

### Pattern 2: Link Accessibility

**What:** Ensure links are distinguishable from text per WCAG
**When to use:** All inline links in body text

**Option A (Preferred): Underline with enhanced styling:**
```css
a {
  color: var(--accent-primary);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: color 0.2s, text-decoration-color 0.2s;
}
a:hover {
  color: var(--accent-secondary);
  text-decoration-color: var(--accent-secondary);
}
```

**Option B (Navigation only): No underline but sufficient contrast:**
- Requires 3:1 contrast ratio between link color and surrounding text
- Must have additional visual cue on hover (underline appearance, glow, etc.)

### Pattern 3: Card Hover Glow

**What:** Subtle glow effect on card hover
**When to use:** Interactive card variants

```css
/* Combine elevation shadow with colored glow */
.card-hover:hover {
  box-shadow:
    var(--shadow-overlay),              /* Depth shadow */
    0 0 20px var(--glow-primary-subtle); /* Subtle glow */
}
```

### Anti-Patterns to Avoid

- **Persistent glow on static elements:** Glow should be hover/focus state, not constant (except for CTAs)
- **High opacity glow (>60%):** Looks garish and signals "gaming" aesthetic
- **Identical hover and active states:** Users can't tell if click registered
- **Links distinguishable only by color:** Fails WCAG 1.4.1 for color-blind users
- **scale() on disabled buttons:** Disabled buttons shouldn't animate

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Glow colors | Inline rgba() values | CSS custom properties | Consistency, easy theme changes |
| Button press state | JavaScript state management | CSS :active pseudo-class | Instant feedback, no re-render |
| Focus indicators | Custom focus tracking | CSS :focus-visible | Browser handles keyboard vs mouse |
| Underline animation | Complex JS animation | CSS text-decoration + transition | Native, performant |

**Key insight:** CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`) provide instant state feedback. JavaScript state requires a render cycle.

## Common Pitfalls

### Pitfall 1: Glow Opacity Too High

**What goes wrong:** 60%+ opacity glow looks like neon signs, signals "gaming" not "professional"
**Why it happens:** Developers test in isolation; high glow looks impressive alone but overwhelming in context
**How to avoid:** Start at 30-40% opacity, only increase for primary CTAs
**Warning signs:** Site looks like a gaming interface, glow competes with content

### Pitfall 2: Missing Active/Pressed State

**What goes wrong:** Users can't tell if click registered, leads to double-clicks
**Why it happens:** Hover state feels complete; active state forgotten
**How to avoid:** Always implement `:active` with scale reduction and/or color darkening
**Warning signs:** User frustration with buttons, especially on slow connections

### Pitfall 3: Links Only Distinguished by Color

**What goes wrong:** Color-blind users (~8% of men) can't identify links
**Why it happens:** Underlines removed for aesthetic reasons without alternative
**How to avoid:** Either keep underlines OR ensure 3:1 contrast ratio between link and surrounding text AND add non-color hover indicator
**Warning signs:** WCAG audit failures, user reports of missing links

### Pitfall 4: Hover Effects on Touch Devices

**What goes wrong:** Touch users see stuck hover states after tapping
**Why it happens:** Touch triggers hover, but no mouse-leave event clears it
**How to avoid:** Use `@media (hover: hover)` to scope hover effects to devices that support hover
**Warning signs:** Mobile users report "sticky" buttons

### Pitfall 5: Transition Duration Too Long

**What goes wrong:** Interface feels sluggish, users click before animation completes
**Why it happens:** 300ms+ transitions look smooth in demos but frustrate in use
**How to avoid:** Keep hover/active transitions under 200ms; 150ms is optimal
**Warning signs:** Users report interface feels slow despite fast load times

## Code Examples

### Button Component Refactor

```typescript
// Button.tsx - updated variant classes
const variantClasses = {
  primary: [
    // Base
    "bg-gradient-primary text-content-primary font-bold",
    // Hover
    "hover:shadow-glow-primary hover:scale-[1.02]",
    // Active (pressed)
    "active:scale-[0.98] active:shadow-glow-sm active:brightness-90",
    // Transition
    "transition-all duration-150",
    // Disabled (prevent hover effects)
    "disabled:hover:shadow-none disabled:hover:scale-100 disabled:active:scale-100",
  ].join(" "),

  secondary: [
    // Base
    "bg-transparent border-2 border-accent-tertiary text-accent-tertiary font-semibold",
    // Hover
    "hover:bg-accent-tertiary hover:text-content-primary hover:shadow-glow-tertiary hover:scale-[1.02]",
    // Active
    "active:scale-[0.98] active:brightness-90",
    // Transition
    "transition-all duration-150",
  ].join(" "),
};
```

### Link Styling Pattern

```css
/* globals.css - inline links */
.mdx-content a,
.prose a,
a[href]:not([class]) {
  color: var(--accent-primary);
  text-decoration: underline;
  text-decoration-color: var(--accent-primary);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color 150ms, text-decoration-color 150ms;
}

.mdx-content a:hover,
.prose a:hover,
a[href]:not([class]):hover {
  color: var(--accent-secondary);
  text-decoration-color: var(--accent-secondary);
}
```

### Glow Token Definitions

```css
/* globals.css - add to :root */

/* Glow base colors (40% opacity default) */
--glow-primary: rgba(59, 130, 246, 0.4);
--glow-secondary: rgba(139, 92, 246, 0.4);
--glow-tertiary: rgba(6, 182, 212, 0.4);

/* Glow intensity levels */
--glow-primary-subtle: rgba(59, 130, 246, 0.2);
--glow-primary-strong: rgba(59, 130, 246, 0.5);

/* Pre-composed glow shadows */
--shadow-glow-sm: 0 0 8px var(--glow-primary);
--shadow-glow-md: 0 0 15px var(--glow-primary);
--shadow-glow-lg:
  0 0 20px var(--glow-primary),
  0 0 40px var(--glow-primary-subtle);

/* Combined shadow (depth + glow) for cards */
--shadow-glow-card:
  var(--shadow-overlay),
  0 0 20px var(--glow-primary-subtle);
```

### Tailwind Config Extension

```typescript
// tailwind.config.ts addition
boxShadow: {
  // Existing
  raised: "var(--shadow-raised)",
  overlay: "var(--shadow-overlay)",
  // Glow effects
  "glow-sm": "var(--shadow-glow-sm)",
  "glow-md": "var(--shadow-glow-md)",
  "glow-lg": "var(--shadow-glow-lg)",
  "glow-card": "var(--shadow-glow-card)",
  // Specific color glows (for secondary/tertiary buttons)
  "glow-primary": "0 0 15px var(--glow-primary)",
  "glow-secondary": "0 0 15px var(--glow-secondary)",
  "glow-tertiary": "0 0 15px var(--glow-tertiary)",
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| opacity-based hover | scale + glow + transition | Material 3 (2023) | More tactile feedback |
| Single hover state | Distinct hover/active/focus | UX maturity | Better interaction clarity |
| color-only links | Underline + color | WCAG emphasis | Accessibility compliance |
| 300ms transitions | 150ms transitions | Performance focus (2024) | Snappier UX |

**Deprecated/outdated:**
- `outline: none` without replacement (accessibility failure)
- Hover-only interactive feedback (needs active state)
- Pure color link distinction (WCAG non-compliant)

## Files to Modify

### Token Layer
| File | Change Type | Description |
|------|-------------|-------------|
| `app/globals.css` | Extend | Add glow tokens, link base styles |
| `tailwind.config.ts` | Extend | Add glow shadow utilities |

### Component Layer
| File | Change Type | Description |
|------|-------------|-------------|
| `app/components/ui/Button.tsx` | Refactor | Add active state, use glow tokens |
| `app/components/ui/Card.tsx` | Extend | Add glow-on-hover variant |
| `app/components/ui/Badge.tsx` | Minor | Standardize glow opacity |

### Content Layer
| File | Change Type | Description |
|------|-------------|-------------|
| `app/globals.css` (.mdx-content) | Update | Refine link underline styling |
| Navigation links (various) | Audit | Ensure hover state has non-color cue |

## Open Questions

1. **Accent palette refinement**
   - What we know: Current blue-purple gradient is professional
   - What's unclear: Whether user wants to CHANGE the palette or REFINE it
   - Recommendation: Keep current colors but add cohesive glow system; changing palette is larger scope

2. **Card hover glow intensity**
   - What we know: Cards already have depth shadow (`shadow-overlay`)
   - What's unclear: How much additional glow without feeling "too much"
   - Recommendation: Test subtle glow (20% opacity) combined with existing shadow

3. **Link styling scope**
   - What we know: MDX links have underlines, navigation links don't
   - What's unclear: Should navigation links get underlines or remain as-is?
   - Recommendation: Navigation links can remain without underlines (sufficient visual distinction from position/context), but inline links in paragraphs must have underlines

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS: Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states) - Official state documentation
- [Tailwind CSS: Ring Utilities](https://tailwindcss.com/docs/ring-color) - Focus ring patterns
- [MDN: box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow) - Glow implementation
- [W3C WCAG Technique F73](https://www.w3.org/WAI/WCAG21/Techniques/failures/F73) - Link color-only failure

### Secondary (MEDIUM confidence)
- [Zell Liew: Style Hover, Focus, and Active States Differently](https://zellwk.com/blog/style-hover-focus-active-states/) - State differentiation patterns
- [LogRocket: Designing Button States](https://blog.logrocket.com/ux-design/designing-button-states/) - UX best practices
- [Adrian Roselli: On Link Underlines](https://adrianroselli.com/2016/06/on-link-underlines.html) - Link accessibility patterns
- [MyPaletteTool: Dark Mode Color Palettes Guide 2025](https://mypalettetool.com/blog/dark-mode-color-palettes) - Palette recommendations

### Tertiary (LOW confidence - for inspiration)
- [WebPortfolios.dev: Best Color Palettes for Developer Portfolios](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio) - Portfolio-specific guidance
- [Super Dev Resources: CSS Button Glow Effect](https://superdevresources.com/css-button-glow-effect/) - Glow implementation examples
- [Coder's Block: Creating Glow Effects with CSS](https://codersblock.com/blog/creating-glow-effects-with-css/) - Multi-layer glow techniques

## Metadata

**Confidence breakdown:**
- Glow implementation: HIGH - Standard CSS box-shadow, well-documented
- Button states: HIGH - Based on established UX patterns and Tailwind docs
- Link accessibility: HIGH - WCAG requirements are explicit
- Color palette: MEDIUM - Current palette is fine; refinement is subjective

**Research date:** 2026-01-16
**Valid until:** 2026-02-16 (30 days - CSS patterns stable, WCAG requirements stable)
