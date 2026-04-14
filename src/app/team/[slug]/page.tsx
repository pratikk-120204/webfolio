'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, X as XIcon, Code2, Link2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function TeamMemberPage() {
  const params = useParams()
  const slug = params.slug as string
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to load live data from Supabase via the list API
    fetch('/api/team/list')
      .then(r => r.json())
      .then(data => {
        const found = (data.members ?? []).find((m: { id: string }) => m.id === slug)
        if (found) setMember(found)
      })
      .catch(() => {}) // Fall back silently to static data
      .finally(() => setLoading(false))
  }, [slug])

  if (!loading && !member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl font-black text-black mb-4">Member not found.</p>
          <Link href="/" className="text-black/40 hover:text-black transition-colors font-bold text-sm">← Back to Home</Link>
        </div>
      </div>
    )
  }

  if (!member) return null

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-all mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-black uppercase tracking-widest">Back to Album</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[1/1.2] rounded-[2.5rem] overflow-hidden border border-black/10 shadow-2xl"
            >
              <Image src={member.image_url} alt={member.name} fill className="object-cover grayscale" />
            </motion.div>

            <div className="flex gap-3 flex-wrap">
              {member.social_twitter && (
                <SocialLink href={member.social_twitter} icon={<XIcon className="w-5 h-5" />} label="X / Twitter" />
              )}
              {member.social_linkedin && (
                <SocialLink href={member.social_linkedin} icon={<Link2 className="w-5 h-5" />} label="LinkedIn" />
              )}
              {member.social_github && (
                <SocialLink href={member.social_github} icon={<Code2 className="w-5 h-5" />} label="GitHub" />
              )}
              {member.email && (
                <SocialLink href={`mailto:${member.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
              )}
              {/* Always show placeholders so the layout doesn't look empty */}
              {!member.social_twitter && !member.social_linkedin && !member.social_github && !member.email && (
                <>
                  <SocialLink href="#" icon={<XIcon className="w-5 h-5" />} label="X / Twitter" />
                  <SocialLink href="#" icon={<Link2 className="w-5 h-5" />} label="LinkedIn" />
                  <SocialLink href="#" icon={<Code2 className="w-5 h-5" />} label="GitHub" />
                  <SocialLink href="#" icon={<Mail className="w-5 h-5" />} label="Email" />
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/3 space-y-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-black/40 text-xs font-black tracking-[0.4em] uppercase mb-4"
              >
                CORE TEAM MEMBER
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-4"
              >
                {member.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-black/40"
              >
                {member.role}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 max-w-2xl"
            >
              <p className="text-xl font-medium leading-relaxed">{member.bio}</p>
              {member.long_bio && <p className="text-black/50 leading-relaxed">{member.long_bio}</p>}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-black/5">
              {member.specialties?.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-black/30">SPECIALTIES</h3>
                  <ul className="space-y-3">
                    {member.specialties.map((spec) => (
                      <li key={spec} className="flex items-center gap-3 font-bold">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-black/30">CONTACT</h3>
                <Link
                  href="/contact"
                  className="bg-black text-white px-8 py-4 rounded-xl font-black text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-black/80 transition-all w-fit"
                >
                  Book a session
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/10 transition-all"
      title={label}
      aria-label={label}
    >
      {icon}
    </a>
  )
}
