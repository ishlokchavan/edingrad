# docs/ — project source of truth

Read these before building. They carry the context the codebase itself doesn't.

| File | What it is |
|---|---|
| [`build-plan.md`](./build-plan.md) | **The spec.** Stack, site map, roles, data model, tool specs, i18n, phased delivery, and the EG-ticket mapping. The source of truth for *what* we build and *why*. |
| [`voice.md`](./voice.md) | **The Edingrad Standard** — brand voice for all copy (UI microcopy, pages, emails, PDFs). Derived from the brand-guidelines repo. |
| [`design-system.md`](./design-system.md) | Where the design system comes from (the brand-guidelines repo) and what's ported into this repo. |

Related, outside `docs/`:
- [`../supabase/migrations/`](../supabase/migrations/) — the database schema (build-plan §5) as a ready-to-run migration.

## For Claude Code / new sessions

> Read `docs/build-plan.md` — it's the spec for this project. We're on **EG-24
> (Phase 0 — Technical Foundation)**: finish the design-system port and get a
> hello-world deployed to Vercel before any feature work. Keep all copy in the
> voice defined in `docs/voice.md`. The design system's upstream is
> `github.com/ishlokchavan/edingrad-brand-guidelines`.
