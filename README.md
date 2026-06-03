# Edingrad

A **Next.js 14 (App Router)** + **TypeScript (strict)** application for Edingrad,
scaffolded on the Edingrad design system. It runs as a **server app** (not a
static export), so route handlers, server actions, ISR and the Next image
optimiser are available with no further configuration. It deploys to Vercel as a
standard Next.js project.

> Jira: **EG-24** (Phase 0 — Technical Foundation) — Scaffold the Next.js app and
> port the design system from
> [`edingrad-brand-guidelines`](https://github.com/ishlokchavan/edingrad-brand-guidelines).

## Project docs (source of truth)

The context behind this build lives in [`docs/`](./docs/) — read it before
feature work:

- [`docs/build-plan.md`](./docs/build-plan.md) — **the spec**: stack, site map, roles, data model, tool specs, phased delivery, EG-ticket mapping.
- [`docs/voice.md`](./docs/voice.md) — **the Edingrad Standard** brand voice for all copy.
- [`docs/design-system.md`](./docs/design-system.md) — design-system source and what's ported.
- [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql) — the database schema (build-plan §5) as a ready-to-run migration.

---

## What's here

The project skeleton plus the **design system ported from
[`edingrad-brand-guidelines`](https://github.com/ishlokchavan/edingrad-brand-guidelines)**.
Per build-plan §2, this repo takes the *design system* and the product is built
on top of it; the full guidelines microsite stays live at its own deployment as
a reference.

- **Design tokens** — IBM Carbon-based CSS variables (colour, spacing, type,
  surfaces) with light/dark themes via `[data-theme]`, in `src/app/globals.css`.
- **Self-hosted fonts** — Palestra (display serif) and Lynx Sans (humanist sans),
  12 woff2 files in `public/fonts/`, declared with `@font-face` + `font-display: swap`.
- **24-icon set** — IBM-style UI icons on a 32×32 grid, as typed React components
  in `src/components/icons/ui-icons.tsx`.
- **Colour data** — the full Carbon palette, scales, core families, categorical
  sequence, alerts and dark surfaces, in `src/data/colors.ts`.
- **Primitives** — reusable `Card`, `Pill`, `Swatch`, `SwatchRow`, `DoDont` in
  `src/components/primitives/ui.tsx`, plus the `ThemeProvider` / `useTheme` theme
  layer (`src/lib/theme.tsx`) and `ThemeToggle`.

The home page (`src/app/page.tsx`) is a small hello-world that exercises the
whole system: display + body type, the blue scale and core families, and the
full icon set, with a working light/dark toggle. The marketing Home (build-plan
§3) replaces it in Phase 1.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx        Root layout: metadata, no-flash theme script, ThemeProvider
│  ├─ page.tsx          Hello-world showcase of the design system
│  └─ globals.css       Design tokens, base styles, @font-face
├─ lib/
│  └─ theme.tsx         ThemeProvider + useTheme (persisted, system-aware)
├─ data/
│  └─ colors.ts         Blue scale, families, grays, categorical, alerts, surfaces
└─ components/
   ├─ icons/            24 IBM-style UI icons as typed React components
   ├─ layout/           ThemeToggle
   └─ primitives/       Card, Pill, Swatch, SwatchRow, DoDont
public/fonts/           Self-hosted Palestra + Lynx Sans (woff2)
docs/                   Build plan, brand voice, design-system notes
supabase/               Database schema & migrations
```

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

## Environment & services

Copy [`.env.example`](./.env.example) to `.env.local` for local dev, and set the
same keys in Vercel project settings. Secrets are never committed.

| Var | Used by |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase clients (browser + server, RLS-respecting) |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged server client (bypasses RLS) — server-only |
| `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `TEAM_INBOX_EMAIL` | Transactional email |

Foundation modules (build-plan Phase 0):

- `src/lib/env.ts` — typed env contract, read at call time (a missing secret never breaks the build).
- `src/lib/supabase/{client,server}.ts` — browser, server (cookie/RLS), and admin (service-role) clients.
- `src/lib/email/brevo.ts` — `sendTransactionalEmail` / `notifyTeam` helpers.
- `GET /api/health` — confirms the server runtime and reports which env vars are configured (booleans only). Verify the pipeline at `/api/health`.

The database schema lives in [`supabase/migrations/`](./supabase/migrations/);
apply it per [`supabase/README.md`](./supabase/README.md).

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

© 2026 Edingrad.
