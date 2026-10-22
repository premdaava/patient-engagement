# Component & CSS Rules

## Component Size & Reuse
- Keep components **small** (ideally under 80 lines, one responsibility). Split anything bigger into smaller components.
- Before creating a new component, check `src/components/ui/` and the feature's `components/` folder and **reuse** existing ones.

## CSS Modules
- Use **CSS Modules**. Each component or module has a file named `<Name>.module.css` next to it.
- **Never** use inline styles. **Never** use hardcoded colors, spacing, radii or shadows. Use CSS variables from `src/styles/globals.css` (e.g. `--color-primary`, `--space-4`, `--radius-md`, `--shadow-sm`).

## CSS Naming Convention
- The **top-level module name** is the root class, written in camelCase matching the module (e.g. `campaigns`, `surveyBuilder`, `emailTemplates`).
- Child elements are nested descriptive classes following this pattern:
  `.campaigns`, `.campaignsHeader`, `.campaignsList`, `.campaignsListItem`, `.campaignsEmpty`
- Modifiers use a suffix like `.campaignsListItemActive`.
- **Example:** In `CampaignCard.module.css` the root is `.campaignCard`, with children `.campaignCardTitle`, `.campaignCardMeta`, `.campaignCardActions`.

## Server vs Client Components
- Components are **Server Components by default**. Add `"use client"` only when state, effects or browser APIs are needed.

## TypeScript
- All components are typed with TypeScript. **No `any`.**

## Accessibility
- Every interactive element must be keyboard accessible with proper labels.
- Every list or table must have a **loading state** and an **empty state**.
