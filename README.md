# Arbree Solutions — Marketing Site + CMS

Pixel-perfect implementation of the "New Arbree Solutions" Figma file
(`XADppvtEIBHtRm0P8Cffib`), with a Prisma/PostgreSQL-backed CMS and admin
dashboard for managing content.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Prisma 7 + PostgreSQL
- TanStack Query, react-hook-form + zod, next-auth (admin auth)
- lucide-react for iconography

## Getting started

1. `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres
   instance, and `AUTH_SECRET` (generate with `openssl rand -base64 32`).
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run db:seed` — creates the first admin login (see `.env.example`
   for `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`; defaults to
   `admin@arbreesolutions.com` / `changeme123` if left unset — change this
   before deploying anywhere real)
6. `npm run dev`, then visit `/admin/login` to manage content

> This project was scaffolded in a sandboxed environment without access to
> `binaries.prisma.sh` or a live Postgres connection, so `prisma generate` /
> `migrate` haven't been run yet — do that first on your machine.
>
> As of the Prisma-wiring pass, this is no longer confined to a handful of
> files: the Home page, Portfolio listing, and Portfolio Details all read
> live data via `src/lib/cms.ts` at request time, alongside the admin
> dashboard, auth, and the contact API route. Running `npm run build` here
> confirms the *only* failure is `Module not found: Can't resolve
> '.prisma/client/default'` — the generated client artifact that only
> `npx prisma generate` produces. `tsc --noEmit` and `eslint` are both
> clean; the one missing piece is that generated artifact, which needs a
> network connection this sandbox doesn't have. Run `npx prisma generate`
> locally and `npm run build` will succeed.

## Design tokens (from Figma)

| Token | Value |
|---|---|
| Primary | `#06BAB5` |
| Primary soft (bg) | `#EAFFFE` |
| Ink (headings/body dark) | `#121212` |
| Body text | `#616161` |
| Font | Inter (400/500/600/700/800) |

Exposed as Tailwind utilities via `@theme` in `globals.css`:
`bg-primary`, `text-primary`, `bg-primary-soft`, `text-ink`, `text-body`.

## CMS content model

See `prisma/schema.prisma`. Admin-editable entities: `Service`,
`PortfolioItem`, `Blog`, `TeamMember`, `Testimonial`, `ClientLogo`,
`StatItem`, `SiteSetting`, `PageContent`, `SeoSettings`,
`AnalyticsSettings`, `ContactMessage`, plus `AdminUser` for dashboard auth.

## Asset note

Icons/images pulled via the Figma MCP are temporarily referenced by their
`figma.com/api/mcp/asset/...` export URLs (see `src/lib/figma-assets.ts`) —
these expire after ~7 days. Re-export from Figma and drop the files into
`public/images/...` before shipping. Generic icons (arrows, team, code) were
hand-authored with lucide-react instead, since those don't need Figma's
exact SVG.

The Figma "Trusted by industry leaders" strip used real third-party brand
logos (Spotify, Google, Pinterest, Stripe, Reddit) as placeholder content.
Rather than hardcode other companies' trademarks, `ClientLogo` is a CMS
model — add your actual clients' logos through the admin dashboard and
they'll render in that slot; until then it shows a neutral placeholder.

## Admin dashboard

Visit `/admin/login` (protected by middleware + NextAuth credentials auth
against the `AdminUser` table). Once signed in:

- **Overview** (`/admin`) — record counts across every CMS entity
- **Page Content** (`/admin/pages`) — JSON editors for About and Services
  page copy (see "Live data wiring" below)
- **SEO** (`/admin/seo`) — per-page meta title/description/keywords,
  OG title/description/image, Twitter card fields, an on-page heading
  override, and a featured image, for Home/About/Services/Portfolio/
  Blog/Contact. Every field is optional and falls back to that page's
  built-in copy when unset (see `src/lib/seo.ts`)
- **Analytics** (`/admin/analytics`) — a GA Measurement ID and/or GTM
  Container ID (auto-injected as the standard tracking snippets, site-wide,
  no code changes), plus optional custom `<head>`/`<body>` HTML snippets
  for anything else (Meta Pixel, Hotjar, etc.)
- **Services, Portfolio, Blog, Team, Testimonials, Client Logos** — full
  list + create + **edit** + delete for each. Services, Portfolio, and
  Blog each carry their own SEO fields (meta/OG/Twitter) on a collapsible
  "SEO & Social Sharing" section within their edit forms, in addition to
  a featured/cover image field
- **Messages** (`/admin/messages`) — Contact page submissions, with
  mark-read and delete

## SEO, Analytics, and Blog

Three additions on top of the original build:

**SEO.** Every page — the 6 static pages plus every Portfolio item and
Blog post — now exports `generateMetadata`, built by `buildMetadata()` in
`src/lib/seo.ts`. It merges whatever's in the DB (`SeoSettings` for static
pages; SEO columns directly on `PortfolioItem`/`Blog`/`Service`) over a
hardcoded per-page default, so title, description, keywords, Open Graph
(title/description/image/url/site name), and Twitter Card (falling back
to the OG fields when unset) are always complete even with nothing
configured. `Service` also carries the same SEO columns for when a
dedicated `/services/[slug]` page exists in the future — nothing reads
them yet since Services doesn't have per-service pages today.

**Analytics.** `AnalyticsSettings` is a singleton row (GA Measurement ID,
GTM Container ID, custom head/body snippets), edited at `/admin/analytics`
and injected by `src/components/analytics/AnalyticsScripts.tsx` into the
root layout — `AnalyticsHead` renders gtag.js + the GTM head script inside
`<head>`, `AnalyticsBody` renders the GTM `<noscript>` fallback right after
`<body>` opens. Nothing renders until at least one field is set. Custom
snippets are inserted as raw HTML (`dangerouslySetInnerHTML`) — this is
trusted admin-authored input, not user-generated content, same tradeoff as
the Blog content field below.

**Blog.** A full blog didn't exist before this pass. `Blog` model +
`src/lib/blog.ts` fetchers + public `/blog` (listing) and `/blog/[slug]`
(detail) pages + full admin CRUD at `/admin/blog`. Post `content` is
stored and rendered as raw HTML (via `@tailwindcss/typography`'s `prose`
classes) rather than Markdown, so admins can format with real HTML —
again, this is admin-authored content rendered via
`dangerouslySetInnerHTML`, appropriate because only authenticated admins
can write it, not because it's safe for arbitrary input. Added to the
Header nav and wired the Footer's pre-existing "Blogs" link (it already
pointed at `/blog`, just had nothing there before).

## Live data wiring

The Home page, Portfolio listing, and Portfolio Details page (`src/lib/cms.ts`)
now read from Prisma at request time. Each query is wrapped so that an
unreachable database or an empty table falls back to the same placeholder
content used during design — nothing breaks before you've seeded real data,
and content you add through the admin dashboard appears on the live site
without further code changes:

- Home: `StatItem`, `Service` (Tech Solution + Team Augmentation), the
  first 3 `PortfolioItem`s, `Testimonial`, `ClientLogo`
- Portfolio listing: all `PortfolioItem`s
- Portfolio Details (`/portfolio/[slug]`): looked up by slug. If the item
  has content in its `caseStudyDetail` JSON field (stats, key features,
  tech highlights, process steps — see the admin Portfolio form's advanced
  JSON field, and `src/lib/case-study-detail.ts` for the schema and the
  icon-key registry that resolves string keys like `"bar-chart-3"` to
  actual `lucide-react` icons), the full case-study layout renders; if not,
  a hero-only view renders from the item's plain fields. With no DB match
  at all it falls back to the bundled `enterprise-crm-system` example.

**Not wired**: nothing, entity-wise — About and Services (including the
four detailed service blocks) all read from a `PageContent` table (`page`
slug + free-form `content` JSON), edited at `/admin/pages`. Each page
component was converted to accept optional data props with its original
hardcoded copy as the default, so an empty/missing `PageContent` row — or
a row that's missing individual keys — renders identically to before.
`src/lib/page-content.ts` has the zod schema for what each page's JSON
accepts; icon fields use the same `iconKey` string → `lucide-react`
component registry as the portfolio case studies
(`src/lib/icon-registry.ts`).

The Services page's four detail blocks (UI/UX Design, Web Development,
Mobile App Development, Digital Consultancy — each with a benefit
checklist and image gallery) live under `serviceDetails` in that same JSON
as an array; order in the array is render order, and background/image-side
alternate automatically by index. If `serviceDetails` is missing or empty
in the DB, the page falls back to the same four hardcoded blocks
(`src/app/services/page.tsx`) that were there before this was wired up —
same fallback pattern as every other CMS-backed section on the site.

**Not built**: bulk/reorder operations in the admin (`order` fields exist
on every model but there's no drag-to-reorder UI yet — set them directly
in the DB or extend the edit forms).

## Build status

- [x] Project scaffold, Tailwind design tokens, Prisma schema
- [x] Header / nav (+ mobile hamburger menu)
- [x] **Home page complete** (hero, intro/stats, services, our work, testimonial, footer) — wired to Prisma
- [x] **About Us page complete** (hero, story, mission, key features, commitment, CTA) — wired to Prisma via `PageContent`
- [x] **Services/Process page complete** (hero, overview grid, 4 service detail blocks, team augmentation highlight, process steps, CTA) — fully wired to Prisma via `PageContent`, including the 4 service detail blocks (`serviceDetails`)
- [x] **Portfolio + Portfolio Details** — wired to Prisma (dynamic `/portfolio/[slug]`, JSON-driven rich case studies, graceful fallback all the way down to the bundled example)
- [x] **Contact page** (functional form: react-hook-form + zod, posts to `/api/contact`, persists to `ContactMessage`)
- [x] Mobile nav + responsive audit — every section uses `grid-cols-1`/`flex-col` mobile-first defaults with `sm:`/`lg:` overrides
- [x] **Admin dashboard** — auth, full list/create/edit/delete for all 6 CMS entities (Services, Portfolio, Blog, Team, Testimonials, Client Logos), Page Content JSON editor, per-page SEO editor, Analytics settings, Messages inbox
- [x] **Blog** — full system: model, public listing + detail pages, admin CRUD, nav/footer wiring
- [x] **SEO** — per-page + per-post/per-item meta title/description/keywords, OG, Twitter Card, all pages export `generateMetadata`
- [x] **Analytics** — GA/GTM injection + custom head/body snippets, admin-configurable, site-wide
- [x] Seed script (`npm run db:seed`)
- [x] Motion pass — rotating client-logo marquee, floating stat/capability bubbles, slow-rotating dashed rings (all respect `prefers-reduced-motion`)
- [x] Container margin audit (2 real bugs fixed)
- [x] Mobile pixel-matching — Home frame verified and corrected (30px margins); other 5 mobile frames not individually diffed — see "Mobile pixel-matching" section for exactly what is and isn't verified
- [ ] Bulk/reorder UI in the admin (order fields exist, no drag-to-reorder yet)
- [ ] Diff and correct the remaining 5 mobile frames (About, Portfolio, Portfolio Details, Contact, Services) the way Home was

## Notes on the Services page

The Figma Services frame includes an elaborate decorative background (a large repeating
line-art grid pattern, ~150+ vector groups) and a curvy connector-line diagram for the
6-step process. Both were simplified to clean, equivalent implementations (a subtle CSS
grid/radial-gradient background, and a numbered icon-card grid for the steps) rather than
hand-transcribing hundreds of SVG path coordinates — the content and layout are faithful,
the ornamental linework is not pixel-identical.

## Container margin audit

A grep audit of every `<section>`'s horizontal padding and every inner container's
`max-w-[…]` turned up two real inconsistencies, now fixed: `ServicesHero` was missing
`lg:px-[60px]` (so it used the mobile side padding even on desktop, unlike every
sibling section), and `ServiceDetailSection`'s inner container was `max-w-[1304px]`
instead of the `1320px` used everywhere else. Every other section already followed the
same outer/inner container pattern (or an intentionally narrower reading-width
container for hero copy), so no broader rework was needed.

## Mobile pixel-matching against Figma's mobile frames

Pulled the actual mobile Home frame from Figma (`951:9528`, 375×7313) to check real
measurements against what had been built responsively-but-not-verified. One concrete,
global correction came out of it: **Figma's mobile side margin is exactly 30px**, not
the 24px Tailwind's `px-6` gives. Every section's outer padding across the whole site
was corrected from `px-6` to `px-[30px]` (keeping `lg:px-[60px]`/`lg:p-[60px]` for
desktop) — this is a real, verified fix, not a guess. Button and card-level `px-6`
paddings (which aren't page-edge margins) were deliberately left alone; a first-pass
sed swept those up too and had to be reverted for the handful of cases where it did.

Two things the mobile frame surfaced that are **not** yet handled and are worth calling
out rather than glossing over:

1. The mobile Home frame's intro-stats section keeps the stat cards **overlapping the
   dashed-circle graphic** in a 2×2 arrangement, same as desktop just rescaled. The
   current build instead drops to a separate 2×2 grid *below* the circle on small
   screens (see `HomeIntroStats.tsx`, the `sm:hidden` block) — a deliberately safer
   choice to avoid overlap/collision at very narrow widths, but it is a real deviation
   from the Figma mobile mockup, not a match.
2. The mobile Home frame has a section ("Spread the Word, Share the Wealth" — an
   email-capture referral/partner program banner) between the portfolio cards and the
   footer that **does not appear anywhere in the desktop Home frame** built earlier in
   this project. It wasn't built, since adding it is new content/scope (a new
   component, copy, and capture flow) rather than a pixel-matching fix to something
   already built.

Beyond the Home frame, the other five mobile frames in Figma (About Us, Portfolio,
Portfolio Details, Contact, Services — all listed as separate top-level frames
alongside Home in the file) were **not individually pulled and diffed**. The existing
responsive Tailwind breakpoints (`grid-cols-1`/`flex-col` defaults, confirmed clean in
an earlier audit) plus the corrected 30px margin bring every page reasonably close, but
"pixel-matched" in the same verified sense as the Home frame is only true for Home.
Treat this as a solid, honest first pass rather than a completed exhaustive check.
