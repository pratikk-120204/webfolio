'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Member {
  id: string
  name: string
  role: string
  summary: string
  image_url: string
}

interface TeamAlbumClientProps {
  team: Member[]
}

export default function TeamAlbumClient({ team }: TeamAlbumClientProps) {
  return (
    <section className="bg-white py-32 px-6" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black tracking-[0.4em] uppercase text-black/30 mb-4"
            >
              CORE TEAM
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-black tracking-tighter"
            >
              The Agency Album
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-black/50 max-w-sm text-sm font-medium leading-relaxed"
          >
            A collective of highly specialized engineers and designers dedicated to building the future of the web.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}

          {/* Join Card */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative h-[600px] border-2 border-black border-dashed rounded-[2rem] flex flex-col items-center justify-center p-12 text-center hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mb-6">
              <span className="text-3xl font-black">+</span>
            </div>
            <h3 className="text-2xl font-black mb-4">Your Name Here?</h3>
            <p className="opacity-50 text-sm font-medium mb-8 leading-relaxed">
              We are constantly seeking world-class talent to join the Webfolio Solutions team.
            </p>
            <span className="underline font-black text-sm tracking-widest uppercase py-2">
              Apply to join
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: Member, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[600px] overflow-hidden rounded-[2rem] bg-slate-100 flex flex-col justify-end p-8 cursor-pointer"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={member.image_url}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      <div className="relative z-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-2">{member.role}</p>
        <h3 className="text-3xl font-black mb-4">{member.name}</h3>

        <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
          <p className="text-sm font-medium opacity-70 leading-relaxed mb-6">{member.summary}</p>
          <Link
            href={`/team/${member.id}`}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black text-xs tracking-widest uppercase active:scale-95 transition-all"
          >
            View Profile
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
