# CONVENTIONS.md — Code Style & Patterns

## General Style

- **Language**: TypeScript with strict types enabled
- **Formatting**: No Prettier config found — relies on editor defaults
- **Linting**: ESLint 9 with `eslint-config-next` (flat config in `eslint.config.mjs`)
- **Import paths**: `@/` alias resolves to `src/` (via `tsconfig.json`)

---

## Component Patterns

### Server vs Client Components

- **Default is Server Component** (RSC) — no directive needed
- **Client components** marked with `'use client'` at the top of the file
- Client components: `Hero.tsx`, `Navbar.tsx`, `BookingForm.tsx`, `ContactForm.tsx`, `CookieConsent.tsx`, `MobileNav.tsx`, `TeamAlbumClient.tsx`
- Server components: All `page.tsx` and `layout.tsx` files, `TeamAlbum.tsx`, `BlogCard.tsx`, `ProjectCard.tsx`

### Component File Pattern

```tsx
// Client component example (src/components/Hero.tsx)
'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="...">
      {/* JSX */}
    </section>
  )
}
```

```tsx
// Server component example (src/app/blog/page.tsx)
import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { ... }

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('blog_posts').select('...')
  return ( /* JSX */ )
}
```

### Key Patterns Observed

1. **Co-located metadata**: Each page exports `metadata` alongside the component
2. **Inline data arrays**: Static data (services, nav links, testimonials) defined as const arrays at module level
3. **Parallel data fetching**: Admin dashboard uses `Promise.all()` for concurrent Supabase queries
4. **Wrapper components**: `TeamAlbum.tsx` (RSC) wraps `TeamAlbumClient.tsx` (client) to fetch data server-side and pass as props

---

## Styling Conventions

### Tailwind CSS v4 Utility-First

- All styling done via Tailwind utility classes inline in JSX
- No CSS modules, no styled-components, no separate stylesheets (except minimal `globals.css`)
- `globals.css` imports Tailwind directives only (`@tailwind base;` etc.)

### Design System (Implicit)

| Token | Value | Usage |
|---|---|---|
| Primary | `black` / `white` | Monochromatic — all UI is black, white, and opacity variants |
| Opacity text | `text-black/30`, `text-black/50`, etc. | Hierarchy via opacity, not separate colors |
| Radius | `rounded-full`, `rounded-3xl`, `rounded-2xl`, `rounded-xl` | Large border radii throughout |
| Spacing | `py-32`, `px-6`, `gap-8` | Generous whitespace |
| Typography | `font-black`, `tracking-tighter`, `tracking-widest`, `uppercase` | Bold, high-contrast type |
| Micro-labels | `text-[10px] font-black tracking-[0.3em] uppercase` | Consistent label style |

### Hover/Interaction Patterns

```tsx
// Card hover → full inversion (white card → black bg)
className="hover:bg-black hover:text-white transition-all duration-500"

// Grayscale images → color on hover
className="grayscale group-hover:grayscale-0 transition-all"

// Scale on active press
className="active:scale-95"

// Scroll-triggered backdrop blur on Navbar
className={scrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'}
```

### Branded Text Pattern

```tsx
// Outline text effect — used globally for headers
<span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
  SOLUTIONS
</span>
```

---

## Naming Conventions

| What | Convention | Example |
|---|---|---|
| Components | PascalCase | `BookingForm`, `TeamAlbum` |
| Utility files | camelCase | `server.ts`, `proxy.ts` |
| Route folders | kebab-case | `case-studies/`, `admin/blog/` |
| Constants | UPPER_SNAKE | `SERVICES`, `NAV_LINKS` |
| Props | Inline destructured | `{ title, value }: { title: string; value: string }` |
| Event handlers | `handle*` or inline arrow | `handleBooking`, `onClick={() => ...}` |

---

## Data Fetching Patterns

1. **Server Components** fetch directly:
   ```tsx
   const supabase = await createClient()
   const { data } = await supabase.from('table').select('...')
   ```

2. **Client Components** use `fetch()` to API routes:
   ```tsx
   const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
   ```

3. **No React Query / SWR** — no client-side caching library used
4. **No global state management** — no Redux, Zustand, or Context providers

---

## Error Handling

- **API routes**: try/catch with structured `NextResponse.json({ error, details }, { status })` responses
- **SMTP errors**: Caught but non-fatal — lead is saved even if email fails (resilient pattern)
- **Supabase errors**: Logged with emoji prefixes (`❌ Supabase Insert Failed:`)
- **Client forms**: Simple `alert()` for errors, `loading` state managed via `useState`
- **Global error boundary**: `src/app/error.tsx` catches unhandled errors
- **404 handler**: Custom `src/app/not-found.tsx`

---

## Icon Usage

- **Library**: `lucide-react`
- **Pattern**: Named imports, inline with `className` sizing
- **Examples**: `ArrowUpRight`, `ArrowDown`, `Menu`, `X`, `Mail`, `Calendar`, `Clock`, `Loader2`
