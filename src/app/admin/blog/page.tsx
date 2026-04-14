'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ComposePost from '@/components/ComposePost'
import { Trash2, Eye, EyeOff, Loader2, User } from 'lucide-react'
import Image from 'next/image'

interface Post {
  id: string
  title?: string
  content: string
  image_url?: string
  author_name: string
  author_role: string
  published: boolean
  created_at: string
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/blog')
    const data = await res.json()
    setPosts(data.posts ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handlePublished = (newPost: Record<string, unknown>) => {
    setPosts(prev => [newPost as unknown as Post, ...prev])
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (res.ok) setPosts(prev => prev.filter(p => p.id !== id))
  }

  const handleTogglePublished = async (post: Post) => {
    await fetch(`/api/blog/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    })
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-black/5 pb-8">
        <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-3">Agency</p>
        <h1 className="text-5xl font-black tracking-tighter text-black leading-none">
          Blog<br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Insights</span>
        </h1>
        <p className="text-black/40 font-medium mt-4 text-sm">
          Publish updates and insights. Posts appear live on the public /blog page.
        </p>
      </div>

      {/* SQL setup note */}
      <div className="border border-black/5 rounded-2xl p-5 bg-black/[0.02]">
        <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">One-Time Supabase Setup</p>
        <pre className="text-xs text-black/40 overflow-x-auto leading-relaxed">{`CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT, content TEXT NOT NULL, image_url TEXT,
  author_name TEXT DEFAULT 'Pratik Kadole',
  author_role TEXT DEFAULT 'CEO / Founder',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}</pre>
      </div>

      {/* Compose */}
      <ComposePost onPublished={handlePublished} />

      {/* Feed */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-black/5 flex-1" />
          <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">
            {posts.length} Post{posts.length !== 1 ? 's' : ''}
          </span>
          <div className="h-px bg-black/5 flex-1" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-black/30">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-bold text-sm">Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-black/10 rounded-3xl">
            <p className="text-sm font-bold text-black/30">No posts yet. Write your first insight above.</p>
          </div>
        ) : (
          posts.map((post) => (
            <AdminPostCard
              key={post.id}
              post={post}
              onDelete={() => handleDelete(post.id)}
              onToggle={() => handleTogglePublished(post)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function AdminPostCard({ post, onDelete, onToggle }: { post: Post; onDelete: () => void; onToggle: () => void }) {
  const date = new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-3xl p-8 space-y-4 transition-all ${post.published ? 'border-black/5' : 'border-dashed border-black/10 opacity-60'}`}
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-black text-black text-sm">{post.author_name}</span>
              <span className="text-black/30 text-xs font-bold ml-2">{post.author_role} · {date}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onToggle}
                title={post.published ? 'Unpublish' : 'Publish'}
                className="p-1.5 rounded-lg text-black/20 hover:text-black hover:bg-black/5 transition-colors"
              >
                {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 rounded-lg text-black/20 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {post.title && (
            <h3 className="font-black text-xl tracking-tight text-black mt-2">{post.title}</h3>
          )}
          <p className="text-black/60 mt-2 text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-black/5 mt-4">
              <Image src={post.image_url} alt="Post attachment" fill className="object-cover" />
            </div>
          )}

          {!post.published && (
            <span className="inline-block mt-3 px-3 py-1 bg-black/5 text-black/30 text-[10px] font-black uppercase tracking-widest rounded-full">
              Draft — not visible on public blog
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
