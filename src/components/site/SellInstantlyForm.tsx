'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { submitSellInstantly } from '@/app/[locale]/(marketing)/what-we-do/sell-instantly/actions';
import { INITIAL_LEAD_STATE, type LeadField, type LeadFieldError } from '@/lib/leads';

function SubmitButton() {
  const t = useTranslations('sellInstantly.form');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

export function SellInstantlyForm() {
  const t = useTranslations('sellInstantly.form');
  const [state, formAction] = useFormState(submitSellInstantly, INITIAL_LEAD_STATE);

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
        <label htmlFor="si-name">{t('name')}</label>
        <input id="si-name" name="name" type="text" autoComplete="name" />
        {fieldError('name') && <span className="form-err">{fieldError('name')}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="si-email">{t('email')}</label>
          <input id="si-email" name="email" type="email" autoComplete="email" />
          {fieldError('email') && <span className="form-err">{fieldError('email')}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="si-phone">{t('phone')}</label>
          <input id="si-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="si-community">{t('community')}</label>
          <input id="si-community" name="community" type="text" placeholder={t('communityPh')} />
        </div>
        <div className="form-field">
          <label htmlFor="si-type">{t('propertyType')}</label>
          <select id="si-type" name="propertyType" defaultValue="">
            <option value="">{t('propertyTypePlaceholder')}</option>
            <option value="residential">{t('typeResidential')}</option>
            <option value="commercial">{t('typeCommercial')}</option>
            <option value="off-plan">{t('typeOffplan')}</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="si-price">{t('askingPrice')}</label>
        <input id="si-price" name="askingPrice" type="text" inputMode="numeric" />
      </div>

      <div className="form-field">
        <label htmlFor="si-message">{t('message')}</label>
        <textarea id="si-message" name="message" rows={4} placeholder={t('messagePh')} />
      </div>

      {/* Honeypot — hidden from users, tempting to bots. */}
      <div className="form-hp" aria-hidden="true">
        <label htmlFor="si-company">Company</label>
        <input id="si-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <SubmitButton />
        {state.formError && <span className="form-error">{t(`errors.${state.formError}`)}</span>}
      </div>
      <p className="form-fine">{t('fine')}</p>
    </form>
  );
}
