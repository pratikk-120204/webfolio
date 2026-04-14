'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white overflow-hidden">
      {/* Background Contrast elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-black/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-black/5" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-6"
        >
          <span className="text-black text-xs font-black tracking-[0.3em] uppercase border-b-2 border-black pb-1">
            EST. 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-black mb-8"
        >
          WEBFOLIO<br/>
          <span className="text-transparent border-black" style={{ WebkitTextStroke: '2px black' }}>SOLUTIONS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-xl mx-auto text-black/60 text-lg md:text-xl font-medium leading-relaxed tracking-tight"
        >
          Building high-performance digital experiences. 
          We engineer modern web architecture for the bold.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="/contact" className="bg-black text-white px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-black/90 transition-all active:scale-95 shadow-2xl">
            Start A Project
          </a>
          <button 
            onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-black px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase border-2 border-black/10 hover:border-black transition-all active:scale-95"
          >
            Explore The Album
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-black/30">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-black/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
