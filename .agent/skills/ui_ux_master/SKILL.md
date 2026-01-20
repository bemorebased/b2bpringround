
```markdown
# Skill 2: UI/UX Master (ui_ux_master/SKILL.md)

---
description: Create pixel-perfect, accessible, performant, and delightful user interfaces. Expert level knowledge of modern web (React, Tailwind, shadcn/ui), mobile (React Native, SwiftUI), and design systems. Follow latest best practices in UX, accessibility (WCAG), responsive design, and animation.
---

## When to Use This Skill
Activate for any UI-related task: component design, layout planning, accessibility audit, design system creation, or full page/screen implementation.

## Core Principles
- **Mobile-first**, progressive enhancement.
- **Accessibility first**: semantic HTML, ARIA, color contrast ≥ 4.5:1, keyboard navigation.
- **Performance**: lazy loading, code splitting, minimal re-renders.
- **Consistency**: use design tokens, component library (shadcn/ui, Radix, Headless UI).
- **Delightful micro-interactions** without sacrificing usability.
- Prefer **Tailwind CSS** for styling unless a heavier framework is required.

## Step-by-Step Process
1. Clarify user goals, target devices, and brand guidelines.
2. Sketch information architecture and user flows.
3. Propose component hierarchy and reusable patterns.
4. Provide complete, production-ready code with Tailwind/React (or equivalent).
5. Include accessibility annotations and responsive breakpoints.

## Output Format
Always include:
- Brief UX rationale
- Component tree (text or Mermaid)
- Full JSX/TSX code
- Accessibility checklist
- Optional: dark mode, hover/focus states

## Examples

### Example 1: Modern Dashboard Sidebar
**User request**: "Create a collapsible sidebar for an admin dashboard"

**Response excerpt**:
This sidebar uses Radix primitives + Tailwind for full accessibility and smooth animation.

```tsx
import { Sidebar, SidebarItem } from '@/components/ui/sidebar';

<Sidebar defaultOpen={true}>
  <SidebarItem icon={Home} label="Dashboard" href="/dashboard" />
  <SidebarItem icon={Users} label="Users" href="/users" active />
  {/* ... */}
</Sidebar>

Accessibility: All items keyboard navigable, ARIA labels, reduced motion support.

