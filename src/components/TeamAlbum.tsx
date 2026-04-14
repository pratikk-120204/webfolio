import TeamAlbumClient from './TeamAlbumClient'
import { createClient } from '@/utils/supabase/server'

// Fallback static data — used if Supabase team_members table isn't set up yet
const FALLBACK_TEAM = [
  {
    id: 'pratik',
    name: 'Pratik Kadole',
    role: 'CEO / Founder',
    summary: 'Directing the vision of Webfolio Solutions. Specialist in full-stack architecture and digital performance.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 'lead-dev',
    name: 'Future Partner',
    role: 'Lead Developer',
    summary: 'Join the mission. We are looking for bold engineers to scale our digital architecture.',
    image_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop'
  }
]

export default async function TeamAlbum() {
  // Try to load from Supabase — fall back to static data if table doesn't exist yet
  let team = FALLBACK_TEAM
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('team_members')
      .select('id, name, role, summary, image_url')
      .order('created_at', { ascending: true })
    
    if (data && data.length > 0) team = data
  } catch {
    // Table not set up yet — use fallback silently
  }

  return <TeamAlbumClient team={team} />
}
