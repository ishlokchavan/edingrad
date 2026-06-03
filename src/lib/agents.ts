import 'server-only';

import { createSupabasePublicClient } from '@/lib/supabase/server';
import type { ListingSummary } from '@/lib/listings';

export interface AgentProfile {
  user_id: string;
  name: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  languages: string[];
  bio: string | null;
  rera_brn: string | null;
}

/** Active agents, publicly readable via RLS (role=agent, status=active). */
export async function listAgents(): Promise<AgentProfile[]> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id,name,photo_url,phone,email,languages,bio,rera_brn')
      .eq('role', 'agent')
      .eq('status', 'active')
      .order('name', { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getAgent(id: string): Promise<AgentProfile | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id,name,photo_url,phone,email,languages,bio,rera_brn')
    .eq('user_id', id)
    .eq('role', 'agent')
    .eq('status', 'active')
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** An agent's published listings, with cover images. */
export async function listAgentListings(agentId: string): Promise<ListingSummary[]> {
  const supabase = createSupabasePublicClient();
  const { data: rows, error } = await supabase
    .from('listings')
    .select('id,slug,title,category,transaction_type,price,currency,bedrooms,bathrooms,size_sqft,community,featured')
    .eq('agent_id', agentId)
    .eq('status', 'published')
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
