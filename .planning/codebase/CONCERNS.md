# CONCERNS.md — Technical Debt, Known Issues & Risks

## 🔴 High Priority

### 1. Hardcoded Testimonial Data
**File**: `src/app/page.tsx` (lines 114-147)
**Issue**: Client testimonials are hardcoded with fake names and Unsplash stock photos. No Supabase table for testimonials exists.
**Risk**: Looks unprofessional if discovered; blocks adding real testimonials without a code deploy.
**Fix**: Create `testimonials` table in Supabase, fetch dynamically like blog posts.

### 2. Hardcoded Sitemap Routes
**File**: `src/app/sitemap.ts` (lines 16-28)
**Issue**: Case study slugs (`eco-tracker`, `agency-alpha`, etc.) and team member slugs (`pratik`, `lead-dev`) are hardcoded instead of fetched from Supabase.
**Risk**: New case studies or team members won't appear in the sitemap until manually added.
**Fix**: Fetch from `case_studies` and `team_members` tables at build/request time.

### 3. Service Role Key Used Inline in API Route
**File**: `src/app/api/contact/route.ts` (lines 11-15)
**Issue**: The contact API dynamically imports `@supabase/supabase-js` and creates a direct client with `SUPABASE_SERVICE_ROLE_KEY`, bypassing the SSR helper pattern used elsewhere.
**Risk**: Inconsistent auth patterns. Service role bypasses RLS, so any bug here could expose all data.
**Fix**: Use the server-side `createClient()` pattern with appropriate RLS policies, or centralize the admin client creation.

### 4. Navbar Renders Hook After Conditional Return
**File**: `src/components/Navbar.tsx` (lines 22-28)
**Issue**: `useEffect` is called after a conditional `return null` (for admin/login routes). This violates React's Rules of Hooks — hooks must not be called conditionally.
**Risk**: Can cause runtime errors or unpredictable behavior in React 19 strict mode.
**Fix**: Move the early return after all hooks, or extract the non-admin UI into a separate component.

---

## 🟡 Medium Priority

### 5. No Loading / Error States for Admin Data
**File**: `src/app/admin/page.tsx`
**Issue**: The admin dashboard fetches 5 parallel Supabase queries but has no error handling — if any query fails, the entire page may crash.
**Risk**: Poor admin UX when Supabase is slow or unreachable.
**Fix**: Add individual error handling per query or wrap in try/catch with fallback UI.

### 6. No Input Validation on Contact API
**File**: `src/app/api/contact/route.ts`
**Issue**: Request body is destructured and inserted into Supabase without any validation (no zod, no manual checks). Name, email, message could be empty, malicious, or contain XSS payloads.
**Risk**: Bad data in the database; potential email injection via nodemailer fields.
**Fix**: Add input validation (e.g., zod schema) and sanitize email/message fields before insertion and email send.

### 7. No Rate Limiting on Contact API
**File**: `src/app/api/contact/route.ts`
**Issue**: The POST endpoint has no rate limiting or spam protection (no CAPTCHA, no honeypot field).
**Risk**: Form spam, database flooding, email abuse.
**Fix**: Add rate limiting middleware, CAPTCHA (reCAPTCHA or Turnstile), or at minimum a honeypot field.

### 8. Missing `manifest.json` Verification
**File**: `src/app/layout.tsx` (line 44)
**Issue**: Layout references `/manifest.json` in metadata but we can't confirm the file exists in `public/`. If missing, PWA install will fail silently.
**Risk**: Broken PWA functionality.
**Fix**: Verify `public/manifest.json` exists with valid contents.

### 9. `<img>` Tags Instead of `next/image`
**Files**: `src/app/page.tsx` (testimonial avatars), `src/components/Navbar.tsx` (logo)
**Issue**: Uses native `<img>` tags instead of Next.js `<Image>` component. Blog page also uses `<img>` with an ESLint disable comment.
**Risk**: Missing out on automatic image optimization, lazy loading, and responsive sizing.
**Fix**: Migrate to `next/image` where possible, especially for Unsplash images and the logo.

---

## 🟢 Low Priority / Improvements

### 10. No Automated Tests
**File**: N/A
**Issue**: Zero test files, no test runner configured.
**Risk**: Regressions go undetected. No CI safety net.
**Fix**: Set up Vitest + React Testing Library; add Playwright for critical flows. See `TESTING.md`.

### 11. Email Template Has Inline Styles
**File**: `src/app/api/contact/route.ts` (lines 58-100)
**Issue**: HTML email templates are built with template literals and inline styles directly in the API route.
**Risk**: Hard to maintain, easy to break. No preview capability.
**Fix**: Extract email templates to separate files or use a library like `react-email`.

### 12. Blog Posts Not Linkable to Individual Pages
**File**: `src/app/blog/page.tsx`
**Issue**: Blog posts are listed but the `BlogPostCard` component doesn't link to individual post pages (`/blog/[id]`). No individual blog post route exists.
**Risk**: Poor SEO (no individual post URLs), can't share specific posts.
**Fix**: Create `src/app/blog/[id]/page.tsx` dynamic route.

### 13. `server.log` in Root
**File**: `server.log` (root directory)
**Issue**: A log file exists in the project root, likely from a manual server run. Should be gitignored.
**Risk**: Could contain sensitive runtime info if committed.
**Fix**: Add `server.log` to `.gitignore`.

### 14. Unused Import Warning Potential
**File**: `src/app/api/contact/route.ts` (line 3)
**Issue**: Imports `createClient` from `@/utils/supabase/server` but doesn't use it — creates a different Supabase client inline instead.
**Risk**: Confusing code; suggests the server helper should be used but isn't.
**Fix**: Remove unused import, or refactor to use the server helper.

---

## Security Summary

| Area | Status | Notes |
|---|---|---|
| Auth | ✅ Implemented | Supabase Auth + cookie sessions + admin layout guard |
| CSRF | ⚠️ Partial | Sign-out uses form POST but no explicit CSRF tokens |
| Input validation | ❌ Missing | Contact API accepts unvalidated input |
| Rate limiting | ❌ Missing | No protection on public API endpoints |
| XSS | ⚠️ React default | React auto-escapes JSX but email templates use raw strings |
| Service role key | ⚠️ Used in API | Bypasses RLS — contained to server-side only |
| robots.txt | ✅ Configured | Admin, login, API, brain routes disallowed |
