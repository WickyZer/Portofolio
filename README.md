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

The dev wrapper accepts `--port` for preview infrastructure. Fonts, default raster tool logos and project illustrations are served locally. Authorized personal photos are delivered through the media API. The Three.js scene is dynamically loaded, stops when hidden, and supports reduced motion. The site also offers a motion pause control and a persistent light/dark theme.

## Editing the portfolio

Open `/admin`, or choose **Studio** in the footer.

| Studio section | Editable content |
| --- | --- |
| Profil & kontak | Name, roles, introduction, biography, focus, public email, WhatsApp, GitHub, Instagram, LinkedIn, location, hero photo, profile photo, PDF CV |
| Proyek | Add/edit/delete projects, cover image, category, status, tags, live/source links, case study, display order, published/draft status |
| Sertifikat | Upload certificate image, title, issuer, date, description, credential link, published/draft status |
| Pendidikan | Add SD/SMP/SMK and other levels; school name, years, major, description, uploaded school logo; reorder/remove entries |
| Aplikasi & logo | Edit tool name/category, choose an original raster brand logo, or upload PNG/JPG/WebP; add/remove tools |
| Perjalanan | Add/edit/remove timeline entries |
| Kotak pesan | Read incoming contact messages, mark read, delete |

Use **Simpan perubahan** after editing profile, education, tools or timeline. Education starts empty so school names and years can be supplied accurately. Uploaded logos are public, raster images only (PNG/JPG/WebP); default brand sources are documented in `public/logos/SOURCES.md`.

Changes to published content appear on the public site after reloading. Empty optional contact fields are hidden. Files in the public media bucket are public: upload only documents intended for portfolio visitors. Files must be JPG, PNG, WebP or PDF and no larger than 5 MB.

## Administrator access

Sign in through Supabase Auth. New accounts must verify their email. Authentication alone does not grant editing rights: the verified email must also exist in `public.portfolio_admins`. Admin access is configured for the owner's authorized account. There is no first-user-admin shortcut or publicly callable activation endpoint.

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
Production: https://ahmadfadhilnaufal.my.id
Vercel alias: https://portofolio-fadhil-livid.vercel.app

Vercel uses Node.js 24, `npm ci`, and `npm run build`. Set the same two public Supabase variables for Production and Preview. The existing project protection settings are preserved.

Education is displayed as a vertical list under Skills with a small uploaded logo beside each school. A saved logo also makes an entry visible before its school name is filled. LinkedIn, Gmail and GitHub icons in the collaboration panel use the profile/contact fields; empty values hide their icon.

## Experience upgrade

Visitors can choose Indonesian/English and Full/Subtle/Off motion from the Experience control. Preferences stay on their device; system reduced motion is always respected. Mobile defaults to Subtle and skips the Three.js canvas. The certificate viewer supports zoom (100–300%), reset, original image, and credential verification.

Studio additions:
- Bahasa / English: translations for profile, projects, certificates, education and journey. Empty fields retain original authored content.
- Proyek: Engineering category, own role, verifiable outcome, multiple screenshot uploads/URLs, and existing problem/process/learning fields. Public projects have shareable `/projects/[id]` pages with metadata.
- Pendidikan / Aplikasi & logo: per-entry public/draft switches. These are presentation controls inside public settings; do not store confidential draft content here. Project/certificate drafts continue to use database RLS.
- Preview: inspect the current project/certificate form, or profile/education/tools, before saving. A dirty-state indicator and browser leave warning protect unsaved work.

SEO includes canonical metadata, a generated 1200×630 social image, Twitter summary card, Person/CreativeWork structured data, robots.txt, and a sitemap containing published projects. Supabase category constraint update is recorded in `supabase/experience-upgrade.sql` and has already been applied. No credentials or personal image files are committed.

## Custom contact apps

Studio → **Aplikasi kontak** controls icons in the collaboration panel. Add LinkedIn, TikTok, Instagram, YouTube, GitHub, Gmail, or a custom app; choose/upload a transparent raster logo, enter its HTTPS profile URL (or an email), reorder, hide or remove, then save. The inline preview reflects pending changes. PNG/JPG/WebP uploads retain the existing 5 MB limit and admin-only Storage permissions.

Settings without `contactApps` retain their existing profile contact links. Once the list is saved, it is authoritative; an empty array deliberately hides all app icons. Email text and other profile fields remain independently editable in Profil & kontak.
