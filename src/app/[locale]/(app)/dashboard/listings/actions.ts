'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import type { ActionState } from '@/lib/admin-types';

const CATEGORIES = ['residential', 'commercial', 'offplan'] as const;
const TRANSACTIONS = ['sale', 'rent'] as const;
type Category = (typeof CATEGORIES)[number];
type Transaction = (typeof TRANSACTIONS)[number];

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}
function numOrNull(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? '').trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export async function createListing(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const profile = await requireRole(['admin', 'agent']);
  const title = String(formData.get('title') ?? '').trim();
  const category = String(formData.get('category') ?? '') as Category;
  const transaction = String(formData.get('transaction_type') ?? '') as Transaction;
  const slug = String(formData.get('slug') ?? '').trim() || slugify(title);

  if (!title) return { error: 'A title is required.' };
  if (!CATEGORIES.includes(category)) return { error: 'Choose a category.' };
  if (!TRANSACTIONS.includes(transaction)) return { error: 'Choose sale or rent.' };

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('listings')
    .insert({ agent_id: profile.userId, title, slug, category, transaction_type: transaction, status: 'draft' })
    .select('id')
    .single();
  if (error) return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  redirect(`/dashboard/listings/${data.id}`);
}

export async function updateListing(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'agent']);
  const id = String(formData.get('id') ?? '');
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  if (!id) return { error: 'Missing id.' };
  if (!title || !slug) return { error: 'Title and slug are required.' };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('listings')
    .update({
      title,
      slug,
      category: String(formData.get('category') ?? '') as Category,
      transaction_type: String(formData.get('transaction_type') ?? '') as Transaction,
      price: numOrNull(formData.get('price')),
      currency: String(formData.get('currency') ?? 'AED').trim() || 'AED',
      bedrooms: numOrNull(formData.get('bedrooms')),
      bathrooms: numOrNull(formData.get('bathrooms')),
      size_sqft: numOrNull(formData.get('size_sqft')),
      community: String(formData.get('community') ?? '').trim() || null,
      developer: String(formData.get('developer') ?? '').trim() || null,
      completion_status: String(formData.get('completion_status') ?? '').trim() || null,
      rera_permit_number: String(formData.get('rera_permit_number') ?? '').trim() || null,
      dld_permit: String(formData.get('dld_permit') ?? '').trim() || null,
      description: String(formData.get('description') ?? '') || null,
      amenities: String(formData.get('amenities') ?? '')
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      featured: formData.get('featured') === 'on',
    })
    .eq('id', id);
  if (error) return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  revalidatePath('/dashboard/listings');
  return { ok: true };
}

export async function setListingStatus(id: string, status: 'draft' | 'published') {
  await requireRole(['admin', 'agent']);
  await createSupabaseServerClient().from('listings').update({ status }).eq('id', id);
  revalidatePath('/dashboard/listings');
  redirect(`/dashboard/listings/${id}`);
}

export async function deleteListing(id: string) {
  await requireRole(['admin', 'agent']);
  await createSupabaseServerClient().from('listings').delete().eq('id', id);
  revalidatePath('/dashboard/listings');
  redirect('/dashboard/listings');
}

export async function addListingImage(listingId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'agent']);
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) return { error: 'Choose an image.' };
  if (!file.type.startsWith('image/')) return { error: 'That file is not an image.' };
  if (file.size > 12 * 1024 * 1024) return { error: 'Image is too large (12MB max).' };

  try {
    const admin = createSupabaseAdminClient();
    const name = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60);
    const path = `listings/${listingId}/${crypto.randomUUID()}-${name}`;
    const { error: upErr } = await admin.storage.from('media').upload(path, file, { contentType: file.type });
    if (upErr) throw upErr;
    const url = admin.storage.from('media').getPublicUrl(path).data.publicUrl;

    const supabase = createSupabaseServerClient();
    const { count } = await supabase
      .from('listing_images')
      .select('id', { count: 'exact', head: true })
      .eq('listing_id', listingId);
    const { error } = await supabase.from('listing_images').insert({
      listing_id: listingId,
      url,
      is_cover: (count ?? 0) === 0, // first image becomes the cover
      sort_order: count ?? 0,
    });
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed.' };
  }
  revalidatePath('/dashboard/listings');
  return { ok: true };
}

export async function setListingCover(imageId: string, listingId: string) {
  await requireRole(['admin', 'agent']);
  const supabase = createSupabaseServerClient();
  await supabase.from('listing_images').update({ is_cover: false }).eq('listing_id', listingId);
  await supabase.from('listing_images').update({ is_cover: true }).eq('id', imageId);
  revalidatePath('/dashboard/listings');
  redirect(`/dashboard/listings/${listingId}`);
}

export async function removeListingImage(imageId: string, listingId: string) {
  await requireRole(['admin', 'agent']);
  const supabase = createSupabaseServerClient();
  const { data: img } = await supabase.from('listing_images').select('url').eq('id', imageId).maybeSingle();
  await supabase.from('listing_images').delete().eq('id', imageId);

  const marker = '/object/public/media/';
  const path = img?.url?.includes(marker) ? img.url.slice(img.url.indexOf(marker) + marker.length) : null;
  if (path) await createSupabaseAdminClient().storage.from('media').remove([path]);

  revalidatePath('/dashboard/listings');
  redirect(`/dashboard/listings/${listingId}`);
}
