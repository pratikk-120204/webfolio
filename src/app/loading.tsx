'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="relative w-24 h-24">
        {/* Architectural Grid Background */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-black/5" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/5" />
        
        {/* Animated Box */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
          }}
          className="w-full h-full border-2 border-black flex items-center justify-center p-4"
        >
          <div className="w-full h-full bg-black/5 rounded-sm" />
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-black w-max"
        >
          Initializing...
        </motion.p>
      </div>
    </div>
  )
}
