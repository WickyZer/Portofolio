-- Applied to the dedicated Portofolio project. Existing RLS is unchanged.
alter table public.portfolio_projects drop constraint portfolio_projects_category_check;
alter table public.portfolio_projects add constraint portfolio_projects_category_check
check (category in ('Web','Creative','Akademik','Engineering'));
-- Stories, translations, and education/tool publication flags live in portfolio_settings.config.
