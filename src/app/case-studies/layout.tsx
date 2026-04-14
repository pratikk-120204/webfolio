import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Featured Projects',
  description: 'Browse the Webfolio Solutions project portfolio — full-stack web apps, e-commerce platforms, PWAs, and AI-powered tools.',
  openGraph: {
    title: 'Featured Projects | Webfolio Solutions',
    description: 'Browse our portfolio of full-stack web apps, e-commerce platforms, and digital products.',
  },
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
