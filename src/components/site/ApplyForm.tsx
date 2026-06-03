'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import {
  submitApplication,
  type ApplyState,
  type ApplyField,
} from '@/app/[locale]/(marketing)/who-we-are/careers/actions';

const initial: ApplyState = { status: 'idle' };

function SubmitButton() {
  const t = useTranslations('careers.form');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

export function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const t = useTranslations('careers.form');
  const action = submitApplication.bind(null, jobId, jobTitle);
  const [state, formAction] = useFormState(action, initial);

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status">
        <h3>{t('successTitle')}</h3>
        <p>{t('successBody')}</p>
      </div>
    );
  }

  const err = (f: ApplyField) => {
    const code = state.errors?.[f];
    return code ? t(`errors.${f}.${code}`) : null;
  };

  return (
    <form action={formAction} className="lead-form" noValidate>
      <div className="form-field">
        <label htmlFor="ap-name">{t('name')}</label>
        <input id="ap-name" name="name" type="text" autoComplete="name" />
        {err('name') && <span className="form-err">{err('name')}</span>}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="ap-email">{t('email')}</label>
          <input id="ap-email" name="email" type="email" autoComplete="email" />
          {err('email') && <span className="form-err">{err('email')}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="ap-phone">{t('phone')}</label>
          <input id="ap-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="ap-cv">{t('cv')}</label>
        <input id="ap-cv" name="cv_url" type="url" placeholder="https://…" />
      </div>
      <div className="form-field">
        <label htmlFor="ap-msg">{t('message')}</label>
        <textarea id="ap-msg" name="message" rows={4} />
      </div>
      <div className="form-hp" aria-hidden="true">
        <label htmlFor="ap-company">Company</label>
        <input id="ap-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-actions">
        <SubmitButton />
        {state.formError && <span className="form-error">{t(`errors.${state.formError}`)}</span>}
      </div>
    </form>
  );
}
