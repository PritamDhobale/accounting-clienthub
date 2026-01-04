'use server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { ok: false, message: error.message }
  return { ok: true }
}
