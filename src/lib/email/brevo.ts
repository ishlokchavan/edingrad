import 'server-only';

import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '@/lib/env';

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
}

let transporter: Transporter | null = null;

/** Lazily build the Brevo SMTP-relay transport (reused within a warm instance). */
function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // STARTTLS upgrade on 587
      auth: {
        user: env.brevoSmtpUser(),
        pass: env.brevoSmtpKey(),
      },
    });
  }
  return transporter;
}

function toAddress({ email, name }: EmailAddress) {
  return name ? { address: email, name } : email;
}

/**
 * Send a transactional email via Brevo's SMTP relay. Server-only. Throws on
 * failure so callers can decide whether a failed notification should fail the
 * request (usually it should not — log and continue).
 */
export async function sendTransactionalEmail(input: SendEmailParams): Promise<{ messageId: string }> {
  const info = await getTransporter().sendMail({
    from: { address: env.brevoFromEmail(), name: env.brevoFromName() },
    to: input.to.map(toAddress),
    replyTo: input.replyTo ? toAddress(input.replyTo) : undefined,
    subject: input.subject,
    html: input.htmlContent,
    text: input.textContent,
  });
  return { messageId: info.messageId };
}

/**
 * Notify the team inbox — used for new leads and job applications. Reply-to is
 * set to the enquirer when available so the team can respond directly.
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
