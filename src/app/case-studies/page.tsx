import CaseStudiesClient from './CaseStudiesClient'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'Portfolio — Webfolio Solutions',
  description: 'A curated selection of projects that push the boundaries of digital architecture and design excellence.',
}

export default async function CaseStudiesPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('case_studies')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return <CaseStudiesClient initialProjects={projects || []} />
}
