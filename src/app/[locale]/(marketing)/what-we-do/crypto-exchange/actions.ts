'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';

export type CryptoField = 'name' | 'email';

export interface CryptoEnquiryState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<CryptoField, 'required' | 'email'>>;
  formError?: 'save' | 'kyc';
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function submitCryptoEnquiry(
  _prev: CryptoEnquiryState,
  formData: FormData,
): Promise<CryptoEnquiryState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');
  const kyc = formData.get('kyc') === 'on';

  const errors: CryptoEnquiryState['errors'] = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  if (Object.keys(errors).length > 0) return { status: 'error', errors };
  if (!kyc) return { status: 'error', formError: 'kyc' };

  if (honeypot) return { status: 'success' };

  const payload = {
    asset: String(formData.get('asset') ?? ''),
    amount: Number(formData.get('amount') ?? 0),
    receiveMethod: String(formData.get('receiveMethod') ?? ''),
    indicativeAed: Number(formData.get('indicativeAed') ?? 0),
  };

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      type: 'crypto-enquiry',
      name,
      email,
      phone: phone || null,
      payload,
      source_page: '/what-we-do/crypto-exchange',
    });
    if (error) throw error;
  } catch (err) {
    console.error('Crypto enquiry insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    const aed = (n: number) => `AED ${new Intl.NumberFormat('en').format(Math.round(n))}`;
    await notifyTeam({
      subject: `Crypto enquiry — ${payload.asset}`,
      htmlContent: `
        <p>New crypto exchange enquiry (indicative only).</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
          <li><strong>Give:</strong> ${escapeHtml(String(payload.amount))} ${escapeHtml(payload.asset)}</li>
          <li><strong>Receive via:</strong> ${escapeHtml(payload.receiveMethod)}</li>
          <li><strong>Indicative value:</strong> ${aed(payload.indicativeAed)}</li>
        </ul>`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Crypto enquiry email failed:', err);
  }

  return { status: 'success' };
}
