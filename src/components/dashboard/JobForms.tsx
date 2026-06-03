'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createJob, updateJob } from '@/app/[locale]/(app)/dashboard/jobs/actions';
import { INITIAL_ACTION_STATE } from '@/lib/admin-types';
import type { AdminJob } from '@/lib/admin-jobs';

function Submit({ label, busy }: { label: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? busy : label}
    </button>
  );
}

export function NewJobForm() {
  const [state, action] = useFormState(createJob, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form" style={{ maxWidth: 560 }}>
      <div className="form-field">
        <label htmlFor="nj-title">Title</label>
        <input id="nj-title" name="title" type="text" />
      </div>
      <div className="form-field">
        <label htmlFor="nj-slug">Slug (optional)</label>
        <input id="nj-slug" name="slug" type="text" placeholder="auto" />
      </div>
      <div className="form-actions">
        <Submit label="Create draft" busy="Creating…" />
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}

export function JobEditForm({ job }: { job: AdminJob }) {
  const [state, action] = useFormState(updateJob, INITIAL_ACTION_STATE);
  return (
    <form action={action} className="lead-form">
      <input type="hidden" name="id" value={job.id} />
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="je-title">Title</label>
          <input id="je-title" name="title" type="text" defaultValue={job.title} />
        </div>
        <div className="form-field">
          <label htmlFor="je-slug">Slug</label>
          <input id="je-slug" name="slug" type="text" defaultValue={job.slug} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="je-dept">Department</label>
          <input id="je-dept" name="department" type="text" defaultValue={job.department ?? ''} />
        </div>
        <div className="form-field">
          <label htmlFor="je-loc">Location</label>
          <input id="je-loc" name="location" type="text" defaultValue={job.location ?? ''} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="je-type">Employment type</label>
        <input id="je-type" name="employment_type" type="text" defaultValue={job.employment_type ?? ''} placeholder="Full-time" />
      </div>
      <div className="form-field">
        <label htmlFor="je-desc">Description (Markdown)</label>
        <textarea id="je-desc" name="description" rows={14} defaultValue={job.description ?? ''} className="mono" />
      </div>
      <div className="form-actions">
        <Submit label="Save changes" busy="Saving…" />
        {state.ok && <span className="form-hint">Saved.</span>}
        {state.error && <span className="form-error">{state.error}</span>}
      </div>
    </form>
  );
}
