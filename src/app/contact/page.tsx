'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import BookingForm from '@/components/BookingForm'
import { Sparkles, ArrowRight, MessageSquare, Calendar } from 'lucide-react'

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<'contact' | 'booking'>('contact')

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Background Decor: Minimal Architectural Lines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-black ml-[10%]" />
        <div className="absolute top-0 left-0 w-px h-full bg-black ml-[90%]" />
        <div className="absolute top-[20%] left-0 w-full h-px bg-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-8"
          >
            <span className="text-black text-xs font-black tracking-[0.3em] uppercase border-b-2 border-black pb-1">
              CONTACT US
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-12"
          >
            START YOUR<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>PROJECT</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-black/50 font-medium tracking-tight max-w-2xl mx-auto"
          >
            Choose your preferred method of digital transformation. 
            We build high-performance architecture for those who lead.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Info Side */}
          <div className="w-full lg:w-1/3 space-y-16">
            <div className="space-y-8">
              <h2 className="text-xs font-black tracking-[0.2em] uppercase text-black/30">The Agency Standard</h2>
              <div className="space-y-10">
                <ProcessStep number="01" title="DISCOVERY" description="Deep-dive into your core values and project engineering goals." />
                <ProcessStep number="02" title="STRATEGY" description="High-performance concepts built for modern business." />
                <ProcessStep number="03" title="EXECUTION" description="Building robust, high-performance digital products." />
              </div>
            </div>

            <div className="p-10 bg-black/5 border border-black/5 rounded-[40px] space-y-8">
              <h3 className="font-black text-sm tracking-widest uppercase">Office Direct</h3>
              <div className="space-y-6 text-black/60">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-30">Email</label>
                  <p className="font-bold text-black lg:text-lg">hello@webfolio.solutions</p>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-30">Social</label>
                  <p className="font-bold text-black border-b border-black w-fit">Follow The Storyline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <div className="flex bg-black/5 p-2 rounded-full border border-black/5 mb-12 w-fit">
              <button
                onClick={() => setActiveForm('contact')}
                className={`px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase transition-all ${
                  activeForm === 'contact' 
                    ? 'bg-black text-white shadow-2xl' 
                    : 'text-black/40 hover:text-black'
                }`}
              >
                Send Inquiry
              </button>
              <button
                onClick={() => setActiveForm('booking')}
                className={`px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase transition-all ${
                  activeForm === 'booking' 
                    ? 'bg-black text-white shadow-2xl' 
                    : 'text-black/40 hover:text-black'
                }`}
              >
                Book A Call
              </button>
            </div>

            <motion.div
              key={activeForm}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {activeForm === 'contact' ? <ContactForm /> : <BookingForm />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-4 group">
      <span className="text-black/20 font-black text-xl group-hover:text-black transition-colors">{number}</span>
      <div>
        <h4 className="font-black text-black text-sm tracking-widest uppercase mb-1">{title}</h4>
        <p className="text-sm text-black/50 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
