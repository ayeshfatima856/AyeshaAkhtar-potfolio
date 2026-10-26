# Ayesha Akhtar — Creative Portfolio

A premium multi-view portfolio for a graphic designer, social media manager, digital marketer and website designer — plus a working admin panel to manage every piece of content.

**Views** (separate portfolios, each with its own page):

- `/#/` — Home: intro, services, process and explore-work tiles
- `/#/websites` — Website case studies + a live-website showcase auto-organized by industry
- `/#/graphics` — Creative design gallery with category filters and a lightbox
- `/#/marketing` — Brands managed (including own label) + real Google Ads & Meta Ads dashboards
- `/#/contact` — Contact form only
- `/#/admin` — Admin panel (protected): projects, brands, design gallery, profile, messages

## Tech Stack

- **Next.js 16** (App Router, client SPA with hash routing)
- **React 19** + **Tailwind CSS v4** + lucide-react
- **Prisma** + **SQLite** (`db/custom.db`, pre-seeded)
- Design system: Space Grotesk (display) + Inter (body), Midnight Navy / Electric Indigo / Fresh Lime palette

## Quick Start (local)

```bash
npm install
npx prisma generate
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

> The repo ships with a pre-seeded SQLite database at `db/custom.db` — projects, brands, gallery items, profile and the admin user are ready on first run. The `DATABASE_URL` env var is optional; `src/lib/db.ts` resolves a writable location automatically (on serverless hosts like Netlify it copies the bundled DB to `/tmp`).

## Admin Panel

- URL: `/#/admin/login`
- Default credentials: **admin@ayeshaakhtar.com / Ayesha@2026**
- The credentials are shown on the login screen — change them before going public (Admin → Profile/settings or `prisma` studio on the DB).

## Deploy to Netlify

1. **Create the GitHub repo**
   - On GitHub: **New repository** → name it `Ayesha-Akhtar-Portfolio` → keep it Private/Public as you prefer → **do not** initialize with a README.
2. **Push this project**
   ```bash
   git remote add origin https://github.com/<your-username>/Ayesha-Akhtar-Portfolio.git
   git push -u origin main
   ```
3. **Import into Netlify**
   - Netlify → **Add new site → Import an existing project → Deploy with GitHub**
   - Pick `Ayesha-Akhtar-Portfolio`. Netlify reads `netlify.toml` automatically:
     - Build command: `npx prisma generate && npx next build`
     - Plugin: `@netlify/plugin-nextjs`
   - Click **Deploy site**. No environment variables are required.

### Notes on serverless hosting

- The SQLite database is bundled into each function and copied to `/tmp` on cold start (`src/lib/db.ts`). Content changes made through the admin panel and contact messages live **per server instance** and reset when Netlify recycles it. For permanent admin-managed content, host on a server with a writable disk, or swap `db/custom.db` for a hosted database (e.g. Postgres via Supabase/Neon) in `prisma/schema.prisma`.
- Admin image uploads write to `public/uploads`, which is read-only on Netlify — uploads there are temporary. All portfolio images are committed with the repo, so the public site is always complete.

## Project Structure

```
src/app/                 # Next.js app (one page shell + API routes)
src/components/cv/       # the portfolio: hero, about, services, brands,
                         # websites, showcase, marketing, gallery, process, contact, admin
src/lib/db.ts            # Prisma client with runtime DB path resolution
prisma/schema.prisma     # Project, Brand, GalleryItem, Profile, Message, …
db/custom.db             # pre-seeded SQLite database (committed)
public/images/           # all portfolio imagery (cv/, showcase/, gen/, site/)
netlify.toml             # Netlify build + functions config
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server on :3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push `prisma/schema.prisma` to the SQLite DB |
| `npm run db:generate` | Regenerate the Prisma client |
