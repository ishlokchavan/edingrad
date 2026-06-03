'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { signIn, type LoginState } from '@/app/[locale]/login/actions';

const initial: LoginState = {};

function SubmitButton() {
  const t = useTranslations('auth');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('signingIn') : t('signIn')}
    </button>
  );
}

export function LoginForm() {
  const t = useTranslations('auth');
  const [state, formAction] = useFormState(signIn, initial);

  return (
    <form action={formAction} className="lead-form" noValidate>
      <div className="form-field">
        <label htmlFor="lg-email">{t('email')}</label>
        <input id="lg-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="lg-password">{t('password')}</label>
        <input id="lg-password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <div className="form-actions">
        <SubmitButton />
        {state.error && <span className="form-error">{t(`errors.${state.error}`)}</span>}
      </div>
    </form>
  );
}
