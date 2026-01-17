# Technology Stack

**Analysis Date:** 2026-01-16

## Languages

**Primary:**
- TypeScript ^5 - All application code (`app/`, `lib/`)
- TSX - React components

**Secondary:**
- CSS - Global styles (`app/globals.css`)
- MDX - Content files (`content/projects/*.mdx`)

## Runtime

**Environment:**
- Node.js >= 16.0.0 (minimum based on dependencies)
- No `.nvmrc` or `.node-version` file present

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js ^15.5.9 - App Router, React Server Components
- React ^19.0.0 - UI library
- React DOM ^19.0.0 - DOM rendering

**Styling:**
- Tailwind CSS ^3.4.1 - Utility-first CSS
- PostCSS ^8 - CSS processing

**Animation:**
- Framer Motion ^12.25.0 - Page transitions, animations

**Content:**
- MDX - Markdown with JSX support
  - `@mdx-js/loader` ^3.1.1
  - `@mdx-js/react` ^3.1.1
  - `@next/mdx` ^16.1.1
  - `next-mdx-remote` ^5.0.0 - Remote MDX rendering for RSC

**Linting:**
- ESLint ^8 - Code linting
- `eslint-config-next` 15.0.3 - Next.js specific rules

## Key Dependencies

**Critical:**
- `next` ^15.5.9 - Framework core, handles routing, SSR, build
- `react` ^19.0.0 - Component model
- `framer-motion` ^12.25.0 - All page transitions and animations
- `@vercel/analytics` ^1.6.1 - Site analytics tracking

**Content Processing:**
- `next-mdx-remote` ^5.0.0 - Renders MDX in React Server Components
- `@next/mdx` ^16.1.1 - MDX integration with Next.js

**Type Definitions:**
- `@types/node` ^20
- `@types/react` ^18
- `@types/react-dom` ^18
- `@types/mdx` ^2.0.13

## Configuration

**Environment Variables:**
- `NEXT_PUBLIC_SITE_URL` - Base URL for SEO/metadata (default: https://georgenakashyan.com)
- `NEXT_PUBLIC_MY_EMAIL` - Contact email display
- `NEXT_PUBLIC_FORMSPREE_ID` - Form submission endpoint ID

**Build Configuration:**
- `next.config.ts` - Next.js config with MDX support
- `tailwind.config.ts` - Custom colors, fonts, gradients
- `tsconfig.json` - TypeScript ES2017 target, bundler resolution
- `postcss.config.mjs` - Tailwind plugin
- `.eslintrc.json` - Extends next/core-web-vitals and next/typescript

**TypeScript Settings:**
- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode enabled
- Path alias: `@/*` maps to project root

## Fonts

**Google Fonts (via next/font):**
- Inter - Primary sans-serif (`--font-inter`)
- JetBrains Mono - Monospace for code (`--font-jetbrains-mono`)

## CSS Variables

**Defined in `app/globals.css`:**
```css
--background-start: #0a0e27
--background-end: #0f172a
--primary-start: #3b82f6
--primary-end: #8b5cf6
--secondary: #06b6d4
--text-primary: #f1f5f9
--text-secondary: #cbd5e1
--card-bg: #1e293b
--success: #10b981
```

## Build Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Platform Requirements

**Development:**
- Node.js >= 16.0.0
- npm for package management

**Production:**
- Deployed on Vercel (indicated by `vercel.json`, `@vercel/analytics`)
- Static + Server-rendered pages
- Domain: georgenakashyan.com

---

*Stack analysis: 2026-01-16*
