create table public.portfolio_settings (
 id integer primary key check (id = 1),
 config jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.portfolio_settings enable row level security;
grant select on public.portfolio_settings to anon, authenticated;
grant update on public.portfolio_settings to authenticated;
create policy "Visitors read portfolio content" on public.portfolio_settings for select to anon, authenticated using (true);
create policy "Owner edits portfolio content" on public.portfolio_settings for update to authenticated
using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));

create table public.portfolio_projects (
 id text primary key default gen_random_uuid()::text,
 title text not null check (char_length(title) between 2 and 180),
 category text not null check (category in ('Web','Creative','Akademik')),
 subtitle text not null default '',
 description text not null default '',
 status text not null default 'Dalam pengembangan',
 tags text[] not null default '{}',
 live text check (live is null or live = '' or live ~ '^https://'),
 repo text check (repo is null or repo = '' or repo ~ '^https://'),
 accent text not null default 'violet',
 problem text not null default '',
 process text not null default '',
 learning text not null default '',
 cover_url text check (cover_url is null or cover_url = '' or cover_url ~ '^https://'),
 published boolean not null default true,
 position integer not null default 0,
 created_at timestamptz not null default now()
);
alter table public.portfolio_projects enable row level security;
grant select on public.portfolio_projects to anon, authenticated;
grant insert, update, delete on public.portfolio_projects to authenticated;
create policy "Visitors read published projects" on public.portfolio_projects for select to anon, authenticated using (published = true);
create policy "Owner manages projects" on public.portfolio_projects for all to authenticated
using (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))))
with check (exists (select 1 from public.portfolio_admins where email = lower((select auth.jwt()->>'email'))));
create index portfolio_projects_published_position on public.portfolio_projects (position) where published = true;
update storage.buckets set allowed_mime_types = array['image/jpeg','image/png','image/webp','application/pdf'] where id = 'portfolio-public';
