'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-16">
        <div>
          <p className="text-[10px] text-white/30 font-black tracking-[0.3em] uppercase mb-3">Private Access</p>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
            WEBFOLIO<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>SOLUTIONS</span>
          </h1>
        </div>
        <div>
          <div className="w-16 h-px bg-white/10 mb-6" />
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            Exclusive access for agency team members.
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-10">
            <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Welcome Back</p>
            <h2 className="text-4xl font-black tracking-tighter text-black">Sign In</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/5 border-2 border-transparent rounded-2xl py-4 px-5 text-black font-medium focus:outline-none focus:border-black transition-all placeholder:text-black/20"
                placeholder="pratik@webfolio.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/30">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/5 border-2 border-transparent rounded-2xl py-4 px-5 text-black font-medium focus:outline-none focus:border-black transition-all placeholder:text-black/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-600 text-xs font-bold bg-red-50 border border-red-100 p-4 rounded-2xl"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-black/80 text-white font-black text-xs tracking-[0.2em] uppercase py-5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Access Command Center'}
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold tracking-widest uppercase text-black/20">
            Webfolio Solutions · Agency Internal
          </p>
        </motion.div>
      </div>
    </div>
  )
}
