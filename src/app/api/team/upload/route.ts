import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Use service role to bypass RLS for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const memberId = formData.get('memberId') as string | null
    const memberName = formData.get('memberName') as string | null
    const memberRole = formData.get('memberRole') as string | null

    if (!file || !memberId) {
      return NextResponse.json({ error: 'File and memberId are required.' }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileExt = file.name.split('.').pop()
    const filePath = `team/${memberId}_${Date.now()}.${fileExt}`

    // Upload to Supabase Storage (bucket: 'webfolio-assets')
    const { error: uploadError } = await supabaseAdmin.storage
      .from('webfolio-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get the public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('webfolio-assets')
      .getPublicUrl(filePath)

    // Upsert into the team_members table
    const { error: dbError } = await supabaseAdmin
      .from('team_members')
      .upsert({
        id: memberId,
        name: memberName,
        role: memberRole,
        image_url: publicUrl,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })

    if (dbError) {
      console.error('DB error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, publicUrl })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
