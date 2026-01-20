## Instructions

When the user wants to start a new project:

1. **Confirm the tech stack** with the user (e.g., framework: Next.js/App Router, auth provider: Clerk/NextAuth, ORM: Drizzle/Prisma, other preferences like Tailwind, shadcn/ui, database).

2. **Run the helper script** to generate the boilerplate:
   - First, show available options: `python scripts/scaffold_project.py --help`
   - Then execute with confirmed parameters, e.g.:
     ```
     python scripts/scaffold_project.py nextjs-fullstack my-project-name --auth clerk --orm drizzle
     ```

3. **Review all generated files**:
   - List key artifacts (package.json, app/router setup, tailwind.config.ts, drizzle schema, etc.).
   - Verify structure aligns with elite architecture (modular, type-safe, scalable).

4. **Apply immediate elite enhancements**:
   - Initialize shadcn/ui: `npx shadcn@latest init`
   - Add core components as needed.
   - Configure auth (env vars, providers).
   - Set up ORM migrations and database push.
   - Suggest initial commits or lint/prettier setup.

5. **Output confirmation**:
   - Structured JSON from the script (success, artifacts list, next steps).
   - Propose first feature to implement or architecture refinements.

## Constraints
- Always confirm user preferences before running the script.
- Never overwrite existing files without explicit user approval.
- Prioritize Next.js 15+ App Router with server actions and RSC patterns unless specified otherwise.