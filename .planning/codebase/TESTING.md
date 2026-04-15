# TESTING.md — Test Structure & Practices

## Current State

**No test framework is configured.** There are no test files, no test dependencies, and no test scripts in `package.json`.

---

## What's Missing

| Item | Status |
|---|---|
| Test runner (Jest, Vitest, Playwright) | ❌ Not installed |
| Test configuration file | ❌ Not present |
| Unit tests | ❌ None |
| Integration tests | ❌ None |
| E2E tests | ❌ None |
| Component tests | ❌ None |
| API route tests | ❌ None |
| CI/CD pipeline | ❌ Not configured |
| Test coverage | ❌ Not tracked |

---

## Available Validation

| Tool | Command | What It Checks |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | Type checking |
| ESLint | `npm run lint` | Code quality rules |
| Next.js Build | `npm run build` | Full type check + build validation |

---

## Recommended Test Setup (Future)

Given the stack (Next.js 16, React 19, TypeScript), the recommended setup would be:

### Unit + Component Testing
- **Vitest** — fast, native ESM support, TypeScript out of the box
- **React Testing Library** — for component rendering tests
- Priority targets: `BookingForm.tsx`, `ContactForm.tsx`, `Navbar.tsx`

### API Route Testing
- **Vitest** with `fetch` mocking
- Priority targets: `POST /api/contact` (lead save + email logic)

### E2E Testing
- **Playwright** — cross-browser, built-in Next.js support
- Priority flows: contact form submission, admin login → dashboard, blog listing

### Critical Test Scenarios

1. **Contact API**: Verify lead saves to Supabase even when SMTP fails
2. **Auth guard**: Verify `/admin/*` redirects to `/login` when unauthenticated
3. **BookingForm**: Verify multi-step wizard flow (service → date → time → details → confirmation)
4. **SEO**: Verify sitemap and robots.txt generate correct URLs
5. **Navbar**: Verify scroll-triggered styling and mobile menu toggle
