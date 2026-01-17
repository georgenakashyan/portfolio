# Codebase Concerns

**Analysis Date:** 2026-01-16

## Tech Debt

**Duplicate Project Data Sources:**
- Issue: Project data exists in two places - `lib/constants/projects.ts` for listing and `content/projects/*.mdx` for detail pages. The frontmatter in MDX duplicates data from the constants file, requiring manual synchronization.
- Files: `lib/constants/projects.ts`, `content/projects/*.mdx`
- Impact: Data drift between sources can cause inconsistencies (e.g., different descriptions, tech stacks). Changes must be made in two places.
- Fix approach: Either derive MDX frontmatter from constants using a build script, or move entirely to MDX as the single source of truth with a utility that extracts listing data.

**Custom YAML Parser Instead of Library:**
- Issue: `lib/utils/mdx.ts` implements a custom frontmatter parser (`parseFrontmatter`) instead of using established libraries like `gray-matter`.
- Files: `lib/utils/mdx.ts` (lines 85-135)
- Impact: Parser may not handle edge cases (nested objects, multiline strings, special characters). Maintenance burden increases.
- Fix approach: Replace with `gray-matter` package which handles all YAML edge cases and is battle-tested.

**Hardcoded Stats Values:**
- Issue: Statistics in `StatsBar.tsx` are hardcoded rather than derived from data sources (projects count, years of experience).
- Files: `app/components/sections/StatsBar.tsx` (lines 10-35)
- Impact: Stats become outdated as projects are added or time passes. Manual updates required.
- Fix approach: Calculate stats dynamically - count projects from `lib/constants/projects.ts`, calculate years from experience start dates.

**Comment Indicates Incomplete Feature:**
- Issue: Hero component has a comment "Static for now, will animate in Phase 9" indicating incomplete marquee animation.
- Files: `app/components/sections/Hero.tsx` (line 66)
- Impact: Planned feature not implemented. Single tech stack display instead of marquee animation.
- Fix approach: Implement CSS marquee animation using the existing `animate-marquee` class defined in `globals.css`.

**Skills Data Redundancy:**
- Issue: Skills are defined twice in `lib/constants/skills.ts` - once as `skills` array with full objects and again as `skillsByCategory` with string arrays.
- Files: `lib/constants/skills.ts`
- Impact: Adding a new skill requires updating both arrays. Risk of inconsistency between representations.
- Fix approach: Keep only `skills` array and derive `skillsByCategory` programmatically by grouping.

## Known Bugs

**No known bugs identified during analysis.**

## Security Considerations

**Environment Variables in Git:**
- Risk: `.env` file containing `NEXT_PUBLIC_FORMSPREE_ID` and email address exists in working directory, though gitignore specifies `.env*`
- Files: `.env`, `.gitignore`
- Current mitigation: `.gitignore` excludes `.env*` files
- Recommendations: Verify `.env` has never been committed to git history. Consider using a `.env.example` with placeholder values for documentation.

**No Rate Limiting on Contact Form:**
- Risk: Contact form in `ContactForm.tsx` has no rate limiting, allowing potential spam submissions to Formspree
- Files: `app/components/sections/ContactForm.tsx`
- Current mitigation: Formspree provides some built-in spam protection
- Recommendations: Consider adding client-side rate limiting (disable button temporarily after submission) or implement honeypot field for additional spam protection.

**Client-Side Only Validation:**
- Risk: Form validation in `ContactForm.tsx` is client-side only. While Formspree validates server-side, custom validation logic is bypassed if JavaScript is disabled or requests are made directly.
- Files: `app/components/sections/ContactForm.tsx` (lines 31-54)
- Current mitigation: Formspree handles server-side validation
- Recommendations: This is acceptable for a contact form backed by a third-party service. No action needed.

## Performance Bottlenecks

**Large Project Images:**
- Problem: Project images are large (prisoners-dilemma.jpeg is 2.2MB, parking-pal.png is 1.5MB)
- Files: `public/images/projects/prisoners-dilemma.jpeg`, `public/images/projects/parking-pal.png`
- Cause: Images not optimized for web delivery
- Improvement path: Compress images with tools like ImageOptim, convert to WebP format, or rely on Next.js Image component's automatic optimization (already using `next/image`). Consider adding `sizes` prop for responsive images.

**No Image Sizes Specified:**
- Problem: FeaturedProjects uses `fill` on Image components without explicit `sizes` prop
- Files: `app/components/sections/FeaturedProjects.tsx` (line 46)
- Cause: Missing `sizes` prop causes Next.js to use default sizing behavior
- Improvement path: Add `sizes` prop to Image components to enable better automatic srcset generation.

**Synchronous File System Reads:**
- Problem: MDX utilities use synchronous file system operations (`fs.readdirSync`, `fs.readFileSync`)
- Files: `lib/utils/mdx.ts` (lines 28, 32, 47)
- Cause: Simpler implementation, acceptable for static generation
- Improvement path: For this use case (static site generation with few files), synchronous operations are acceptable. Would only matter at scale (100+ MDX files).

## Fragile Areas

**Custom Frontmatter Parser:**
- Files: `lib/utils/mdx.ts` (lines 85-135)
- Why fragile: Regex-based parsing makes assumptions about format (key: value on single lines, arrays denoted by `- ` prefix). Unusual formatting breaks parsing silently.
- Safe modification: Test any changes with all existing MDX files. Consider adding unit tests.
- Test coverage: No tests exist for this utility.

**Tailwind CSS Variable References:**
- Files: `app/globals.css`, `tailwind.config.ts`
- Why fragile: Colors defined as CSS variables in `globals.css` and referenced in Tailwind config. Renaming a variable requires updating both files and all component usages.
- Safe modification: Search codebase for variable name before renaming. Keep CSS variables and Tailwind config in sync.
- Test coverage: No visual regression tests.

## Scaling Limits

**Static MDX Content:**
- Current capacity: 4 projects in `content/projects/`
- Limit: Build time increases linearly with MDX files. Not a concern until 50+ projects.
- Scaling path: Current architecture is fine for portfolio scale. If needed, could implement ISR or switch to CMS.

## Dependencies at Risk

**React 19 with React 18 Types:**
- Risk: Package.json shows React 19 (`"react": "^19.0.0"`) but React types are version 18 (`"@types/react": "^18"`)
- Impact: Type mismatches possible. Some React 19 features may not have proper type definitions.
- Migration plan: Update to `@types/react@19` when stable types are released, or use React 18 until types stabilize.

**No Lockfile Version Pinning Review:**
- Risk: All dependencies use caret ranges (`^`) allowing minor/patch updates that could introduce breaking changes
- Impact: `npm install` on different machines or times may result in different dependency versions
- Migration plan: Review lockfile after updates. Consider pinning critical dependencies to exact versions.

## Missing Critical Features

**No Error Boundary:**
- Problem: No React error boundary implemented for graceful error handling
- Blocks: Runtime errors in any component crash the entire page
- Location to add: Wrap children in `app/layout.tsx` with error boundary

**No 404 Page:**
- Problem: No custom `not-found.tsx` page exists in app directory
- Blocks: Users see generic Next.js 404 page instead of branded experience
- Location to add: `app/not-found.tsx`

**No Loading States:**
- Problem: No `loading.tsx` files for route segments
- Blocks: No visual feedback during navigation/data loading
- Location to add: `app/loading.tsx`, `app/projects/[slug]/loading.tsx`

## Test Coverage Gaps

**No Tests:**
- What's not tested: Entire codebase - no test files exist (*.test.*, *.spec.*)
- Files: All files in `app/`, `lib/`
- Risk: Regressions go unnoticed. No confidence when refactoring. Custom MDX parser could silently break.
- Priority: High - at minimum, add tests for `lib/utils/mdx.ts` utility functions which have complex parsing logic.

**No E2E Tests:**
- What's not tested: User flows (navigation, contact form submission, project page viewing)
- Files: All page routes
- Risk: Full user journeys untested. Form submission flow could break without detection.
- Priority: Medium - add Playwright or Cypress tests for critical paths.

---

*Concerns audit: 2026-01-16*
