import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET — list all case studies
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ studies: data ?? [] })
}

// POST — create a new case study
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, category, description, full_description, image, tags, year, deliverables, results } = body
    if (!id || !title) return NextResponse.json({ error: 'id and title are required.' }, { status: 400 })

    const { error } = await supabaseAdmin.from('case_studies').upsert({
      id, title, category, description, full_description, image,
      tags: tags ?? [], year, deliverables: deliverables ?? [], results: results ?? [],
      published: true, updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// PATCH — update a case study
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, ...fields } = body
    if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 })
    const { error } = await supabaseAdmin
      .from('case_studies')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// DELETE — remove a case study
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 })
    const { error } = await supabaseAdmin.from('case_studies').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
