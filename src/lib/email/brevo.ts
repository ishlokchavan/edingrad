import 'server-only';

import { env } from '@/lib/env';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

interface EmailAddress {
  email: string;
  name?: string;
}

export interface SendEmailParams {
  to: EmailAddress[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: EmailAddress;
  /** Brevo template id, if using a stored template instead of htmlContent. */
  templateId?: number;
  params?: Record<string, unknown>;
}

/**
 * Send a transactional email via the Brevo API. Server-only. Throws on a
 * non-2xx response so callers can decide whether a failed notification should
 * fail the request (usually it should not — log and continue).
 */
export async function sendTransactionalEmail(input: SendEmailParams): Promise<{ messageId?: string }> {
  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': env.brevoApiKey(),
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: env.brevoSenderEmail(), name: env.brevoSenderName() },
      to: input.to,
      subject: input.subject,
      htmlContent: input.htmlContent,
      textContent: input.textContent,
      replyTo: input.replyTo,
      templateId: input.templateId,
      params: input.params,
    }),
    // Never cache email sends.
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Brevo email failed (${response.status}): ${detail}`);
  }

  const data = (await response.json().catch(() => ({}))) as { messageId?: string };
  return data;
}

/**
 * Notify the team inbox — used for new leads and job applications. The caller
 * provides a short subject and the body; reply-to is set to the enquirer when
 * available so the team can respond directly.
 */
export async function notifyTeam(params: {
  subject: string;
  htmlContent: string;
  replyTo?: EmailAddress;
}): Promise<void> {
  await sendTransactionalEmail({
    to: [{ email: env.teamInboxEmail(), name: 'Edingrad' }],
    subject: params.subject,
    htmlContent: params.htmlContent,
    replyTo: params.replyTo,
  });
}
