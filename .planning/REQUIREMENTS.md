# Requirements: Portfolio Site Refresh

**Defined:** 2026-01-16
**Core Value:** Impress hiring managers with a distinctive, professional portfolio that demonstrates fullstack capabilities without overwhelming them.

## v1 Requirements

Requirements for visual refresh. Each maps to roadmap phases.

### Accessibility

- [ ] **A11Y-01**: Fix H1UserAgentFontSizeInSection Lighthouse warning with explicit font sizing
- [ ] **A11Y-02**: Implement visible focus indicators with double-layered outlines for keyboard navigation
- [ ] **A11Y-03**: Audit and verify 4.5:1+ contrast ratios on all text elements
- [ ] **A11Y-04**: Add prefers-reduced-motion support to disable animations for users who prefer it

### Color System

- [ ] **COLOR-01**: Define new accent color palette replacing blue-purple gradient with cohesive dark/moody scheme
- [ ] **COLOR-02**: Implement three-layer semantic color token architecture (primitive → semantic → utility)
- [ ] **COLOR-03**: Add colored glow effects on interactive elements (buttons, cards, links)
- [ ] **COLOR-04**: Create depth hierarchy system with shadows/elevation for visual layering

### Component Styling

- [ ] **COMP-01**: Refresh card styling with improved depth, borders, and hover states
- [ ] **COMP-02**: Enhance glassmorphism with consistent backdrop-blur usage across components
- [ ] **COMP-03**: Refine button and link micro-interactions (hover, active, focus states)
- [ ] **COMP-04**: Style custom scrollbar to match dark theme

### Interactions

- [ ] **INT-01**: Make project cards clickable links to individual project pages
- [ ] **INT-02**: Add subtle section reveal animations on scroll
- [ ] **INT-03**: Enhance page transitions with refined Framer Motion animations

## v2 Requirements

Deferred to future refresh. Tracked but not in current roadmap.

### Theme Toggle

- **THEME-01**: Light/dark mode toggle (82% of users expect this, but significant implementation effort)
- **THEME-02**: System preference detection for initial theme

### Additional Polish

- **POLISH-01**: Code block syntax highlighting matching theme
- **POLISH-02**: Image treatment (subtle borders/shadows on project screenshots)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Content changes | User explicitly wants style-only refresh |
| New pages/routes | Focus is visual refresh, not feature additions |
| Light mode | Significant effort, defer to v2 |
| Heavy animations | Research warns this signals "junior dev" to hiring managers |
| Pure black backgrounds | Causes halation for users with astigmatism |
| Oversaturated neon accents | Signals "gaming" not "professional" |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| A11Y-01 | TBD | Pending |
| A11Y-02 | TBD | Pending |
| A11Y-03 | TBD | Pending |
| A11Y-04 | TBD | Pending |
| COLOR-01 | TBD | Pending |
| COLOR-02 | TBD | Pending |
| COLOR-03 | TBD | Pending |
| COLOR-04 | TBD | Pending |
| COMP-01 | TBD | Pending |
| COMP-02 | TBD | Pending |
| COMP-03 | TBD | Pending |
| COMP-04 | TBD | Pending |
| INT-01 | TBD | Pending |
| INT-02 | TBD | Pending |
| INT-03 | TBD | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 0
- Unmapped: 15 (awaiting roadmap)

---
*Requirements defined: 2026-01-16*
*Last updated: 2026-01-16 after initial definition*
