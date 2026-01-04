// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // ✅ Allow public pages
  if (
    pathname === '/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon')
  ) {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users
  if (!user) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!api).*)'],
}








// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createMiddlewareClient({ req, res })

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // Example: redirect to login if no user
//   if (!user) {
//     const redirectUrl = req.nextUrl.clone()
//     redirectUrl.pathname = '/login'
//     return NextResponse.redirect(redirectUrl)
//   }

//   return res
// }
