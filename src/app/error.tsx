'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Platform Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full text-center space-y-12">
        {/* Visual Mark */}
        <div className="relative inline-block">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 border-2 border-black rounded-[2rem] flex items-center justify-center"
          >
            <AlertCircle className="w-10 h-10 text-black" />
          </motion.div>
          <div className="absolute inset-0 bg-black/5 rounded-[2rem] blur-2xl -z-10" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
            System<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px black' }}>Interference</span>
          </h1>
          <p className="text-sm font-medium text-black/40 leading-relaxed">
            A technical anomaly has occurred within the platform's architecture. 
            Our engineering team has been notified.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95"
          >
            Initialize Recovery
            <RotateCcw className="w-4 h-4" />
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 border border-black/10 text-black px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/5 transition-all active:scale-95"
          >
            Abort to Home
            <Home className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Trace */}
        {error.digest && (
          <p className="text-[10px] font-mono text-black/20 uppercase tracking-widest">
            Trace ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
