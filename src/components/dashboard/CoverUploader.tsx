'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { uploadCover } from '@/app/[locale]/(app)/dashboard/content/actions';
import { INITIAL_ACTION_STATE } from '@/lib/admin-types';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-ghost" disabled={pending}>
      {pending ? 'Uploading…' : 'Upload cover'}
    </button>
  );
}

export function CoverUploader({ id, current }: { id: string; current: string | null }) {
  const [state, action] = useFormState(uploadCover, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="cover-uploader">
      <input type="hidden" name="id" value={id} />
      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={current} alt="" className="cover-preview" />
      )}
      <div className="form-field">
        <input type="file" name="file" accept="image/*" className="file-input" />
        <span className="form-hint">JPG, PNG or SVG, up to 8MB.</span>
      </div>
      <div className="form-actions">
        <Submit />
        {state.ok && <span className="form-hint">Saved.</span>}
        {state.error && <span className="form-err">{state.error}</span>}
      </div>
    </form>
  );
}
