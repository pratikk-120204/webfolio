# STACK.md — Technology Stack

## Language & Runtime

- **Language**: TypeScript 5 (strict mode)
- **Runtime**: Node.js (server-side via Next.js)
- **Package Manager**: npm

---

## Framework

| Layer | Technology | Version |
|---|---|---|
| Web Framework | Next.js | 16.2.3 |
| UI Library | React | 19.2.4 |
| React DOM | react-dom | 19.2.4 |

> **Next.js 16**: Uses App Router with React Server Components by default. This is a cutting-edge version — always check `node_modules/next/dist/docs/` before writing Next.js code.

---

## Styling

- **CSS Framework**: Tailwind CSS v4 (`tailwindcss@^4`)
- **PostCSS**: `@tailwindcss/postcss@^4`
- **Font**: Geist Sans & Geist Mono via `next/font/google` (loaded in `src/app/layout.tsx`)
- **Approach**: Utility-first Tailwind classes inline in JSX; no separate CSS modules or styled-components

---

## Key Dependencies (Production)

| Package | Version | Purpose |
|---|---|---|
| `@supabase/ssr` | ^0.10.2 | Supabase SSR client (cookie-based sessions) |
| `@supabase/supabase-js` | ^2.103.0 | Supabase JS SDK (direct service-role API calls) |
| `@vercel/analytics` | ^2.0.1 | Vercel Analytics integration |
| `framer-motion` | ^12.38.0 | Animation library (used in Hero, Navbar, BookingForm) |
| `lucide-react` | ^1.8.0 | Icon library |
| `next` | 16.2.3 | Core framework |
| `nodemailer` | ^8.0.5 | SMTP email delivery |
| `dotenv` | ^17.4.2 | Environment variable loading |

## Key Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5 | Type checking |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.2.3 | Next.js ESLint rules |
| `tailwindcss` | ^4 | CSS framework |
| `@types/node` | ^20 | Node type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/nodemailer` | ^8.0.0 | Nodemailer types |

---

## Configuration Files

| File | Purpose |
|---|---|
| `next.config.ts` | Next.js config — allows `images.unsplash.com` as remote image pattern |
| `tsconfig.json` | TypeScript config |
| `eslint.config.mjs` | ESLint flat config |
| `postcss.config.mjs` | PostCSS with Tailwind plugin |
| `.env.local` | Local secrets (gitignored) |
| `.env.local.example` | Template for required env vars |

---

## npm Scripts

```json
"dev":   "next dev"
"build": "next build"
"start": "next start"
"lint":  "eslint"
```

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server only) | Supabase service role key for admin operations |
| `SMTP_HOST` | Optional | SMTP server (default: smtp.resend.com) |
| `SMTP_PORT` | Optional | SMTP port (default: 465) |
| `SMTP_USER` | Optional | SMTP username |
| `SMTP_PASS` | Optional | SMTP password / API key |
| `SMTP_FROM` | Optional | From address for outgoing email |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL (used in sitemap, robots, metadata) |
