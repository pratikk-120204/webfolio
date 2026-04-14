// Blog image upload API — stores images in Supabase Storage
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const path = formData.get('path') as string | null

    if (!file) return NextResponse.json({ error: 'File is required.' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path || `blog/${Date.now()}_${file.name}`

    const { error } = await supabaseAdmin.storage
      .from('webfolio-assets')
      .upload(filePath, buffer, { contentType: file.type, upsert: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('webfolio-assets')
      .getPublicUrl(filePath)

    return NextResponse.json({ url: publicUrl })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
