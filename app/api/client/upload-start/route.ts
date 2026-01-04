import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient()
  const { docType, filename, clientId, taskId } = await req.json()

  // verify user belongs to this client (RLS also protects backend, but we check early)
  const { data: ok } = await supabase.from('client_users')
    .select('client_id').eq('client_id', clientId).limit(1).maybeSingle()
  if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const key = `clienthub/${clientId}/documents/${docType}/${randomUUID()}-${filename}`
  const { data, error } = await supabase.storage.from('clienthub').createSignedUploadUrl(key)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ key, signedUrl: data.signedUrl, taskId })
}
