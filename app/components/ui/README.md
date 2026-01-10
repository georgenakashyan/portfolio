# UI Primitives

A collection of reusable UI components following the portfolio design system with glassmorphism, gradient effects, and smooth transitions.

## Components

### Button

Primary and secondary button variants with gradient effects and icon support.

```tsx
import { Button } from "@/app/components/ui";

// Primary button
<Button variant="primary">Click me</Button>

// Secondary button with icon
<Button variant="secondary" iconURL="/icons/download.svg">
  Download Resume
</Button>

// Link button
<Button href="/projects" variant="primary">
  View Projects
</Button>

// External link
<Button href="https://github.com" target="_blank">
  GitHub
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `href`: Optional URL for link mode
- `iconURL`: Optional icon image URL
- `onClick`: Click handler for button mode
- `disabled`: Boolean to disable button
- `download`: Boolean for download attribute

### Card

Glassmorphism card with backdrop blur and optional hover lift effect.

```tsx
import { Card } from "@/app/components/ui";

// Default card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Interactive card with hover effect
<Card variant="hover" onClick={() => console.log("clicked")}>
  <h3>Clickable Card</h3>
</Card>

// Flat card without glassmorphism
<Card variant="flat" padding="lg">
  <p>Flat card content</p>
</Card>
```

**Props:**
- `variant`: "default" | "hover" | "flat" (default: "default")
- `padding`: "none" | "sm" | "md" | "lg" (default: "md")
- `onClick`: Optional click handler
- `className`: Additional CSS classes

### Badge

Tech stack pill badges with optional icons.

```tsx
import { Badge } from "@/app/components/ui";

// Default badge
<Badge>TypeScript</Badge>

// Badge with icon
<Badge iconURL="/icons/react.svg" iconAlt="React">
  React
</Badge>

// Variant badges
<Badge variant="primary">Featured</Badge>
<Badge variant="secondary">New</Badge>
<Badge variant="success">Completed</Badge>
```

**Props:**
- `variant`: "default" | "primary" | "secondary" | "success" (default: "default")
- `size`: "sm" | "md" | "lg" (default: "md")
- `iconURL`: Optional icon image URL
- `iconAlt`: Alt text for icon

### Input

Form input with validation states and visual feedback.

```tsx
import { Input } from "@/app/components/ui";

// Basic input
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  required
/>

// Input with error
<Input
  label="Name"
  error="Name is required"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Input with success state
<Input
  label="Username"
  success
  helperText="Username is available"
/>
```

**Props:**
- `type`: "text" | "email" | "password" | "number" | "tel" | "url"
- `label`: Optional label text
- `error`: Error message (shows red state)
- `success`: Boolean for success state (green)
- `helperText`: Helper text below input
- `required`: Boolean for required field
- `disabled`: Boolean to disable input

### Textarea

Form textarea with validation states and character count.

```tsx
import { Textarea } from "@/app/components/ui";

// Basic textarea
<Textarea
  label="Message"
  placeholder="Enter your message..."
  rows={6}
  required
/>

// Textarea with character limit
<Textarea
  label="Bio"
  maxLength={500}
  value={bio}
  onChange={(e) => setBio(e.target.value)}
/>

// Textarea with error
<Textarea
  label="Description"
  error="Description must be at least 10 characters"
  resize="none"
/>
```

**Props:**
- `label`: Optional label text
- `rows`: Number of visible rows (default: 4)
- `maxLength`: Maximum character count
- `error`: Error message (shows red state)
- `success`: Boolean for success state (green)
- `helperText`: Helper text below textarea
- `resize`: "none" | "vertical" | "horizontal" | "both" (default: "vertical")

## Design System Integration

All components use the design system colors from `lib/constants/colors.ts`:

- **Primary gradient**: `#3b82f6 → #8b5cf6`
- **Secondary**: `#06b6d4` (cyan)
- **Card background**: `#1e293b` with 40% opacity + backdrop blur
- **Text colors**: `#f1f5f9` (primary), `#cbd5e1` (secondary)
- **Success**: `#10b981`

All components include:
- Smooth transitions (200-300ms)
- Hover states with scale and shadow effects
- Responsive design
- TypeScript interfaces for type safety
- Glassmorphism where appropriate
