# Testing Patterns

**Analysis Date:** 2026-01-16

## Test Framework

**Runner:**
- Not configured - no test framework installed

**Assertion Library:**
- Not installed

**Run Commands:**
```bash
npm run lint          # Run ESLint (only available command)
```

## Test File Organization

**Location:**
- No test files exist in the project source code
- Test files only exist within `node_modules/` from dependencies

**Naming:**
- Not established (no tests present)

**Structure:**
- Not established (no tests present)

## Test Structure

**Suite Organization:**
- Not established

**Patterns:**
- Not established

## Mocking

**Framework:** Not installed

**Patterns:**
- Not established

**What to Mock:**
- Not established

**What NOT to Mock:**
- Not established

## Fixtures and Factories

**Test Data:**
- Not established

**Location:**
- Not established

## Coverage

**Requirements:** None enforced

**View Coverage:**
```bash
# No coverage tool configured
```

## Test Types

**Unit Tests:**
- Not implemented

**Integration Tests:**
- Not implemented

**E2E Tests:**
- Not implemented

## Common Patterns

**Async Testing:**
- Not established

**Error Testing:**
- Not established

---

## Recommendations for Adding Tests

If tests are to be added to this Next.js 15 project, the following setup is recommended based on the tech stack:

### Recommended Setup

**Install Dependencies:**
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

**Vitest Config (`vitest.config.ts`):**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': './.',
    },
  },
});
```

**Setup File (`vitest.setup.ts`):**
```typescript
import '@testing-library/jest-dom';
```

**Add Scripts to `package.json`:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Suggested Test File Locations

Follow co-located test pattern:
```
app/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx      # Unit test for Button
│   │   ├── Card.tsx
│   │   ├── Card.test.tsx        # Unit test for Card
│   │   └── ...
│   └── sections/
│       ├── Hero.tsx
│       ├── Hero.test.tsx        # Unit test for Hero
│       └── ...
lib/
├── constants/
│   ├── projects.ts
│   ├── projects.test.ts         # Unit test for project helpers
│   └── ...
├── utils/
│   ├── mdx.ts
│   ├── mdx.test.ts              # Unit test for MDX utilities
│   └── ...
```

### Priority Testing Targets

Based on codebase analysis, these areas would benefit most from tests:

1. **`lib/utils/mdx.ts`** - MDX parsing logic with frontmatter extraction
2. **`lib/constants/projects.ts`** - `getFeaturedProjects`, `getProjectBySlug` functions
3. **`lib/constants/skills.ts`** - `getSkillsByCategory`, `getAllSkills` functions
4. **`app/components/ui/Button.tsx`** - Complex rendering logic (link vs button modes)
5. **`app/components/sections/ContactForm.tsx`** - Form validation and submission

### Example Test Patterns for This Codebase

**Component Test:**
```typescript
// app/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(<Button href="/projects">View Projects</Button>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects');
  });

  it('renders as external link with correct attributes', () => {
    render(<Button href="https://example.com" target="_blank">External</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-secondary');
  });
});
```

**Utility Test:**
```typescript
// lib/constants/projects.test.ts
import { describe, it, expect } from 'vitest';
import { projects, getFeaturedProjects, getProjectBySlug } from './projects';

describe('projects', () => {
  describe('getFeaturedProjects', () => {
    it('returns only featured projects', () => {
      const featured = getFeaturedProjects();
      featured.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });
  });

  describe('getProjectBySlug', () => {
    it('returns project when slug exists', () => {
      const project = getProjectBySlug('parking-pal');
      expect(project).toBeDefined();
      expect(project?.title).toBe('ParkingPal');
    });

    it('returns undefined for non-existent slug', () => {
      const project = getProjectBySlug('non-existent');
      expect(project).toBeUndefined();
    });
  });
});
```

**Form Test:**
```typescript
// app/components/sections/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('shows validation errors for empty required fields', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });
});
```

---

*Testing analysis: 2026-01-16*
