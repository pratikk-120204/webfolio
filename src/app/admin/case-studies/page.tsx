'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface CaseStudy {
  id: string
  title: string
  category: string
  description: string
  full_description: string
  image: string
  tags: string[]
  year: string
  deliverables: string[]
  results: string[]
}

const EMPTY: Omit<CaseStudy, 'id'> = {
  title: '', category: '', description: '', full_description: '',
  image: '', tags: [], year: new Date().getFullYear().toString(),
  deliverables: [], results: [],
}

type SaveState = 'idle' | 'saving' | 'success' | 'error'

// Seeded fallback data to pre-populate when Supabase is empty
const SEED_STUDIES: CaseStudy[] = [
  { id: 'eco-tracker', title: 'Eco-Expense Tracker PWA', category: 'Full Stack Development', description: 'A robust progressive web app with offline capabilities and real-time synchronization.', full_description: 'Built as a full-featured Progressive Web App (PWA) with offline-first architecture using IndexedDB.', image: 'https://images.unsplash.com/photo-1554224155-169641357599?q=80&w=2670&auto=format&fit=crop', tags: ['Next.js', 'PWA', 'Supabase'], year: '2026', deliverables: ['Progressive Web App', 'Offline Architecture', 'Push Notifications'], results: ['100/100 Lighthouse Score', 'Full offline functionality'] },
  { id: 'agency-alpha', title: 'Agency Alpha Branding', category: 'UI/UX Design', description: 'Complete digital identity rebranding for a high-growth tech consultancy.', full_description: 'Complete overhaul of digital identity from color system and typography through to motion language.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop', tags: ['Branding', 'Figma', 'Design System'], year: '2026', deliverables: ['Brand Identity', 'Figma Library', 'Coded Components'], results: ['Full design-to-code handoff'] },
]

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newId, setNewId] = useState('')

  useEffect(() => {
    fetch('/api/case-studies')
      .then(r => r.json())
      .then(data => {
        // If no data in DB yet, show seeded fallbacks
        setStudies(data.studies?.length > 0 ? data.studies : SEED_STUDIES)
        setLoading(false)
      })
      .catch(() => { setStudies(SEED_STUDIES); setLoading(false) })
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete "${studies.find(s => s.id === id)?.title}"?`)) return
    await fetch('/api/case-studies', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setStudies(prev => prev.filter(s => s.id !== id))
  }

  const handleAdd = () => {
    const slug = newId.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (!slug) return
    setStudies(prev => [{ id: slug, ...EMPTY }, ...prev])
    setExpandedId(slug)
    setShowNew(false)
    setNewId('')
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-black/5 pb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
            Case<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Studies</span>
          </h1>
          <p className="text-black/40 font-medium mt-4 text-sm">Manage your portfolio projects. Changes reflect live on the public site.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/case-studies" target="_blank"
            className="flex items-center gap-2 border border-black/10 text-black px-5 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:border-black/30 transition-all">
            <ExternalLink className="w-4 h-4" /> Preview
          </Link>
          <button onClick={() => setShowNew(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* SQL setup */}
      <div className="border border-black/5 rounded-2xl p-5 bg-black/[0.02]">
        <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">One-Time Supabase Setup</p>
        <pre className="text-xs text-black/40 overflow-x-auto leading-relaxed">{`CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, category TEXT,
  description TEXT, full_description TEXT, image TEXT,
  tags TEXT[], year TEXT, deliverables TEXT[], results TEXT[],
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
      </div>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="border-2 border-dashed border-black/20 rounded-3xl p-8 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-black/40">Project Slug (URL ID)</p>
            <p className="text-xs text-black/30 font-medium">e.g. "quantum-shop" → /case-studies/quantum-shop</p>
            <div className="flex gap-3">
              <input type="text" value={newId} onChange={e => setNewId(e.target.value)} placeholder="my-project"
                className="flex-1 bg-black/5 border-2 border-transparent rounded-2xl py-3 px-5 text-black font-bold focus:outline-none focus:border-black transition-all" />
              <button onClick={handleAdd} className="bg-black text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all">Create</button>
              <button onClick={() => setShowNew(false)} className="px-6 py-3 rounded-2xl border border-black/10 font-black text-xs tracking-widest uppercase hover:bg-black/5 transition-all">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-black/30">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-bold text-sm">Loading projects...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {studies.map(study => (
            <StudyCard key={study.id} study={study} isExpanded={expandedId === study.id}
              onToggle={() => setExpandedId(expandedId === study.id ? null : study.id)}
              onDelete={() => handleDelete(study.id)}
              onSaved={updated => setStudies(prev => prev.map(s => s.id === updated.id ? updated : s))} />
          ))}
        </div>
      )}
    </div>
  )
}

function StudyCard({ study, isExpanded, onToggle, onDelete, onSaved }: {
  study: CaseStudy; isExpanded: boolean; onToggle: () => void; onDelete: () => void; onSaved: (s: CaseStudy) => void
}) {
  const [form, setForm] = useState<CaseStudy>(study)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [saveMsg, setSaveMsg] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [deliverableInput, setDeliverableInput] = useState('')
  const [resultInput, setResultInput] = useState('')

  const f = (field: keyof CaseStudy, val: string | string[]) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSave = async () => {
    setSaveState('saving')
    const res = await fetch('/api/case-studies', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    // If it's a new item (not in DB yet), try POST first
    if (!res.ok) {
      const postRes = await fetch('/api/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const d = await postRes.json()
      if (!postRes.ok) { setSaveState('error'); setSaveMsg(d.error ?? 'Save failed.'); return }
    }
    setSaveState('success'); setSaveMsg('Saved!'); onSaved(form)
    setTimeout(() => setSaveState('idle'), 3000)
  }

  const addChip = (field: 'tags' | 'deliverables' | 'results', val: string, clear: () => void) => {
    const v = val.trim()
    if (v && !(form[field] as string[]).includes(v)) { f(field, [...(form[field] as string[]), v]); clear() }
  }
  const removeChip = (field: 'tags' | 'deliverables' | 'results', val: string) =>
    f(field, (form[field] as string[]).filter(x => x !== val))

  return (
    <div className="border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 transition-all">
      <div 
        onClick={onToggle} 
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        tabIndex={0}
        role="button"
        className="w-full flex items-center gap-6 p-6 hover:bg-black/[0.02] transition-colors cursor-pointer outline-none focus:bg-black/[0.02]"
      >
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-black/10 flex-shrink-0 bg-black/5">
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image} alt={form.title} className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-full h-full bg-black/5" />
          )}
        </div>
        <div className="flex-1 text-left">
          <p className="font-black text-black text-lg tracking-tight">{form.title || <span className="text-black/30 font-medium">Untitled Project</span>}</p>
          <p className="text-xs font-bold text-black/40">{form.category || 'No category'} · {form.year} · /case-studies/{form.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/case-studies/${form.id}`} target="_blank" onClick={e => e.stopPropagation()}
            className="p-2 text-black/20 hover:text-black hover:bg-black/5 rounded-xl transition-colors">
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button onClick={e => { e.stopPropagation(); onDelete() }}
            className="p-2 text-black/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-black/30" /> : <ChevronDown className="w-5 h-5 text-black/30" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="border-t border-black/5 p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Project Title" value={form.title} onChange={v => f('title', v)} placeholder="My Amazing Project" />
                <Field label="Category" value={form.category} onChange={v => f('category', v)} placeholder="Full Stack Development" />
                <Field label="Year" value={form.year} onChange={v => f('year', v)} placeholder="2026" />
                <Field label="Cover Image URL" value={form.image} onChange={v => f('image', v)} placeholder="https://..." />
                <div className="md:col-span-2">
                  <Field label="Short Description (shown on project card)" value={form.description} onChange={v => f('description', v)} placeholder="One-line project summary..." multiline rows={2} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Full Case Study Write-Up" value={form.full_description} onChange={v => f('full_description', v)} placeholder="Detailed project story, challenges, approach..." multiline rows={5} />
                </div>
              </div>

              {/* Chips: Tags */}
              <ChipField label="Tech Tags" chips={form.tags} input={tagInput} onInputChange={setTagInput}
                onAdd={() => addChip('tags', tagInput, () => setTagInput(''))}
                onRemove={v => removeChip('tags', v)} placeholder="Next.js" />

              {/* Chips: Deliverables */}
              <ChipField label="Deliverables" chips={form.deliverables} input={deliverableInput} onInputChange={setDeliverableInput}
                onAdd={() => addChip('deliverables', deliverableInput, () => setDeliverableInput(''))}
                onRemove={v => removeChip('deliverables', v)} placeholder="Custom Dashboard" />

              {/* Chips: Results */}
              <ChipField label="Results / Outcomes" chips={form.results} input={resultInput} onInputChange={setResultInput}
                onAdd={() => addChip('results', resultInput, () => setResultInput(''))}
                onRemove={v => removeChip('results', v)} placeholder="2x conversion rate" />

              {/* Save Bar */}
              <div className="border-t border-black/5 pt-6 flex items-center justify-between gap-4">
                <AnimatePresence>
                  {saveState !== 'idle' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 text-sm font-bold ${saveState === 'success' ? 'text-black' : 'text-red-500'}`}>
                      {saveState === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                      {saveState === 'success' && <CheckCircle2 className="w-4 h-4" />}
                      {saveState === 'error' && <AlertCircle className="w-4 h-4" />}
                      {saveMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
                <button onClick={handleSave} disabled={saveState === 'saving'}
                  className="ml-auto px-8 py-3 bg-black text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95 disabled:opacity-40 flex items-center gap-2">
                  {saveState === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, multiline, rows }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean; rows?: number
}) {
  const cls = "w-full bg-black/5 border-2 border-transparent rounded-2xl py-3 px-5 text-black font-medium text-sm focus:outline-none focus:border-black transition-all placeholder:text-black/20 resize-none"
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/30">{label}</label>
      {multiline
        ? <textarea className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows ?? 3} />
        : <input className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  )
}

function ChipField({ label, chips, input, onInputChange, onAdd, onRemove, placeholder }: {
  label: string; chips: string[]; input: string; onInputChange: (v: string) => void;
  onAdd: () => void; onRemove: (v: string) => void; placeholder: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-black/30">{label}</p>
      <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
        {chips.map(c => (
          <span key={c} className="flex items-center gap-1.5 px-3 py-1 bg-black/5 rounded-full text-xs font-bold text-black">
            {c}
            <button onClick={() => onRemove(c)} className="text-black/30 hover:text-black transition-colors">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => onInputChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && onAdd()}
          placeholder={placeholder}
          className="flex-1 bg-black/5 border-2 border-transparent rounded-xl py-2 px-4 text-black/70 text-sm font-medium focus:outline-none focus:border-black transition-all placeholder:text-black/20" />
        <button onClick={onAdd} className="px-4 py-2 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black/80 transition-all">Add</button>
      </div>
    </div>
  )
}
