'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Big 404 */}
          <div className="relative">
            <p className="text-[20vw] font-black text-black/5 leading-none select-none tracking-tighter">
              404
            </p>
            <div className="absolute inset-0 flex items-center">
              <div>
                <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">
                  Error 404
                </p>
                <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
                  Page Not<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Found</span>
                </h1>
              </div>
            </div>
          </div>

          <p className="text-black/40 font-medium max-w-sm">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="text-black/40 hover:text-black font-black text-xs tracking-widest uppercase transition-colors"
            >
              Contact Us →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
