'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, Filter, CheckCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  service?: string
  date?: string
  time?: string
  message?: string
  type?: string
  created_at: string
}

export default function BookingsTabs({ leads }: { leads: Lead[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'enquiry' | 'booking'>('all')

  const filtered = leads.filter((l) => {
    if (activeTab === 'all') return true
    if (activeTab === 'booking') return l.type === 'booking'
    return l.type !== 'booking'
  })

  return (
    <div className="space-y-6">
      <div className="flex bg-black/5 p-1 rounded-2xl w-fit">
        {(['all', 'enquiry', 'booking'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-black text-white' : 'text-black/30 hover:text-black'
            }`}
          >
            {tab} {tab !== 'all' && `(${leads.filter(l => tab === 'booking' ? l.type === 'booking' : l.type !== 'booking').length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((lead) => {
          const date = lead.created_at
            ? new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : 'Unknown'

          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-black/5 rounded-3xl p-8 hover:border-black/20 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-black tracking-tighter mb-1">{lead.name || 'Anonymous'}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-black/40 font-bold">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {lead.email}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {date}</span>
                        {lead.service && <span>{lead.service}</span>}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      lead.type === 'booking'
                        ? 'bg-black text-white border-black'
                        : 'border-black/10 text-black/40'
                    }`}>
                      {lead.type === 'booking' ? 'Booking' : 'Enquiry'}
                    </span>
                  </div>

                  {lead.message && (
                    <div className="bg-black/[0.03] p-5 rounded-2xl">
                      <p className="text-[10px] uppercase tracking-widest text-black/30 font-black mb-2">Message</p>
                      <p className="text-sm text-black/60 font-medium italic">"{lead.message}"</p>
                    </div>
                  )}

                  {(lead.date || lead.time) && (
                    <div className="grid grid-cols-2 gap-4 bg-black/[0.03] p-5 rounded-2xl">
                      {lead.date && <div><p className="text-[10px] uppercase tracking-widest text-black/30 font-black mb-1">Date</p><p className="text-sm font-bold text-black">{lead.date}</p></div>}
                      {lead.time && <div><p className="text-[10px] uppercase tracking-widest text-black/30 font-black mb-1">Time</p><p className="text-sm font-bold text-black">{lead.time}</p></div>}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col gap-3 justify-end">
                  <a
                    href={`mailto:${lead.email}?subject=Re: Your enquiry – Webfolio Solutions`}
                    className="flex-1 md:flex-none px-5 py-3 bg-black hover:bg-black/80 rounded-2xl text-white transition-all flex items-center justify-center gap-2 font-black text-xs tracking-widest uppercase"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-black/10 rounded-3xl">
            <Filter className="w-6 h-6 text-black/20 mx-auto mb-4" />
            <p className="text-sm font-bold text-black/30">No leads matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
