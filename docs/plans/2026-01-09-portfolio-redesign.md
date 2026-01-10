# Portfolio Website Redesign - Design Document

**Date:** 2026-01-09
**Author:** George Nakashyan
**Status:** Approved

## Overview

Complete redesign of portfolio website for George Nakashyan, Full Stack Software Engineer, focusing on landing job interviews by showcasing full-stack breadth across frontend, backend, databases, and DevOps technologies.

## Goals

1. **Primary**: Impress recruiters and hiring managers to land job interviews
2. Showcase full-stack versatility across entire tech stack
3. SEO optimization for discoverability
4. Easy navigation with clean, focused content
5. Bold/modern aesthetic that stands out

## Target Audience

- Technical recruiters
- Hiring managers at tech companies
- Engineering leaders evaluating candidates

## Site Architecture

### Page Structure

- **Home (/)**: Hero, featured projects preview, quick timeline, stats
- **Projects (/projects)**: Grid of 4 projects with previews
- **Project Detail (/projects/[slug])**: Individual project case studies
- **Experience (/experience)**: Detailed work history timeline + education
- **Contact (/contact)**: Contact form and information

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Images**: Next.js Image optimization
- **Content**: MDX for project details
- **Forms**: Formspree or similar service
- **Deployment**: Vercel

## Design System

### Color Palette

```
Background: #0a0e27 → #0f172a (gradient)
Primary Accent: #3b82f6 → #8b5cf6 (gradient)
Secondary Accent: #06b6d4 (cyan)
Text Primary: #f1f5f9 (near-white)
Text Secondary: #cbd5e1 (muted slate)
Card Background: #1e293b (semi-transparent)
Success Green: #10b981
```

### Typography

- **Font Family**: Inter (headings & body), JetBrains Mono (code/tech)
- **Hero Title**: 3.5rem (56px) desktop, 2.5rem mobile
- **Section Headings**: 2rem (32px)
- **Body Text**: 1rem (16px)

### Visual Effects

- Glassmorphism cards with backdrop blur
- Animated gradient borders on hover
- Mesh gradient backgrounds
- Smooth Framer Motion page transitions
- Micro-interactions on all interactive elements

### Component Patterns

- **Navigation**: Sticky header, mobile hamburger menu
- **Cards**: Consistent design with hover lift effect
- **Buttons**: Gradient primary, outlined secondary
- **Tech Badges**: Pill-shaped with icons, grouped by category

## Page Details

### Home Page (/)

**Hero Section**
- Full viewport height
- Animated mesh gradient background
- Center-aligned: Name, title, tagline, 2 CTAs
- Animated tech stack marquee

**Featured Projects**
- 3 project cards: ParkingPal, DebtCollector Bot, Softworld Work
- Hover reveals tech stack overlay

**Quick Timeline**
- Horizontal timeline with company logos
- Links to experience page

**Stats Bar**
- 3.9 GPA
- Published Research (ASONAM 2023)
- 15+ Database Tables Managed
- 2+ Years Experience

### Projects Page (/projects)

**Grid Layout**: 2x2 desktop, 1 column mobile

Projects:
1. **ParkingPal** - Real-time parking reservation (React, Firebase, Google Maps API, Firestore)
2. **DebtCollector Bot** - Discord financial tracking (Node.js, Discord.js, MongoDB)
3. **Prisoner's Dilemma Simulation** - Graph network research (Python, NetworkX, Matplotlib, Published)
4. **Enterprise Web Application** - Softworld production sample (Next.js, PostgreSQL, Drizzle, Zod, Docker)

### Project Detail Pages (/projects/[slug])

Template sections:
- Hero with preview image/GIF
- Overview
- The Challenge
- The Solution + architecture diagram
- Tech Stack breakdown
- Key Features with screenshots
- Results/Impact with metrics
- Links (GitHub + live demo if available)

### Experience Page (/experience)

**Timeline Layout**
- Vertical animated timeline

**Positions**:
1. Full Stack Software Engineer @ Softworld (Mar 2025 - Present)
   - PostgreSQL DB with 4 schemas using Drizzle ORM
   - File-based access control with Next.js
   - Type-safe server actions with Zod validation

2. Software Engineer @ Freelance (May 2024 - Present)
   - Client partnerships for optimization
   - Full stack frameworks (Next.js, MERN)
   - Stripe integration (2.9% processing)

3. Front End Intern @ Farmingdale State (Aug 2023 - Dec 2023)
   - Reduced training time 30%
   - Improved UX by 40%
   - SQL-based staff lists

**Education**
- B.S. Computer Science, Farmingdale State College
- 3.9 GPA, Summa Cum Laude, Academic Excellence Award

**Skills Matrix** (by category):
- Languages: TypeScript, JavaScript, Python, Java, SQL, C
- Frontend: React, Next.js, Tailwind, Redux, Zustand
- Backend: Node.js, Express.js, Drizzle
- Database: PostgreSQL, MongoDB, Firebase, Quickbase
- DevOps/Tools: Docker, Git, Vercel, Auth0, Google Cloud, Zod

### Contact Page (/contact)

**Split Layout**

Left side:
- "Let's Work Together" heading
- Email: georgenakashyan@gmail.com
- Location: Hicksville, New York
- Social links: GitHub, LinkedIn
- Download Resume button

Right side:
- Contact form: Name, Email, Message
- Submit with toast notifications

## SEO Strategy

### Meta Tags
- **Title**: "George Nakashyan | Full Stack Software Engineer | React, Next.js, PostgreSQL"
- **Description**: "Full Stack Software Engineer specializing in Next.js, React, PostgreSQL, and TypeScript. View my portfolio of scalable web applications."
- **Keywords**: "full stack developer, software engineer, Next.js, React, PostgreSQL, TypeScript, New York"
- **Open Graph**: Social sharing images for each page

### Technical SEO
- Semantic HTML5 structure
- Dynamic sitemap.xml
- robots.txt
- JSON-LD structured data (Person schema)
- Next.js Image optimization
- Mobile-responsive (target 100% mobile score)
- Clean URL structure (/projects/parking-pal)

## Content Requirements

### Project Data Needed
- High-quality screenshots/GIFs for all 4 projects
- Architecture diagrams
- GitHub repository links
- Project descriptions and technical details

### Assets Needed
- Resume PDF (already exists)
- Company logos (Softworld, Freelance, Farmingdale)
- Tech stack icons (React, Next.js, PostgreSQL, etc.)
- Profile photo (optional for about section)

## Implementation Phases

1. **Setup & Design System** - Project structure, Tailwind config, theme, colors
2. **Core Components** - Navigation, buttons, cards, badges, layout components
3. **Pages Implementation** - Build all 5 main pages
4. **Content Population** - Add all project details, experience data
5. **Animations** - Framer Motion transitions and micro-interactions
6. **SEO & Meta** - All meta tags, sitemap, structured data
7. **Testing** - Responsive testing, performance optimization
8. **Deployment** - Vercel deployment with custom domain (if applicable)

## Success Metrics

- Lighthouse score: 90+ across all categories
- Mobile responsiveness: Works perfectly on all screen sizes
- Page load time: < 2 seconds
- SEO: All pages properly indexed with meta tags
- Accessibility: WCAG AA compliance
- Visual impact: Modern, professional, stands out from typical portfolios

## Notes

- All content should emphasize impact with quantified metrics where possible
- Tech stack badges should be consistent across all pages
- Maintain focus on full-stack breadth over deep specialization
- Keep content recruiter-friendly (scannable, clear achievements)
- Design should work without JavaScript (progressive enhancement)
