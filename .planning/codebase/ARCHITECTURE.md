# ARCHITECTURE.md — System Architecture

## Pattern

**Next.js App Router** with a mix of React Server Components (RSC) and Client Components.

- **Server Components** (default): Data fetching, admin dashboard, blog pages — rendered on the server with direct Supabase access
- **Client Components** (`'use client'`): Interactive UI — Navbar, Hero, BookingForm, ContactForm, TeamAlbumClient, CookieConsent, MobileNav
- **API Routes**: `src/app/api/` — REST handlers for form submission and auth sign-out

---

## Application Layers

```
┌─────────────────────────────────────────────────────────┐
│                         Browser                         │
│   Client Components (Hero, Navbar, BookingForm, etc.)   │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP / RSC streaming
┌───────────────────────▼─────────────────────────────────┐
│                Next.js App Router                        │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │  Server Pages   │  │       API Routes            │   │
│  │ (RSC data fetch)│  │  POST /api/contact          │   │
│  │                 │  │  POST /api/auth/signout      │   │
│  └────────┬────────┘  └────────────┬────────────────┘   │
│           │                        │                     │
│  ┌────────▼────────────────────────▼────────────────┐   │
│  │         Supabase Client Layer                     │   │
│  │  server.ts (cookie SSR)  |  client.ts (browser)  │   │
│  └────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────┐
│                   Supabase Cloud                         │
│  PostgreSQL DB · Auth · Storage (potential)             │
└─────────────────────────────────────────────────────────┘
```

---

## Key Entry Points

| Entry Point | File | Purpose |
|---|---|---|
| Root Layout | `src/app/layout.tsx` | Global metadata, fonts, Navbar, Analytics, CookieConsent |
| Home Page | `src/app/page.tsx` | Marketing homepage (RSC) |
| Admin Layout | `src/app/admin/layout.tsx` | Auth guard + sidebar (RSC) |
| Session Proxy | `src/proxy.ts` | Supabase session refresh on every request |
| Contact API | `src/app/api/contact/route.ts` | Lead capture + email notification |
| Auth Signout | `src/app/api/auth/signout/` | POST → sign out + redirect |

---

## Data Flow: Contact / Booking Form

```
User fills form (BookingForm.tsx or ContactForm.tsx)
  → 'use client' component calls fetch('POST /api/contact')
  → API route: saves lead to Supabase `leads` table (service role key)
  → API route: sends email via Nodemailer (SMTP/Resend) if configured
  → Returns { success: true }
  → UI shows confirmation state
```

## Data Flow: Admin Dashboard

```
/admin/* request arrives
  → AdminLayout (RSC) calls supabase.auth.getUser()
  → If no user → redirect('/login')
  → If authenticated → render sidebar + children
  → Child server components fetch data directly from Supabase
  → Data rendered as static HTML (no client-side fetching for admin data)
```

## Data Flow: Public Blog / Case Studies

```
/blog or /case-studies request
  → Server Component calls createClient() (SSR Supabase)
  → Fetches from blog_posts / case_studies table
  → Renders static HTML list
  → No client-side JS for data fetching
```

---

## Auth Architecture

- **Mechanism**: Supabase Auth with cookie-based sessions
- **Session Refresh**: `src/proxy.ts` wraps all matched routes; calls `updateSession` to keep cookies fresh
- **Admin Guard**: `src/app/admin/layout.tsx` — server-side auth check on every admin page render
- **Sign Out**: Form POST to `/api/auth/signout` → server action signs out + redirects to `/`

---

## Routing Structure

| Route | Type | Auth Required |
|---|---|---|
| `/` | Public RSC | No |
| `/about` | Public RSC | No |
| `/blog` | Public RSC | No |
| `/case-studies` | Public RSC | No |
| `/case-studies/[id]` | Public RSC | No |
| `/contact` | Public (has client form) | No |
| `/team` | Public RSC | No |
| `/team/[id]` | Public RSC | No |
| `/privacy`, `/terms` | Public RSC | No |
| `/login` | Public | No |
| `/admin/*` | Protected RSC | Yes (Supabase Auth) |
| `/api/contact` | API Route | No |
| `/api/auth/signout` | API Route | No |

---

## Rendering Strategy

- **All public pages**: Server Components (RSC) — excellent for SEO, fast TTFB
- **Interactive islands**: `'use client'` components used only where interactivity is needed (Navbar scroll logic, forms, animations)
- **Admin**: Fully server-rendered — no client-side data fetching, auth is checked at layout level
- **No `getServerSideProps` / `getStaticProps`**: App Router paradigm only
