'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';
import type { LeadField, LeadFieldError, LeadFormState } from '@/lib/leads';

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * "Sell instantly" qualification enquiry: validate, store as a lead of
 * `type: 'sell-instantly'`, then notify the team. The property details are
 * folded into the lead's `reason` so the desk has everything in one place.
 */
export async function submitSellInstantly(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const community = String(formData.get('community') ?? '').trim();
  const propertyType = String(formData.get('propertyType') ?? '').trim();
  const askingPrice = String(formData.get('askingPrice') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');

  const errors: Partial<Record<LeadField, LeadFieldError>> = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, formError: 'check' };
  }

  // Silently accept honeypot hits.
  if (honeypot) return { status: 'success' };

  const details = [
    community && `Community / location: ${community}`,
    propertyType && `Property type: ${propertyType}`,
    askingPrice && `Expected price (AED): ${askingPrice}`,
    message && `Notes: ${message}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      type: 'sell-instantly',
      name,
      email,
      phone: phone || null,
      audience: null,
      reason: details || null,
      source_page: '/what-we-do/sell-instantly',
    });
    if (error) throw error;
  } catch (err) {
    console.error('Sell-instantly lead insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    await notifyTeam({
      subject: `Sell-instantly enquiry: ${name}`,
      htmlContent: `
        <p>New "Sell instantly" qualification enquiry from the website.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || 'n/a')}</li>
          <li><strong>Community:</strong> ${escapeHtml(community || 'n/a')}</li>
          <li><strong>Type:</strong> ${escapeHtml(propertyType || 'n/a')}</li>
          <li><strong>Expected price:</strong> ${escapeHtml(askingPrice || 'n/a')}</li>
        </ul>
        ${message ? `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ''}`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Sell-instantly notification email failed:', err);
  }

  return { status: 'success' };
}
