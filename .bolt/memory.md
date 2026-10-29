# Project memory

## Product intent & audience

- Product showcases a suite/bundle of included applications ("Aplicaciones incluidas"), likely a platform or service offering integrated apps.
- Audience: end users evaluating included apps by category; content presented in Spanish.

## Brand personality & voice

- Professional yet visually striking; "beautiful, not cookie cutter."
- Spanish-language UI copy.

## Visual design & UX direction

- Filter tabs sit above the app grid; active tab highlighted in **green**, inactive tabs rendered as bordered buttons.
- App catalog organized into five categories: Todas, Productividad, Streaming & Entretenimiento, IA & Automatización, Creatividad.
- Grid filters by selected category on tab click.
- Uses Tailwind CSS, Lucide React icons, `@/` path alias for imports.
- React hooks for tab/filter state.
- **Floating modal** on app click or "Ver aplicaciones" button: top preview image with gradient overlay + close button, app icon/name/category, key-features checklist (check marks), green download button.
- Modal UX: closes via Esc key, backdrop click, or X button; locks background scroll while open; smooth entrance animations.

## Decisions, constraints & rationale

- Catalog expanded from 4 to 8 apps (2 per category) so every filter tab has content.
- Category mapping:
  - Productividad: llamadas, tareas
  - Streaming & Entretenimiento: streaming, reproductor en vivo
  - IA & Automatización: IA, automatización
  - Creatividad: edición, diseño
- App data model extracted into a shared module (`appsData`) to unify Hero, grid, and modal consumption; each app includes category, icon, preview image, and features list.
- No extra UI packages beyond template defaults (Vite + React + Tailwind + Lucide).
- Modal state lifted to `App.tsx` so both Hero button and card links can trigger it.

## Open questions & assumptions

- App data model assumed per-app fields: `category`, `image`, `features[]`, plus display metadata.
- Assumed no routing needed; filtering and modal are client-side state only.
- No backend/persistence assumed for tab selection or modal state.
- Download button target/behavior not yet specified (assumed placeholder link).