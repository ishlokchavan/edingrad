-- ============================================================================
-- Edingrad — security hardening (addresses Supabase database-linter advisories)
-- ============================================================================

-- Pin search_path on functions that lacked it (advisor 0011,
-- function_search_path_mutable). user_role/handle_new_user already set it.
alter function public.set_updated_at() set search_path = '';
alter function public.is_admin() set search_path = '';
alter function public.is_editor_or_admin() set search_path = '';

-- handle_new_user is only ever invoked by the auth.users trigger; it must not
-- be callable as a PostgREST RPC. Revoking EXECUTE does not affect trigger
-- execution (Postgres does not check EXECUTE when firing a trigger).
-- (advisors 0028/0029, *_security_definer_function_executable)
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Known, intentional, and left as-is:
--   * leads_public_insert / job_applications_public_insert use WITH CHECK (true)
--     (advisor 0024). This is by design — anonymous visitors must be able to
--     submit the contact form and job applications. Reads remain locked down.
--   * public.user_role / is_admin / is_editor_or_admin are SECURITY DEFINER and
--     remain executable by anon/authenticated because the RLS policies call them
--     during query evaluation. A later pass can move them to a non-exposed
--     schema to drop the PostgREST RPC surface.
