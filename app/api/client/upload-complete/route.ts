import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const { key, docType, clientId, taskId } = await req.json()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase.from('documents').insert({
    client_id: clientId,
    task_id: taskId,
    uploader: user.id,
    doc_type: docType,
    storage_path: key,
    status: 'received'
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // set task to 'received' if it was pending
  await supabase.from('onboarding_tasks')
    .update({ status: 'received', last_changed_by: user.id })
    .eq('id', taskId)
    .neq('status', 'received')

  return NextResponse.json({ ok: true })
}
