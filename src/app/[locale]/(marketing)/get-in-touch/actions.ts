'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';
import {
  LEAD_AUDIENCES,
  type LeadAudience,
  type LeadField,
  type LeadFieldError,
  type LeadFormState,
} from '@/lib/leads';

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
 * Handle a "Speak to an expert" submission: validate, store in Supabase
 * `leads`, then notify the team via Brevo. Lead capture is primary — a failed
 * notification email does not fail the submission.
 */
export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const audienceRaw = String(formData.get('audience') ?? '');
  const kindRaw = String(formData.get('kind') ?? '');
  const honeypot = String(formData.get('company') ?? ''); // bots fill hidden fields
  const kind = kindRaw === 'request-a-call' ? 'request-a-call' : 'speak-to-expert';

  const errors: Partial<Record<LeadField, LeadFieldError>> = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  if (!message) errors.message = 'required';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, formError: 'check' };
  }

  // Silently accept honeypot hits without storing or emailing.
  if (honeypot) return { status: 'success' };

  const audience: LeadAudience | null = LEAD_AUDIENCES.includes(audienceRaw as LeadAudience)
    ? (audienceRaw as LeadAudience)
    : null;

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      type: kind,
      name,
      email,
      phone: phone || null,
      audience,
      reason: message,
      source_page: '/get-in-touch',
    });
    if (error) throw error;
  } catch (err) {
    console.error('Lead insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    await notifyTeam({
      subject: `New enquiry — ${name}`,
      htmlContent: `
        <p>New "Speak to an expert" enquiry from the website.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
          <li><strong>Audience:</strong> ${escapeHtml(audience ?? '—')}</li>
        </ul>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      replyTo: { email, name },
    });
  } catch (err) {
    // Lead is already captured; log and continue.
    console.error('Lead notification email failed:', err);
  }

  return { status: 'success' };
}
