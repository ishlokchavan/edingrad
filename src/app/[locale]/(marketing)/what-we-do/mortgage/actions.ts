'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';

export type MortgageField = 'name' | 'email';

export interface MortgageLeadState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<MortgageField, 'required' | 'email'>>;
  formError?: 'save';
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** "Get pre-approved" — capture a mortgage lead with the calculator figures. */
export async function submitMortgageEnquiry(
  _prev: MortgageLeadState,
  formData: FormData,
): Promise<MortgageLeadState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');

  const errors: MortgageLeadState['errors'] = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  if (honeypot) return { status: 'success' };

  const payload = {
    price: Number(formData.get('price') ?? 0),
    deposit: Number(formData.get('deposit') ?? 0),
    years: Number(formData.get('years') ?? 0),
    rate: Number(formData.get('rate') ?? 0),
    monthly: Number(formData.get('monthly') ?? 0),
    totalUpfront: Number(formData.get('totalUpfront') ?? 0),
  };

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('leads').insert({
      type: 'mortgage',
      name,
      email,
      phone: phone || null,
      payload,
      source_page: '/what-we-do/mortgage',
    });
    if (error) throw error;
  } catch (err) {
    console.error('Mortgage lead insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    const fmt = (n: number) => `AED ${new Intl.NumberFormat('en').format(Math.round(n))}`;
    await notifyTeam({
      subject: `Pre-approval enquiry — ${name}`,
      htmlContent: `
        <p>New "Get pre-approved" enquiry from the mortgage calculator.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
          <li><strong>Property price:</strong> ${fmt(payload.price)}</li>
          <li><strong>Deposit:</strong> ${fmt(payload.deposit)}</li>
          <li><strong>Term / rate:</strong> ${payload.years} yr @ ${payload.rate}%</li>
          <li><strong>Est. monthly:</strong> ${fmt(payload.monthly)}</li>
          <li><strong>Est. upfront:</strong> ${fmt(payload.totalUpfront)}</li>
        </ul>`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Mortgage lead email failed:', err);
  }

  return { status: 'success' };
}
