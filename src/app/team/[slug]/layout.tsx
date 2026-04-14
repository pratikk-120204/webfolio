import type { Metadata } from 'next'

const TEAM_MEMBERS: Record<string, { name: string; role: string }> = {
  'pratik': { name: 'Pratik Kadole', role: 'CEO / Founder' },
  'lead-dev': { name: 'Future Partner', role: 'Lead Developer' },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const member = TEAM_MEMBERS[slug]
  if (!member) return { title: 'Team Member Not Found' }
  return {
    title: `${member.name} — ${member.role}`,
    description: `Meet ${member.name}, ${member.role} at Webfolio Solutions. Learn about their background, specialties and how to connect.`,
    openGraph: {
      title: `${member.name} | Webfolio Solutions`,
      description: `${member.role} at Webfolio Solutions`,
    },
  }
}

export default function TeamMemberLayout({ children }: { children: React.ReactNode }) {
  return children
}
