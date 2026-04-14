import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from '@vercel/analytics/react'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Webfolio Solutions — Digital Experience Agency',
    template: '%s | Webfolio Solutions',
  },
  description: 'Webfolio Solutions is an engineering-first digital agency building high-performance web applications, e-commerce platforms, and bespoke digital products.',
  keywords: ['web agency', 'web development', 'Next.js agency', 'digital agency India', 'full stack development', 'e-commerce development'],
  authors: [{ name: 'Pratik Kadole', url: 'https://webfoliosolutions.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Webfolio Solutions',
    title: 'Webfolio Solutions — Digital Experience Agency',
    description: 'Engineering-first digital agency building high-performance web products.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Webfolio Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webfolio Solutions',
    description: 'Engineering-first digital agency building high-performance web products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Webfolio',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
