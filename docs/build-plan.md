# Edingrad — Website & Platform Build Plan

**Project:** Public marketing site + property listing portal for edingrad.com
**Business:** Edingrad — institutional-grade investment advisory (asset managers & private wealth)
**Primary goal:** Credibility / brand presence (lead generation as a close second)
**Status:** Planning — not yet in build
**Date:** 3 June 2026

---

## 1. Guiding principles

Everything we build must pass the brand's own litmus test: *"Would this read as Edingrad with the logo removed?"* That means:

- **Light-first, with a theme toggle.** The existing design system already ships light/dark parity with a no-flash theme script — we inherit it.
- **Blue-led, restrained, dark app-bar.** Blue 60 (`#0F62FE`) is the action colour; the top bar stays dark in both themes (IBM Design Language signature).
- **One Palestra moment per view.** Palestra (display serif) carries a single statement; Lynx Sans does everything else.
- **Voice everywhere.** Copy is written in the Edingrad Standard — analytical rigour, lead with the finding, write to one reader, no hype words. This applies to UI microcopy, not just long-form pages.
- **Tokens, not hard-coded styles.** A rebrand should be a token change, never a component rewrite.
- **Built to scale.** Lean v1 feature set, but the architecture (data model, i18n, auth, portal) is designed so growth is additive.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript (strict) | Inherited from the brand-guidelines repo |
| Styling | CSS variables / design tokens (as in guidelines `globals.css`) | Keeps fidelity with the existing system; Tailwind optional later, mapped to the same tokens |
| Hosting | Vercel | Already connected; auto-detects Next.js |
| Database | Supabase (Postgres) | New project, set up by you |
| Auth | Supabase Auth | Role-based (admin / editor / agent) |
| Storage | Supabase Storage | Listing images, CVs, downloadable assets |
| Transactional email | Brevo | Set up by you; called from server route handlers |
| Fonts | Palestra + Lynx Sans (self-hosted woff2) | Already in guidelines repo `public/fonts` — same org, reuse |
| i18n | English now; `next-intl` + locale routing scaffolded | RTL-ready for Arabic later (see §8) |

**Critical architecture change:** the guidelines repo uses `output: 'export'` (fully static). We remove that line to enable route handlers, server actions, auth, and ISR. The design system survives untouched — this is a one-line change plus adding the data layer.

**Repo strategy:** new repo `ishlokchavan/edingrad` (already created, empty). We port the design system from `edingrad-brand-guidelines` (tokens, fonts, icons, colour data, primitives) into it, then build the product on top. The guidelines site stays live as a reference.

---

## 3. Site map & routing

English-only now, but every route is built under an implicit locale segment so `/ar/...` can be switched on later without restructuring.

```
/                                  Home
/who-we-help                       Hub
  /who-we-help/developers
  /who-we-help/asset-management
  /who-we-help/private-wealth
/what-we-do                        Hub
  /what-we-do/residential          → intro + links into portal (type=residential)
  /what-we-do/commercial           → intro + links into portal (type=commercial)
  /what-we-do/off-plan             → intro + links into portal (type=offplan)
  /what-we-do/property-management  Service page
  /what-we-do/mortgage             Mortgage calculator (full, see §6)
  /what-we-do/currency-services    Informational page (no converter)
  /what-we-do/crypto-exchange      Rate calculator + enquiry form (see §6)
  /what-we-do/sell-instantly       Informational + CTA
/who-we-are                        Hub
  /who-we-are/about
  /press            + /press/[slug]
  /insights         + /insights/[slug]
  /resources        + /resources/[slug]
  /agents           + /agents/join
  /careers          + /careers/[slug]
/get-in-touch                      Speak to an expert + Request a call
/properties                        Listing portal index (search / filter)
  /properties/[slug]               Listing detail
/login
/dashboard                         Role-based (agent vs admin)
```

**Page vs. section:** parents with children are **hub pages linking to real subpages** (not one long scroll), for SEO and per your direction. The three "Who We Help" audiences are subpages for the same reason.

**Portal vs. service pages:** the listing portal lives at `/properties` with filters. The Residential / Commercial / Off-Plan service pages under "What We Do" are short intros that funnel into the relevant filtered portal view.

---

## 4. Roles & access

| Role | Can do |
|---|---|
| **Admin** | Everything: manage all listings, run bulk imports, publish CMS content, manage jobs, view all leads, manage users |
| **Editor** | CMS content (Press, Insights, Resources, Careers) — no user management |
| **Agent** | Create / edit / publish **their own** listings; manage their own profile; see leads on their own listings |

Enforced with Supabase Row-Level Security (RLS) so an agent can only ever touch their own rows.

---

## 5. Data model (Supabase)

Lean but scalable. Key tables:

**`profiles`** — `user_id`, `role`, `name`, `photo_url`, `bio`, `phone`, `email`, `languages[]`, `rera_brn` (broker reg. no.), `status`

**`listings`** — `id`, `agent_id`, `title`, `slug`, `category` (residential/commercial/offplan), `transaction_type` (sale/rent), `status` (draft/published/sold/archived), `price`, `currency`, `bedrooms`, `bathrooms`, `size_sqft`, `community`, `developer`, `completion_status`, `rera_permit_number`, `dld_permit`, `description`, `amenities[]`, `lat`, `lng`, `featured`, `created_at`, `updated_at`

**`listing_images`** — `id`, `listing_id`, `url`, `alt`, `sort_order`, `is_cover`

**`listing_imports`** — `id`, `source`, `file_url`, `status`, `row_count`, `imported_by`, `created_at` (audit trail for bulk/spreadsheet imports)

**`posts`** — `id`, `type` (press/insight/resource), `slug`, `title`, `excerpt`, `body` (MDX/rich), `cover_image`, `author_id`, `status`, `published_at`, `tags[]`, SEO fields

**`jobs`** — `id`, `slug`, `title`, `department`, `location`, `employment_type`, `description`, `status`, `published_at`

**`job_applications`** — `id`, `job_id`, `name`, `email`, `phone`, `cv_url`, `message`, `created_at`

**`leads`** — `id`, `type` (speak-to-expert / request-a-call / sell-instantly / mortgage / crypto-enquiry / listing-enquiry), `name`, `email`, `phone`, `audience` (developer/asset-mgmt/private-wealth), `reason`, `payload` (jsonb), `listing_id` (nullable), `source_page`, `status`, `created_at`

All form submissions (`leads`, `job_applications`) trigger a Brevo transactional email to the team on insert.

---

## 6. Tool specifications

### 6.1 Mortgage calculator (`/what-we-do/mortgage`)

Replicates the Dubai cost logic from the reference (haus & haus). **Inputs:**

- Property price (slider, AED 200,000 → 50,000,000)
- Deposit (min 20% of price; slider from min upward)
- Mortgage period (1–25 years)
- Interest rate (1–10%)

**Monthly repayment:** standard amortisation on loan amount (`price − deposit`):
`M = P · r(1+r)^n / ((1+r)^n − 1)`, where `P` = loan, `r` = monthly rate, `n` = months.

**Transaction-cost breakdown (the verified Dubai formulas):**

| Item | Formula |
|---|---|
| Deposit | min 20% of purchase price |
| DLD transfer of title | 4% of purchase price + AED 580 |
| DLD mortgage registration | 0.25% of loan amount + AED 290 |
| Trustee office fee (incl. 5% VAT) | AED 4,200 if price > 500k, else AED 2,100 |
| Bank arrangement fee | up to 1% of loan amount |
| Property valuation fee | AED 3,000 |
| Real estate agency fee | 2% of purchase price + 5% VAT |
| Conveyancing fee (incl. 5% VAT) | AED 9,450 mortgage / 6,300 cash-to-cash / 10,500+ company |
| **Total purchase costs** | sum of fees above (excl. deposit) |
| **Total required upfront** | deposit + total purchase costs |

*(Verified against the sample: price 9.8M, deposit 1.96M, 5%, 20yr → monthly AED 51,741; total purchase costs AED 713,320; total upfront AED 2,673,320.)*

**Features:** "View costs & fees" modal, **downloadable PDF report** (branded, Edingrad voice), and a "Get pre-approved" CTA → `leads` (type `mortgage`). Includes the standard "illustration only" disclaimer.

### 6.2 Currency Services (`/what-we-do/currency-services`)
Simple informational page — what the service is, how it helps, CTA to enquire. **No converter.**

### 6.3 Crypto Exchange (`/what-we-do/crypto-exchange`)
**Compliance first:** actual crypto-to-cash exchange is VARA-regulated. Edingrad's tool is a **rate calculator + enquiry form**, not an execution engine — it routes a qualified lead to you / a licensed partner.

- Give (USDT / BTC / ETH) → receive (Cash AED, Manager's cheque, SEPA EUR, SWIFT USD)
- Live crypto rates via a free API (e.g. CoinGecko) × AED peg, with a configurable display spread/fee
- "Make an enquiry" → `leads` (type `crypto-enquiry`); KYC/AML acknowledgement checkbox
- Clear "indicative only" disclaimer

### 6.4 Sell Instantly (`/what-we-do/sell-instantly`)
Informational page with the value proposition ("sell within 30 days or we buy at market price") and a "See if your property qualifies" CTA → `leads` (type `sell-instantly`).

---

## 7. Listing portal (`/properties`)

Lean for v1, architected to scale.

**Listing sources (v1):** (a) manual entry by agents via their dashboard, and (b) bulk import from a spreadsheet/feed by admins (audited via `listing_imports`).

**Public side:**
- Index with search + filters (category, sale/rent, price range, beds, community, developer, completion status)
- Listing detail page with gallery, specs, RERA permit display, agent card, and an enquiry form → `leads` (type `listing-enquiry`, linked to `listing_id` and the agent)

**Agent side (dashboard):** create/edit/publish own listings, upload images, manage status, see leads on own listings.

**Admin side:** manage all listings, bulk import, feature listings, moderate.

---

## 8. Internationalisation (future-proofing)

English-only at launch, but to avoid a costly retrofit:
- Wrap routes for locale prefixing (`next-intl` or equivalent)
- Externalise all UI strings into message catalogues from day one (no hard-coded copy in components)
- Keep layout logic direction-agnostic so RTL (Arabic) is a configuration switch, not a rebuild
- Store translatable DB content (listings, posts) in a way that a `locale` column / translation table can be added later

---

## 9. Phased delivery

| Phase | Scope | Maps to EG tickets |
|---|---|---|
| **0 — Foundation** | New repo, port design system, convert static→server app, wire Vercel + Supabase + Brevo, deploy a hello-world to confirm the pipeline | EG-7 (brand) assets reused |
| **1 — Marketing site** | Home, Who We Help (3 subpages), Who We Are (About + shells), What We Do hub + service pages, Get In Touch forms (→ Supabase + Brevo). All copy in Edingrad voice | EG-1, EG-16, EG-17, EG-18, EG-19 |
| **2 — CMS** | Supabase-backed admin for Press, Insights, Resources, Careers/jobs; auth + roles (admin/editor) | EG-5 (CMS), EG-6 (CRM-adjacent) |
| **3 — Listing portal** | `/properties` search/filter + detail, agent accounts & dashboard, manual entry + bulk import, listing enquiries | EG-20, plus Residential/Commercial/Off-Plan |
| **3b — Tools** | Mortgage calculator + PDF, Currency page, Crypto rate calculator + enquiry, Sell Instantly | EG-21 (mortgage), EG-22 (crypto), Currency, Sell Instantly |
| **4 — Domain cutover** | Test thoroughly on the Vercel URL, then point edingrad.com nameservers to Vercel | — |

---

## 10. Open logistics (not blocking the plan)

1. **Code push access** — to actually commit to `ishlokchavan/edingrad`, either I scaffold files for you to commit, or we run it through Claude Code with repo access. Decide at Phase 0.
2. **Brand assets** — fonts/logo already exist in the guidelines repo; you confirmed you have the rest. We'll pull them into Phase 0.
3. **Supabase project** — you're setting this up; we'll need the project URL + keys (entered by you into Vercel env vars — never shared in chat).
4. **Brevo** — you're setting this up; we'll need the API key (again, into Vercel env vars by you).
5. **Crypto rate source** — confirm CoinGecko (free tier) is acceptable, or name a preferred provider.

---

## 11. Immediate next step

Once you're happy with this plan, **Phase 0** is the first build action: stand up the new repo with the ported design system, convert to a server app, and get a deployed hello-world wired to Supabase + Brevo + Vercel. Everything else builds on that spine.
