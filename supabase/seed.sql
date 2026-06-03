-- ============================================================================
-- Edingrad — sample content (CMS). Idempotent; safe to re-run.
-- Replace with real content via the admin (Phase 2) when ready.
-- ============================================================================

insert into public.posts (type, slug, title, excerpt, body, status, published_at, tags) values
('press', 'edingrad-opens-dubai-advisory-desk', 'Edingrad opens its Dubai advisory desk',
 'We have opened a dedicated advisory desk in Dubai to serve asset managers and private clients directly.',
 E'Edingrad has opened a dedicated advisory desk in Dubai.\n\nThe desk serves asset managers and private clients who want real estate read as an asset class — underwritten, not sold. It pairs local execution with the same standard of diligence we hold everywhere.\n\nEnquiries are open from today.',
 'published', now() - interval '3 days', array['firm','dubai']),
('press', 'edingrad-2026-market-stance', 'Our 2026 market stance, in one line',
 'Where the asymmetry favours the patient holder, we are buyers. The note explains where, and why.',
 E'Our stance for 2026 is simple: where the asymmetry favours the patient holder, we are buyers.\n\nThis note sets out the segments where we see downside already priced in, and the segments where we do not. It leads with the call and shows the method.',
 'published', now() - interval '10 days', array['markets']),
('insight', 'when-the-downside-is-no-longer-priced-in', 'When the downside is no longer priced in',
 'A position is a decision about price, not about the building. Here is how we judge when to reduce.',
 E'A position is a decision about price, not about the building.\n\nWhen the market stops paying you to hold the risk, the case for holding weakens — regardless of how good the asset is. We reduce when the downside is no longer priced in, and we say so plainly.\n\nThe discipline is in acting on the finding, not admiring it.',
 'published', now() - interval '5 days', array['strategy']),
('insight', 'reading-absorption-not-asking-prices', 'Read absorption, not asking prices',
 'Asking prices flatter. Absorption tells you what the market will actually pay, and how quickly.',
 E'Asking prices flatter. Absorption tells you what the market will actually pay, and how quickly.\n\nWe price launches against comparable take-up and real demand, not aspiration. The result is pricing that holds past the first month.',
 'published', now() - interval '18 days', array['developers','pricing']),
('resource', 'the-real-cost-of-a-dubai-purchase', 'The real cost of a Dubai purchase',
 'Headline price is the start. This reference lays out the fees that decide what you actually pay.',
 E'Headline price is the start, not the total.\n\nThis reference lays out the transfer, registration, agency and conveyancing costs that decide what you actually pay to complete a purchase in Dubai — so there are no surprises at the desk.',
 'published', now() - interval '7 days', array['buyers','guide']),
('resource', 'a-checklist-for-off-plan-diligence', 'A checklist for off-plan diligence',
 'Before the brochure: the developer, the timeline, and the price you are really paying.',
 E'Before you weigh the brochure, weigh three things: the developer, the timeline, and the price you are really paying.\n\nThis checklist walks each one, with the questions we ask on your behalf before recommending an off-plan commitment.',
 'published', now() - interval '21 days', array['off-plan','guide'])
on conflict (slug) do nothing;
