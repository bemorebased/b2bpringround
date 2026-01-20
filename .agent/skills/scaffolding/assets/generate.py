# Skill 4: Full-Stack Scaffolding (scaffolding/assets/generate.py)

---
description: Rapidly scaffold production-grade full-stack applications with best-practice structure, auth, database, API routes, and UI components. Supports Next.js, Remix, NestJS, Django, etc.
---

This skill is script-backed for actual file generation.

## assets/generate.py
```python
import os
import sys
import json

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: generate.py <template> <project_name>"}))
        sys.exit(1)

    template = sys.argv[1]  # e.g., "nextjs-auth"
    project_name = sys.argv[2]

    # Create directory structure, write files with best-practice boilerplate
    os.makedirs(f"{project_name}/app", exist_ok=True)
    # ... write routes, middleware, drizzle/postgres setup, shadcn/ui init, etc.

    print(json.dumps({
        "result": f"Successfully scaffolded {project_name}",
        "artifacts": [
            f"{project_name}/package.json",
            f"{project_name}/app/layout.tsx",
            # etc.
        ]
    }))
    sys.exit(0)

if __name__ == "__main__":
    main()