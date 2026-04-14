# ROADMAP: Webfolio Solutions

## Milestone 1: Foundation & Auth (Infrastructure)
Establish the core tech stack and secure administrative access.

### Phase 1: Environment Setup
- [ ] Initialize Next.js project with TailwindCSS and Framer Motion.
- [ ] Configure Supabase project and connect local environment.
- [ ] Setup initial folder structure (`app/`, `components/`, `lib/`, `types/`).

### Phase 2: Administrative Core
- [ ] Implement Admin Auth (Login/Logout).
- [ ] Create basic Admin Dashboard layout.
- [ ] **Multi-User System**: Build user creation interface for Admin using Supabase Service Role.

## Milestone 2: Content Management (Backend)
Enable dynamic content posting and lead tracking.

### Phase 3: "Storyline" Blogging
- [ ] Design Supabase schema for Blog posts (Authors, Titles, Content, Images).
- [ ] Build Twitter-style blog editor (Client-side CRUD).
- [ ] Implement public Blog feed fetching.

### Phase 4: Lead Generation & SMTP
- [ ] Build custom Booking and Contact forms.
- [ ] Configure SMTP integration (Resend or similar free tier).
- [ ] Implement database persistence for all inquiries.

## Milestone 3: Public platform & Branding (Frontend)
Polish the user-facing site to agency standards.

### Phase 5: Agency UI/UX
- [ ] Implement Landing Page Hero section with Framer Motion.
- [ ] Build Founders' "CEO" introduction section.
- [ ] Create Case Study Gallery with dynamic routing.

### Phase 6: SEO & Performance
- [ ] Optimize images and assets.
- [ ] Implement dynamic Meta tags and Sitemap.
- [ ] Final Vercel deployment and pre-launch audit.

### Phase 7: Production Readiness - SEO, Auth Fixes, Live Data & Mobile Nav

**Goal:** Address all pre-launch blockers identified in the production audit. Fix critical issues (SEO metadata, sign-out, missing Messages page, live data hooks), and add essential missing features (mobile navigation, 404 page, Privacy Policy page, Supabase live queries).

**Depends on:** Phase 6

**Plans:** 11 plans

Plans:
- [x] Fix root layout metadata (title, description, OG tags)
- [x] Fix Sign Out API route (`/api/auth/signout`)
- [x] Build `/admin/messages` page reading real leads from Supabase
- [x] Hook team public page to read from Supabase `team_members` table
- [x] Add mobile hamburger navigation
- [x] Add custom 404 page
- [x] Add Privacy Policy page
- [x] Connect admin dashboard to live Supabase counts
- [x] Connect admin bookings page to live Supabase leads
- [x] Connect admin blog page to live Supabase posts
- [x] Add `next/font` performance optimization and page metadata per route
