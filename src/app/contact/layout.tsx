import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Project',
  description: 'Get in touch with Webfolio Solutions. Send us an enquiry or book a discovery call — we respond within 24 hours.',
  openGraph: {
    title: 'Start a Project | Webfolio Solutions',
    description: 'Get in touch with Webfolio Solutions. Send us an enquiry or book a discovery call.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
