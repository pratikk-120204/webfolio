'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ChevronRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react'

const SERVICES = [
  'Web Development',
  'UI/UX Design',
  'E-commerce Solutions',
  'Project Consultation',
  'Full Agency Partner'
]

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [contact, setContact] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          message: `Booking for ${service}`,
          service,
          date,
          time
        }),
      })

      if (res.ok) {
        setStep(5)
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-black/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col">
      {/* Decorative Minimal Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500" />

      <div className="flex items-center gap-4 mb-12">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-black' : 'bg-black/5'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                Select a Service
                <Sparkles className="w-5 h-5 text-black/50" />
              </h3>
              <p className="text-black/50 text-sm font-medium">What can Webfolio Solutions build for you?</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {SERVICES.map((item) => (
                <button
                  key={item}
                  onClick={() => { setService(item); setStep(2) }}
                  className={`text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group/btn ${
                    service === item 
                      ? 'bg-black border-black text-white' 
                      : 'bg-white border-black/5 text-black/60 hover:border-black hover:text-black font-medium'
                  }`}
                >
                  <span className="font-bold tracking-tight">{item}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${service === item ? 'text-white' : 'text-black/30'}`} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="text-black/40 hover:text-black text-xs font-black uppercase tracking-widest transition-colors">← Back</button>
              <span className="text-[10px] font-black text-black bg-black/5 px-3 py-1 rounded-full uppercase tracking-[0.2em]">{service}</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                Choose a Date
                <Calendar className="w-5 h-5 text-black/50" />
              </h3>
              <p className="text-black/50 text-sm font-medium">When should we discuss your project requirements?</p>
            </div>

            <input 
              type="date" 
              className="w-full bg-black/5 border-2 border-transparent rounded-2xl py-5 px-6 text-black font-bold focus:outline-none focus:border-black transition-all"
              onChange={(e) => { setDate(e.target.value); setStep(3) }}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(2)} className="text-black/40 hover:text-black text-xs font-black uppercase tracking-widest transition-colors">← Back</button>
              <span className="text-[10px] font-black text-black bg-black/5 px-3 py-1 rounded-full uppercase tracking-[0.2em]">{date}</span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                Select Time
                <Clock className="w-5 h-5 text-black/50" />
              </h3>
              <p className="text-black/50 text-sm font-medium">All times center-aligned for your convenience.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setTime(t); setStep(4) }}
                  className={`p-5 rounded-2xl border-2 transition-all text-center font-bold tracking-tight ${
                    time === t 
                      ? 'bg-black border-black text-white' 
                      : 'bg-white border-black/5 text-black/60 hover:border-black hover:text-black'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(3)} className="text-black/40 hover:text-black text-xs font-black uppercase tracking-widest transition-colors">← Back</button>
              <span className="text-[10px] font-black text-black bg-black/5 px-3 py-1 rounded-full uppercase tracking-[0.2em]">{time}</span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                Your Details
              </h3>
              <p className="text-black/50 text-sm font-medium">Where should we send the confirmation?</p>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-black/5 border-2 border-transparent rounded-2xl py-5 px-6 text-black font-medium focus:outline-none focus:border-black transition-all"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-black/5 border-2 border-transparent rounded-2xl py-5 px-6 text-black font-medium focus:outline-none focus:border-black transition-all"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={!contact.name || !contact.email || loading}
              className="w-full mt-8 bg-black hover:bg-black/90 text-white font-black text-xs tracking-[0.2em] uppercase py-5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
            </button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-black tracking-tighter uppercase">Booking Confirmed</h3>
              <p className="text-black/60 font-medium">
                You're scheduled for <strong className="text-black">{service}</strong> on <strong className="text-black">{date}</strong> at <strong className="text-black">{time}</strong>.
              </p>
            </div>
            <p className="text-xs text-black/40 font-bold uppercase tracking-widest bg-black/5 px-4 py-2 rounded-full">
              Confirmation Dispatched To: {contact.email}
            </p>
            <button
              onClick={() => { setStep(1); setService(''); setDate(''); setTime(''); setContact({ name: '', email: '' }) }}
              className="text-black font-black text-xs tracking-[0.2em] uppercase hover:underline pt-4"
            >
              Book Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
