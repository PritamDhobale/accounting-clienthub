// lib/supabase-browser.ts
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export const createSupabaseBrowserClient = () => {
  return createPagesBrowserClient()
}
