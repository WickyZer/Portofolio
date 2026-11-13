-- The project-provided event-trigger helper does not need to be invoked via REST.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
