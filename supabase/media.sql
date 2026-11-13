-- Tiny, public portfolio images are kept separate from the public source code.
-- Future admin uploads use the existing Storage bucket and settings URL fields.
create table public.portfolio_media (
 id text primary key check (id in ('hero','profile')),
 content_type text not null check (content_type = 'image/webp'),
 data_base64 text not null check (char_length(data_base64) <= 2097152)
);
alter table public.portfolio_media enable row level security;
grant select on public.portfolio_media to anon, authenticated;
grant insert, update, delete on public.portfolio_media to authenticated;
create policy "Visitors view portfolio photos" on public.portfolio_media
for select to anon, authenticated using (true);
create policy "Owner manages portfolio photos" on public.portfolio_media for all to authenticated
using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
