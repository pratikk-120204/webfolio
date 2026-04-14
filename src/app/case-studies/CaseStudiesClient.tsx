'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { Sparkles, LayoutGrid, Filter } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

export default function CaseStudiesClient({ initialProjects }: { initialProjects: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  
  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(initialProjects.map(p => p.category).filter(Boolean)))]

  const filtered = activeCategory === 'All' 
    ? initialProjects 
    : initialProjects.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-black/50 text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>THE PORTFOLIO</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
          >
            Featured <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Projects</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-black/50 text-lg font-medium leading-relaxed"
          >
            A curated selection of projects that push the boundaries of digital architecture and design excellence.
          </motion.p>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 px-4 gap-8">
          <div className="flex items-center gap-4">
            <LayoutGrid className="w-5 h-5 text-black" />
            <h2 className="text-sm font-black uppercase tracking-widest text-black/40">PROJECT ARCHIVE</h2>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 bg-black/5 p-1.5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-black text-white shadow-xl' 
                    : 'text-black/30 hover:text-black'
                }`}
              >
                {cat as string}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center border-2 border-dashed border-black/10 rounded-[3rem]">
            <Filter className="w-8 h-8 text-black/20 mx-auto mb-4" />
            <p className="text-black/30 font-bold uppercase tracking-widest text-xs">No projects found in this category</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard project={{
                    id: project.id,
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    image: project.image,
                    tags: project.tags || []
                  }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-black py-40 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase">READY TO BEGIN?</p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Let's build your next <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Digital Marvel</span>
          </h2>
          <p className="text-white/40 text-lg font-medium leading-relaxed">
            Collaborate with a specialized engineering unit to bring your most ambitious vision to life.
          </p>
          <div className="pt-8">
            <Link href="/contact" className="bg-white text-black px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95 inline-block">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
