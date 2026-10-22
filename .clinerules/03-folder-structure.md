# Folder Structure

Feature-based structure:

| Path | Purpose |
|------|---------|
| `src/app/` | Routes only — thin pages that compose feature components |
| `src/features/<feature>/` | `components/`, `hooks/`, `actions/`, `queries/`, `types.ts`, `<feature>.module.css` |
| `src/components/ui/` | Small reusable UI primitives (`Button`, `Input`, `Card`, `Badge`, `Modal`, `Table`, `Tabs`, `EmptyState`, `Avatar`, `Spinner`, etc.) |
| `src/components/layout/` | `AppShell`, `Sidebar`, `Topbar`, `PageHeader` |
| `src/db/` | `client.ts`, `schema/` |
| `src/lib/` | Utilities, Open Dental client, helpers |
| `src/styles/` | `globals.css` (CSS variables / design tokens) and reset |

**Features:**
`auth`, `members`, `dashboard`, `campaigns`, `newsletters`, `surveys`, `email-templates`, `reviews`, `messaging`
