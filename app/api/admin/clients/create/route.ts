import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const payload = await req.json()
  // payload: { client, serviceCenterId, clientUserEmail? }
  const { client, serviceCenterId, clientUserEmail } = payload

  // create client
  const { data: c, error: e1 } = await supabase.from('clients').insert(client).select('id').single()
  if (e1) return NextResponse.json({ error: e1.message }, { status: 400 })

  // seed onboarding tasks from task_types
  const { data: types } = await supabase.from('task_types').select('id')
  if (types?.length) {
    await supabase.from('onboarding_tasks')
      .insert(types.map(t => ({ client_id: c.id, task_type_id: t.id })))
  }

  // assign service center
  await supabase.from('client_service_assignments')
    .upsert({ client_id: c.id, service_center_id: serviceCenterId })

  // connect client user (if the user exists)
  if (clientUserEmail) {
    const { data: u } = await supabase.from('profiles').select('user_id').eq('email', clientUserEmail).single()
    if (u?.user_id) {
      await supabase.from('client_users').upsert({ client_id: c.id, user_id: u.user_id })
    }
  }

  return NextResponse.json({ ok: true, clientId: c.id })
}
