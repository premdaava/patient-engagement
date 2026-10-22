# GitHub & Git Rules

## Remote
- The **only** allowed git remote is: `git@daava:premdaava/patient-engagement.git` (remote name: `origin`).
- If `origin` is missing, add it with:
  ```
  git remote add origin git@daava:premdaava/patient-engagement.git
  ```

## Forbidden Repositories
- **NEVER** read, clone, fetch, copy code from, or refer to these repositories under any circumstance:
  - `git@github.com:premdaava/patient-connect.git`
  - `git@daava:premdaava/patient-connect.git`
- Do not reuse any code, structure or naming from them. This project is **built fresh**.

## Branching & Commits
- Use feature branches: `feat/<name>`, `fix/<name>`.
- Use **Conventional Commits**: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- Commit small and often. Push with `git push -u origin <branch>`.

## Guardrails
- **Never** force push.
- **Never** commit `.env.local`, `node_modules`, `.next`.
- Before pushing, run `pnpm lint` and `pnpm build` and make sure **both pass**.
