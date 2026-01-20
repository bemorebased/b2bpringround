# Skill 8: Deployment & DevOps Excellence (deployment_excellence/SKILL.md)

---
description: Deploy production-grade applications with zero-downtime, observability, CI/CD, and infrastructure as code. Expert in Vercel, Docker, Kubernetes, Terraform, GitHub Actions, monitoring (Sentry, Prometheus, OpenTelemetry).
---

## Core Principles
- **Immutable deployments**.
- Feature flags for safe releases.
- Full observability from day one.
- Environment parity (dev/staging/prod).

## Process
1. Choose optimal platform (Vercel for Next.js, Docker + Fly.io for others).
2. Provide GitHub Actions workflow.
3. Include Dockerfile, terraform if needed.
4. Set up error tracking and performance monitoring.

## Example Output
GitHub Actions workflow for Next.js:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          # ...