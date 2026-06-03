import 'server-only';

import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export interface ListingFilters {
  category?: string;
  transaction?: string;
  beds?: number;
  minPrice?: number;
  maxPrice?: number;
  community?: string;
}

export interface ListingSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  transaction_type: string;
  price: number | null;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size_sqft: number | null;
  community: string | null;
  featured: boolean;
  coverUrl: string | null;
}

export interface ListingImage {
  url: string;
  alt: string | null;
}

export interface ListingAgent {
  name: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  rera_brn: string | null;
}

export interface ListingFull extends Omit<ListingSummary, 'coverUrl'> {
  description: string | null;
  developer: string | null;
  completion_status: string | null;
  rera_permit_number: string | null;
  dld_permit: string | null;
  amenities: string[];
  images: ListingImage[];
  agent: ListingAgent | null;
}

/** Published listings matching the filters, with their cover image. */
export async function listListings(f: ListingFilters): Promise<ListingSummary[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from('listings')
    .select('id,slug,title,category,transaction_type,price,currency,bedrooms,bathrooms,size_sqft,community,featured')
    .eq('status', 'published');

  if (f.category) query = query.eq('category', f.category as 'residential' | 'commercial' | 'offplan');
  if (f.transaction) query = query.eq('transaction_type', f.transaction as 'sale' | 'rent');
  if (f.beds) query = query.gte('bedrooms', f.beds);
  if (f.minPrice) query = query.gte('price', f.minPrice);
  if (f.maxPrice) query = query.lte('price', f.maxPrice);
  if (f.community) query = query.ilike('community', `%${f.community}%`);

  const { data: rows, error } = await query
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;

  const listings = rows ?? [];
  const covers = new Map<string, string>();
  if (listings.length > 0) {
    const { data: imgs } = await supabase
      .from('listing_images')
      .select('listing_id,url,is_cover,sort_order')
      .in('listing_id', listings.map((l) => l.id))
      .order('is_cover', { ascending: false })
      .order('sort_order', { ascending: true });
    (imgs ?? []).forEach((im) => {
      if (!covers.has(im.listing_id)) covers.set(im.listing_id, im.url);
    });
  }

  return listings.map((l) => ({ ...l, coverUrl: covers.get(l.id) ?? null }));
}

/** A single published listing with images and the agent card. */
export async function getListing(slug: string): Promise<ListingFull | null> {
  const supabase = createSupabaseServerClient();
  const { data: listing, error } = await supabase
    .from('listings')
    .select('id,slug,title,category,transaction_type,price,currency,bedrooms,bathrooms,size_sqft,community,featured,description,developer,completion_status,rera_permit_number,dld_permit,amenities,agent_id')
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  if (!listing) return null;

  const { data: imgs } = await supabase
    .from('listing_images')
    .select('url,alt,is_cover,sort_order')
    .eq('listing_id', listing.id)
    .order('is_cover', { ascending: false })
    .order('sort_order', { ascending: true });

  // Agent card: read display fields via the service role so it shows regardless
  // of the owner's role/status (e.g. an admin-owned demo listing).
  let agent: ListingAgent | null = null;
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin
    .from('profiles')
    .select('name,photo_url,phone,email,rera_brn')
    .eq('user_id', listing.agent_id)
    .maybeSingle();
  if (profile) agent = profile;

  return {
    ...listing,
    images: (imgs ?? []).map((i) => ({ url: i.url, alt: i.alt })),
    agent,
  };
}

export function formatPrice(
  price: number | null,
  currency: string,
  transaction: string,
  locale: string,
): string {
  if (price == null) return '—';
  const formatted = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(price);
  return transaction === 'rent' ? `${currency} ${formatted}/year` : `${currency} ${formatted}`;
}
