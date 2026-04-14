import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Webfolio Solutions internal admin access.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
