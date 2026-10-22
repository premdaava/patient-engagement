# Patient Engagement

A modern patient engagement platform (Solution Reach style) built with Next.js, PostgreSQL, and Drizzle ORM.

**Features:** Campaigns · Newsletters · Surveys · Email Templates · Reviews · Two-way Texting

---

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm i -g pnpm`)
- PostgreSQL ≥ 15

---

## Setup

```bash
# 1. Clone the repo
git clone git@daava:premdaava/patient-engagement.git
cd patient-engagement

# 2. Install dependencies (always use pnpm)
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your database URL and Open Dental API keys

# 4. Run database migrations
pnpm drizzle-kit migrate

# 5. Start the dev server
pnpm dev
```

The app will be available at **http://localhost:3000**.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm drizzle-kit generate` | Generate migrations from schema changes |
| `pnpm drizzle-kit migrate` | Apply migrations to the database |
| `pnpm drizzle-kit studio` | Open Drizzle Studio (DB browser) |

---

## Project Structure

```
src/
├── app/                  # Routes only (App Router)
├── features/             # Feature modules (auth, campaigns, surveys, …)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── actions/
│       ├── queries/
│       └── types.ts
├── components/
│   ├── ui/               # Reusable UI primitives
│   └── layout/           # AppShell, Sidebar, Topbar, PageHeader
├── db/
│   ├── client.ts
│   └── schema/           # One file per domain
├── lib/
│   └── open-dental/      # Typed Open Dental API client
└── styles/
    └── globals.css       # CSS variables / design tokens
drizzle/                  # Generated migrations
```

---

## Rules

See `.clinerules/` for coding conventions, folder structure, CSS naming, git rules, and Open Dental API guidelines.

