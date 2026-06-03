# supabase/

Database schema and migrations for Edingrad, derived from `docs/build-plan.md`
§4 (roles) and §5 (data model).

```
supabase/
└─ migrations/
   ├─ 0001_init.sql                Enums, tables, indexes, helper functions, RLS
   └─ 0002_security_hardening.sql  Pin function search_path; lock down trigger fn
seed.sql                          Sample published posts (idempotent). Replace
                                  with real content via the admin in Phase 2.
```

> Both migrations are already applied to the `edingrad` project. The schema was
> verified live: an anonymous insert into `leads` succeeds while anonymous reads
> are denied (admin-only), exactly per the RLS design.

## Applying the schema

**Option A — Supabase Dashboard (quickest):**
Project → **SQL Editor** → paste `migrations/0001_init.sql` → Run.

**Option B — Supabase CLI:**
```bash
supabase link --project-ref <your-project-ref>
supabase db push                      # applies files in supabase/migrations
```

## What the migration sets up

- **Roles:** `admin` / `editor` / `agent` (enum), with a `profiles` row auto-created
  on signup (role `agent`, status `pending` — admins activate from the dashboard).
- **Tables:** `profiles`, `listings`, `listing_images`, `listing_imports`, `posts`,
  `jobs`, `job_applications`, `leads`.
- **Row-Level Security** on every table, matching build-plan §4:
  - Public reads only published listings/posts/jobs and active agent profiles.
  - Agents write only their own listings/images and see leads on their own listings.
  - Editors manage CMS (`posts`, `jobs`); admins manage everything.
  - Anyone may submit `leads` and `job_applications`; only staff can read them.

## Handled in the app layer (not SQL)

- **Brevo email** on new `leads` / `job_applications` — fire from a server route
  handler or a Supabase database webhook / edge function.
- **Storage buckets** (listing images, CVs, assets) — create in Supabase Storage;
  the schema stores their public URLs only.
- **Secrets** — Supabase URL/keys and the Brevo API key go into Vercel env vars
  (entered by you), never committed.
