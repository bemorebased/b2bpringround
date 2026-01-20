# Skill 3: Code Quality Enforcer (code_quality/SKILL.md)

---
description: Enforce elite-level code quality, readability, type safety, and best practices. Perform deep refactoring, eliminate technical debt, apply DRY/SOLID/KISS, and ensure production readiness.
---

## When to Use This Skill
Activate when reviewing code, refactoring, or writing new features where quality matters more than speed.

## Core Principles
- **Zero tolerance** for code smells.
- Favor **explicit over implicit**.
- Use **strong typing** (TypeScript, Pydantic, Zod) everywhere.
- Write **self-documenting code**; comments only for "why", not "what".
- Enforce **consistent formatting** (Prettier + ESLint).
- Every public function must have types, docs, and edge-case handling.

## Step-by-Step Process
1. Analyze provided code/context.
2. Identify violations (duplication, poor naming, side effects, etc.).
3. Propose refactored version with explanations.
4. Ensure tests remain passing (suggest new tests if needed).

## Constraints
- Never introduce new dependencies without justification.
- Preserve existing behavior exactly.
- Improve performance if possible without complexity.

## Examples

### Example 1: Refactor Messy React Component
**Before**: Prop drilling, inline styles, no types.
**After**: Custom hooks, Tailwind, proper TypeScript interfaces, memoization.