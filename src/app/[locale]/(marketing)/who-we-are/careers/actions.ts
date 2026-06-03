'use server';

import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { notifyTeam } from '@/lib/email/brevo';

export type ApplyField = 'name' | 'email' | 'cv' | 'coverLetter';
type FieldCode = 'required' | 'email' | 'size' | 'type';

export interface ApplyState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<ApplyField, FieldCode>>;
  formError?: 'save';
}

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function escapeHtml(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
}

/** Validate a required/optional uploaded file, returning an error code or null. */
function checkFile(file: File | null, required: boolean): FieldCode | null {
  if (!file || file.size === 0) return required ? 'required' : null;
  if (file.size > MAX_BYTES) return 'size';
  if (!ALLOWED.has(file.type)) return 'type';
  return null;
}

/** Handle a job application: upload CV + optional cover letter to the private
 *  `applications` bucket (service role), store paths, notify the team. */
export async function submitApplication(
  jobId: string,
  jobTitle: string,
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '');
  const cv = formData.get('cv') as File | null;
  const coverLetter = formData.get('cover_letter') as File | null;

  const errors: ApplyState['errors'] = {};
  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!isEmail(email)) errors.email = 'email';
  const cvErr = checkFile(cv, true);
  if (cvErr) errors.cv = cvErr;
  const clErr = checkFile(coverLetter, false);
  if (clErr) errors.coverLetter = clErr;
  if (Object.keys(errors).length > 0) return { status: 'error', errors };

  if (honeypot) return { status: 'success' };

  const supabase = createSupabaseAdminClient();

  async function upload(file: File, kind: string): Promise<string> {
    const path = `${jobId}/${crypto.randomUUID()}-${kind}-${safeName(file.name)}`;
    const { error } = await supabase.storage
      .from('applications')
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    return path;
  }

  let cvPath: string;
  let coverPath: string | null = null;
  try {
    cvPath = await upload(cv as File, 'cv');
    if (coverLetter && coverLetter.size > 0) coverPath = await upload(coverLetter, 'cover');

    const { error } = await supabase.from('job_applications').insert({
      job_id: jobId,
      name,
      email,
      phone: phone || null,
      cv_url: cvPath,
      cover_letter_url: coverPath,
      message: message || null,
    });
    if (error) throw error;
  } catch (err) {
    console.error('Job application failed:', err);
    return { status: 'error', formError: 'save' };
  }

  // Signed links (7 days) so the team can download from the email.
  try {
    const paths = [cvPath, coverPath].filter(Boolean) as string[];
    const { data: signed } = await supabase.storage
      .from('applications')
      .createSignedUrls(paths, 60 * 60 * 24 * 7);
    const linkFor = (p: string) => signed?.find((s) => s.path === p)?.signedUrl;
    const cvLink = linkFor(cvPath);
    const coverLink = coverPath ? linkFor(coverPath) : undefined;

    await notifyTeam({
      subject: `Application: ${jobTitle}`,
      htmlContent: `
        <p>New application for <strong>${escapeHtml(jobTitle)}</strong>.</p>
        <ul>
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(phone || 'n/a')}</li>
          <li><strong>CV:</strong> ${cvLink ? `<a href="${cvLink}">Download</a>` : 'n/a'}</li>
          <li><strong>Cover letter:</strong> ${coverLink ? `<a href="${coverLink}">Download</a>` : 'n/a'}</li>
        </ul>
        ${message ? `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` : ''}`,
      replyTo: { email, name },
    });
  } catch (err) {
    console.error('Application notification email failed:', err);
  }

  return { status: 'success' };
}
