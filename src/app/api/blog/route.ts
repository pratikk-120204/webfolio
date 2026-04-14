import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET — list all published + draft posts
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, content, image_url, author_name, author_role, published, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data ?? [] })
}

// POST — create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, image_url, author_name, author_role } = body

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        title: title?.trim() || null,
        content: content.trim(),
        image_url: image_url || null,
        author_name: author_name || 'Pratik Kadole',
        author_role: author_role || 'CEO / Founder',
        published: true,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, post: data })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
