'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Upload, Trash2, Plus, CheckCircle2, AlertCircle,
  Loader2, ChevronDown, ChevronUp, User
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface TeamMember {
  id: string
  name: string
  role: string
  summary: string
  bio: string
  long_bio: string
  specialties: string[]
  image_url: string
  social_twitter: string
  social_linkedin: string
  social_github: string
  email: string
}

const EMPTY_MEMBER: Omit<TeamMember, 'id'> = {
  name: '', role: '', summary: '', bio: '', long_bio: '',
  specialties: [], image_url: '',
  social_twitter: '', social_linkedin: '', social_github: '', email: '',
}

type SaveState = 'idle' | 'saving' | 'success' | 'error'

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newId, setNewId] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    const res = await fetch('/api/team/list')
    const data = await res.json()
    setMembers(data.members ?? [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(`Remove "${members.find(m => m.id === id)?.name}"? This cannot be undone.`)) return
    await fetch('/api/team/member', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  const handleAddMember = () => {
    const slug = newId.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (!slug) return
    const newMember: TeamMember = { id: slug, ...EMPTY_MEMBER }
    setMembers(prev => [newMember, ...prev])
    setExpandedId(slug)
    setShowAddForm(false)
    setNewId('')
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-black/5 pb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Admin</p>
          <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
            Team<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Management</span>
          </h1>
          <p className="text-black/40 font-medium mt-4 text-sm">
            Edit names, roles, bios, photos, and social links for each team member.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Add New Member Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-2 border-dashed border-black/20 rounded-3xl p-8 space-y-4"
          >
            <p className="text-xs font-black uppercase tracking-widest text-black/40">New Member ID (URL slug)</p>
            <p className="text-xs text-black/30 font-medium">e.g. "john-doe" → will be accessible at /team/john-doe</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={newId}
                onChange={e => setNewId(e.target.value)}
                placeholder="john-doe"
                className="flex-1 bg-black/5 border-2 border-transparent rounded-2xl py-3 px-5 text-black font-bold focus:outline-none focus:border-black transition-all"
              />
              <button onClick={handleAddMember} className="bg-black text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all">
                Create
              </button>
              <button onClick={() => setShowAddForm(false)} className="px-6 py-3 rounded-2xl border border-black/10 font-black text-xs tracking-widest uppercase hover:bg-black/5 transition-all">
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Setup SQL Card */}
      <div className="border border-black/5 rounded-3xl p-6 bg-black/[0.02]">
        <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">One-Time Supabase Setup</p>
        <pre className="text-xs text-black/50 overflow-x-auto leading-relaxed">{`ALTER TABLE team_members ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS long_bio TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS specialties TEXT[];
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS social_twitter TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS social_linkedin TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS social_github TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS email TEXT;`}</pre>
      </div>

      {/* Members List */}
      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-black/30">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-bold text-sm">Loading team members...</span>
        </div>
      ) : members.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-black/10 rounded-3xl">
          <User className="w-8 h-8 text-black/20 mx-auto mb-4" />
          <p className="font-bold text-black/30 text-sm">No team members yet.</p>
          <p className="text-xs text-black/20 mt-1">Click "Add Member" above to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isExpanded={expandedId === member.id}
              onToggle={() => setExpandedId(expandedId === member.id ? null : member.id)}
              onDelete={() => handleDelete(member.id)}
              onSaved={(updated) => setMembers(prev => prev.map(m => m.id === updated.id ? updated : m))}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({
  member, isExpanded, onToggle, onDelete, onSaved
}: {
  member: TeamMember
  isExpanded: boolean
  onToggle: () => void
  onDelete: () => void
  onSaved: (m: TeamMember) => void
}) {
  const [form, setForm] = useState<TeamMember>(member)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [saveMsg, setSaveMsg] = useState('')
  const [photoPreview, setPhotoPreview] = useState<string>(member.image_url)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [specialtyInput, setSpecialtyInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (field: keyof TeamMember, val: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: val }))

  const handleSave = async () => {
    setSaveState('saving')
    setSaveMsg('')
    const res = await fetch('/api/team/member', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) {
      setSaveState('error')
      setSaveMsg(data.error ?? 'Save failed.')
    } else {
      setSaveState('success')
      setSaveMsg('Saved successfully.')
      onSaved(form)
      setTimeout(() => setSaveState('idle'), 3000)
    }
  }

  const handlePhotoUpload = async (file: File) => {
    setPhotoUploading(true)
    // Show preview
    const reader = new FileReader()
    reader.onload = e => setPhotoPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    const fd = new FormData()
    fd.append('file', file)
    fd.append('memberId', form.id)
    fd.append('memberName', form.name)
    fd.append('memberRole', form.role)

    const res = await fetch('/api/team/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.publicUrl) {
      setForm(prev => ({ ...prev, image_url: data.publicUrl }))
      onSaved({ ...form, image_url: data.publicUrl })
    }
    setPhotoUploading(false)
  }

  const addSpecialty = () => {
    const val = specialtyInput.trim()
    if (val && !form.specialties.includes(val)) {
      update('specialties', [...form.specialties, val])
      setSpecialtyInput('')
    }
  }

  const removeSpecialty = (s: string) =>
    update('specialties', form.specialties.filter(x => x !== s))

  return (
    <div className="border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 transition-all">
      {/* Collapsed Header */}
      <div
        onClick={onToggle}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        tabIndex={0}
        role="button"
        className="w-full flex items-center gap-6 p-6 hover:bg-black/[0.02] transition-colors cursor-pointer outline-none focus:bg-black/[0.02]"
      >
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 flex-shrink-0 bg-black/5">
          {photoPreview ? (
            <Image src={photoPreview} alt={form.name || 'Member'} fill className="object-cover grayscale" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-black/20" />
            </div>
          )}
        </div>
        <div className="flex-1 text-left">
          <p className="font-black text-black text-lg tracking-tight">{form.name || <span className="text-black/30 font-medium">Unnamed Member</span>}</p>
          <p className="text-xs font-bold text-black/40">{form.role || 'No role set'} · ID: {form.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="p-2 text-black/20 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-black/30" /> : <ChevronDown className="w-5 h-5 text-black/30" />}
        </div>
      </div>

      {/* Expanded Form */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/5 p-8 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Photo Column */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Profile Photo</p>
                  <div className="relative aspect-square rounded-3xl overflow-hidden border border-black/10 bg-black/5">
                    {photoPreview ? (
                      <Image src={photoPreview} alt={form.name} fill className="object-cover grayscale" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-black/20" />
                      </div>
                    )}
                    {photoUploading && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-black" />
                      </div>
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-black/10 hover:border-black/30 rounded-2xl p-4 cursor-pointer transition-all">
                    <Upload className="w-4 h-4 text-black/40" />
                    <span className="text-xs font-black uppercase tracking-widest text-black/40">
                      {photoUploading ? 'Uploading...' : 'Change Photo'}
                    </span>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f) }}
                    />
                  </label>
                </div>

                {/* Fields Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" value={form.name} onChange={v => update('name', v)} placeholder="Pratik Kadole" />
                    <Field label="Job Title / Role" value={form.role} onChange={v => update('role', v)} placeholder="CEO / Founder" />
                    <Field label="Email" value={form.email} onChange={v => update('email', v)} placeholder="pratik@webfolio.com" type="email" />
                  </div>

                  <Field
                    label="Short Summary (shown on team card)"
                    value={form.summary}
                    onChange={v => update('summary', v)}
                    placeholder="Brief one-liner shown under the photo on the homepage..."
                    multiline rows={2}
                  />
                  <Field
                    label="Profile Bio (shown on profile page)"
                    value={form.bio}
                    onChange={v => update('bio', v)}
                    placeholder="Main bio shown on the team member profile..."
                    multiline rows={3}
                  />
                  <Field
                    label="Extended Bio (full story)"
                    value={form.long_bio}
                    onChange={v => update('long_bio', v)}
                    placeholder="Full background, career history, philosophy..."
                    multiline rows={4}
                  />

                  {/* Specialties */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Specialties</p>
                    <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                      {form.specialties.map(s => (
                        <span key={s} className="flex items-center gap-1.5 px-3 py-1 bg-black/5 rounded-full text-xs font-bold text-black">
                          {s}
                          <button onClick={() => removeSpecialty(s)} className="text-black/30 hover:text-black transition-colors">×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={specialtyInput}
                        onChange={e => setSpecialtyInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addSpecialty()}
                        placeholder="Engineering Strategy"
                        className="flex-1 bg-black/5 border-2 border-transparent rounded-xl py-2 px-4 text-black/70 text-sm font-medium focus:outline-none focus:border-black transition-all"
                      />
                      <button onClick={addSpecialty} className="px-4 py-2 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest">Add</button>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Social Links</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Field label="X / Twitter URL" value={form.social_twitter} onChange={v => update('social_twitter', v)} placeholder="https://x.com/..." />
                      <Field label="LinkedIn URL" value={form.social_linkedin} onChange={v => update('social_linkedin', v)} placeholder="https://linkedin.com/in/..." />
                      <Field label="GitHub URL" value={form.social_github} onChange={v => update('social_github', v)} placeholder="https://github.com/..." />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="border-t border-black/5 pt-6 flex items-center justify-between gap-4">
                <AnimatePresence>
                  {saveState !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 text-sm font-bold ${saveState === 'success' ? 'text-black' : 'text-red-500'}`}
                    >
                      {saveState === 'saving' && <Loader2 className="w-4 h-4 animate-spin" />}
                      {saveState === 'success' && <CheckCircle2 className="w-4 h-4" />}
                      {saveState === 'error' && <AlertCircle className="w-4 h-4" />}
                      {saveMsg}
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={handleSave}
                  disabled={saveState === 'saving'}
                  className="ml-auto px-8 py-3 bg-black text-white rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-black/80 transition-all active:scale-95 disabled:opacity-40 flex items-center gap-2"
                >
                  {saveState === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
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

// ─── Reusable Field ───────────────────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder, multiline, rows, type
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  type?: string
}) {
  const cls = "w-full bg-black/5 border-2 border-transparent rounded-2xl py-3 px-5 text-black font-medium text-sm focus:outline-none focus:border-black transition-all placeholder:text-black/20 resize-none"
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/30">{label}</label>
      {multiline ? (
        <textarea className={cls} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows ?? 3} />
      ) : (
        <input className={cls} type={type ?? 'text'} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  )
}
