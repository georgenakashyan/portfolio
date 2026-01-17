# Architecture

**Analysis Date:** 2026-01-16

## Pattern Overview

**Overall:** Next.js 15 App Router with Static Site Generation (SSG)

**Key Characteristics:**
- Server-first rendering with RSC (React Server Components)
- File-based routing using App Router conventions
- MDX-based content management for project case studies
- Typed data layer with constants-based content storage
- Client components isolated for interactivity (Framer Motion, forms)

## Layers

**Presentation Layer (`app/`):**
- Purpose: Routes, pages, and React components
- Location: `app/`
- Contains: Page components, section components, UI primitives, layout components
- Depends on: Data layer (`lib/`), styling (`globals.css`, Tailwind)
- Used by: Next.js router

**Data Layer (`lib/`):**
- Purpose: Types, constants, and utility functions
- Location: `lib/`
- Contains: TypeScript interfaces, static data arrays, helper functions
- Depends on: Node.js fs (for MDX parsing)
- Used by: Presentation layer components

**Content Layer (`content/`):**
- Purpose: MDX files for project case studies
- Location: `content/projects/`
- Contains: Markdown with YAML frontmatter
- Depends on: Nothing (static files)
- Used by: MDX utility functions in `lib/utils/mdx.ts`

**Static Assets (`public/`):**
- Purpose: Images, PDFs, SVG icons
- Location: `public/`
- Contains: Project images, resume, social icons
- Depends on: Nothing (static files)
- Used by: Components via relative URLs

## Data Flow

**Page Render (Static):**

1. Next.js calls `generateStaticParams()` at build time for dynamic routes
2. Page component fetches data from `lib/constants/` or `lib/utils/mdx.ts`
3. Server components render HTML with data embedded
4. Client components hydrate for interactivity

**MDX Content Loading:**

1. `getAllProjectSlugs()` reads `content/projects/` directory
2. `getProjectBySlug()` parses MDX file, extracts frontmatter
3. `MDXRemote` from `next-mdx-remote/rsc` renders content server-side
4. Custom MDX components from `mdx-components.tsx` apply styling

**Contact Form Submission:**

1. User fills form in `ContactForm.tsx` (client component)
2. Form validates with local state
3. POST to Formspree API endpoint
4. Success/error state displayed

**State Management:**
- No global state management library
- React `useState` for local component state (forms, mobile menu)
- Data passed via props from server components
- URL state via Next.js routing

## Key Abstractions

**Project:**
- Purpose: Represents a portfolio project
- Examples: `lib/types/project.ts`, `lib/constants/projects.ts`
- Pattern: TypeScript interface + static array of data

**Experience:**
- Purpose: Represents work experience entry
- Examples: `lib/types/experience.ts`, `lib/constants/experience.ts`
- Pattern: TypeScript interface + static array of data

**Skill:**
- Purpose: Represents a technical skill
- Examples: `lib/types/skill.ts`, `lib/constants/skills.ts`
- Pattern: TypeScript interface + categorized arrays

**UI Primitives:**
- Purpose: Reusable styled components
- Examples: `app/components/ui/Button.tsx`, `app/components/ui/Card.tsx`
- Pattern: React component with variant props and Tailwind classes

**Section Components:**
- Purpose: Page-level content sections
- Examples: `app/components/sections/Hero.tsx`, `app/components/sections/FeaturedProjects.tsx`
- Pattern: Composable sections that import UI primitives and data

## Entry Points

**Root Layout (`app/layout.tsx`):**
- Location: `app/layout.tsx`
- Triggers: Every page render
- Responsibilities: HTML structure, fonts, metadata, Navbar, Footer, PageTransition wrapper, Analytics

**Home Page (`app/page.tsx`):**
- Location: `app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Compose Hero, StatsBar, FeaturedProjects, QuickTimeline sections

**Projects List (`app/projects/page.tsx`):**
- Location: `app/projects/page.tsx`
- Triggers: Route `/projects`
- Responsibilities: Render ProjectGrid with all projects

**Project Detail (`app/projects/[slug]/page.tsx`):**
- Location: `app/projects/[slug]/page.tsx`
- Triggers: Route `/projects/{slug}`
- Responsibilities: Load MDX content, render ProjectDetail template with MDXRemote

**Experience Page (`app/experience/page.tsx`):**
- Location: `app/experience/page.tsx`
- Triggers: Route `/experience`
- Responsibilities: Render ExperienceTimeline and SkillsMatrix sections

**Contact Page (`app/contact/page.tsx`):**
- Location: `app/contact/page.tsx`
- Triggers: Route `/contact`
- Responsibilities: Display contact info, render ContactForm

**SEO Entry Points:**
- `app/sitemap.ts`: Generates sitemap.xml with all routes
- `app/robots.ts`: Generates robots.txt

## Error Handling

**Strategy:** Graceful fallbacks with Next.js conventions

**Patterns:**
- `notFound()` from `next/navigation` for missing MDX content
- Try/catch in `ContactForm.tsx` for API errors
- Conditional rendering for optional fields (github, demo URLs)
- File existence checks in `lib/utils/mdx.ts` before reading

## Cross-Cutting Concerns

**Logging:** Console.error for form submission failures only; no structured logging

**Validation:**
- Zod not used (listed in skills but not implemented in portfolio)
- Manual email regex validation in ContactForm
- TypeScript compile-time type checking

**Authentication:** None (public portfolio site)

**Styling:**
- Tailwind CSS with CSS custom properties
- Design tokens in `globals.css` and `tailwind.config.ts`
- Glassmorphism pattern via backdrop-blur utilities

**Animation:**
- Framer Motion for page transitions and mobile menu
- CSS transitions for hover states
- `"use client"` directive on animated components

---

*Architecture analysis: 2026-01-16*
