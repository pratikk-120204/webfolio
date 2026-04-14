'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Heart, MessageCircle, Share2, User } from 'lucide-react'
import Image from 'next/image'

interface BlogCardProps {
  post: {
    id: string
    content: string
    image_url?: string
    author: {
      name: string
      role: string
    }
    created_at: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-black/5 p-8 rounded-3xl hover:border-black/15 transition-all group"
    >
      <div className="flex gap-5">
        <div className="flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center border border-black group-hover:scale-105 transition-transform">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-black text-black text-sm mr-2">{post.author.name}</span>
              <span className="text-black/30 text-xs font-bold">{post.author.role} · {post.created_at}</span>
            </div>
            <button className="text-black/20 hover:text-black transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <p className="text-black/70 leading-relaxed whitespace-pre-wrap font-medium text-sm">
            {post.content}
          </p>

          {post.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-black/5">
              <Image
                src={post.image_url}
                alt="Post attachment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="flex items-center gap-6 pt-2 text-black/25">
            <button className="flex items-center gap-1.5 hover:text-black transition-colors group/btn">
              <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-bold">Like</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-black transition-colors group/btn">
              <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-bold">Comment</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-black transition-colors group/btn">
              <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-bold">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
