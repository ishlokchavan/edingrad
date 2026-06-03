-- Media + downloads attached to posts (gallery images, downloadable PDFs).
create table public.post_assets (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts (id) on delete cascade,
  kind       text not null check (kind in ('image', 'download')),
  url        text not null,
  label      text,
  mime_type  text,
  size_bytes bigint,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index post_assets_post_idx on public.post_assets (post_id, kind, sort_order);

alter table public.post_assets enable row level security;

-- Public can read assets of published posts.
create policy post_assets_public_read on public.post_assets
  for select using (exists (
    select 1 from public.posts p
    where p.id = post_id and p.status = 'published'));

-- Editors and admins manage assets.
create policy post_assets_editor_all on public.post_assets
  for all using (public.is_editor_or_admin()) with check (public.is_editor_or_admin());

-- Public Storage bucket for cover images, gallery media and downloads.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
