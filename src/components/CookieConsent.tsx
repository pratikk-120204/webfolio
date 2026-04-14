'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Check } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[200]"
        >
          <div className="bg-white border border-black/10 shadow-2xl rounded-[2rem] p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-black">Compliance</h4>
                  <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest leading-none mt-1">Global Standard 2.0</p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-black/20 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-medium text-black/50 leading-relaxed">
              We use technology to engineer your digital experience. By continuing, you acknowledge our minimalist data processing standards.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={accept}
                className="flex-1 bg-black text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all flex items-center justify-center gap-2"
              >
                Acknowledge
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 rounded-xl border border-black/10 text-black/40 font-black text-xs tracking-widest uppercase hover:bg-black/5 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
