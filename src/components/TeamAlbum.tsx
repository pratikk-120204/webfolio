import TeamAlbumClient from './TeamAlbumClient'
import { createClient } from '@/utils/supabase/server'

export default async function TeamAlbum() {
  const supabase = await createClient()
  
  // Exclusively load from the 'team' table securely via server component
  const { data: team } = await supabase
    .from('team_members')
    .select('id, name, role, summary, image_url')
    .order('id', { ascending: true })

  return <TeamAlbumClient team={team ?? []} />
}
