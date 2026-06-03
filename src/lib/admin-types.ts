/** Shared form-state types for admin authoring (server actions + client forms). */
export interface ActionState {
  ok?: boolean;
  error?: string;
}

export const INITIAL_ACTION_STATE: ActionState = {};

export const POST_TYPES = ['press', 'insight', 'resource'] as const;
export type PostTypeValue = (typeof POST_TYPES)[number];
