# Codebase Structure

**Analysis Date:** 2026-01-16

## Directory Layout

```
portfolio/
├── app/                    # Next.js App Router (pages & components)
│   ├── components/         # React components
│   │   ├── layout/         # Layout components (Navbar, Footer, PageTransition)
│   │   ├── sections/       # Page section components
│   │   └── ui/             # UI primitives (Button, Card, Badge, Input, Textarea)
│   ├── contact/            # Contact page route
│   ├── experience/         # Experience page route
│   ├── fonts/              # Local font files (if any)
│   ├── projects/           # Projects routes
│   │   └── [slug]/         # Dynamic project detail route
│   ├── globals.css         # Global styles & CSS variables
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── robots.ts           # Robots.txt generator
│   └── sitemap.ts          # Sitemap generator
├── content/                # Content files (MDX)
│   └── projects/           # Project case study MDX files
├── lib/                    # Shared utilities & data
│   ├── constants/          # Static data arrays
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Utility functions
├── public/                 # Static assets
│   ├── assets/             # SVG icons
│   └── images/             # Images
│       ├── logos/          # Company logos
│       └── projects/       # Project screenshots
├── .planning/              # Planning documents
│   └── codebase/           # Codebase analysis docs
├── docs/                   # Documentation
├── mdx-components.tsx      # Custom MDX component mappings
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies & scripts
└── vercel.json             # Vercel deployment config
```

## Directory Purposes

**`app/` (Next.js App Router):**
- Purpose: All routes and React components
- Contains: Page files (`page.tsx`), layouts, components
- Key files: `layout.tsx` (root), `page.tsx` (home), route folders

**`app/components/`:**
- Purpose: Reusable React components
- Contains: Three subdirectories by category

**`app/components/ui/`:**
- Purpose: Design system primitives
- Contains: `Button.tsx`, `Card.tsx`, `Badge.tsx`, `Input.tsx`, `Textarea.tsx`
- Key files: `index.ts` (barrel export)

**`app/components/sections/`:**
- Purpose: Page-level content sections
- Contains: `Hero.tsx`, `FeaturedProjects.tsx`, `ProjectGrid.tsx`, `ProjectDetail.tsx`, `ExperienceTimeline.tsx`, `SkillsMatrix.tsx`, `ContactForm.tsx`, `QuickTimeline.tsx`, `StatsBar.tsx`

**`app/components/layout/`:**
- Purpose: Persistent layout components
- Contains: `Navbar.tsx`, `Footer.tsx`, `PageTransition.tsx`

**`lib/constants/`:**
- Purpose: Static data arrays (projects, experience, skills)
- Contains: `projects.ts`, `experience.ts`, `skills.ts`, `colors.ts`
- Key files: `index.ts` (barrel export with helper functions)

**`lib/types/`:**
- Purpose: TypeScript interfaces
- Contains: `project.ts`, `experience.ts`, `skill.ts`
- Key files: `index.ts` (barrel export)

**`lib/utils/`:**
- Purpose: Utility functions
- Contains: `mdx.ts` (MDX parsing utilities)

**`content/projects/`:**
- Purpose: MDX content for project case studies
- Contains: `parking-pal.mdx`, `debt-collector-bot.mdx`, `prisoners-dilemma.mdx`, `enterprise-web-app.mdx`

**`public/`:**
- Purpose: Static assets served at root URL
- Contains: Images, PDFs, SVG icons
- Key files: `George-Nakashyan-Resume.pdf`, `Prisoners_Dilemma_Simulation.pdf`

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout with Navbar, Footer, fonts, metadata
- `app/page.tsx`: Home page composing Hero, StatsBar, FeaturedProjects, QuickTimeline

**Configuration:**
- `next.config.ts`: MDX plugin, env vars, page extensions
- `tailwind.config.ts`: Custom colors, fonts, gradients
- `tsconfig.json`: Path aliases (`@/*`), strict mode
- `postcss.config.mjs`: PostCSS for Tailwind
- `.eslintrc.json`: ESLint rules
- `vercel.json`: Deployment settings

**Core Logic:**
- `lib/utils/mdx.ts`: MDX frontmatter parsing, project loading
- `lib/constants/projects.ts`: Project data with helper functions
- `lib/constants/experience.ts`: Work experience data
- `lib/constants/skills.ts`: Skills categorized by type

**Testing:**
- No test files present (testing not configured)

**Styling:**
- `app/globals.css`: CSS variables, Tailwind directives, MDX content styles
- `mdx-components.tsx`: Custom MDX element styling

## Naming Conventions

**Files:**
- Components: PascalCase (`Button.tsx`, `FeaturedProjects.tsx`)
- Utilities/constants: camelCase (`mdx.ts`, `projects.ts`)
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx` (Next.js convention)
- Config files: lowercase with dots (`next.config.ts`, `tailwind.config.ts`)

**Directories:**
- Route segments: kebab-case (`[slug]`, `contact`)
- Component categories: lowercase (`ui`, `sections`, `layout`)
- Content types: lowercase plural (`projects`)

**Exports:**
- Default export for components
- Named exports for types and utilities
- Barrel exports via `index.ts`

## Where to Add New Code

**New Page:**
- Create folder in `app/` with route name
- Add `page.tsx` inside folder
- Example: `app/blog/page.tsx` for `/blog` route

**New Section Component:**
- Add to `app/components/sections/`
- Use PascalCase naming: `NewSection.tsx`
- Add `"use client"` directive if needs interactivity

**New UI Primitive:**
- Add to `app/components/ui/`
- Export from `app/components/ui/index.ts`
- Include TypeScript props interface

**New Data Type:**
- Add interface to `lib/types/`
- Export from `lib/types/index.ts`
- Add corresponding data array to `lib/constants/`

**New Project (MDX):**
- Add `.mdx` file to `content/projects/`
- File name becomes URL slug
- Include YAML frontmatter with required fields
- Add project to `lib/constants/projects.ts` for featured/grid display

**New Utility Function:**
- Add to `lib/utils/` or create new file
- Use camelCase naming

**New Static Asset:**
- Images: `public/images/` (subdirs: `projects/`, `logos/`)
- Icons: `public/assets/`
- PDFs: `public/`

## Special Directories

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes (by `next build`)
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in `.gitignore`)

**`.planning/`:**
- Purpose: Planning and analysis documents
- Generated: No (manual)
- Committed: Yes

**`docs/`:**
- Purpose: Project documentation
- Generated: No (manual)
- Committed: Yes
- Contains: `plans/` subdirectory

---

*Structure analysis: 2026-01-16*
