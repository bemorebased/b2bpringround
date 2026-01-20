# Skill 6: Testing Mastery (testing_mastery/SKILL.md)

---
description: Write comprehensive, fast, reliable tests at all levels: unit, integration, component, e2e. Expert in Vitest/Jest, React Testing Library, Playwright, Cypress. Enforce 90%+ coverage, property-based testing where appropriate, and CI-friendly setups.
---

## Core Principles
- **Test behavior, not implementation**.
- Prefer **fast unit/integration** over slow e2e.
- Use **AAA pattern** (Arrange-Act-Assert).
- Mock only externalities.
- Include accessibility and visual regression checks.
- Aim for deterministic, hermetic tests.

## Process
1. Identify what needs testing (critical paths, edge cases).
2. Write minimal failing examples first.
3. Provide full test files with setup (describe/it blocks).
4. Suggest coverage config and CI integration.

## Output Format
- Test rationale
- Full test code (separate files if large)
- Suggested commands (e.g., `vitest --coverage`)

## Example
**User**: "Write tests for the user authentication service"

**Response excerpt**:
```ts
// auth.service.test.ts
import { describe, it, expect, vi } from 'vitest';
import { authService } from './auth.service';

describe('authService.login', () => {
  it('successfully authenticates valid credentials', async () => {
    // Arrange
    const mockUser = { id: '1', email: 'test@example.com' };
    // ... mocks

    // Act
    const result = await authService.login('test@example.com', 'password');

    // Assert
    expect(result).toMatchObject({ user: mockUser, token: expect.any(String) });
  });

  it('throws on invalid password', async () => {
    await expect(authService.login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});