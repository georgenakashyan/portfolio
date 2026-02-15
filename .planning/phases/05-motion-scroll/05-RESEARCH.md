# Phase 5: Motion + Scroll - Research

**Researched:** 2026-01-17
**Domain:** Framer Motion scroll animations, Next.js App Router page transitions
**Confidence:** HIGH

## Summary

This phase adds subtle scroll-triggered section reveal animations and fixes the page transition hydration bug. The codebase already uses Framer Motion 12.25.0 and has a working `PageTransition` component with `useReducedMotion` support. The existing implementation in `/app/components/layout/PageTransition.tsx` uses `initial={false}` on `AnimatePresence` but still experiences animation replay on hydration due to React 19 strict mode behavior.

The scroll reveal animations will use Framer Motion's `whileInView` prop with `viewport={{ once: true }}` to trigger fade/slide effects when sections enter the viewport. This is the standard approach that requires no additional libraries and integrates seamlessly with the existing reduced motion patterns.

**Primary recommendation:** Use `whileInView` with staggered children for section reveals, and fix page transitions by switching from `usePathname()` to `useSelectedLayoutSegment()` with a FrozenRouter pattern to prevent hydration-triggered animations.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.25.0 | Animation library | Already installed; industry standard for React animations |
| next/navigation | 15.5.9 | Router hooks | Built-in; provides useSelectedLayoutSegment for stable keys |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | Framer Motion handles everything required |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| whileInView | useInView hook | useInView better for conditional logic; whileInView simpler for direct animation |
| FrozenRouter | next-view-transitions | External dependency; View Transitions API not fully stable |
| FrozenRouter | next-transition-router | Additional dependency; our use case is simple enough for custom solution |

**Installation:**
```bash
# No new dependencies needed - framer-motion 12.25.0 already installed
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── components/
│   ├── layout/
│   │   ├── PageTransition.tsx    # Update: use FrozenRouter pattern
│   │   └── Navbar.tsx            # Already has motion components
│   ├── sections/
│   │   ├── Hero.tsx              # Add scroll reveal (optional, above fold)
│   │   ├── StatsBar.tsx          # Add scroll reveal
│   │   ├── FeaturedProjects.tsx  # Add scroll reveal with stagger
│   │   ├── QuickTimeline.tsx     # Add scroll reveal with stagger
│   │   ├── SkillsMatrix.tsx      # Add scroll reveal with stagger
│   │   └── ExperienceTimeline.tsx # Add scroll reveal with stagger
│   └── animation/
│       └── variants.ts           # NEW: Centralized animation variants
```

### Pattern 1: whileInView for Section Reveals
**What:** Animate sections when they scroll into view using Framer Motion's built-in viewport detection
**When to use:** Any section below the fold that should animate on first view
**Example:**
```typescript
// Source: motion.dev/docs/react-scroll-animations
import { motion } from "framer-motion";

const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
```

### Pattern 2: Staggered Children Animation
**What:** Animate container children sequentially for visual hierarchy
**When to use:** Grids of cards, lists of items, timeline entries
**Example:**
```typescript
// Source: framerbook.com/animation/example-animations/28-variants-staggered-animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Usage
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Pattern 3: FrozenRouter for Page Transitions
**What:** Freeze router context during exit animations to prevent premature unmounting
**When to use:** Page transitions with AnimatePresence in App Router
**Example:**
```typescript
// Source: imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef } from "react";

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

export function PageTransition({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
```

### Pattern 4: Reduced Motion Integration
**What:** Respect user's prefers-reduced-motion setting in all animations
**When to use:** Every motion component
**Example:**
```typescript
// Source: motion.dev/docs/react-accessibility
import { useReducedMotion } from "framer-motion";

const Component = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.5,  // Use 0.01ms per Phase 1 decision
        ease: "easeOut"
      }}
    >
      Content
    </motion.div>
  );
};
```

### Anti-Patterns to Avoid
- **Using usePathname() for page transition keys:** Causes re-animation on same-route navigation (e.g., hash links). Use `useSelectedLayoutSegment()` instead.
- **Animating non-transform properties:** Animating `width`, `height`, `margin`, `box-shadow` causes layout thrash. Stick to `opacity`, `transform` (via x/y/scale/rotate).
- **No viewport.once:** Without `once: true`, animations replay every time user scrolls past, which is annoying.
- **duration: 0 for reduced motion:** Some browsers interpret 0 as "use default". Use `0.01ms` for reliable instant transitions.
- **Excessive stagger delays:** Keep `staggerChildren` under 0.15s; longer feels sluggish.
- **Animating Hero section:** Hero is above the fold; animating it creates flash on page load.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | IntersectionObserver wrapper | `whileInView` prop | Handles cleanup, thresholds, edge cases |
| Exit animations | State management for unmount delay | `AnimatePresence` | Handles async unmount orchestration |
| Staggered children | Manual delay calculations | `staggerChildren` transition | Automatic index-based delays |
| Reduced motion | Manual media query listener | `useReducedMotion` hook | Reactive, handles SSR |
| Viewport freeze | Custom context management | FrozenRouter pattern | Tested solution for App Router |

**Key insight:** Framer Motion's declarative API handles the complex timing and lifecycle management that makes hand-rolled animation code fragile and hard to maintain.

## Common Pitfalls

### Pitfall 1: Animation Replays on Hydration
**What goes wrong:** Page transition animation plays twice - once on server render visibility, once on client hydration
**Why it happens:** React 19 strict mode double-invokes effects; `usePathname()` returns same value but component re-mounts
**How to avoid:** Use `initial={false}` on AnimatePresence AND use `useSelectedLayoutSegment()` as key instead of `usePathname()`
**Warning signs:** Animation plays on page refresh without navigation; animation plays twice on first navigation

### Pitfall 2: Flash of Unstyled Content (FOUC)
**What goes wrong:** Elements briefly visible at final position before animation starts
**Why it happens:** `initial` state not applied before hydration completes
**How to avoid:** Ensure `initial={{ opacity: 0 }}` is set; consider CSS `visibility: hidden` fallback
**Warning signs:** Content flashes visible then animates; more noticeable on slow connections

### Pitfall 3: Scroll Jank from Layout Animations
**What goes wrong:** Page stutters during scroll when animations trigger
**Why it happens:** Animating properties that cause layout recalculation (width, height, margin)
**How to avoid:** Only animate `opacity` and `transform` properties (x, y, scale, rotate)
**Warning signs:** FPS drops during scroll; visible stutter when sections animate in

### Pitfall 4: Stagger Delays Cumulative Beyond Viewport
**What goes wrong:** Items far down a long list wait excessively long to animate
**Why it happens:** `staggerChildren` multiplies by index regardless of viewport visibility
**How to avoid:** Keep stagger to 0.1s or less; for long lists, consider animating only visible subset
**Warning signs:** Items at index 10+ take 1+ second to appear

### Pitfall 5: Browser Back Button Doesn't Trigger Exit Animation
**What goes wrong:** Exit animation skipped when using browser history navigation
**Why it happens:** Known App Router limitation with AnimatePresence
**How to avoid:** Accept this limitation; FrozenRouter pattern mitigates but doesn't fully solve
**Warning signs:** Smooth animation on link clicks; abrupt transition on back button

### Pitfall 6: LayoutRouterContext Import Breaks on Next.js Update
**What goes wrong:** Build fails after Next.js version bump
**Why it happens:** `next/dist/shared/lib/app-router-context.shared-runtime` is internal, not public API
**How to avoid:** Document this dependency; test on Next.js updates; have fallback ready
**Warning signs:** TypeScript errors on import; runtime errors referencing undefined context

## Code Examples

Verified patterns from official sources:

### Section Reveal with Reduced Motion
```typescript
// Combines whileInView with useReducedMotion
"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 }  // Per Phase 1 decision
  },
};

export const SectionReveal = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionVariants : sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
```

### Staggered Grid with Cards
```typescript
// Source: framerbook.com/animation/example-animations/28-variants-staggered-animation
"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const reducedContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface StaggeredGridProps {
  children: React.ReactNode[];
}

export const StaggeredGrid = ({ children }: StaggeredGridProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedContainerVariants : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={shouldReduceMotion ? reducedItemVariants : itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### Centralized Animation Variants File
```typescript
// app/components/animation/variants.ts
import { Variants } from "framer-motion";

// Standard section reveal (fade + slide up)
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Container for staggered children
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Individual staggered item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

// Reduced motion equivalents
export const reducedFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export const reducedContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const reducedPageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
```

## Timing & Easing Reference

Based on research and existing codebase decisions:

| Animation Type | Duration | Easing | Notes |
|----------------|----------|--------|-------|
| Section reveal (fade+slide) | 500ms | easeOut | Standard reveal timing |
| Stagger delay | 100ms | - | Per staggerChildren |
| Stagger item | 400ms | easeOut | Individual item animation |
| Page transition | 300ms | easeInOut | Existing codebase value |
| Reduced motion | 0.01ms | - | Phase 1 decision (not 0) |

**Easing values:**
- `easeOut` = `[0, 0, 0.2, 1]` - Standard deceleration
- `easeInOut` = `[0.4, 0, 0.2, 1]` - Smooth both ends
- Avoid `easeIn` for UI (feels sluggish at start)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS IntersectionObserver | `whileInView` prop | Framer Motion 6.0 | Declarative, less boilerplate |
| Manual exit state management | `AnimatePresence` | Framer Motion 4.0 | Automatic unmount delay |
| `motion.custom()` | `motion()` | Framer Motion 11+ | Simplified custom component wrapping |
| Pages Router _app.js | App Router layout.tsx | Next.js 13+ | Different context handling for transitions |

**Deprecated/outdated:**
- `positionTransition` prop: Replaced by `layout` prop
- Manual `useIntersection` with animation controls: Use `whileInView` instead
- `framer-motion/types`: Types now exported from main package

## Open Questions

Things that couldn't be fully resolved:

1. **Browser back button exit animations**
   - What we know: Known limitation with Next.js App Router + AnimatePresence
   - What's unclear: Whether Next.js 15.3.0 `onNavigate` API fully solves this
   - Recommendation: Accept limitation for now; FrozenRouter mitigates forward navigation issues

2. **LayoutRouterContext stability**
   - What we know: Works in Next.js 14.2.3 through 16.0.7 per sources
   - What's unclear: Whether this internal API will remain stable
   - Recommendation: Document the dependency; have fallback plan (remove exit animations)

3. **Strict mode double-animation on dev only**
   - What we know: React 19 strict mode double-invokes effects
   - What's unclear: Whether this affects production builds
   - Recommendation: Test in production build; may only be dev concern

## Sources

### Primary (HIGH confidence)
- [motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations) - Official whileInView documentation
- [motion.dev/docs/react-accessibility](https://motion.dev/docs/react-accessibility) - useReducedMotion hook
- [framerbook.com/animation/example-animations](https://framerbook.com/animation/example-animations/28-variants-staggered-animation/) - Stagger patterns
- [imcorfitz.com FrozenRouter article](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) - Tested FrozenRouter implementation

### Secondary (MEDIUM confidence)
- [GitHub Next.js Discussion #42658](https://github.com/vercel/next.js/discussions/42658) - Community solutions for App Router transitions
- [LogRocket Framer Motion Guide](https://blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/) - Page transition patterns
- [Dev.to Scroll Animations](https://dev.to/shivamkatare/create-beautiful-scroll-animations-using-framer-motion-1a7b) - whileInView examples

### Tertiary (LOW confidence)
- Various Medium/Dev.to articles on timing values - Consensus around 400-500ms for reveals
- AOS library documentation - Timing inspiration (though using Framer Motion, not AOS)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Framer Motion 12.x is well-documented, already in use
- Architecture patterns: HIGH - whileInView is documented official API
- Page transition fix: MEDIUM - FrozenRouter uses internal API, tested but fragile
- Timing values: MEDIUM - Based on research consensus, may need tuning
- Pitfalls: HIGH - Well-documented issues in community discussions

**Research date:** 2026-01-17
**Valid until:** 2026-02-17 (30 days - Framer Motion stable, Next.js may update)
