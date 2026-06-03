'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createPost } from '@/app/[locale]/(app)/dashboard/content/actions';
import { INITIAL_ACTION_STATE, POST_TYPES } from '@/lib/admin-types';

const TYPE_LABELS: Record<string, string> = {
  press: 'Press',
  insight: 'Insight',
  resource: 'Resource',
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? 'Creating…' : 'Create draft'}
    </button>
  );
}

export function NewPostForm() {
  const [state, action] = useFormState(createPost, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form" style={{ maxWidth: 560 }}>
      <div className="form-field">
        <label htmlFor="np-type">Type</label>
        <select id="np-type" name="type" defaultValue="insight">
          {POST_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="np-title">Title</label>
        <input id="np-title" name="title" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="np-slug">Slug (optional — generated from title)</label>
        <input id="np-slug" name="slug" type="text" placeholder="auto" />
      </div>
      <div className="form-actions">
        <Submit />
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}
