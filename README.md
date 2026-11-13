# Ahmad Fadhil Naufal - Portfolio

Personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Three.js and Motion. The interface follows the approved dark purple liquid glass design, with a cartoon hero, real profile photo, responsive bento sections, and a mobile project carousel.

## Development

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Only the public publishable key belongs in these variables. Database authorization is enforced with RLS. No service-role key is used.

```sh
npm run typecheck
npm run build
npm start
```

The dev wrapper accepts `--port` for preview infrastructure. Fonts, photos and all default project illustrations are served locally. The Three.js scene is dynamically loaded, stops when hidden, and supports reduced motion. The site also offers a motion pause control and a persistent light/dark theme.

## Editing the portfolio

Open `/admin`, or choose **Studio** in the footer.

| Studio section | Editable content |
| --- | --- |
| Profil & kontak | Name, roles, introduction, biography, focus, public email, WhatsApp, GitHub, Instagram, LinkedIn, location, hero photo, profile photo, PDF CV |
| Proyek | Add/edit/delete projects, cover image, category, status, tags, live/source links, case study, display order, published/draft status |
| Sertifikat | Upload certificate image, title, issuer, date, description, credential link, published/draft status |
| Journey & skills | Add/edit/remove timeline entries and tools/skills |
| Kotak pesan | Read incoming contact messages, mark read, delete |

Changes to published content appear on the public site after reloading. Empty optional contact fields are hidden. Files in the public media bucket are public: upload only documents intended for portfolio visitors. Files must be JPG, PNG, WebP or PDF and no larger than 5 MB.

## Administrator access

Sign in through Supabase Auth. New accounts must verify their email. Authentication alone does not grant editing rights: the verified email must also exist in `public.portfolio_admins`. Initial admin assignment awaits the owner's explicit choice and authorization. There is no first-user-admin shortcut or publicly callable activation endpoint.

After the owner explicitly authorizes an email, the project administrator can insert that lower-case email using the Supabase SQL editor. Never grant public INSERT access to `portfolio_admins`. Configure the Supabase Auth Site URL to the production origin and include the production `/admin` URL in allowed redirects when enabling email confirmation or password recovery.

## Database

The dedicated Supabase project is `Portofolio` (`wfaozowenhssldhxtuwc`). Its schema is documented in `supabase/schema.sql`, `supabase/content.sql`, and `supabase/media.sql`; initial public content is in `supabase/seed.sql`. These have already been applied to the connected project. Do not reapply CREATE TABLE scripts to the existing database.

Public visitors can read published portfolio content and leave a contact message. They cannot read messages, private admin membership, or drafts, and cannot edit portfolio content or upload media. Authenticated accounts still need admin membership for editing and inbox access.

## Content accuracy

JASAhub has a supplied live URL. FrRoutine has a supplied repository. MySPACE and FRGAMES are labeled design/concept explorations. Certificate records start empty. No fabricated achievements, clients, experience durations, or credentials are displayed.

The owner explicitly authorized the two supplied photos for display on the website. Optimized WebP bytes are kept in `portfolio_media` and served through `/api/media/hero` and `/api/media/profile`, independently of the public GitHub source. Future admin uploads use the Supabase Storage bucket. Personal image files and the generated short-profile PDF are excluded from the public repository. Upload a full CV through Studio when ready. `scripts/build-cv.py` regenerates that default PDF with Python, ReportLab and DejaVu Sans.

## Deployment

GitHub: `WickyZer/Portofolio`, branch `main`.
Vercel project: `portofolio-fadhil`.
Production: https://portofolio-fadhil-livid.vercel.app

Vercel uses Node.js 24, `npm ci`, and `npm run build`. Set the same two public Supabase variables for Production and Preview. The existing project protection settings are preserved.
