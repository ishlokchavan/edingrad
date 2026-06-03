-- ============================================================================
-- Edingrad — sample content (CMS). Idempotent; safe to re-run.
-- Bodies are Markdown (GFM). Cover/gallery images and the download are inline
-- data-URIs for a self-contained demo; real media is uploaded via the admin.
-- ============================================================================

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('press', 'edingrad-opens-dubai-advisory-desk', 'Edingrad opens its Dubai advisory desk', 'We have opened a dedicated advisory desk in Dubai to serve asset managers and private clients directly.',
 $md$Edingrad has opened a dedicated advisory desk in Dubai.

The desk serves asset managers and private clients who want real estate read as an asset class — underwritten, not sold.

## What the desk does

- Local execution paired with institutional diligence
- Direct, one-to-one counsel for private clients
- Acquisition, hold and exit advice for managers

Enquiries are open from today.$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%230f62fe%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3EPRESS%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '3 days', array['firm','dubai'])
on conflict (slug) do nothing;

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('press', 'edingrad-2026-market-stance', 'Our 2026 market stance, in one line', 'Where the asymmetry favours the patient holder, we are buyers. The note explains where, and why.',
 $md$Our stance for 2026 is simple: **where the asymmetry favours the patient holder, we are buyers.**

## Where we see value

- Segments where the downside is already priced in
- Communities with resilient rental demand
- Off-plan with credible developers and honest timelines

The note leads with the call and shows the method.$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%230f62fe%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3EPRESS%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '10 days', array['markets'])
on conflict (slug) do nothing;

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('insight', 'when-the-downside-is-no-longer-priced-in', 'When the downside is no longer priced in', 'A position is a decision about price, not about the building. Here is how we judge when to reduce.',
 $md$A position is a decision about price, not about the building.

When the market stops paying you to hold the risk, the case for holding weakens — regardless of how good the asset is.

## How we judge a reduction

- The downside is no longer compensated
- A better risk-adjusted use of the capital exists
- Liquidity is available without forcing the price

The discipline is in acting on the finding, not admiring it.$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%23002d9c%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3EINSIGHTS%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '5 days', array['strategy'])
on conflict (slug) do nothing;

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('insight', 'reading-absorption-not-asking-prices', 'Read absorption, not asking prices', 'Asking prices flatter. Absorption tells you what the market will actually pay, and how quickly.',
 $md$Asking prices flatter. **Absorption** tells you what the market will actually pay, and how quickly.

We price launches against comparable take-up and real demand, not aspiration. The result is pricing that holds past the first month.$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%23002d9c%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3EINSIGHTS%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '18 days', array['developers','pricing'])
on conflict (slug) do nothing;

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('resource', 'the-real-cost-of-a-dubai-purchase', 'The real cost of a Dubai purchase', 'Headline price is the start. This reference lays out the fees that decide what you actually pay.',
 $md$Headline price is the start, not the total.

This reference lays out the costs that decide what you actually pay to complete a purchase in Dubai — so there are no surprises at the desk.

## The fees that move the total

| Item | Basis |
| --- | --- |
| DLD transfer of title | 4% of price + AED 580 |
| Mortgage registration | 0.25% of loan + AED 290 |
| Agency fee | 2% of price + 5% VAT |
| Conveyancing | from AED 6,300 |

Download the full reference below.$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%23005d5d%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3ERESOURCES%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '7 days', array['buyers','guide'])
on conflict (slug) do nothing;

insert into public.posts (type, slug, title, excerpt, body, cover_image, status, published_at, tags) values
('resource', 'a-checklist-for-off-plan-diligence', 'A checklist for off-plan diligence', 'Before the brochure: the developer, the timeline, and the price you are really paying.',
 $md$Before you weigh the brochure, weigh three things: the **developer**, the **timeline**, and the **price you are really paying.**

## The checklist

1. Developer track record and delivery history
2. Escrow and payment-plan structure
3. Realistic completion date — and the cost if it slips$md$,
 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%271200%27%20height%3D%27600%27%3E%3Crect%20width%3D%271200%27%20height%3D%27600%27%20fill%3D%27%23005d5d%27%2F%3E%3Ctext%20x%3D%2760%27%20y%3D%27320%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%2786%27%20fill%3D%27%23ffffff%27%3EEdingrad%3C%2Ftext%3E%3Ctext%20x%3D%2764%27%20y%3D%27384%27%20font-family%3D%27sans-serif%27%20font-size%3D%2728%27%20fill%3D%27%23d0e2ff%27%20letter-spacing%3D%274%27%3ERESOURCES%3C%2Ftext%3E%3C%2Fsvg%3E',
 'published', now() - interval '21 days', array['off-plan','guide'])
on conflict (slug) do nothing;

-- Gallery + download for the-real-cost-of-a-dubai-purchase (only if it has no assets yet)
insert into public.post_assets (post_id, kind, url, label, sort_order)
select p.id, v.kind, v.url, v.label, v.sort_order from public.posts p,
  (values
    ('image','data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27800%27%20height%3D%27600%27%3E%3Crect%20width%3D%27800%27%20height%3D%27600%27%20fill%3D%27%23002d9c%27%2F%3E%3Ctext%20x%3D%27400%27%20y%3D%27360%27%20text-anchor%3D%27middle%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%27150%27%20fill%3D%27%23ffffff%27%3E1%3C%2Ftext%3E%3C%2Fsvg%3E','Community price map',1),
    ('image','data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27800%27%20height%3D%27600%27%3E%3Crect%20width%3D%27800%27%20height%3D%27600%27%20fill%3D%27%23005d5d%27%2F%3E%3Ctext%20x%3D%27400%27%20y%3D%27360%27%20text-anchor%3D%27middle%27%20font-family%3D%27Georgia%2Cserif%27%20font-size%3D%27150%27%20fill%3D%27%23ffffff%27%3E2%3C%2Ftext%3E%3C%2Fsvg%3E','Fee breakdown chart',2)
  ) as v(kind,url,label,sort_order)
where p.slug='the-real-cost-of-a-dubai-purchase'
  and not exists (select 1 from public.post_assets a where a.post_id=p.id);

insert into public.post_assets (post_id, kind, url, label, mime_type, size_bytes, sort_order)
select p.id,'download','data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9NZWRpYUJveFswIDAgMzAwIDE0NF0vQ29udGVudHMgNCAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDUgMCBSPj4+Pj4+ZW5kb2JqCjQgMCBvYmo8PC9MZW5ndGggNTI+PnN0cmVhbQpCVCAvRjEgMTYgVGYgMjQgODAgVGQgKEVkaW5ncmFkIHNhbXBsZSByZXBvcnQpIFRqIEVUCmVuZHN0cmVhbSBlbmRvYmoKNSAwIG9iajw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYT4+ZW5kb2JqCnRyYWlsZXI8PC9Sb290IDEgMCBSPj4KJSVFT0Y=','Dubai Purchase Cost Reference 2026','application/pdf',398,1
from public.posts p where p.slug='the-real-cost-of-a-dubai-purchase'
  and not exists (select 1 from public.post_assets a where a.post_id=p.id and a.kind='download');
