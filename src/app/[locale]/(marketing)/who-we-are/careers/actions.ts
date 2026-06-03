'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';

export type ApplyField = 'name' | 'email';

export interface ApplyState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<ApplyField, 'required' | 'email'>>;
  formError?: 'save';
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Handle a job application: store in job_applications, notify the team. */
export async function submitApplication(
  jobId: string,
  jobTitle: string,
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const cvUrl = String(formData.get('cv_url') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');

  const errors: ApplyState['errors'] = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  if (honeypot) return { status: 'success' };

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('job_applications').insert({
      job_id: jobId,
      name,
      email,
      phone: phone || null,
      cv_url: cvUrl || null,
      message: message || null,
    });
    if (error) throw error;
  } catch (err) {
    console.error('Job application insert failed:', err);
    return { status: 'error', formError: 'save' };
  }

  try {
    await notifyTeam({
      subject: `Application — ${jobTitle}`,
      htmlContent: `
        <p>New application for <strong>${escapeHtml(jobTitle)}</strong>.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || '—')}</li>
          <li><strong>CV:</strong> ${cvUrl ? `<a href="${escapeHtml(cvUrl)}">${escapeHtml(cvUrl)}</a>` : '—'}</li>
        </ul>
        ${message ? `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ''}`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Application notification email failed:', err);
  }

  return { status: 'success' };
}
