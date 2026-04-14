'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Send, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface ComposePostProps {
  onPublished?: (post: Record<string, unknown>) => void
  authorName?: string
  authorRole?: string
}

export default function ComposePost({ onPublished, authorName = 'Pratik Kadole', authorRole = 'CEO / Founder' }: ComposePostProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setStatus('loading')
    setMsg('')

    try {
      // If there's an image, upload it first to Supabase storage
      let image_url: string | null = null
      if (image) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('path', `blog/${Date.now()}_${image.name}`)
        const uploadRes = await fetch('/api/blog/upload', { method: 'POST', body: fd })
        const uploadData = await uploadRes.json()
        if (uploadData.url) image_url = uploadData.url
      }

      // Create the post
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image_url, author_name: authorName, author_role: authorRole }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMsg(data.error ?? 'Failed to publish.')
      } else {
        setStatus('success')
        setMsg('Post published!')
        setTitle('')
        setContent('')
        handleRemoveImage()
        onPublished?.(data.post)
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setMsg('Something went wrong.')
    }
  }

  return (
    <div className="border border-black/10 rounded-3xl p-8 hover:border-black/20 transition-all">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Post title (optional)"
          className="w-full bg-transparent border-none focus:ring-0 text-2xl font-black text-black placeholder:text-black/15 tracking-tighter"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's happening at Webfolio? Share an update, project insight, or industry thought..."
          className="w-full bg-transparent border-none focus:ring-0 text-base text-black placeholder:text-black/20 resize-none min-h-[120px] font-medium"
        />

        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-black/10"
            >
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button type="button" onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-black rounded-full text-white backdrop-blur-sm transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4 border-t border-black/5">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="p-2 text-black/30 hover:text-black hover:bg-black/5 rounded-xl transition-colors" title="Add Image">
              <ImageIcon className="w-5 h-5" />
            </button>
            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />

            <AnimatePresence>
              {status !== 'idle' && (
                <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className={`text-xs font-bold flex items-center gap-1.5 ${status === 'success' ? 'text-black' : status === 'error' ? 'text-red-500' : 'text-black/40'}`}>
                  {status === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {status === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {status === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
                  {msg}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button type="submit" disabled={status === 'loading' || !content.trim()}
            className="bg-black hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-2 transition-all active:scale-95">
            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Publish</span>
          </button>
        </div>
      </form>
    </div>
  )
}
