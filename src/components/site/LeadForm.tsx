'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { submitLead } from '@/app/[locale]/(marketing)/get-in-touch/actions';
import { INITIAL_LEAD_STATE, type LeadField, type LeadFieldError } from '@/lib/leads';

function SubmitButton() {
  const t = useTranslations('getInTouch.form');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

export function LeadForm() {
  const t = useTranslations('getInTouch.form');
  const [state, formAction] = useFormState(submitLead, INITIAL_LEAD_STATE);

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status">
        <h3>{t('successTitle')}</h3>
        <p>{t('successBody')}</p>
      </div>
    );
  }

  const fieldError = (field: LeadField) => {
    const code = state.errors?.[field] as LeadFieldError | undefined;
    return code ? t(`errors.${field}.${code}`) : null;
  };

  return (
    <form action={formAction} className="lead-form" noValidate>
      <div className="form-field">
        <label htmlFor="lf-name">{t('name')}</label>
        <input id="lf-name" name="name" type="text" autoComplete="name" placeholder={t('namePh')} />
        {fieldError('name') && <span className="form-err">{fieldError('name')}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="lf-email">{t('email')}</label>
          <input id="lf-email" name="email" type="email" autoComplete="email" placeholder={t('emailPh')} />
          {fieldError('email') && <span className="form-err">{fieldError('email')}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="lf-phone">{t('phone')}</label>
          <input id="lf-phone" name="phone" type="tel" autoComplete="tel" placeholder={t('phonePh')} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="lf-audience">{t('audience')}</label>
        <select id="lf-audience" name="audience" defaultValue="">
          <option value="">{t('audiencePlaceholder')}</option>
          <option value="developer">{t('audienceDeveloper')}</option>
          <option value="asset-management">{t('audienceAsset')}</option>
          <option value="private-wealth">{t('audiencePrivate')}</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="lf-message">{t('message')}</label>
        <textarea id="lf-message" name="message" rows={5} placeholder={t('messagePh')} />
        {fieldError('message') && <span className="form-err">{fieldError('message')}</span>}
      </div>

      <fieldset className="form-radio">
        <legend>{t('kind.label')}</legend>
        <label>
          <input type="radio" name="kind" value="speak-to-expert" defaultChecked /> {t('kind.expert')}
        </label>
        <label>
          <input type="radio" name="kind" value="request-a-call" /> {t('kind.call')}
        </label>
      </fieldset>

      {/* Honeypot — hidden from users, tempting to bots. */}
      <div className="form-hp" aria-hidden="true">
        <label htmlFor="lf-company">Company</label>
        <input id="lf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <SubmitButton />
        {state.formError && <span className="form-error">{t(`errors.${state.formError}`)}</span>}
      </div>
      <p className="form-fine">{t('fine')}</p>
    </form>
  );
}
