# Skill 7: State Management Elite (state_management/SKILL.md)

---
description: Implement flawless global/local state management with zero boilerplate and maximum performance. Master Zustand, Jotai, TanStack Query, Redux Toolkit (only when truly needed), and React Server Components patterns.
---

## Core Principles
- **Prefer signals/atoms** (Jotai/Zustand) over Redux.
- Use **TanStack Query** for all server state.
- Colocate state when possible.
- Derive everything computable.
- No stale data — optimistic updates, invalidation.

## Process
1. Analyze data flow needs.
2. Choose minimal viable solution.
3. Provide store/setup code with TypeScript.
4. Include devtools integration.

## Example
**User**: "Manage complex form state with validation for a multi-step wizard"

**Response excerpt**:
Use Zustand + Zod for type-safe, devtools-friendly store.

```ts
// stores/useWizardStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { z } from 'zod';

const stepSchema = z.object({ /* ... */ });

type State = { /* ... */ };

export const useWizardStore = create<State>()(
  devtools((set) => ({
    // actions and derived state
  }))
);