# Edingrad

The **Edingrad brand & design-system site**, built with **Next.js 14 (App Router)**
and **TypeScript (strict)**, styled after the IBM Design Language. It runs as a
**server app** (not a static export), so route handlers, server actions, ISR and
the Next image optimiser are available with no further configuration, and it
deploys to Vercel as a standard Next.js project.

The whole site is **one scrolling document** with a sticky sidebar, scroll-spy,
search, light/dark theming, and a Previous/Next pager — all driven from a single
typed registry.

> Jira: **EG-24** — Scaffold the Next.js app and port the design system from
> [`edingrad-brand-guidelines`](https://github.com/ishlokchavan/edingrad-brand-guidelines).

## Project docs (source of truth)

The context behind this build lives in [`docs/`](./docs/) — read it before
feature work:

- [`docs/build-plan.md`](./docs/build-plan.md) — **the spec**: stack, site map, roles, data model, tool specs, phased delivery, EG-ticket mapping.
- [`docs/voice.md`](./docs/voice.md) — **the Edingrad Standard** brand voice for all copy.
- [`docs/design-system.md`](./docs/design-system.md) — design-system source and what's ported.
- [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql) — the database schema (build-plan §5) as a ready-to-run migration.

---

## Why this is maintainable & scalable

The key idea: **one section registry is the single source of truth.** Navigation,
ordering, the two-digit section numbers, the search index, scroll-spy, and the
pager are all *derived* from `src/lib/sections.ts`.

To add a new guideline section you do exactly two things:

1. Add an entry to `SECTIONS` in `src/lib/sections.ts`.
2. Create the matching component in `src/components/sections/` and drop it into
   `src/app/page.tsx`.

Nav links, sub-links, "on this page" jumps, section numbering, search results,
and the prev/next pager update **automatically**.

Other scalability levers:

- **Design tokens, not hard-coded styles.** All colour, spacing, type and
  surface decisions live as CSS variables in `src/app/globals.css` (light/dark
  themes via `[data-theme]`). A rebrand is a token change, not a component rewrite.
- **Data-driven content.** The 24 UI icons, the chart catalogue, the colour
  palette and the brand/animation/voice principles live in typed modules under
  `src/data/` (and `src/components/icons/`) and are rendered by small components.
- **Reusable primitives & charts.** `Section`, `Card`, `Swatch`, `DoDont`,
  `Pager`, and the prop-driven `BarChart` / `LineChart` / `Donut` are used across
  sections.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        Root layout: metadata, no-flash theme script, <Shell>
│  ├─ page.tsx          Assembles Hero + 12 sections in registry order
│  └─ globals.css       Design tokens, base, app shell, section styles, @font-face
├─ lib/
│  ├─ sections.ts       ★ Section registry — nav, order, numbering, search, pager
│  ├─ theme.tsx         ThemeProvider + useTheme (persisted, system-aware)
│  └─ useScrollSpy.ts   Active-section tracking
├─ data/
│  ├─ colors.ts         Blue scale, families, grays, categorical, alerts, surfaces
│  ├─ charts.ts         Chart catalogue (blue-family thumbnails)
│  └─ principles.ts     Brand principles, animation principles, voice
├─ components/
│  ├─ layout/           Shell, Header, Sidebar, Footer, ThemeToggle, Search
│  ├─ primitives/       Section, OnThisPage, Pager, Card, Swatch, DoDont, Pill
│  ├─ charts/           BarChart, LineChart, Donut, ChartCatalog
│  ├─ icons/            24 IBM-style UI icons as typed React components
│  └─ sections/         Hero + Philosophy … Help (one component per section)
public/fonts/           Self-hosted Palestra + Lynx Sans (woff2)
```

`★` = the file you touch most when extending the site.

---

## Running locally

Requires Node 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (server output)
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit (strict)
```

---

## Deploying to Vercel

A standard Next.js **server app** — Vercel auto-detects the framework (declared in
`vercel.json`) and builds it with no extra configuration. Production deploys from
the repository's default branch (`main`); other branches deploy as previews.

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

> This project does **not** use `output: 'export'` — it is built and served as a
> Next.js server app.

---

## Theming

`ThemeProvider` resolves the theme as **saved preference → system preference →
light**, persists it to `localStorage`, and sets `data-theme` on `<html>`. A tiny
inline script in `layout.tsx` applies it before first paint to avoid a flash.
Hero and section bands follow the active theme; the top app-bar stays dark in
both (an IBM Design Language signature).

## Notes

- Fonts (Palestra, Lynx Sans) are self-hosted in `public/fonts` and declared via
  `@font-face` with `font-display: swap`.

© 2026 Edingrad.
