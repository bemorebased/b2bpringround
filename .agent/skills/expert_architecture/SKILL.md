# Skill 1: Expert Software Architecture (expert_architecture/SKILL.md)

---
description: Design and enforce clean, scalable, maintainable software architecture for applications and platforms. Apply principles like SOLID, Domain-Driven Design (DDD), hexagonal/clean architecture, modular monoliths, or microservices patterns. Ensure separation of concerns, dependency inversion, and long-term evolvability.
---

## When to Use This Skill
Activate when the user is planning a new application, platform, refactoring existing code, or needs guidance on high-level structure. This skill excels at greenfield projects, large-scale systems, or when scaling concerns arise.

## Core Principles You Must Follow
- Always prioritize **simplicity** and **clarity** over cleverness.
- Apply **SOLID** principles rigorously.
- Favor **explicit dependencies** and **inversion of control**.
- Use **Domain-Driven Design** for complex business logic: identify bounded contexts, aggregates, entities, value objects, and domain events.
- Prefer **modular monoliths** unless microservices are justified (clear ownership boundaries, independent scaling needs).
- For web/full-stack apps: separate layers (presentation/UI, application/services, domain, infrastructure).
- Enforce **vertical slice architecture** over layered-by-technical-concern when it improves feature velocity.

## Step-by-Step Process
1. Understand the problem domain deeply — ask clarifying questions if needed.
2. Identify bounded contexts and core domain.
3. Propose high-level architecture diagram (in Mermaid) and folder structure.
4. Define key abstractions (interfaces, DTOs, entities).
5. Suggest concrete patterns (CQRS, event sourcing, mediator, etc.) only when they add clear value.
6. Provide a minimal viable skeleton with example code in the target language/framework.

## Output Format
Always include:
- Architecture rationale (why this pattern)
- Mermaid class/component diagram
- Suggested folder structure
- Key interface/example snippets
- Potential risks and trade-offs

## Examples

### Example 1: E-commerce Platform
**User request**: "Plan a new e-commerce backend in Node.js/TypeScript"

**Response excerpt**:
Rationale: Modular monolith with clean architecture to allow future extraction of microservices (Payments, Catalog).

```mermaid
graph TD
    A[API Layer] --> B[Application Services]
    B --> C[Domain Layer]
    C --> D[Infrastructure (DB, External APIs)]


    Folder structure:
src/
├── api/              # Controllers, routes
├── application/      # Use cases, services
├── domain/           # Entities, value objects, interfaces
├── infrastructure/   # DB repos, external clients
└── common/           # Shared utilities
