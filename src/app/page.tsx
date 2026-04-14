import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import TeamAlbum from '@/components/TeamAlbum'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Webfolio Solutions — Digital Experience Agency',
  description: 'We build high-performance web applications, e-commerce platforms, and bespoke digital products. Based in India, working globally.',
  openGraph: {
    title: 'Webfolio Solutions — Digital Experience Agency',
    description: 'Engineering-first digital agency. We build high-performance web products for those who lead.',
  },
}

const SERVICES = [
  {
    number: '01',
    title: 'Web Applications',
    description: 'Full-stack Next.js applications built for performance, scalability, and real business outcomes.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
  },
  {
    number: '02',
    title: 'E-Commerce Platforms',
    description: 'Custom storefronts and headless commerce solutions with sub-second load times.',
    tags: ['Shopify', 'Headless CMS', 'Payments'],
  },
  {
    number: '03',
    title: 'UI/UX & Branding',
    description: 'Complete digital identity systems — from design language to coded component libraries.',
    tags: ['Figma', 'Design Systems', 'Motion'],
  },
  {
    number: '04',
    title: 'Technical Consulting',
    description: 'Architecture reviews, technical strategy, and hands-on engineering for complex builds.',
    tags: ['Audit', 'Strategy', 'Architecture'],
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Services Section */}
      <section className="py-32 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-4">What We Build</p>
              <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">
                Services
              </h2>
            </div>
            <Link
              href="/contact"
              className="self-start md:self-auto inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95"
            >
              Get a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.number}
                className="group border border-black/5 rounded-3xl p-10 hover:border-black/20 hover:bg-black hover:text-white transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] font-black tracking-widest uppercase text-black/20 group-hover:text-white/30 transition-colors">
                    {service.number}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-black/10 group-hover:text-white/40 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-black group-hover:text-white transition-colors mb-4">
                  {service.title}
                </h3>
                <p className="text-black/50 group-hover:text-white/60 font-medium leading-relaxed text-sm mb-8 transition-colors">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-black/5 group-hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-white/60 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TeamAlbum />

      {/* Testimonials Section */}
      <section className="py-32 px-6 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-4">Client Feedback</p>
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">
              Client<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Reviews</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The engineering quality at Webfolio is unlike any other agency we've worked with. They didn't just build a site, they built a high-performance engine for our business.",
                author: "Sarah Chen",
                role: "Founder, Quantum Alpha",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
              },
              {
                quote: "Sub-second load times and a world-class design system. Our conversion rates doubled within the first month of launch. Highly recommended.",
                author: "Marcus Thorne",
                role: "CTO, NextLevel Commerce",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2570&auto=format&fit=crop"
              },
              {
                quote: "They turned our complex vision into a simple, elegant reality. The communication was flawless and the technical execution was perfect.",
                author: "Elena Rodriguez",
                role: "Director, Helios Systems",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
              }
            ].map((t, i) => (
              <div key={i} className="p-10 border border-black/5 rounded-[2.5rem] bg-black/[0.02] flex flex-col justify-between hover:border-black/20 transition-all group">
                <p className="text-lg font-medium leading-relaxed text-black/70 mb-10 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">{t.author}</p>
                    <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-px h-24 bg-white/20 mb-8" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
            Inside Webfolio
          </h2>
          <p className="text-white/50 max-w-xl text-lg font-medium leading-relaxed mb-12">
            Stay updated with our latest project launches and agency insights.
          </p>
          <Link
            href="/blog"
            className="bg-white text-black px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2"
          >
            Explore Insights <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden border border-black/10" aria-hidden="true">
                <img src="/icon.png" alt="" className="w-full h-full object-cover grayscale" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter leading-none">
                WEBFOLIO<br/><span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>SOLUTIONS</span>
              </h3>
            </div>
            <p className="text-black/40 text-sm font-medium max-w-xs leading-relaxed">
              An engineering-first creative agency building high-performance digital products.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-black/20">Agency</h4>
            <nav className="flex flex-col gap-2" aria-label="Agency links">
              <Link href="/case-studies" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Projects</Link>
              <Link href="/blog" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Insights</Link>
              <Link href="/about" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Our Story</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-black/20">Contact</h4>
            <nav className="flex flex-col gap-2" aria-label="Contact links">
              <Link href="/contact" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Book a Call</Link>
              <Link href="/contact" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Send Inquiry</Link>
              <Link href="/privacy" className="text-sm font-bold text-black hover:text-black/40 transition-colors">Privacy Policy</Link>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-black/5 mt-20">
          <p className="text-[10px] font-bold tracking-widest uppercase text-black/30">
            © {new Date().getFullYear()} Webfolio Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-bold tracking-widest uppercase text-black/30 hover:text-black transition-colors" aria-label="Privacy Policy">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold tracking-widest uppercase text-black/30 hover:text-black transition-colors" aria-label="Terms of Service">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
