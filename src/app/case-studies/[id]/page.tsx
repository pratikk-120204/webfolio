import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('case_studies')
    .select('title, description, image')
    .eq('id', id)
    .single()

  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Webfolio Solutions`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-black/40 hover:text-black transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">All Projects</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-4">
                {project.category} · {project.year}
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-none mb-6">
                {project.title.split(' ').slice(0, -1).join(' ')}<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                  {project.title.split(' ').at(-1)}
                </span>
              </h1>
              <p className="text-xl text-black/50 font-medium leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-widest text-black/50">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95"
            >
              Build Something Similar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-black/5">
            <Image src={project.image} alt={project.title} fill className="object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-black/5" />
      </div>

      {/* Details */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Full Description */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-black/30">The Brief</h2>
          <p className="text-xl font-medium leading-relaxed text-black/70 whitespace-pre-wrap">
            {project.full_description}
          </p>

          {/* Results */}
          {(project.results || []).length > 0 && (
            <div className="pt-8 border-t border-black/5 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-widest text-black/30">Outcomes</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result: string) => (
                  <li key={result} className="flex items-start gap-3 p-5 rounded-2xl border border-black/5 hover:border-black/15 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    <span className="font-bold text-sm text-black">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Deliverables Sidebar */}
        <div className="space-y-8">
          <div className="border border-black/5 rounded-3xl p-8 space-y-6 sticky top-28">
            <h2 className="text-xs font-black uppercase tracking-widest text-black/30">Deliverables</h2>
            <ul className="space-y-4">
              {(project.deliverables || []).map((d: string) => (
                <li key={d} className="flex items-center gap-3 text-sm font-bold text-black">
                  <div className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-black/5">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all font-bold"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-black py-32 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">Next Step</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Let's Build<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Together</span>
          </h2>
          <p className="text-white/40 text-lg font-medium max-w-xl mx-auto">
            Got a project that deserves world-class execution? Tell us about it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
