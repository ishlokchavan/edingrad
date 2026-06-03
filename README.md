# Edingrad

A **Next.js 14 (App Router)** + **TypeScript (strict)** application for Edingrad,
scaffolded on the Edingrad design system. It runs as a **server app** (not a
static export), so route handlers, server actions, ISR and the Next image
optimiser are available with no further configuration. It deploys to Vercel as a
standard Next.js project.

> Jira: **EG-24** — Scaffold the Next.js app and port the design system.

---

## What's here

This is the project skeleton plus the **design system ported from
[`edingrad-brand-guidelines`](https://github.com/ishlokchavan/edingrad-brand-guidelines)**:

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
full icon set, with a working light/dark toggle.

> The brand-guidelines `Section` / `Pager` primitives are intentionally **not**
> ported here — they are coupled to that site's single-document section registry
> rather than being a general-purpose building block. The reusable UI primitives
> above are ported verbatim.

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

## Deploying to Vercel

A standard Next.js server app — Vercel auto-detects the framework (declared in
`vercel.json`) and builds it with no extra configuration.

**Import the Git repo (recommended)**

1. Go to <https://vercel.com/new> and import this repository.
2. Framework preset: **Next.js** (auto-detected). Click **Deploy**.

**Vercel CLI**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

---

## Theming

`ThemeProvider` resolves the theme as **saved preference → system preference →
light**, persists it to `localStorage`, and sets `data-theme` on `<html>`. A tiny
inline script in `layout.tsx` applies it before first paint to avoid a flash.

© 2026 Edingrad.
