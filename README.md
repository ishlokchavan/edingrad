# Edingrad

The **Edingrad** website & platform: a public marketing site and property-listing
portal for an institutional-grade investment-advisory firm, with a role-based
admin/CMS. Built with **Next.js 14 (App Router)** + **TypeScript (strict)**,
**Supabase** (Postgres + Auth + Storage), and **Brevo** (transactional email),
deployed on **Vercel**. Styled on the Edingrad design system (Palestra + Lynx
Sans, IBM Carbon tokens) and written in the Edingrad voice.

> Jira: **EG-24**. Spec: [`docs/build-plan.md`](./docs/build-plan.md) · voice:
> [`docs/voice.md`](./docs/voice.md) · design system:
> [`docs/design-system.md`](./docs/design-system.md).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript strict — **server app** (not static export) |
| Styling | CSS variables / design tokens (`src/app/globals.css`) |
| i18n | next-intl, locale-segmented (`/[locale]`), English at root, Arabic/RTL-ready |
| Database | Supabase (Postgres) with Row-Level Security |
| Auth | Supabase Auth (email + password), roles: admin / editor / agent |
| Storage | Supabase Storage — `media` (public), `applications` (private) |
| Email | Brevo SMTP relay (nodemailer) |
| Rates | CoinGecko (free tier) for the crypto tool |
| PDF | jsPDF (mortgage illustration) |
| Hosting | Vercel — production deploys from `main` |

---

## Routes (site map)

```
/                                 Home
/who-we-help                      + /developers /asset-management /private-wealth
/what-we-do                       hub
  /residential /commercial /off-plan        intros → portal
  /property-management /currency-services /sell-instantly   service pages
  /mortgage                       Mortgage calculator (+ PDF, pre-approval lead)
  /crypto-exchange                Crypto rate calculator + enquiry (indicative)
/who-we-are                       hub
  /about
  /press /insights /resources     CMS articles  (+ /[slug] detail)
  /agents                         agent directory  (+ /[id] profile)
  /careers                        jobs  (+ /[slug] detail + application upload)
/properties                       listing portal (search + filters)
  /properties/[slug]              listing detail (gallery, specs, agent, enquiry)
/get-in-touch                     Speak to an expert (lead form)
/login                            Supabase Auth
/dashboard                        role-gated admin
  /content  /content/new  /content/[id]     posts CMS (cover/gallery/downloads)
  /jobs     /jobs/new     /jobs/[id]         jobs CMS
  /listings /listings/new /listings/[id]     listings (+ photos, /import CSV)
  /applications                              job applications (signed downloads)
  /leads                                     enquiries (admin)
/api/health                       pipeline/env check
```

All public form submissions land in Supabase (`leads` / `job_applications`) and
trigger a Brevo notification to the team.

---

## Roles & access (RLS-enforced)

| Role | Can do |
|---|---|
| **admin** | Everything: content, jobs, all listings + bulk import, leads, applications |
| **editor** | CMS only: posts (Press/Insights/Resources) and jobs |
| **agent** | Their own listings (create/edit/publish + photos) |

New signups auto-create a `profiles` row (`role: agent`, `status: pending`);
an admin activates / re-roles from the Supabase dashboard.

---

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local`; set the same in Vercel.

| Var | Used by |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase clients (RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only privileged client (uploads, admin reads) |
| `BREVO_SMTP_USER`, `BREVO_SMTP_KEY`, `BREVO_FROM_EMAIL` | Transactional email (sender must be a **verified** Brevo sender) |
| `BREVO_FROM_NAME`, `TEAM_INBOX_EMAIL` | Optional (defaults: `Edingrad`, the from address) |
| `CRYPTO_SPREAD` | Optional display spread for the crypto tool (default `0.015`) |

Check configuration at `GET /api/health`.

---

## Running locally

Requires Node 18.17+ (Node 20 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit (strict)
```

---

## Database

Schema and RLS live in [`supabase/migrations/`](./supabase/migrations/); sample
content in [`supabase/seed.sql`](./supabase/seed.sql). Apply via the Supabase SQL
editor or CLI (see [`supabase/README.md`](./supabase/README.md)). Regenerate
types after schema changes into `src/lib/supabase/types.ts`.

**Bulk listing import** (admin → `/dashboard/listings/import`) accepts a CSV with
columns: `title, category, transaction_type` (required), then `price, bedrooms,
bathrooms, size_sqft, community, developer, completion_status,
rera_permit_number, description, amenities` (pipe-separated), `slug`. Rows import
as drafts and an audit row is written to `listing_imports`.

---

## Project structure

```
src/
├─ app/[locale]/
│  ├─ layout.tsx               providers shell (theme, i18n)
│  ├─ (marketing)/             public site (header/footer layout)
│  ├─ (app)/dashboard/         role-gated admin (its own chrome)
│  └─ login/                   auth
├─ app/api/health/             pipeline check
├─ components/{site,dashboard,icons,primitives,layout}/
├─ lib/                        supabase, auth, content, listings, jobs, agents,
│                              mortgage, crypto, email/brevo, i18n
├─ i18n/                       routing, request, navigation, middleware wiring
└─ middleware.ts               next-intl + Supabase session refresh
messages/en.json               all UI copy (Arabic = add ar.json + a locale)
public/fonts/                  Palestra + Lynx Sans (woff2)
docs/                          build plan, voice, design-system notes
supabase/                      migrations + seed
```

---

## Deploying to Vercel

Standard Next.js server app — Vercel auto-detects the framework (declared in
`vercel.json`). **Production deploys from `main`**; other branches are previews.
Set the env vars above in the project settings. Apply the Supabase migrations to
the linked project. To go live on `edingrad.com`, add the domain in Vercel
**Settings → Domains** and point your DNS at Vercel.

© 2026 Edingrad Real Estate L.L.C.
