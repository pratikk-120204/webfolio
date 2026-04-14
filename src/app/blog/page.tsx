import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insights & Updates',
  description: 'Latest thinking, project updates, and agency insights from Webfolio Solutions.',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, content, created_at, author_name, author_role, image_url')
    .order('created_at', { ascending: false })

  const allPosts = posts ?? []

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <section className="pt-32 pb-20 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-4">Agency</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-none">
            Insights<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>&amp; Updates</span>
          </h1>
          <p className="text-black/40 font-medium mt-6 text-lg max-w-lg">
            Latest thinking, project updates, and perspectives from the Webfolio Solutions team.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {allPosts.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-16 h-16 border-2 border-dashed border-black/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-black text-black/20">0</span>
            </div>
            <p className="text-sm font-bold text-black/30 mb-2">No posts yet</p>
            <p className="text-xs text-black/20 font-medium">
              Posts published from the admin panel will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post: {
              id: string
              title?: string
              content: string
              created_at: string
              author_name?: string
              author_role?: string
              image_url?: string
            }) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-black text-white tracking-tighter">
            Ready to start your project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase hover:bg-white/90 transition-all active:scale-95"
          >
            Get in Touch
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function BlogPostCard({ post }: { post: {
  id: string
  title?: string
  content: string
  created_at: string
  author_name?: string
  author_role?: string
  image_url?: string
}}) {
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
  const preview = post.content?.slice(0, 160) + (post.content?.length > 160 ? '…' : '')

  return (
    <div className="border border-black/5 rounded-3xl overflow-hidden hover:border-black/15 transition-all group">
      {post.image_url && (
        <div className="aspect-[16/9] overflow-hidden bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image_url}
            alt={post.title ?? 'Post image'}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
      )}
      <div className="p-8 space-y-4">
        <p className="text-[10px] font-black text-black/30 uppercase tracking-widest">{date}</p>
        {post.title && (
          <h2 className="text-2xl font-black tracking-tighter text-black leading-tight">{post.title}</h2>
        )}
        <p className="text-sm text-black/50 font-medium leading-relaxed">{preview}</p>
        <div className="flex items-center justify-between pt-4 border-t border-black/5">
          <div>
            <p className="text-xs font-bold text-black">{post.author_name ?? 'Pratik Kadole'}</p>
            <p className="text-[10px] text-black/30 font-bold">{post.author_role ?? 'CEO / Founder'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
