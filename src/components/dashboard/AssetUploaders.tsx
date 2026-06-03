'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { addGalleryImage, addDownload } from '@/app/[locale]/(app)/dashboard/content/actions';
import { INITIAL_ACTION_STATE } from '@/lib/admin-types';

function Submit({ label, busy }: { label: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-ghost" disabled={pending}>
      {pending ? busy : label}
    </button>
  );
}

export function GalleryUploader({ postId }: { postId: string }) {
  const [state, action] = useFormState(addGalleryImage.bind(null, postId), INITIAL_ACTION_STATE);
  return (
    <form action={action} className="asset-uploader">
      <input type="file" name="file" accept="image/*" className="file-input" />
      <div className="form-actions">
        <Submit label="Add image" busy="Uploading…" />
        {state.ok && <span className="form-hint">Added.</span>}
        {state.error && <span className="form-err">{state.error}</span>}
      </div>
    </form>
  );
}

export function DownloadUploader({ postId }: { postId: string }) {
  const [state, action] = useFormState(addDownload.bind(null, postId), INITIAL_ACTION_STATE);
  return (
    <form action={action} className="asset-uploader">
      <input name="label" type="text" placeholder="Label (e.g. Market Report 2026)" />
      <input type="file" name="file" accept=".pdf,.doc,.docx" className="file-input" />
      <div className="form-actions">
        <Submit label="Add download" busy="Uploading…" />
        {state.ok && <span className="form-hint">Added.</span>}
        {state.error && <span className="form-err">{state.error}</span>}
      </div>
    </form>
  );
}
