# Portfolio Site Refresh

## What This Is

A personal portfolio site for George Nakashyan targeting fullstack developer roles. The site showcases projects, work experience, and skills to hiring managers. Built with Next.js 15, React 19, and Tailwind CSS, deployed on Vercel.

## Core Value

Impress hiring managers with a distinctive, professional portfolio that demonstrates fullstack capabilities without overwhelming them.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

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

### Active

<!-- Current scope. Building toward these. -->

- [ ] Fix H1UserAgentFontSizeInSection Lighthouse issue
- [ ] Restyle with dark/moody aesthetic (away from blue/purple gradient)
- [ ] Project cards link to individual project pages on click
- [ ] Visual distinctiveness while maintaining professional minimalism

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Content changes (text, images) — User explicitly wants style-only changes
- Page structure changes — User wants to keep hero, featured projects, employment layout
- New pages or routes — Focus is on visual refresh, not feature additions
- Backend/API changes — Static site, no backend to modify

## Context

This is a brownfield project — an existing portfolio site that needs a visual refresh. The current site uses a blue-to-purple gradient (`#3b82f6` to `#8b5cf6`) that the user finds bland.

**Technical environment:**
- Next.js 15.5.9 with App Router
- React 19 with Server Components
- Tailwind CSS 3.4.1 with CSS custom properties
- Framer Motion 12.25.0 for animations
- MDX for project case study content

**Current color scheme (in `globals.css`):**
- Background: `#0a0e27` to `#0f172a`
- Primary gradient: `#3b82f6` to `#8b5cf6` (blue-purple)
- Secondary: `#06b6d4` (cyan)
- Card: `#1e293b`

**Target audience:** Hiring managers evaluating fullstack developer candidates

**Known issues:**
- Lighthouse flags H1UserAgentFontSizeInSection (heading hierarchy in sections)

## Constraints

- **No content changes**: Text, images, and project data must remain unchanged
- **Performance**: Must maintain or improve Lighthouse scores
- **Accessibility**: Must fix the H1 issue and not introduce new a11y problems
- **Professional**: Style must appeal to hiring managers, not be flashy or distracting

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark/moody color direction | User preference, fits fullstack dev aesthetic | — Pending |
| Keep page structure | User explicitly likes current layout | — Pending |
| Style-only changes | Clear scope boundary for this refresh | — Pending |

---
*Last updated: 2026-01-16 after initialization*
