'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import {
  submitListingEnquiry,
  type EnquiryState,
  type EnquiryField,
} from '@/app/[locale]/(marketing)/properties/actions';

const initial: EnquiryState = { status: 'idle' };

function Submit() {
  const t = useTranslations('properties.enquiry');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('sending') : t('submit')}
    </button>
  );
}

export function EnquiryForm({
  listingId,
  listingTitle,
  slug,
}: {
  listingId: string;
  listingTitle: string;
  slug: string;
}) {
  const t = useTranslations('properties.enquiry');
  const action = submitListingEnquiry.bind(null, listingId, listingTitle, slug);
  const [state, formAction] = useFormState(action, initial);

  if (state.status === 'success') {
    return (
      <div className="form-success" role="status">
        <h3>{t('successTitle')}</h3>
        <p>{t('successBody')}</p>
      </div>
    );
  }

  const err = (f: EnquiryField) => {
    const code = state.errors?.[f];
    return code ? t(`errors.${f}.${code}`) : null;
  };

  return (
    <form action={formAction} className="lead-form" noValidate>
      <div className="form-field">
        <label htmlFor="eq-name">{t('name')}</label>
        <input id="eq-name" name="name" type="text" autoComplete="name" />
        {err('name') && <span className="form-err">{err('name')}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="eq-email">{t('email')}</label>
        <input id="eq-email" name="email" type="email" autoComplete="email" />
        {err('email') && <span className="form-err">{err('email')}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="eq-phone">{t('phone')}</label>
        <input id="eq-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="form-field">
        <label htmlFor="eq-msg">{t('message')}</label>
        <textarea id="eq-msg" name="message" rows={3} />
      </div>
      <div className="form-hp" aria-hidden="true">
        <label htmlFor="eq-company">Company</label>
        <input id="eq-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-actions">
        <Submit />
        {state.formError && <span className="form-error">{t(`errors.${state.formError}`)}</span>}
      </div>
    </form>
  );
}
