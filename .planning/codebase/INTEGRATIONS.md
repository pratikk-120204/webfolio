# INTEGRATIONS.md — External Services & APIs

## 1. Supabase (Database + Auth)

**Type**: Backend-as-a-Service (BaaS)  
**SDK**: `@supabase/supabase-js` + `@supabase/ssr`

### Client Patterns

**Server-side** (`src/utils/supabase/server.ts`):
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll, setAll } }
  )
}
```

**Browser-side** (`src/utils/supabase/client.ts`):
```ts
import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(URL, ANON_KEY)
}
```

**Admin/Service Role** (inline in `src/app/api/contact/route.ts`):
```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(URL, SUPABASE_SERVICE_ROLE_KEY)
```
> ⚠️ Service role key bypasses Row Level Security — used only in server-side API routes.

### Database Tables

| Table | Usage |
|---|---|
| `leads` | Stores contact form submissions and booking requests (columns: `id`, `name`, `email`, `message`, `service`, `booking_date`, `status`, `type`, `created_at`) |
| `team_members` | Team profile data for admin management and public Team Album |
| `case_studies` | Portfolio/project showcase entries |
| `blog_posts` | Agency blog articles (columns: `id`, `title`, `content`, `created_at`, `author_name`, `author_role`, `image_url`) |

### Auth

- Provider: Supabase Auth (email/password)
- Session management: Cookie-based via `@supabase/ssr`
- Middleware-equivalent: `src/proxy.ts` + `src/utils/supabase/proxy.ts` calls `updateSession` on every request
- Admin guard: `src/app/admin/layout.tsx` calls `supabase.auth.getUser()` and redirects to `/login` if not authenticated

---

## 2. Email — Resend via SMTP (Nodemailer)

**Provider**: Resend (SMTP API)  
**Library**: `nodemailer@^8`  
**Configured in**: `src/app/api/contact/route.ts`

### Flow
1. User submits contact or booking form
2. API route `POST /api/contact` saves lead to Supabase
3. If SMTP env vars are set, sends two emails:
   - **Agency alert** → `ceo@webfolio.solutions`
   - **Client confirmation** → user's email address

### SMTP Config
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=<resend-api-key>
SMTP_FROM=onboarding@resend.dev
```

> Email is **optional** — if SMTP env vars are missing, the lead is still saved to Supabase and a 200 is returned. This makes the system resilient to missing email config.

---

## 3. Vercel Analytics

**Package**: `@vercel/analytics@^2`  
**Usage**: Injected globally in `src/app/layout.tsx`

```tsx
import { Analytics } from '@vercel/analytics/react'
// ...
<Analytics />
```

No configuration needed beyond the package — Vercel auto-detects on deployment.

---

## 4. Image CDN — Unsplash

**Type**: External image source  
**Configured in**: `next.config.ts`

```ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }]
}
```

Used for testimonial avatar images on the homepage. Note: these are hardcoded Unsplash URLs in `src/app/page.tsx` — not dynamically fetched.

---

## 5. SEO — Sitemap & Robots

- **Sitemap**: `src/app/sitemap.ts` — generates static + dynamic routes
- **Robots**: `src/app/robots.ts` — disallows `/admin`, `/login`, `/api/`, `/brain/`
- **Canonical URL**: `NEXT_PUBLIC_SITE_URL` env var, fallback `https://webfoliosolutions.com`
- **OG/Twitter meta**: Set in `src/app/layout.tsx` with full OpenGraph and Twitter card metadata

---

## 6. PWA

- **Manifest**: Referenced in layout metadata as `/manifest.json` (file must exist in `public/`)
- **Apple Web App**: Configured in layout metadata with `appleWebApp` settings
- **Theme Color**: `#ffffff` (white)
