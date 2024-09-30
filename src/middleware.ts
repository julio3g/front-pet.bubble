import { NextRequest, NextResponse } from 'next/server'
import verifyToken from './utils/verify-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const authenticated = token ? await verifyToken(token) : false

  if (!authenticated && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (authenticated && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*'],
}
