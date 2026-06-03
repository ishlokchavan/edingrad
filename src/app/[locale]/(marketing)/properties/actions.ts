'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';

export type EnquiryField = 'name' | 'email';

export interface EnquiryState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<EnquiryField, 'required' | 'email'>>;
  formError?: 'save';
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** A listing enquiry: store as a lead (type listing-enquiry, linked to the
 *  listing so its agent can see it) and notify the team. */
export async function submitListingEnquiry(
  listingId: string,
  listingTitle: string,
  slug: string,
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');

  const errors: EnquiryState['errors'] = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  if (honeypot) return { status: 'success' };

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      type: 'listing-enquiry',
      name,
      email,
      phone: phone || null,
      reason: message || null,
      listing_id: listingId,
      source_page: `/properties/${slug}`,
    });
    if (error) throw error;
  } catch (err) {
    console.error('Listing enquiry insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    await notifyTeam({
      subject: `Listing enquiry: ${listingTitle}`,
      htmlContent: `
        <p>New enquiry on <strong>${escapeHtml(listingTitle)}</strong>.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || 'n/a')}</li>
        </ul>
        ${message ? `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ''}`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Listing enquiry email failed:', err);
  }

  return { status: 'success' };
}
