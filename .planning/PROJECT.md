# Portfolio Site Refresh

## What This Is

A personal portfolio site for George Nakashyan targeting fullstack developer roles. The site showcases projects, work experience, and skills to hiring managers. Built with Next.js 15, React 19, and Tailwind CSS, deployed on Vercel.

**Current State (v1.0):** Dark/moody visual refresh complete with semantic color tokens, depth hierarchy, glow effects, scroll animations, and refined page transitions.

## Core Value

Impress hiring managers with a distinctive, professional portfolio that demonstrates fullstack capabilities without overwhelming them.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

**Existing (pre-v1.0):**
- ✓ Next.js 15 App Router with SSG — existing
- ✓ Hero section on landing page — existing
- ✓ Featured projects section on landing page — existing
- ✓ Quick timeline (recent employment) on landing page — existing
- ✓ Stats bar displaying key metrics — existing
- ✓ Individual project pages with MDX content — existing
- ✓ Full projects listing page — existing
- ✓ Experience page with timeline and skills matrix — existing
- ✓ Contact page with Formspree integration — existing
- ✓ Responsive navigation with mobile menu — existing
- ✓ Page transitions with Framer Motion — existing
- ✓ SEO setup (sitemap, robots.txt, metadata) — existing
- ✓ Vercel deployment with analytics — existing

**v1.0 Visual Refresh:**
- ✓ H1UserAgentFontSizeInSection Lighthouse fix — v1.0
- ✓ Three-layer semantic color token architecture — v1.0
- ✓ Visible focus indicators (double-layered outlines) — v1.0
- ✓ WCAG 4.5:1+ contrast ratios on all text — v1.0
- ✓ prefers-reduced-motion support — v1.0
- ✓ Dark/moody accent palette with glow effects — v1.0
- ✓ Multi-layer shadow depth hierarchy — v1.0
- ✓ Card styling with hover states and glassmorphism — v1.0
- ✓ Button micro-interactions (hover, active, focus) — v1.0
- ✓ Dark theme scrollbar and selection styling — v1.0
- ✓ Clickable project cards with navigation — v1.0
- ✓ Scroll reveal animations (staggered) — v1.0
- ✓ Refined page transitions (FrozenRouter pattern) — v1.0

### Active

<!-- Current scope. Building toward these. -->

(None — ready for next milestone planning)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Content changes (text, images) — User explicitly wants style-only changes
- Page structure changes — User wants to keep hero, featured projects, employment layout
- New pages or routes — Focus is on visual refresh, not feature additions
- Backend/API changes — Static site, no backend to modify
- Light mode toggle — Significant effort, tracked for v2
- Heavy animations — Research warns this signals "junior dev" to hiring managers

## Context

This is a brownfield project — an existing portfolio site with v1.0 visual refresh complete.

**Technical environment:**
- Next.js 15.5.9 with App Router
- React 19 with Server Components
- Tailwind CSS 3.4.1 with CSS custom properties
- Framer Motion 12.25.0 for animations
- MDX for project case study content
- 2,845 lines of TypeScript/CSS

**Design system (v1.0):**
- Three-layer color tokens (primitive → semantic → utility)
- Multi-layer shadows with 220deg blue hue
- 40% opacity glow effects on interactive elements
- FrozenRouter pattern for page transitions
- Scroll reveal with whileInView + stagger

**Target audience:** Hiring managers evaluating fullstack developer candidates

**Known issues:**
- LayoutRouterContext uses internal Next.js API (documented fallback in STATE.md)

## Constraints

- **No content changes**: Text, images, and project data must remain unchanged
- **Performance**: Must maintain or improve Lighthouse scores
- **Accessibility**: All styling must meet WCAG AA
- **Professional**: Style must appeal to hiring managers, not be flashy or distracting

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark/moody color direction | User preference, fits fullstack dev aesthetic | ✓ Good |
| Keep page structure | User explicitly likes current layout | ✓ Good |
| Style-only changes | Clear scope boundary for this refresh | ✓ Good |
| Three-layer token architecture | Enables consistent, maintainable styling | ✓ Good |
| Keep legacy tokens during migration | Avoid breaking existing components | ✓ Good |
| Two-color focus ring | Visible on all backgrounds per WCAG | ✓ Good |
| 40% opacity glow baseline | Professional vs gaming aesthetic | ✓ Good |
| FrozenRouter pattern | Fixes hydration animation replay | ✓ Good |
| viewport={{ once: true }} | Scroll animations don't replay | ✓ Good |

---
*Last updated: 2026-01-17 after v1.0 milestone*
