# Coding Conventions

**Analysis Date:** 2026-01-16

## Naming Patterns

**Files:**
- React components: PascalCase with `.tsx` extension (e.g., `Button.tsx`, `ContactForm.tsx`)
- Type definition files: lowercase with `.ts` extension (e.g., `project.ts`, `experience.ts`)
- Utility files: lowercase with `.ts` extension (e.g., `mdx.ts`)
- Constants files: lowercase with `.ts` extension (e.g., `projects.ts`, `skills.ts`)
- Page files: `page.tsx` following Next.js App Router conventions
- Layout files: `layout.tsx` following Next.js App Router conventions
- Dynamic routes: `[slug]/page.tsx` bracket notation

**Functions:**
- camelCase for all functions (e.g., `getFeaturedProjects`, `getAllSkills`, `handleSubmit`)
- Getter functions prefixed with `get` (e.g., `getProjectBySlug`, `getCategorizedSkills`)
- Event handlers prefixed with `handle` (e.g., `handleChange`, `handleSubmit`)
- Toggle functions prefixed with `toggle` (e.g., `toggleMobileMenu`)
- Close functions prefixed with `close` (e.g., `closeMobileMenu`)

**Variables:**
- camelCase for variables (e.g., `baseClasses`, `variantClasses`, `formData`)
- UPPER_SNAKE_CASE not used for constants (plain camelCase instead)
- Boolean variables use `is`/`has` prefix when state-related (e.g., `isSubmitting`, `isMobileMenuOpen`)

**Types/Interfaces:**
- PascalCase for interfaces and types (e.g., `ButtonProps`, `Project`, `Experience`)
- Props interfaces suffixed with `Props` (e.g., `CardProps`, `InputProps`, `BadgeProps`)
- Export interfaces directly, not as default exports

**CSS Classes:**
- Tailwind utility classes used directly in JSX
- Custom CSS variables use kebab-case with double-hyphen prefix (e.g., `--background-start`, `--text-primary`)
- Custom Tailwind classes reference CSS variables (e.g., `bg-card-bg`, `text-text-secondary`)

## Code Style

**Formatting:**
- Tabs for indentation (not spaces)
- Single quotes for JSX attribute values (e.g., `className='...'`)
- Double quotes for string values in objects and imports
- No semicolons at statement ends (inferred from examples)
- Trailing commas in multi-line arrays and objects

**Linting:**
- ESLint with `next/core-web-vitals` and `next/typescript` extends
- Custom rule: `react/no-unescaped-entities` disabled
- Config file: `.eslintrc.json`

**TypeScript:**
- Strict mode enabled
- Target ES2017
- Module resolution: bundler
- Path alias: `@/*` maps to root directory

## Import Organization

**Order:**
1. React and React hooks (`import React, { useState } from "react"`)
2. Next.js imports (`import Link from "next/link"`, `import Image from "next/image"`)
3. Third-party libraries (`import { motion, AnimatePresence } from "framer-motion"`)
4. Internal components (`import Button from "../ui/Button"`)
5. Internal utilities/constants (`import { getAllSkills } from "@/lib/constants"`)
6. Types (imported separately with `type` keyword when needed)
7. Styles (`import "./globals.css"`)

**Path Aliases:**
- `@/*` - Maps to project root (e.g., `@/lib/constants`, `@/lib/utils/mdx`)
- Relative paths used for same-directory or nearby imports (e.g., `"../ui/Button"`)

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (see `ContactForm.tsx` lines 84-108)
- Form validation with error state objects
- Status tracking with union types (`"idle" | "success" | "error"`)
- `console.error` for logging caught errors

**Example Pattern:**
```typescript
try {
  const response = await fetch(url, options);
  if (response.ok) {
    setSubmitStatus("success");
  } else {
    setSubmitStatus("error");
  }
} catch (error) {
  console.error("Error message:", error);
  setSubmitStatus("error");
} finally {
  setIsSubmitting(false);
}
```

**Null/Undefined Handling:**
- Optional chaining for potentially undefined values
- `notFound()` from Next.js for missing dynamic routes
- Type guards with `filter((item): item is Type => item !== null)`

## Logging

**Framework:** Console (no external logging library)

**Patterns:**
- `console.error` for caught exceptions
- No verbose logging in production code
- Comments used instead of debug logs

## Comments

**When to Comment:**
- JSDoc-style comments for component descriptions
- Inline comments for complex logic sections
- Section headers in JSX using `{/* Section Name */}` format

**JSDoc Pattern:**
```typescript
/**
 * Brief description of component purpose
 * Additional details about functionality
 */
const ComponentName = () => { ... }
```

**Examples from codebase:**
- `/** Button component with gradient effects and icon support */`
- `/** Card component with glassmorphism effect and backdrop blur */`
- `{/* Content Container */}` for JSX sections

## Function Design

**Size:** Functions are kept focused on single responsibility. UI components range from 20-100 lines typically.

**Parameters:**
- Destructured props in component functions: `({ children, variant = "primary", ...props }: Props)`
- Default values assigned in destructuring
- Optional props marked with `?` in interface

**Return Values:**
- React components return JSX
- Helper functions return typed values
- Async functions return Promises

**Component Pattern:**
```typescript
const ComponentName = ({
  prop1,
  prop2 = "default",
  prop3,
}: ComponentProps) => {
  // Local class definitions
  const baseClasses = `...`;
  const variantClasses = { ... };

  // Return JSX
  return (
    <element className={baseClasses}>
      {children}
    </element>
  );
};

export default ComponentName;
```

## Module Design

**Exports:**
- Components use default exports (`export default ComponentName`)
- Types use named exports (`export interface Props`, `export type { Type }`)
- Utility functions use named exports (`export const functionName`)
- Constants use named exports (`export const data`)

**Barrel Files:**
- Used for grouping related exports
- Location: `lib/types/index.ts`, `lib/constants/index.ts`, `app/components/ui/index.ts`
- Export both components and their types

**Barrel File Pattern:**
```typescript
export { default as Button } from "./Button";
export type { ButtonProps } from "./Button";
```

## Component Patterns

**Client vs Server Components:**
- `"use client"` directive at top of file for client components
- Client components: Navbar, Hero, ContactForm, FeaturedProjects (interactive)
- Server components: Page components with `async` data fetching

**Props Interface Pattern:**
- Define interface above component
- Export interface for external use
- Include `className?: string` for style extension

**Variant/Size Classes Pattern:**
```typescript
const sizeClasses = {
  sm: "py-1.5 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

const variantClasses = {
  primary: "bg-gradient-primary text-text-primary",
  secondary: "bg-transparent border-2 border-secondary",
};
```

## Styling Conventions

**Tailwind CSS:**
- Utility-first approach
- Custom colors defined via CSS variables in `globals.css`
- Extended in `tailwind.config.ts`
- Responsive prefixes: `sm:`, `md:`, `lg:`
- State prefixes: `hover:`, `focus:`, `group-hover:`

**Glassmorphism Pattern:**
```
bg-card-bg/40 backdrop-blur-lg border border-white/10
```

**Gradient Text Pattern:**
```
bg-gradient-primary bg-clip-text text-transparent
```

---

*Convention analysis: 2026-01-16*
