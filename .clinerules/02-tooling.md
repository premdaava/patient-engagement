# Tooling

- Always use **pnpm**. Never use npm or yarn. Never create `package-lock.json` or `yarn.lock`.
- Use `pnpm add`, `pnpm add -D`, `pnpm dlx`, `pnpm dev`, `pnpm build`.
- **Icons:** use only `lucide-react`. Do not add other icon libraries.
- **Database:** PostgreSQL via Drizzle ORM and drizzle-kit. Schema lives in `src/db/schema/` (one file per domain), migrations in `drizzle/`. Use `pnpm drizzle-kit generate` and `pnpm drizzle-kit migrate`.
- **Secrets** only in `.env.local` (gitignored). Always maintain `.env.example` with placeholder values.
- Validate inputs with **zod**. Never hardcode secrets.
