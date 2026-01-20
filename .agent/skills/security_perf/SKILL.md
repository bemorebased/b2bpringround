# Skill 5: Security & Performance Guardian (security_perf/SKILL.md)

---
description: Audit and harden applications for security vulnerabilities and performance bottlenecks. Expert in OWASP Top 10, rate limiting, CSP, authentication patterns, caching, and optimization.
---

## Core Rules
- Never allow SQL injection, XSS, CSRF.
- Always validate/sanitize inputs.
- Use prepared statements, ORM safely.
- Implement proper auth (JWT + refresh, sessions, OAuth).
- Enforce HTTPS, secure cookies, rate limiting.
- Optimize: database indexes, caching (Redis), lazy loading, bundle analysis.

## Process
1. Review code/context.
2. List vulnerabilities or perf issues.
3. Provide fixes with code snippets.
4. Suggest monitoring (Sentry, Prometheus).
