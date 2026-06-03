'use client';

import { useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { computeMortgage, minDeposit } from '@/lib/mortgage';
import {
  submitMortgageEnquiry,
  type MortgageLeadState,
  type MortgageField,
} from '@/app/[locale]/(marketing)/what-we-do/mortgage/actions';

const initialLead: MortgageLeadState = { status: 'idle' };

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

function PreApproveButton() {
  const t = useTranslations('mortgage');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? t('lead.sending') : t('lead.submit')}
    </button>
  );
}

export function MortgageCalculator() {
  const t = useTranslations('mortgage');
  const locale = useLocale();

  const [price, setPrice] = useState(2500000);
  const [deposit, setDeposit] = useState(minDeposit(2500000));
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(4.5);

  const minDep = minDeposit(price);
  const result = useMemo(
    () => computeMortgage({ price, deposit, years, rate }),
    [price, deposit, years, rate],
  );

  const [leadState, leadAction] = useFormState(submitMortgageEnquiry, initialLead);

  const nf = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const aed = (n: number) => `AED ${nf.format(Math.round(n))}`;

  function onPrice(v: number) {
    setPrice(v);
    setDeposit((d) => clamp(d, minDeposit(v), v));
  }

  const breakdown: { label: string; value: number }[] = [
    { label: t('costs.dld'), value: result.costs.dldTransfer },
    { label: t('costs.mortgageReg'), value: result.costs.mortgageRegistration },
    { label: t('costs.trustee'), value: result.costs.trustee },
    { label: t('costs.bank'), value: result.costs.bankArrangement },
    { label: t('costs.valuation'), value: result.costs.valuation },
    { label: t('costs.agency'), value: result.costs.agency },
    { label: t('costs.conveyancing'), value: result.costs.conveyancing },
  ].filter((r) => r.value > 0);

  async function downloadPdf() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    let y = 56;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Edingrad', 48, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text(t('pdf.subtitle'), 48, (y += 18));
    doc.setTextColor(20);

    const line = (label: string, value: string, bold = false) => {
      y += 22;
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(11);
      doc.text(label, 48, y);
      doc.text(value, 547, y, { align: 'right' });
    };
    y += 14;
    doc.setDrawColor(220);
    doc.line(48, y, 547, y);
    line(t('inputs.price'), aed(price));
    line(t('inputs.deposit'), aed(deposit));
    line(t('summary.loan'), aed(result.loan));
    line(t('inputs.term'), `${years} ${t('inputs.years')}`);
    line(t('inputs.rate'), `${rate}%`);
    y += 10;
    doc.line(48, y, 547, y);
    line(t('summary.monthly'), aed(result.monthly), true);
    y += 8;
    doc.line(48, y, 547, y);
    doc.setFontSize(12);
    line(t('summary.costsTitle'), '', true);
    breakdown.forEach((b) => line(b.label, aed(b.value)));
    y += 8;
    doc.line(48, y, 547, y);
    line(t('summary.totalCosts'), aed(result.totalCosts), true);
    line(t('summary.totalUpfront'), aed(result.totalUpfront), true);
    y += 30;
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text(doc.splitTextToSize(t('disclaimer'), 499), 48, y);
    doc.save('edingrad-mortgage-illustration.pdf');
  }

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field label={t('inputs.price')} value={aed(price)}>
          <input type="range" min={200000} max={50000000} step={50000} value={price} onChange={(e) => onPrice(+e.target.value)} />
        </Field>
        <Field label={t('inputs.deposit')} value={`${aed(deposit)} · ${Math.round((deposit / price) * 100)}%`}>
          <input type="range" min={minDep} max={price} step={10000} value={deposit} onChange={(e) => setDeposit(+e.target.value)} />
          <span className="calc-hint">{t('inputs.depositHint')}</span>
        </Field>
        <Field label={t('inputs.term')} value={`${years} ${t('inputs.years')}`}>
          <input type="range" min={1} max={25} step={1} value={years} onChange={(e) => setYears(+e.target.value)} />
        </Field>
        <Field label={t('inputs.rate')} value={`${rate.toFixed(1)}%`}>
          <input type="range" min={1} max={10} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} />
        </Field>
      </div>

      <div className="calc-results">
        <div className="calc-monthly">
          <span className="calc-monthly-label">{t('summary.monthly')}</span>
          <span className="calc-monthly-value">{aed(result.monthly)}</span>
        </div>
        <div className="calc-totals">
          <div>
            <span>{t('summary.totalCosts')}</span>
            <strong>{aed(result.totalCosts)}</strong>
          </div>
          <div>
            <span>{t('summary.totalUpfront')}</span>
            <strong>{aed(result.totalUpfront)}</strong>
          </div>
        </div>

        <details className="calc-breakdown">
          <summary>{t('summary.viewCosts')}</summary>
          <table>
            <tbody>
              {breakdown.map((b) => (
                <tr key={b.label}>
                  <td>{b.label}</td>
                  <td>{aed(b.value)}</td>
                </tr>
              ))}
              <tr className="calc-breakdown-total">
                <td>{t('summary.totalCosts')}</td>
                <td>{aed(result.totalCosts)}</td>
              </tr>
            </tbody>
          </table>
        </details>

        <div className="calc-actions">
          <button type="button" className="btn-ghost" onClick={downloadPdf}>
            {t('summary.download')}
          </button>
        </div>
      </div>

      <div className="calc-lead">
        <h2 className="downloads-h">{t('lead.title')}</h2>
        {leadState.status === 'success' ? (
          <div className="form-success" role="status">
            <h3>{t('lead.successTitle')}</h3>
            <p>{t('lead.successBody')}</p>
          </div>
        ) : (
          <form action={leadAction} className="lead-form" noValidate>
            <input type="hidden" name="price" value={price} />
            <input type="hidden" name="deposit" value={deposit} />
            <input type="hidden" name="years" value={years} />
            <input type="hidden" name="rate" value={rate} />
            <input type="hidden" name="monthly" value={Math.round(result.monthly)} />
            <input type="hidden" name="totalUpfront" value={Math.round(result.totalUpfront)} />
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="mc-name">{t('lead.name')}</label>
                <input id="mc-name" name="name" type="text" autoComplete="name" />
                {leadState.errors?.name && <span className="form-err">{t(`lead.errors.name.${leadState.errors.name}`)}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="mc-email">{t('lead.email')}</label>
                <input id="mc-email" name="email" type="email" autoComplete="email" />
                {leadState.errors?.email && <span className="form-err">{t(`lead.errors.email.${leadState.errors.email}`)}</span>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="mc-phone">{t('lead.phone')}</label>
              <input id="mc-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="form-hp" aria-hidden="true">
              <label htmlFor="mc-company">Company</label>
              <input id="mc-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-actions">
              <PreApproveButton />
              {leadState.formError && <span className="form-error">{t('lead.errors.save')}</span>}
            </div>
          </form>
        )}
      </div>

      <p className="calc-disclaimer">{t('disclaimer')}</p>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="calc-field">
      <div className="calc-field-head">
        <span className="calc-field-label">{label}</span>
        <span className="calc-field-value">{value}</span>
      </div>
      {children}
    </div>
  );
}
