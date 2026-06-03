/** Shared types/constants for the lead form — safe to import from both the
 *  server action and the client form (no server-only code here). */

export const LEAD_AUDIENCES = ['developer', 'asset-management', 'private-wealth'] as const;
export type LeadAudience = (typeof LEAD_AUDIENCES)[number];

export type LeadField = 'name' | 'email' | 'phone' | 'message';

/** Per-field validation codes; the form maps these to localised messages. */
export type LeadFieldError = 'required' | 'email';

export interface LeadFormState {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<LeadField, LeadFieldError>>;
  /** Form-level failure code (not field-specific). */
  formError?: 'check' | 'save';
}

export const INITIAL_LEAD_STATE: LeadFormState = { status: 'idle' };
