'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    category: string
    description: string
    image: string
    tags: string[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-black/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full hover:border-black/20 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[1.2/1] overflow-hidden bg-black/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        {/* Category Tag */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-widest border border-black/10">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-3xl font-black tracking-tighter text-black">
              {project.title}
            </h3>
            <Link
              href={`/case-studies/${project.id}`}
              className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-black/10 group-hover:border-black group-hover:bg-black text-black group-hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-black/50 text-sm font-medium leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-black/5 text-[10px] font-bold text-black/60 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
