'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, Loader2, User, Mail, MessageSquare } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/5 border border-black/10 p-12 rounded-[40px] flex flex-col items-center text-center space-y-6"
      >
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-black text-black tracking-tighter">Message Sent</h3>
        <p className="text-black/60 font-medium">
          The Webfolio Solutions engineering team has been notified. We will reach out shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-black font-black text-xs tracking-widest uppercase hover:underline pt-4"
        >
          Send Another
        </button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white border border-black/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
      {/* Decorative Minimal Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10 pt-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Identity</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/5 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-all font-medium"
              placeholder="Full Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black/5 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-all font-medium"
              placeholder="Email Address"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-black/30" />
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-black/5 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-all resize-none font-medium"
              placeholder="Tell us about your project..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black text-white font-black text-xs tracking-widest py-5 rounded-2xl uppercase transition-all active:scale-[0.98] hover:bg-black/80 disabled:opacity-50 flex items-center justify-center gap-3 mt-8"
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Initialize Request</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
