import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface AdminListingRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  transaction_type: string;
  status: string;
  price: number | null;
  currency: string;
  updated_at: string;
}

/** Listings for the dashboard. Admins see all; agents see only their own. */
export async function listAdminListings(allOwners: boolean, userId: string): Promise<AdminListingRow[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from('listings')
    .select('id,slug,title,category,transaction_type,status,price,currency,updated_at');
  if (!allOwners) query = query.eq('agent_id', userId);
  const { data, error } = await query.order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export interface AdminListing extends AdminListingRow {
  agent_id: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size_sqft: number | null;
  community: string | null;
  developer: string | null;
  completion_status: string | null;
  rera_permit_number: string | null;
  dld_permit: string | null;
  description: string | null;
  amenities: string[];
  featured: boolean;
}

export async function getListingById(id: string): Promise<AdminListing | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('listings')
    .select('id,slug,title,category,transaction_type,status,price,currency,updated_at,agent_id,bedrooms,bathrooms,size_sqft,community,developer,completion_status,rera_permit_number,dld_permit,description,amenities,featured')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export interface AdminListingImage {
  id: string;
  url: string;
  alt: string | null;
  is_cover: boolean;
  sort_order: number;
}

export async function listListingImages(listingId: string): Promise<AdminListingImage[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('listing_images')
    .select('id,url,alt,is_cover,sort_order')
    .eq('listing_id', listingId)
    .order('is_cover', { ascending: false })
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
