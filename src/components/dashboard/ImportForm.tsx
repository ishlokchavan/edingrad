'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { importListings, type ImportState } from '@/app/[locale]/(app)/dashboard/listings/import-actions';

const initial: ImportState = { status: 'idle' };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? 'Importing…' : 'Import CSV'}
    </button>
  );
}

export function ImportForm() {
  const [state, action] = useFormState(importListings, initial);
  return (
    <form action={action} className="lead-form" style={{ maxWidth: 560 }}>
      <div className="form-field">
        <label htmlFor="imp-file">CSV file</label>
        <input id="imp-file" name="file" type="file" accept=".csv,text/csv" className="file-input" />
        <span className="form-hint">
          Columns: title, category, transaction_type (required), then price, bedrooms, bathrooms,
          size_sqft, community, developer, completion_status, rera_permit_number, description,
          amenities (pipe-separated), slug. Imported as drafts.
        </span>
      </div>
      <div className="form-actions">
        <Submit />
        {state.status === 'error' && <span className="form-error">{state.message}</span>}
      </div>
      {state.status === 'done' && (
        <div className="import-result">
          <p className="form-hint">Imported {state.imported}, skipped {state.skipped}.</p>
          {state.errors && state.errors.length > 0 && (
            <ul className="import-errors">
              {state.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
