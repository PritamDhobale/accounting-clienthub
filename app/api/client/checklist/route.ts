import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: Request) {
  const supabase = createSupabaseServerClient()
  const { searchParams } = new URL(req.url)
  const clientId = Number(searchParams.get('clientId'))
  if (!clientId) return NextResponse.json({ error: 'clientId required' }, { status: 400 })

  // joins for checklist
  const { data, error } = await supabase
    .from('onboarding_tasks')
    .select(`
      id, status,
      task_types:task_type_id ( code, label ),
      documents ( id, doc_type, status )
    `)
    .eq('client_id', clientId)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ items: data })
}
