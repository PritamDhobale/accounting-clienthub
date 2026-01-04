import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient()
  const { status } = await req.json() // 'reviewed' | 'approved'
  const { error } = await supabase.from('documents')
    .update({ status, reviewed_at: new Date() })
    .eq('id', Number(params.id))
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
