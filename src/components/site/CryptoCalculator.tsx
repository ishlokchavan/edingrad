'use client';

import { useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import type { CryptoAsset, CryptoRates } from '@/lib/crypto';
import {
  submitCryptoEnquiry,
  type CryptoEnquiryState,
  type CryptoField,
} from '@/app/[locale]/(marketing)/what-we-do/crypto-exchange/actions';

const ASSETS: CryptoAsset[] = ['USDT', 'BTC', 'ETH'];
const METHODS = ['cashAed', 'managerCheque', 'sepaEur', 'swiftUsd'] as const;
const initial: CryptoEnquiryState = { status: 'idle' };

function EnquireButton() {
  const t = useTranslations('crypto');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('enquiry.sending') : t('enquiry.submit')}
    </button>
  );
}

export function CryptoCalculator({ data }: { data: CryptoRates }) {
  const t = useTranslations('crypto');
  const locale = useLocale();

  const [asset, setAsset] = useState<CryptoAsset>('USDT');
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState<(typeof METHODS)[number]>('cashAed');

  const { netAed, usd } = useMemo(() => {
    const gross = amount * (data.rates[asset] ?? 0);
    const net = gross * (1 - data.spread);
    return { netAed: net, usd: net / data.aedPerUsd };
  }, [amount, asset, data]);

  const [state, action] = useFormState(submitCryptoEnquiry, initial);
  const nf = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }), [locale]);
  const aed = (n: number) => `AED ${nf.format(n)}`;

  return (
    <div className="calc">
      <div className="calc-inputs">
        <div className="calc-field">
          <div className="calc-field-head">
            <span className="calc-field-label">{t('give')}</span>
          </div>
          <div className="crypto-give">
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, +e.target.value))}
              aria-label={t('amount')}
            />
            <select value={asset} onChange={(e) => setAsset(e.target.value as CryptoAsset)} aria-label={t('asset')}>
              {ASSETS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="calc-field">
          <div className="calc-field-head">
            <span className="calc-field-label">{t('receiveVia')}</span>
          </div>
          <select value={method} onChange={(e) => setMethod(e.target.value as (typeof METHODS)[number])} aria-label={t('receiveVia')}>
            {METHODS.map((m) => (
              <option key={m} value={m}>{t(`methods.${m}`)}</option>
            ))}
          </select>
        </div>
        <p className="calc-hint">
          {t('rateNote', { asset, rate: aed(data.rates[asset] ?? 0), spread: (data.spread * 100).toFixed(1) })}
          {data.stale ? ` · ${t('stale')}` : ''}
        </p>
      </div>

      <div className="calc-results">
        <div className="calc-monthly">
          <span className="calc-monthly-label">{t('youReceive')}</span>
          <span className="calc-monthly-value">{aed(netAed)}</span>
        </div>
        <div className="calc-totals">
          <div>
            <span>{t('approxUsd')}</span>
            <strong>${nf.format(usd)}</strong>
          </div>
          <div>
            <span>{t('rateLabel')}</span>
            <strong>{aed(data.rates[asset] ?? 0)}</strong>
          </div>
        </div>
        <p className="calc-hint" style={{ marginTop: 14 }}>{t('fxNote')}</p>
      </div>

      <div className="calc-lead">
        <h2 className="downloads-h">{t('enquiry.title')}</h2>
        {state.status === 'success' ? (
          <div className="form-success" role="status">
            <h3>{t('enquiry.successTitle')}</h3>
            <p>{t('enquiry.successBody')}</p>
          </div>
        ) : (
          <form action={action} className="lead-form" noValidate>
            <input type="hidden" name="asset" value={asset} />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="receiveMethod" value={t(`methods.${method}`)} />
            <input type="hidden" name="indicativeAed" value={Math.round(netAed)} />
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cx-name">{t('enquiry.name')}</label>
                <input id="cx-name" name="name" type="text" autoComplete="name" />
                {state.errors?.name && <span className="form-err">{t(`enquiry.errors.name.${state.errors.name}`)}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="cx-email">{t('enquiry.email')}</label>
                <input id="cx-email" name="email" type="email" autoComplete="email" />
                {state.errors?.email && <span className="form-err">{t(`enquiry.errors.email.${state.errors.email}`)}</span>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="cx-phone">{t('enquiry.phone')}</label>
              <input id="cx-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <label className="check-field">
              <input type="checkbox" name="kyc" /> {t('enquiry.kyc')}
            </label>
            {state.formError === 'kyc' && <span className="form-err">{t('enquiry.errors.kyc')}</span>}
            <div className="form-hp" aria-hidden="true">
              <label htmlFor="cx-company">Company</label>
              <input id="cx-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-actions">
              <EnquireButton />
              {state.formError === 'save' && <span className="form-error">{t('enquiry.errors.save')}</span>}
            </div>
          </form>
        )}
      </div>

      <p className="calc-disclaimer">{t('disclaimer')}</p>
    </div>
  );
}
