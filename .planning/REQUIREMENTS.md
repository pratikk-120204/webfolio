# REQUIREMENTS: Webfolio Solutions

## 1. System Overview
Webfolio Solutions is a high-performance, responsive agency website built with Next.js, Framer Motion, and Supabase. It features a private admin dashboard for content management and public-facing pages for lead generation.

## 2. Admin Dashboard (Private)
- **Authentication**: Secure login using Supabase Auth.
- **User Management**:
    - Master Admin (Pratik) can create/invite new users.
    - Role-based access (Admin, Editor/Employee).
- **"Storyline" Blog Manager**:
    - Create, edit, and delete blog posts.
    - Support for text, images, and potentially rich text.
    - Twitter-style rapid posting interface.
- **Booking & Lead Viewer**:
    - Centralized view of all inquiries from the contact/booking forms.

## 3. Public Platform
- **Landing Page**: 
    - Hero section with premium animations (Framer Motion).
    - Agency "Mission" and services overview.
    - Founder's introduction (Pratik Kadole, CEO/Founder).
- **Case Study Gallery**:
    - Dynamic showcase of engineering projects.
    - SEO-optimized individual case study pages.
- **Blog (Storyline View)**:
    - Public feed of blog posts sorted by date.
    - High-performance loading (Static or ISR).
- **Custom Contact/Booking Forms**:
    - Validated forms with SMTP email notifications via free tier (e.g., Resend).
    - Direct integration with Supabase for inquiry persistence.

## 4. Technical Requirements
- **Framework**: Next.js 14+ (App Router).
- **Styling**: TailwindCSS + Vanilla CSS for custom premium effects.
- **Animations**: Framer Motion.
- **Database**: Supabase PostgreSQL.
- **Hosting**: Vercel.
- **Email**: Custom SMTP via Node.js backend (free tier).

## 5. Non-Functional Requirements
- **Performance**: Lighthouse score 90+ across all metrics.
- **SEO**: Dynamic metadata, OpenGraph tags, and sitemap generation.
- **Cost**: Zero monthly operational cost (Free tier primary focus).
