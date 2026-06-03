'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { parseCsv } from '@/lib/csv';

export interface ImportState {
  status: 'idle' | 'done' | 'error';
  imported?: number;
  skipped?: number;
  errors?: string[];
  message?: string;
}

const CATEGORIES = new Set(['residential', 'commercial', 'offplan']);
const TRANSACTIONS = new Set(['sale', 'rent']);

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}
function numOrNull(v: string | undefined): number | null {
  const n = Number(String(v ?? '').replace(/[, ]/g, ''));
  return v && Number.isFinite(n) ? n : null;
}

/** Bulk-import listings from a CSV (admin only). Header row required; columns:
 *  title,category,transaction_type,price,bedrooms,bathrooms,size_sqft,community,
 *  developer,completion_status,rera_permit_number,description,amenities,slug
 *  (amenities pipe-separated). Imported as drafts owned by the importer. */
export async function importListings(_prev: ImportState, formData: FormData): Promise<ImportState> {
  const profile = await requireRole(['admin']);
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) return { status: 'error', message: 'Choose a CSV file.' };
  if (file.size > 5 * 1024 * 1024) return { status: 'error', message: 'File is too large (5MB max).' };

  const rows = parseCsv(await file.text());
  if (rows.length < 2) return { status: 'error', message: 'The CSV needs a header row and at least one listing.' };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  if (idx('title') === -1 || idx('category') === -1 || idx('transaction_type') === -1) {
    return { status: 'error', message: 'CSV must include at least title, category and transaction_type columns.' };
  }

  const supabase = createSupabaseServerClient();
  const get = (r: string[], name: string) => {
    const i = idx(name);
    return i === -1 ? '' : (r[i] ?? '').trim();
  };

  const errors: string[] = [];
  let imported = 0;
  for (let n = 1; n < rows.length; n++) {
    const r = rows[n];
    const title = get(r, 'title');
    const category = get(r, 'category').toLowerCase();
    const transaction = get(r, 'transaction_type').toLowerCase();
    if (!title) { errors.push(`Row ${n + 1}: missing title`); continue; }
    if (!CATEGORIES.has(category)) { errors.push(`Row ${n + 1}: invalid category "${category}"`); continue; }
    if (!TRANSACTIONS.has(transaction)) { errors.push(`Row ${n + 1}: invalid transaction_type "${transaction}"`); continue; }

    const slug = get(r, 'slug') || `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`;
    const amenities = get(r, 'amenities').split('|').map((a) => a.trim()).filter(Boolean);

    const { error } = await supabase.from('listings').insert({
      agent_id: profile.userId,
      title,
      slug,
      category: category as 'residential' | 'commercial' | 'offplan',
      transaction_type: transaction as 'sale' | 'rent',
      status: 'draft',
      price: numOrNull(get(r, 'price')),
      bedrooms: numOrNull(get(r, 'bedrooms')),
      bathrooms: numOrNull(get(r, 'bathrooms')),
      size_sqft: numOrNull(get(r, 'size_sqft')),
      community: get(r, 'community') || null,
      developer: get(r, 'developer') || null,
      completion_status: get(r, 'completion_status') || null,
      rera_permit_number: get(r, 'rera_permit_number') || null,
      description: get(r, 'description') || null,
      amenities,
    });
    if (error) errors.push(`Row ${n + 1}: ${error.message}`);
    else imported += 1;
  }

  await supabase.from('listing_imports').insert({
    source: file.name,
    status: errors.length > 0 && imported === 0 ? 'failed' : 'completed',
    row_count: imported,
    imported_by: profile.userId,
  });

  revalidatePath('/dashboard/listings');
  return {
    status: 'done',
    imported,
    skipped: rows.length - 1 - imported,
    errors: errors.slice(0, 20),
  };
}
