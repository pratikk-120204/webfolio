'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/case-studies', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Don't show on admin pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null

  return (
    <>
      {/* Floating Nav Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5 md:hidden">
        <Link href="/" className="font-black text-xs tracking-[0.2em] uppercase text-black">
          WEBFOLIO
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 hover:bg-black/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
        </button>
      </div>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className="h-[65px] md:hidden" />

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <div className="absolute top-4 left-6 font-black text-xs tracking-[0.2em] uppercase text-black/20">
              WEBFOLIO SOLUTIONS
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-5xl font-black tracking-tighter transition-colors ${
                    pathname === link.href ? 'text-black' : 'text-black/20 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-black text-white px-8 py-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
