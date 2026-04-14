import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// PATCH — update text fields for a team member
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, name, role, summary, bio, long_bio, specialties, social_twitter, social_linkedin, social_github, email } = body

    if (!id) return NextResponse.json({ error: 'Member id is required.' }, { status: 400 })

    const { error } = await supabaseAdmin
      .from('team_members')
      .upsert({
        id,
        name,
        role,
        summary,
        bio,
        long_bio,
        specialties,
        social_twitter,
        social_linkedin,
        social_github,
        email,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// DELETE — remove a team member
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'Member id is required.' }, { status: 400 })

    const { error } = await supabaseAdmin.from('team_members').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
