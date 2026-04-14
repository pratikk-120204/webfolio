import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind Webfolio Solutions — who we are, why we started, and what we stand for.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="pt-32 pb-24 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none mb-8">
              Built by<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Engineers</span>
            </h1>
            <p className="text-xl text-black/50 font-medium leading-relaxed max-w-lg">
              Webfolio Solutions was founded on a simple conviction: great software should be both beautiful and fast. Not one or the other.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Founded', value: '2026' },
              { label: 'Projects Delivered', value: '10+' },
              { label: 'Countries Served', value: '3' },
              { label: 'Client Satisfaction', value: '100%' },
            ].map(stat => (
              <div key={stat.label} className="border border-black/5 rounded-3xl p-8 hover:border-black/20 transition-all">
                <div className="text-4xl font-black tracking-tighter text-black mb-2">{stat.value}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 border-b border-black/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase">Our Mission</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            "Engineering standard — where design and performance are inseparable."
          </h2>
          <p className="text-xl text-black/50 font-medium leading-relaxed max-w-2xl mx-auto">
            We don't make websites — we engineer digital products. Every project we take on is built
            with the same care and technical rigour as enterprise software. Because your clients deserve it.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-16 text-center">What We Stand For</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Performance First',
                body: 'Every decision — from architecture to animation — is made with performance in mind. A slow website is a broken product.',
              },
              {
                number: '02',
                title: 'Design with Intent',
                body: 'We reject decoration for its own sake. Every visual element serves a purpose: directing attention, conveying trust, driving action.',
              },
              {
                number: '03',
                title: 'Long-Term Thinking',
                body: 'We build for maintainability, not just launch day. Clean code, clear documentation, and systems that scale.',
              },
            ].map(v => (
              <div key={v.number} className="border border-black/5 rounded-3xl p-10 hover:border-black/20 transition-all">
                <p className="text-[10px] font-black tracking-widest uppercase text-black/20 mb-6">{v.number}</p>
                <h3 className="text-2xl font-black tracking-tighter text-black mb-4">{v.title}</h3>
                <p className="text-black/50 font-medium leading-relaxed text-sm">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6 border-b border-black/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-[10px] font-black text-white/30 tracking-[0.3em] uppercase">The Founder</p>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              Pratik Kadole
            </h2>
            <p className="text-white/30 font-black text-sm uppercase tracking-widest">CEO / Founder</p>
            <p className="text-white/60 font-medium leading-relaxed text-lg">
              Pratik started Webfolio Solutions with one goal: build a studio that treats every client's
              business like it deserves world-class engineering — not just a template dressed up with new colours.
            </p>
            <p className="text-white/40 font-medium leading-relaxed">
              With a background in full-stack development and a passion for minimalist design systems, he leads
              every project from architecture to delivery. The belief is simple: the best digital products are
              built by people who care deeply about both craft and outcomes.
            </p>
            <Link href="/team/pratik"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              View Full Profile <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="border border-white/10 rounded-3xl p-12 space-y-6">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Core Competencies</p>
            {['Full-Stack Architecture (Next.js, Supabase)', 'Performance Engineering', 'UI/UX Design Systems', 'Technical Leadership', 'API & Integration Design'].map(skill => (
              <div key={skill} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                <span className="text-white/70 font-medium text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-black tracking-tighter">Ready to work together?</h2>
          <p className="text-black/40 text-lg font-medium">
            Tell us about your project. We'll respond within 24 hours.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95">
            Start a Project <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
