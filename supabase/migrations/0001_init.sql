-- ============================================================================
-- Edingrad — initial schema (v1)
-- Source of truth: docs/build-plan.md §4 (roles) and §5 (data model).
--
-- Scope: tables, enums, indexes, helper functions, and Row-Level Security for
-- the admin / editor / agent role model. Designed for Supabase (Postgres +
-- auth.users + RLS). Safe to run once on a fresh project.
--
-- NOT in this file (handled in the app layer, per the plan):
--   * Brevo transactional email on insert into `leads` / `job_applications`
--     -> fire from a server route handler or a Supabase database webhook / edge
--        function, not from SQL.
--   * Storage buckets (listing images, CVs, assets) -> create in Supabase
--     Storage; this schema stores their public URLs only.
-- ============================================================================

create extension if not exists "pgcrypto";  -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
do $$ begin
  create type user_role          as enum ('admin', 'editor', 'agent');
exception when duplicate_object then null; end $$;
do $$ begin
  create type profile_status     as enum ('pending', 'active', 'suspended');
exception when duplicate_object then null; end $$;
do $$ begin
  create type listing_category   as enum ('residential', 'commercial', 'offplan');
exception when duplicate_object then null; end $$;
do $$ begin
  create type transaction_type   as enum ('sale', 'rent');
exception when duplicate_object then null; end $$;
do $$ begin
  create type listing_status     as enum ('draft', 'published', 'sold', 'archived');
exception when duplicate_object then null; end $$;
do $$ begin
  create type import_status      as enum ('pending', 'processing', 'completed', 'failed');
exception when duplicate_object then null; end $$;
do $$ begin
  create type post_type          as enum ('press', 'insight', 'resource');
exception when duplicate_object then null; end $$;
do $$ begin
  create type post_status        as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;
do $$ begin
  create type job_status         as enum ('draft', 'published', 'closed');
exception when duplicate_object then null; end $$;
do $$ begin
  create type lead_type          as enum (
    'speak-to-expert', 'request-a-call', 'sell-instantly',
    'mortgage', 'crypto-enquiry', 'listing-enquiry');
exception when duplicate_object then null; end $$;
do $$ begin
  create type lead_audience      as enum ('developer', 'asset-management', 'private-wealth');
exception when duplicate_object then null; end $$;
do $$ begin
  create type lead_status        as enum ('new', 'contacted', 'qualified', 'closed', 'spam');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- Helpers
-- ----------------------------------------------------------------------------

-- updated_at maintenance
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ----------------------------------------------------------------------------
-- profiles  (1:1 with auth.users)
-- NOTE: declared before the role-helper functions below, which reference it
-- (Postgres validates SQL function bodies at creation time).
-- ----------------------------------------------------------------------------
create table public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  role       user_role       not null default 'agent',
  name       text,
  photo_url  text,
  bio        text,
  phone      text,
  email      text,
  languages  text[]          not null default '{}',
  rera_brn   text,                         -- broker registration number
  status     profile_status  not null default 'pending',
  created_at timestamptz      not null default now(),
  updated_at timestamptz      not null default now()
);
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Role helpers. user_role is SECURITY DEFINER so it bypasses RLS on `profiles`
-- (prevents recursive policy evaluation).
create or replace function public.user_role(uid uuid)
returns user_role
language sql stable security definer set search_path = public as $$
  select role from public.profiles where user_id = uid
$$;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select public.user_role(auth.uid()) = 'admin'
$$;

create or replace function public.is_editor_or_admin()
returns boolean language sql stable as $$
  select public.user_role(auth.uid()) in ('admin', 'editor')
$$;

-- Auto-create a profile when a new auth user signs up (role: agent, pending
-- approval). Admins activate / re-role from the dashboard.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', new.email))
  on conflict (user_id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- listings
-- ----------------------------------------------------------------------------
create table public.listings (
  id                uuid primary key default gen_random_uuid(),
  agent_id          uuid not null references public.profiles (user_id) on delete restrict,
  title             text not null,
  slug              text not null unique,
  category          listing_category not null,
  transaction_type  transaction_type not null,
  status            listing_status   not null default 'draft',
  price             numeric(14,2),
  currency          text not null default 'AED',
  bedrooms          int,
  bathrooms         int,
  size_sqft         numeric(10,2),
  community         text,
  developer         text,
  completion_status text,
  rera_permit_number text,
  dld_permit        text,
  description       text,
  amenities         text[] not null default '{}',
  lat               double precision,
  lng               double precision,
  featured          boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index listings_agent_idx    on public.listings (agent_id);
create index listings_status_idx   on public.listings (status);
create index listings_category_idx on public.listings (category, transaction_type);
create index listings_featured_idx on public.listings (featured) where featured;
create trigger listings_set_updated_at before update on public.listings
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- listing_images
-- ----------------------------------------------------------------------------
create table public.listing_images (
  id         uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id) on delete cascade,
  url        text not null,
  alt        text,
  sort_order int not null default 0,
  is_cover   boolean not null default false
);
create index listing_images_listing_idx on public.listing_images (listing_id, sort_order);

-- ----------------------------------------------------------------------------
-- listing_imports  (audit trail for bulk / spreadsheet imports)
-- ----------------------------------------------------------------------------
create table public.listing_imports (
  id          uuid primary key default gen_random_uuid(),
  source      text,
  file_url    text,
  status      import_status not null default 'pending',
  row_count   int,
  imported_by uuid references public.profiles (user_id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- posts  (Press / Insights / Resources)
-- ----------------------------------------------------------------------------
create table public.posts (
  id              uuid primary key default gen_random_uuid(),
  type            post_type not null,
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  body            text,                       -- MDX / rich text
  cover_image     text,
  author_id       uuid references public.profiles (user_id) on delete set null,
  status          post_status not null default 'draft',
  published_at    timestamptz,
  tags            text[] not null default '{}',
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index posts_status_type_idx on public.posts (status, type, published_at desc);
create trigger posts_set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- jobs  +  job_applications
-- ----------------------------------------------------------------------------
create table public.jobs (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  department      text,
  location        text,
  employment_type text,
  description     text,
  status          job_status not null default 'draft',
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger jobs_set_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();

create table public.job_applications (
  id         uuid primary key default gen_random_uuid(),
  job_id     uuid not null references public.jobs (id) on delete cascade,
  name       text not null,
  email      text not null,
  phone      text,
  cv_url     text,
  message    text,
  created_at timestamptz not null default now()
);
create index job_applications_job_idx on public.job_applications (job_id);

-- ----------------------------------------------------------------------------
-- leads  (every form submission)
-- ----------------------------------------------------------------------------
create table public.leads (
  id          uuid primary key default gen_random_uuid(),
  type        lead_type not null,
  name        text,
  email       text,
  phone       text,
  audience    lead_audience,
  reason      text,
  payload     jsonb not null default '{}',
  listing_id  uuid references public.listings (id) on delete set null,
  source_page text,
  status      lead_status not null default 'new',
  created_at  timestamptz not null default now()
);
create index leads_created_idx on public.leads (created_at desc);
create index leads_listing_idx on public.leads (listing_id);
create index leads_type_idx    on public.leads (type);

-- ============================================================================
-- Row-Level Security
-- ============================================================================
alter table public.profiles         enable row level security;
alter table public.listings         enable row level security;
alter table public.listing_images   enable row level security;
alter table public.listing_imports  enable row level security;
alter table public.posts            enable row level security;
alter table public.jobs             enable row level security;
alter table public.job_applications enable row level security;
alter table public.leads            enable row level security;

-- ---- profiles --------------------------------------------------------------
-- Public can read active agent profiles (for agent cards on listings).
create policy profiles_public_read on public.profiles
  for select using (role = 'agent' and status = 'active');
-- A user can read & update their own profile (role/status changes are
-- restricted to admins via the admin policy below + a column guard in the app).
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = user_id);
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- Admins manage all profiles.
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- listings --------------------------------------------------------------
create policy listings_public_read on public.listings
  for select using (status = 'published');
create policy listings_agent_read_own on public.listings
  for select using (agent_id = auth.uid());
create policy listings_agent_write_own on public.listings
  for all using (agent_id = auth.uid()) with check (agent_id = auth.uid());
create policy listings_admin_all on public.listings
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- listing_images --------------------------------------------------------
create policy listing_images_public_read on public.listing_images
  for select using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.status = 'published'));
create policy listing_images_agent_own on public.listing_images
  for all using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.agent_id = auth.uid()))
  with check (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.agent_id = auth.uid()));
create policy listing_images_admin_all on public.listing_images
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- listing_imports (admin only) ------------------------------------------
create policy listing_imports_admin_all on public.listing_imports
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- posts -----------------------------------------------------------------
create policy posts_public_read on public.posts
  for select using (status = 'published');
create policy posts_editor_all on public.posts
  for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

-- ---- jobs ------------------------------------------------------------------
create policy jobs_public_read on public.jobs
  for select using (status = 'published');
create policy jobs_editor_all on public.jobs
  for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

-- ---- job_applications ------------------------------------------------------
-- Anyone (incl. anon) may apply; only editors/admins may read.
create policy job_applications_public_insert on public.job_applications
  for insert with check (true);
create policy job_applications_staff_read on public.job_applications
  for select using (public.is_editor_or_admin());

-- ---- leads -----------------------------------------------------------------
-- Anyone (incl. anon) may submit a lead form.
create policy leads_public_insert on public.leads
  for insert with check (true);
-- Admins see everything; agents see leads on their own listings.
create policy leads_admin_read on public.leads
  for select using (public.is_admin());
create policy leads_agent_read_own on public.leads
  for select using (exists (
    select 1 from public.listings l
    where l.id = listing_id and l.agent_id = auth.uid()));
create policy leads_admin_update on public.leads
  for update using (public.is_admin()) with check (public.is_admin());
