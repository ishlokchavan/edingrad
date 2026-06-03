'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updatePost } from '@/app/[locale]/(app)/dashboard/content/actions';
import { INITIAL_ACTION_STATE, POST_TYPES } from '@/lib/admin-types';
import type { AdminPost } from '@/lib/admin-posts';

const TYPE_LABELS: Record<string, string> = { press: 'Press', insight: 'Insight', resource: 'Resource' };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? 'Saving…' : 'Save changes'}
    </button>
  );
}

export function PostEditForm({ post }: { post: AdminPost }) {
  const [state, action] = useFormState(updatePost, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form">
      <input type="hidden" name="id" value={post.id} />
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="pe-type">Type</label>
          <select id="pe-type" name="type" defaultValue={post.type}>
            {POST_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="pe-slug">Slug</label>
          <input id="pe-slug" name="slug" type="text" defaultValue={post.slug} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="pe-title">Title</label>
        <input id="pe-title" name="title" type="text" defaultValue={post.title} />
      </div>
      <div className="form-field">
        <label htmlFor="pe-excerpt">Excerpt</label>
        <textarea id="pe-excerpt" name="excerpt" rows={2} defaultValue={post.excerpt ?? ''} />
      </div>
      <div className="form-field">
        <label htmlFor="pe-body">Body (Markdown)</label>
        <textarea id="pe-body" name="body" rows={14} defaultValue={post.body ?? ''} className="mono" />
      </div>
      <div className="form-field">
        <label htmlFor="pe-tags">Tags (comma-separated)</label>
        <input id="pe-tags" name="tags" type="text" defaultValue={post.tags.join(', ')} />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="pe-seot">SEO title</label>
          <input id="pe-seot" name="seo_title" type="text" defaultValue={post.seo_title ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="pe-seod">SEO description</label>
          <input id="pe-seod" name="seo_description" type="text" defaultValue={post.seo_description ?? ''} />
        </div>
      </div>
      <div className="form-actions">
        <Submit />
        {state.ok && <span className="form-hint">Saved.</span>}
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}
