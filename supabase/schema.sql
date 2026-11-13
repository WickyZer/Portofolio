-- Portfolio CMS. Apply to the dedicated Portofolio project only.
-- Add the owner's verified email to portfolio_admins in Supabase SQL Editor.
create table public.portfolio_admins (
  email text primary key check (email = lower(email))
);
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
create policy "Admins can verify their membership" on public.portfolio_admins
for select to authenticated using (email = lower((select auth.jwt()->>'email')) and (select auth.uid()) is not null);

create table public.portfolio_certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 180),
  issuer text not null check (char_length(issuer) between 2 and 180),
  issued_on date,
  description text not null default '' check (char_length(description) <= 2000),
  image_url text not null check (image_url ~ '^https://'),
  credential_url text check (credential_url is null or credential_url ~ '^https://'),
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.portfolio_certificates enable row level security;
grant select on public.portfolio_certificates to anon, authenticated;
grant insert, update, delete on public.portfolio_certificates to authenticated;
create policy "Visitors read published certificates" on public.portfolio_certificates
for select to anon, authenticated using (published = true);
create policy "Owner manages certificates" on public.portfolio_certificates
for all to authenticated
using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create index portfolio_certificates_published_date on public.portfolio_certificates (issued_on desc) where published = true;

create table public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  email text not null check (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  message text not null check (char_length(trim(message)) between 10 and 3000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.portfolio_messages enable row level security;
revoke all on public.portfolio_messages from anon, authenticated;
grant insert (name, email, message) on public.portfolio_messages to anon, authenticated;
grant select, update, delete on public.portfolio_messages to authenticated;
create policy "Visitors leave a message" on public.portfolio_messages
for insert to anon, authenticated with check (is_read = false);
create policy "Owner reads messages" on public.portfolio_messages
for select to authenticated using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create policy "Owner marks messages read" on public.portfolio_messages
for update to authenticated
using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create policy "Owner deletes messages" on public.portfolio_messages
for delete to authenticated using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-public','portfolio-public',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy "Owner uploads portfolio media" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio-public' and exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create policy "Owner reads portfolio media" on storage.objects
for select to authenticated using (bucket_id = 'portfolio-public' and exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create policy "Owner updates portfolio media" on storage.objects
for update to authenticated
using (bucket_id = 'portfolio-public' and exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (bucket_id = 'portfolio-public' and exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create policy "Owner deletes portfolio media" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio-public' and exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
