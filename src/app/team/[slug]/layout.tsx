import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  const supabase = await createClient()
  const { data: member } = await supabase
    .from('team')
    .select('name, role')
    .eq('id', slug)
    .single()

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
