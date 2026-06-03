# Design System — source & what's ported

The Edingrad design system originates in the brand-guidelines repo and is ported
into this repo. Treat the guidelines repo as the upstream **source of truth** for
tokens, type, colour, iconography and voice; this repo is where the product is
built on top of it.

**Upstream:** <https://github.com/ishlokchavan/edingrad-brand-guidelines>
**Live reference:** the deployed guidelines microsite (Palestra + Lynx Sans, IBM
Carbon tokens, 24-icon set, charts, voice).

## What lives here

This repo currently contains a **full, faithful port** of the guidelines site,
served as a Next.js **server app** (the upstream uses `output: 'export'`; we drop
that to enable route handlers, server actions, auth and ISR — see
`docs/build-plan.md` §2).

| Asset | Location | Notes |
|---|---|---|
| Design tokens | `src/app/globals.css` | IBM Carbon CSS variables; light/dark via `[data-theme]`. Verified byte-identical to upstream. |
| Fonts | `public/fonts/` | Self-hosted Palestra + Lynx Sans (12 woff2). Verified by checksum. |
| Icons | `src/components/icons/ui-icons.tsx` | 24 IBM-style UI icons, typed React components. |
| Colour data | `src/data/colors.ts` | Carbon palette, scales, families, categorical, alerts, surfaces. |
| Primitives | `src/components/primitives/` | `Section`, `Pager`, `OnThisPage`, `Card`, `Pill`, `Swatch`, `DoDont`. |
| Charts | `src/components/charts/` + `src/data/charts.ts` | Prop-driven `BarChart` / `LineChart` / `Donut` + catalogue. |
| Theme | `src/lib/theme.tsx` | `ThemeProvider` + `useTheme`, persisted, system-aware, no-flash. |
| Voice | `docs/voice.md` | Derived from upstream `data/principles.ts`; the standard for all copy. |

## Rules

- **Tokens, not hard-coded styles.** Reference CSS variables; a rebrand is a token change.
- **One Palestra moment per view.** Palestra carries a single display statement; Lynx Sans does the rest.
- **Blue-led, dark app-bar.** Blue 60 (`#0F62FE`) is the action colour; the top bar stays dark in both themes.
- **Copy follows `docs/voice.md`.** This applies to UI microcopy, not just long-form pages.

To pull an upstream fix, copy the specific file(s) from the guidelines repo and
re-verify (`diff` for source, `md5sum` for fonts).
