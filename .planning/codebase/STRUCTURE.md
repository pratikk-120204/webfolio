# STRUCTURE.md — Directory Layout & Organization

## Top-Level Layout

```
webfolio/
├── .env.local                  # Local secrets (gitignored)
├── .env.local.example          # Env var template (committed)
├── .gitignore
├── .planning/                  # GSD planning artifacts
│   ├── PROJECT.md
│   ├── REQUIREMENTS.md
│   ├── ROADMAP.md
│   ├── config.json
│   ├── codebase/               # This directory (codebase map)
│   └── phases/
├── AGENTS.md                   # Agent rules (Next.js version notice)
├── CLAUDE.md                   # Claude-specific instructions
├── README.md
├── eslint.config.mjs
├── next-env.d.ts               # Auto-generated Next.js types
├── next.config.ts              # Next.js configuration
├── package.json
├── postcss.config.mjs
├── public/                     # Static assets
├── src/                        # All application source code
└── tsconfig.json
```

---

## `src/` Directory

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, Navbar, Analytics)
│   ├── page.tsx                # Homepage (RSC)
│   ├── globals.css             # Minimal global CSS
│   ├── error.tsx               # Error boundary
│   ├── loading.tsx             # Global loading state
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # robots.txt generator
│   ├── sitemap.ts              # sitemap.xml generator
│   ├── icon.png                # App icon (favicon)
│   ├── apple-icon.png          # Apple touch icon
│   │
│   ├── about/                  # /about page
│   ├── blog/                   # /blog listing page
│   ├── case-studies/           # /case-studies listing + [id] detail
│   ├── contact/                # /contact page (with BookingForm + ContactForm)
│   ├── team/                   # /team listing + [id] profile
│   ├── privacy/                # /privacy page
│   ├── terms/                  # /terms page
│   ├── auth/                   # Auth callback pages (Supabase OAuth flow)
│   ├── login/                  # /login page
│   ├── brain/                  # Internal/debug route (disallowed in robots.txt)
│   │
│   ├── admin/                  # Protected admin area
│   │   ├── layout.tsx          # Admin layout (auth guard + sidebar)
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── blog/               # Blog post management
│   │   ├── bookings/           # Bookings management
│   │   ├── case-studies/       # Case studies management
│   │   ├── messages/           # Contact message management
│   │   ├── team/               # Team member management
│   │   └── users/              # Access control / user management
│   │
│   └── api/                    # API Routes
│       ├── contact/
│       │   └── route.ts        # POST /api/contact (lead save + email)
│       ├── blog/               # Blog API (CRUD for admin)
│       ├── case-studies/       # Case studies API
│       ├── team/               # Team API
│       └── auth/
│           └── signout/        # POST /api/auth/signout
│
├── components/                 # Shared React components
│   ├── BlogCard.tsx            # Blog post card (used in blog listing)
│   ├── BookingForm.tsx         # Multi-step booking form (client component)
│   ├── ComposePost.tsx         # Blog post composer (admin)
│   ├── ContactForm.tsx         # Simple contact form (client component)
│   ├── CookieConsent.tsx       # Cookie consent banner (client component)
│   ├── Hero.tsx                # Homepage hero section (client component)
│   ├── MobileNav.tsx           # Mobile navigation (client component)
│   ├── Navbar.tsx              # Main sticky navbar (client component)
│   ├── ProjectCard.tsx         # Case study card
│   ├── TeamAlbum.tsx           # Team album wrapper (RSC shell)
│   └── TeamAlbumClient.tsx     # Team album interactive content (client)
│
├── utils/
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server (SSR/cookie) Supabase client
│       └── proxy.ts            # Session refresh middleware helper
│
└── proxy.ts                    # Next.js middleware (session refresh matcher)
```

---

## `public/` Directory

```
public/
├── icon.png                    # App icon (also used in navbar)
├── manifest.json               # PWA manifest (referenced in metadata)
└── og-image.png                # OpenGraph share image
```
> ⚠️ `og-image.png` and `manifest.json` must exist in `public/` — they are referenced in layout metadata but not committed (assumed to exist).

---

## Naming Conventions

| Pattern | Example | Used For |
|---|---|---|
| `PascalCase.tsx` | `BookingForm.tsx` | React components |
| `camelCase.ts` | `server.ts`, `client.ts` | Utility modules |
| `kebab-case/` | `case-studies/`, `team/` | Route segments (App Router) |
| `route.ts` | `api/contact/route.ts` | Next.js API route handlers |
| `page.tsx` | `about/page.tsx` | Next.js page components |
| `layout.tsx` | `admin/layout.tsx` | Next.js layout components |
| `[id]/` | `case-studies/[id]/` | Dynamic route segments |

---

## Key File Locations (Quick Reference)

| What | Where |
|---|---|
| Global metadata & fonts | `src/app/layout.tsx` |
| Homepage content | `src/app/page.tsx` |
| Supabase server client | `src/utils/supabase/server.ts` |
| Supabase browser client | `src/utils/supabase/client.ts` |
| Lead capture API | `src/app/api/contact/route.ts` |
| Admin auth guard | `src/app/admin/layout.tsx` |
| Session middleware | `src/proxy.ts` |
| Sitemap generator | `src/app/sitemap.ts` |
| Robots.txt generator | `src/app/robots.ts` |
| Path alias `@/` | Resolves to `src/` (configured in `tsconfig.json`) |
